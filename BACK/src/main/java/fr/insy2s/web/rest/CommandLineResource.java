package fr.insy2s.web.rest;

import fr.insy2s.service.CommandLineService;
import fr.insy2s.web.rest.errors.BadRequestAlertException;
import fr.insy2s.service.dto.CommandLineDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.insy2s.domain.CommandLine}.
 */
@RestController
@RequestMapping("/api")
public class CommandLineResource {

    private final Logger log = LoggerFactory.getLogger(CommandLineResource.class);

    private static final String ENTITY_NAME = "commandLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandLineService commandLineService;

    public CommandLineResource(CommandLineService commandLineService) {
        this.commandLineService = commandLineService;
    }

    /**
     * {@code POST  /command-lines} : Create a new commandLine.
     *
     * @param commandLineDTO the commandLineDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commandLineDTO, or with status {@code 400 (Bad Request)} if the commandLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/command-lines")
    public ResponseEntity<CommandLineDTO> createCommandLine(@Valid @RequestBody CommandLineDTO commandLineDTO) throws URISyntaxException {
        log.debug("REST request to save CommandLine : {}", commandLineDTO);
        if (commandLineDTO.getId() != null) {
            throw new BadRequestAlertException("A new commandLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommandLineDTO result = commandLineService.save(commandLineDTO);
        return ResponseEntity.created(new URI("/api/command-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /command-lines} : Updates an existing commandLine.
     *
     * @param commandLineDTO the commandLineDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandLineDTO,
     * or with status {@code 400 (Bad Request)} if the commandLineDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commandLineDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/command-lines")
    public ResponseEntity<CommandLineDTO> updateCommandLine(@Valid @RequestBody CommandLineDTO commandLineDTO) throws URISyntaxException {
        log.debug("REST request to update CommandLine : {}", commandLineDTO);
        if (commandLineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CommandLineDTO result = commandLineService.save(commandLineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commandLineDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /command-lines} : get all the commandLines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commandLines in body.
     */
    @GetMapping("/command-lines")
    public List<CommandLineDTO> getAllCommandLines() {
        log.debug("REST request to get all CommandLines");
        return commandLineService.findAll();
    }

    /**
     * {@code GET  /command-lines/:id} : get the "id" commandLine.
     *
     * @param id the id of the commandLineDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commandLineDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/command-lines/{id}")
    public ResponseEntity<CommandLineDTO> getCommandLine(@PathVariable Long id) {
        log.debug("REST request to get CommandLine : {}", id);
        Optional<CommandLineDTO> commandLineDTO = commandLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commandLineDTO);
    }

    /**
     * {@code DELETE  /command-lines/:id} : delete the "id" commandLine.
     *
     * @param id the id of the commandLineDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/command-lines/{id}")
    public ResponseEntity<Void> deleteCommandLine(@PathVariable Long id) {
        log.debug("REST request to delete CommandLine : {}", id);
        commandLineService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
