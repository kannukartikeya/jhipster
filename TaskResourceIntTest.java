package com.jhispter.tasktest.web.rest;

import static com.jhispter.tasktest.web.rest.TestUtil.createFormattingConversionService;
import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.firstDayOfYear;
import static java.time.temporal.TemporalAdjusters.lastDayOfYear;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import javax.persistence.EntityManager;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.jhispter.tasktest.TasktestApp;
import com.jhispter.tasktest.domain.Task;
import com.jhispter.tasktest.domain.enumeration.Priority;
import com.jhispter.tasktest.domain.enumeration.Status;
import com.jhispter.tasktest.repository.TaskRepository;
import com.jhispter.tasktest.service.TaskService;
import com.jhispter.tasktest.web.rest.errors.ExceptionTranslator;
import com.jhispter.tasktest.web.rest.vm.MonthWiseStatistics;
/**
 * Test class for the TaskResource REST controller.
 *
 * @see TaskResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TasktestApp.class)
public class TaskResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATEASSIGNED = LocalDate.ofEpochDay(4L);
    private static final LocalDate UPDATED_DATEASSIGNED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATECOMPLETION = LocalDate.ofEpochDay(4L);
    private static final LocalDate UPDATED_DATECOMPLETION = LocalDate.now(ZoneId.systemDefault());

    private static final Status DEFAULT_STATUS = Status.SCHEDULED;
    private static final Status UPDATED_STATUS = Status.STARTED;

    private static final Priority DEFAULT_PRIORITY = Priority.HIGHEST;
    private static final Priority UPDATED_PRIORITY = Priority.HIGH;

    @Autowired
    private TaskRepository taskRepository;

    

    @Autowired
    private TaskService taskService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTaskMockMvc;

    private Task task;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskResource taskResource = new TaskResource(taskService);
        this.restTaskMockMvc = MockMvcBuilders.standaloneSetup(taskResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task createEntity(EntityManager em) {
        Task task = new Task()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .dateassigned(DEFAULT_DATEASSIGNED)
            .datecompletion(DEFAULT_DATECOMPLETION)
            .status(DEFAULT_STATUS)
            .priority(DEFAULT_PRIORITY);
        return task;
    }

    @Before
    public void initTest() {
        task = createEntity(em);
    }

    @Test
    @Transactional
    public void createTask() throws Exception {
        int databaseSizeBeforeCreate = taskRepository.findAll().size();

        // Create the Task
        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isCreated());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate + 1);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTask.getDateassigned()).isEqualTo(DEFAULT_DATEASSIGNED);
        assertThat(testTask.getDatecompletion()).isEqualTo(DEFAULT_DATECOMPLETION);
        assertThat(testTask.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTask.getPriority()).isEqualTo(DEFAULT_PRIORITY);
    }

    @Test
    @Transactional
    public void createTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskRepository.findAll().size();

        // Create the Task with an existing ID
        task.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTasks() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList
        restTaskMockMvc.perform(get("/api/tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateassigned").value(hasItem(DEFAULT_DATEASSIGNED.toString())))
            .andExpect(jsonPath("$.[*].datecompletion").value(hasItem(DEFAULT_DATECOMPLETION.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())));
    }
    

    @Test
    @Transactional
    public void getTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get the task
        restTaskMockMvc.perform(get("/api/tasks/{id}", task.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(task.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateassigned").value(DEFAULT_DATEASSIGNED.toString()))
            .andExpect(jsonPath("$.datecompletion").value(DEFAULT_DATECOMPLETION.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTask() throws Exception {
        // Get the task
        restTaskMockMvc.perform(get("/api/tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTask() throws Exception {
        // Initialize the database
        taskService.save(task);

        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Update the task
        Task updatedTask = taskRepository.findById(task.getId()).get();
        // Disconnect from session so that the updates on updatedTask are not directly saved in db
        em.detach(updatedTask);
        updatedTask
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .dateassigned(UPDATED_DATEASSIGNED)
            .datecompletion(UPDATED_DATECOMPLETION)
            .status(UPDATED_STATUS)
            .priority(UPDATED_PRIORITY);

        restTaskMockMvc.perform(put("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTask)))
            .andExpect(status().isOk());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTask.getDateassigned()).isEqualTo(UPDATED_DATEASSIGNED);
        assertThat(testTask.getDatecompletion()).isEqualTo(UPDATED_DATECOMPLETION);
        assertThat(testTask.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTask.getPriority()).isEqualTo(UPDATED_PRIORITY);
    }

    @Test
    @Transactional
    public void updateNonExistingTask() throws Exception {
        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Create the Task

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTaskMockMvc.perform(put("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTask() throws Exception {
        // Initialize the database
        taskService.save(task);

        int databaseSizeBeforeDelete = taskRepository.findAll().size();

        // Get the task
        restTaskMockMvc.perform(delete("/api/tasks/{id}", task.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task.class);
        Task task1 = new Task();
        task1.setId(1L);
        Task task2 = new Task();
        task2.setId(task1.getId());
        assertThat(task1).isEqualTo(task2);
        task2.setId(2L);
        assertThat(task1).isNotEqualTo(task2);
        task1.setId(null);
        assertThat(task1).isNotEqualTo(task2);
    }
    
    
    @Test
    @Transactional
    public void getAllRecordsMonthWise() throws Exception{
    	int databaseSizeBeforeCreate = taskRepository.findAll().size();
        /*LocalDate today = LocalDate.now();
        
        LocalDate thisMonth = today.with(firstDayOfMonth());
        LocalDate lastMonth = thisMonth.minusMonths(1);
        
        
        */
    	LocalDate today = DEFAULT_DATEASSIGNED;
        
        int currentYear = today.getYear();
    
        LocalDate firstDay = today.with(firstDayOfYear()); // 2015-01-01          
        LocalDate lastDay = today.with(lastDayOfYear()); // 2015-12-31
        
        createRecordsByMonth(firstDay, lastDay);
        List<Task> tasklist1 = taskRepository.findByDateassignedAfterAndDateassignedBefore(firstDay, lastDay);
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate + 1);
        
        List<MonthWiseStatistics> monthwiseList = taskRepository.getMonthlyScheduleAdherenceBySection(firstDay, lastDay);
        assertThat(monthwiseList.size()>0);
        for(MonthWiseStatistics stats:monthwiseList)
        {
        	System.out.println("Month is " + stats.getMonth());
        }
       
        
        
		// Get all recordList
        /*restTaskMockMvc.perform(get("/api/records-this-month?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
    	*/
    }
    private void createRecordsByMonth(LocalDate thisMonth, LocalDate lastMonth)  throws Exception{
		// TODO Auto-generated method stub
    	/*Owner onwer = new Owner().name("Kartikeya").email("kartikeya.gupta@jpm.com");
    	Owner kartik = ownerRepository.findById(new Long(1)).get();*/
/*    	Task task = new Task().description("CompleteInpection")
    			.dateassigned(thisMonth.plusDays(2))
    			.datecompletion(thisMonth.plusDays(2));
    	taskRepository.saveAndFlush(task);*/	
    	  // Create the Task
        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isCreated());
        
	}
	
    
}
