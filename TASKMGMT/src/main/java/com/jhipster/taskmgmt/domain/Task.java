package com.jhipster.taskmgmt.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.jhipster.taskmgmt.domain.enumeration.ProcessType;

import com.jhipster.taskmgmt.domain.enumeration.Status;

import com.jhipster.taskmgmt.domain.enumeration.Priority;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "process_type", nullable = false)
    private ProcessType processType;

    @NotNull
    @Column(name = "task_name", nullable = false)
    private String taskName;

    @Column(name = "description")
    private String description;

    @Column(name = "applies_to")
    private String appliesTo;

    @Column(name = "datecompletion")
    private ZonedDateTime datecompletion;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private Owner owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProcessType getProcessType() {
        return processType;
    }

    public Task processType(ProcessType processType) {
        this.processType = processType;
        return this;
    }

    public void setProcessType(ProcessType processType) {
        this.processType = processType;
    }

    public String getTaskName() {
        return taskName;
    }

    public Task taskName(String taskName) {
        this.taskName = taskName;
        return this;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getDescription() {
        return description;
    }

    public Task description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAppliesTo() {
        return appliesTo;
    }

    public Task appliesTo(String appliesTo) {
        this.appliesTo = appliesTo;
        return this;
    }

    public void setAppliesTo(String appliesTo) {
        this.appliesTo = appliesTo;
    }

    public ZonedDateTime getDatecompletion() {
        return datecompletion;
    }

    public Task datecompletion(ZonedDateTime datecompletion) {
        this.datecompletion = datecompletion;
        return this;
    }

    public void setDatecompletion(ZonedDateTime datecompletion) {
        this.datecompletion = datecompletion;
    }

    public Status getStatus() {
        return status;
    }

    public Task status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public Task priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Owner getOwner() {
        return owner;
    }

    public Task owner(Owner owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", processType='" + getProcessType() + "'" +
            ", taskName='" + getTaskName() + "'" +
            ", description='" + getDescription() + "'" +
            ", appliesTo='" + getAppliesTo() + "'" +
            ", datecompletion='" + getDatecompletion() + "'" +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            "}";
    }
}
