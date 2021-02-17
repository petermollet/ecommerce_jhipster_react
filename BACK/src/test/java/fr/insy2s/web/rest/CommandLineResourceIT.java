package fr.insy2s.web.rest;

import fr.insy2s.EcommerceApp;
import fr.insy2s.domain.CommandLine;
import fr.insy2s.domain.Product;
import fr.insy2s.domain.Client;
import fr.insy2s.repository.CommandLineRepository;
import fr.insy2s.service.CommandLineService;
import fr.insy2s.service.dto.CommandLineDTO;
import fr.insy2s.service.mapper.CommandLineMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CommandLineResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CommandLineResourceIT {

    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    @Autowired
    private CommandLineRepository commandLineRepository;

    @Autowired
    private CommandLineMapper commandLineMapper;

    @Autowired
    private CommandLineService commandLineService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommandLineMockMvc;

    private CommandLine commandLine;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandLine createEntity(EntityManager em) {
        CommandLine commandLine = new CommandLine()
            .quantity(DEFAULT_QUANTITY);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        commandLine.setProduct(product);
        // Add required entity
        Client client;
        if (TestUtil.findAll(em, Client.class).isEmpty()) {
            client = ClientResourceIT.createEntity(em);
            em.persist(client);
            em.flush();
        } else {
            client = TestUtil.findAll(em, Client.class).get(0);
        }
        commandLine.setClient(client);
        return commandLine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandLine createUpdatedEntity(EntityManager em) {
        CommandLine commandLine = new CommandLine()
            .quantity(UPDATED_QUANTITY);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        commandLine.setProduct(product);
        // Add required entity
        Client client;
        if (TestUtil.findAll(em, Client.class).isEmpty()) {
            client = ClientResourceIT.createUpdatedEntity(em);
            em.persist(client);
            em.flush();
        } else {
            client = TestUtil.findAll(em, Client.class).get(0);
        }
        commandLine.setClient(client);
        return commandLine;
    }

    @BeforeEach
    public void initTest() {
        commandLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommandLine() throws Exception {
        int databaseSizeBeforeCreate = commandLineRepository.findAll().size();
        // Create the CommandLine
        CommandLineDTO commandLineDTO = commandLineMapper.toDto(commandLine);
        restCommandLineMockMvc.perform(post("/api/command-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commandLineDTO)))
            .andExpect(status().isCreated());

        // Validate the CommandLine in the database
        List<CommandLine> commandLineList = commandLineRepository.findAll();
        assertThat(commandLineList).hasSize(databaseSizeBeforeCreate + 1);
        CommandLine testCommandLine = commandLineList.get(commandLineList.size() - 1);
        assertThat(testCommandLine.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createCommandLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commandLineRepository.findAll().size();

        // Create the CommandLine with an existing ID
        commandLine.setId(1L);
        CommandLineDTO commandLineDTO = commandLineMapper.toDto(commandLine);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandLineMockMvc.perform(post("/api/command-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commandLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CommandLine in the database
        List<CommandLine> commandLineList = commandLineRepository.findAll();
        assertThat(commandLineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandLineRepository.findAll().size();
        // set the field null
        commandLine.setQuantity(null);

        // Create the CommandLine, which fails.
        CommandLineDTO commandLineDTO = commandLineMapper.toDto(commandLine);


        restCommandLineMockMvc.perform(post("/api/command-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commandLineDTO)))
            .andExpect(status().isBadRequest());

        List<CommandLine> commandLineList = commandLineRepository.findAll();
        assertThat(commandLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommandLines() throws Exception {
        // Initialize the database
        commandLineRepository.saveAndFlush(commandLine);

        // Get all the commandLineList
        restCommandLineMockMvc.perform(get("/api/command-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commandLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    
    @Test
    @Transactional
    public void getCommandLine() throws Exception {
        // Initialize the database
        commandLineRepository.saveAndFlush(commandLine);

        // Get the commandLine
        restCommandLineMockMvc.perform(get("/api/command-lines/{id}", commandLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commandLine.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }
    @Test
    @Transactional
    public void getNonExistingCommandLine() throws Exception {
        // Get the commandLine
        restCommandLineMockMvc.perform(get("/api/command-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommandLine() throws Exception {
        // Initialize the database
        commandLineRepository.saveAndFlush(commandLine);

        int databaseSizeBeforeUpdate = commandLineRepository.findAll().size();

        // Update the commandLine
        CommandLine updatedCommandLine = commandLineRepository.findById(commandLine.getId()).get();
        // Disconnect from session so that the updates on updatedCommandLine are not directly saved in db
        em.detach(updatedCommandLine);
        updatedCommandLine
            .quantity(UPDATED_QUANTITY);
        CommandLineDTO commandLineDTO = commandLineMapper.toDto(updatedCommandLine);

        restCommandLineMockMvc.perform(put("/api/command-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commandLineDTO)))
            .andExpect(status().isOk());

        // Validate the CommandLine in the database
        List<CommandLine> commandLineList = commandLineRepository.findAll();
        assertThat(commandLineList).hasSize(databaseSizeBeforeUpdate);
        CommandLine testCommandLine = commandLineList.get(commandLineList.size() - 1);
        assertThat(testCommandLine.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingCommandLine() throws Exception {
        int databaseSizeBeforeUpdate = commandLineRepository.findAll().size();

        // Create the CommandLine
        CommandLineDTO commandLineDTO = commandLineMapper.toDto(commandLine);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandLineMockMvc.perform(put("/api/command-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commandLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CommandLine in the database
        List<CommandLine> commandLineList = commandLineRepository.findAll();
        assertThat(commandLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommandLine() throws Exception {
        // Initialize the database
        commandLineRepository.saveAndFlush(commandLine);

        int databaseSizeBeforeDelete = commandLineRepository.findAll().size();

        // Delete the commandLine
        restCommandLineMockMvc.perform(delete("/api/command-lines/{id}", commandLine.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CommandLine> commandLineList = commandLineRepository.findAll();
        assertThat(commandLineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
