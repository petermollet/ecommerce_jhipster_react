package fr.insy2s.service;

import fr.insy2s.service.dto.CommandLineDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.insy2s.domain.CommandLine}.
 */
public interface CommandLineService {

    /**
     * Save a commandLine.
     *
     * @param commandLineDTO the entity to save.
     * @return the persisted entity.
     */
    CommandLineDTO save(CommandLineDTO commandLineDTO);

    /**
     * Get all the commandLines.
     *
     * @return the list of entities.
     */
    List<CommandLineDTO> findAll();


    /**
     * Get the "id" commandLine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommandLineDTO> findOne(Long id);

    /**
     * Delete the "id" commandLine.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
