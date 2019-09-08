package com.jhipster.taskmgmt.service;

import com.jhipster.taskmgmt.domain.Owner;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Owner.
 */
public interface OwnerService {

    /**
     * Save a owner.
     *
     * @param owner the entity to save
     * @return the persisted entity
     */
    Owner save(Owner owner);

    /**
     * Get all the owners.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Owner> findAll(Pageable pageable);


    /**
     * Get the "id" owner.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Owner> findOne(Long id);

    /**
     * Delete the "id" owner.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
