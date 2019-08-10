package com.jhipster.test.repository;



import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jhipster.test.domain.Task;
import com.jhipster.test.web.rest.vm.MonthWiseStatistics;



/**
 * Spring Data  repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
	
	List<Task> findByDateassignedAfterAndDateassignedBefore(LocalDate firstDayOfMonth, LocalDate lastDayOfMonth);
	
	@Query(value = "SELECT "
	        + " new com.jhipster.test.web.rest.vm.MonthWiseStatistics(Month(task.dateassigned), COUNT(task))"
	        + " FROM Task task" 
	        + " WHERE task.dateassigned BETWEEN :startDate AND :endDate"
	        + " GROUP BY Month(task.dateassigned) ORDER BY Month(task.dateassigned) DESC")
	public List <MonthWiseStatistics> getMonthlyScheduleAdherenceBySection(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}
