package com.jhipster.taskmgmt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Owner.
 */
@Entity
@Table(name = "owner")
public class Owner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "picture_content_type")
    private String pictureContentType;

    @Lob
    @Column(name = "agreement")
    private byte[] agreement;

    @Column(name = "agreement_content_type")
    private String agreementContentType;

    @Lob
    @Column(name = "textagreement")
    private String textagreement;

    @OneToMany(mappedBy = "owner")
    private Set<Task> tasks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Owner name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Owner email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Owner picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Owner pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public byte[] getAgreement() {
        return agreement;
    }

    public Owner agreement(byte[] agreement) {
        this.agreement = agreement;
        return this;
    }

    public void setAgreement(byte[] agreement) {
        this.agreement = agreement;
    }

    public String getAgreementContentType() {
        return agreementContentType;
    }

    public Owner agreementContentType(String agreementContentType) {
        this.agreementContentType = agreementContentType;
        return this;
    }

    public void setAgreementContentType(String agreementContentType) {
        this.agreementContentType = agreementContentType;
    }

    public String getTextagreement() {
        return textagreement;
    }

    public Owner textagreement(String textagreement) {
        this.textagreement = textagreement;
        return this;
    }

    public void setTextagreement(String textagreement) {
        this.textagreement = textagreement;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Owner tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Owner addTask(Task task) {
        this.tasks.add(task);
        task.setOwner(this);
        return this;
    }

    public Owner removeTask(Task task) {
        this.tasks.remove(task);
        task.setOwner(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
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
        Owner owner = (Owner) o;
        if (owner.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), owner.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Owner{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", agreement='" + getAgreement() + "'" +
            ", agreementContentType='" + getAgreementContentType() + "'" +
            ", textagreement='" + getTextagreement() + "'" +
            "}";
    }
}
