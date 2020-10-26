package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.MyTollApp;
import ir.mbbn.mytoll.domain.Plate;
import ir.mbbn.mytoll.repository.PlateRepository;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static ir.mbbn.mytoll.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ir.mbbn.mytoll.domain.enumeration.PlateType;
/**
 * Integration tests for the {@link PlateResource} REST controller.
 */
@SpringBootTest(classes = MyTollApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlateResourceIT {

    private static final String DEFAULT_PLAIN = "AAAAAAAA";
    private static final String UPDATED_PLAIN = "BBBBBBBB";

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final PlateType DEFAULT_TYPE = PlateType.NORMAL;
    private static final PlateType UPDATED_TYPE = PlateType.FORMAL;

    private static final ZonedDateTime DEFAULT_CREATION_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATION_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATION_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_LAST_UPDATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_UPDATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_UPDATED_BY = "BBBBBBBBBB";

    @Autowired
    private PlateRepository plateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlateMockMvc;

    private Plate plate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plate createEntity(EntityManager em) {
        Plate plate = new Plate()
            .plain(DEFAULT_PLAIN)
            .code(DEFAULT_CODE)
            .type(DEFAULT_TYPE)
            .creationTime(DEFAULT_CREATION_TIME)
            .creationBy(DEFAULT_CREATION_BY)
            .lastUpdateTime(DEFAULT_LAST_UPDATE_TIME)
            .lastUpdatedBy(DEFAULT_LAST_UPDATED_BY);
        return plate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plate createUpdatedEntity(EntityManager em) {
        Plate plate = new Plate()
            .plain(UPDATED_PLAIN)
            .code(UPDATED_CODE)
            .type(UPDATED_TYPE)
            .creationTime(UPDATED_CREATION_TIME)
            .creationBy(UPDATED_CREATION_BY)
            .lastUpdateTime(UPDATED_LAST_UPDATE_TIME)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY);
        return plate;
    }

    @BeforeEach
    public void initTest() {
        plate = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlate() throws Exception {
        int databaseSizeBeforeCreate = plateRepository.findAll().size();
        // Create the Plate
        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isCreated());

        // Validate the Plate in the database
        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeCreate + 1);
        Plate testPlate = plateList.get(plateList.size() - 1);
        assertThat(testPlate.getPlain()).isEqualTo(DEFAULT_PLAIN);
        assertThat(testPlate.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testPlate.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPlate.getCreationTime()).isEqualTo(DEFAULT_CREATION_TIME);
        assertThat(testPlate.getCreationBy()).isEqualTo(DEFAULT_CREATION_BY);
        assertThat(testPlate.getLastUpdateTime()).isEqualTo(DEFAULT_LAST_UPDATE_TIME);
        assertThat(testPlate.getLastUpdatedBy()).isEqualTo(DEFAULT_LAST_UPDATED_BY);
    }

    @Test
    @Transactional
    public void createPlateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plateRepository.findAll().size();

        // Create the Plate with an existing ID
        plate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        // Validate the Plate in the database
        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkPlainIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateRepository.findAll().size();
        // set the field null
        plate.setPlain(null);

        // Create the Plate, which fails.


        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateRepository.findAll().size();
        // set the field null
        plate.setCode(null);

        // Create the Plate, which fails.


        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateRepository.findAll().size();
        // set the field null
        plate.setType(null);

        // Create the Plate, which fails.


        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateRepository.findAll().size();
        // set the field null
        plate.setCreationTime(null);

        // Create the Plate, which fails.


        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationByIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateRepository.findAll().size();
        // set the field null
        plate.setCreationBy(null);

        // Create the Plate, which fails.


        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastUpdateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateRepository.findAll().size();
        // set the field null
        plate.setLastUpdateTime(null);

        // Create the Plate, which fails.


        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastUpdatedByIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateRepository.findAll().size();
        // set the field null
        plate.setLastUpdatedBy(null);

        // Create the Plate, which fails.


        restPlateMockMvc.perform(post("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlates() throws Exception {
        // Initialize the database
        plateRepository.saveAndFlush(plate);

        // Get all the plateList
        restPlateMockMvc.perform(get("/api/plates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plate.getId().intValue())))
            .andExpect(jsonPath("$.[*].plain").value(hasItem(DEFAULT_PLAIN)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].creationTime").value(hasItem(sameInstant(DEFAULT_CREATION_TIME))))
            .andExpect(jsonPath("$.[*].creationBy").value(hasItem(DEFAULT_CREATION_BY)))
            .andExpect(jsonPath("$.[*].lastUpdateTime").value(hasItem(sameInstant(DEFAULT_LAST_UPDATE_TIME))))
            .andExpect(jsonPath("$.[*].lastUpdatedBy").value(hasItem(DEFAULT_LAST_UPDATED_BY)));
    }
    
    @Test
    @Transactional
    public void getPlate() throws Exception {
        // Initialize the database
        plateRepository.saveAndFlush(plate);

        // Get the plate
        restPlateMockMvc.perform(get("/api/plates/{id}", plate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plate.getId().intValue()))
            .andExpect(jsonPath("$.plain").value(DEFAULT_PLAIN))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.creationTime").value(sameInstant(DEFAULT_CREATION_TIME)))
            .andExpect(jsonPath("$.creationBy").value(DEFAULT_CREATION_BY))
            .andExpect(jsonPath("$.lastUpdateTime").value(sameInstant(DEFAULT_LAST_UPDATE_TIME)))
            .andExpect(jsonPath("$.lastUpdatedBy").value(DEFAULT_LAST_UPDATED_BY));
    }
    @Test
    @Transactional
    public void getNonExistingPlate() throws Exception {
        // Get the plate
        restPlateMockMvc.perform(get("/api/plates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlate() throws Exception {
        // Initialize the database
        plateRepository.saveAndFlush(plate);

        int databaseSizeBeforeUpdate = plateRepository.findAll().size();

        // Update the plate
        Plate updatedPlate = plateRepository.findById(plate.getId()).get();
        // Disconnect from session so that the updates on updatedPlate are not directly saved in db
        em.detach(updatedPlate);
        updatedPlate
            .plain(UPDATED_PLAIN)
            .code(UPDATED_CODE)
            .type(UPDATED_TYPE)
            .creationTime(UPDATED_CREATION_TIME)
            .creationBy(UPDATED_CREATION_BY)
            .lastUpdateTime(UPDATED_LAST_UPDATE_TIME)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY);

        restPlateMockMvc.perform(put("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlate)))
            .andExpect(status().isOk());

        // Validate the Plate in the database
        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeUpdate);
        Plate testPlate = plateList.get(plateList.size() - 1);
        assertThat(testPlate.getPlain()).isEqualTo(UPDATED_PLAIN);
        assertThat(testPlate.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testPlate.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPlate.getCreationTime()).isEqualTo(UPDATED_CREATION_TIME);
        assertThat(testPlate.getCreationBy()).isEqualTo(UPDATED_CREATION_BY);
        assertThat(testPlate.getLastUpdateTime()).isEqualTo(UPDATED_LAST_UPDATE_TIME);
        assertThat(testPlate.getLastUpdatedBy()).isEqualTo(UPDATED_LAST_UPDATED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingPlate() throws Exception {
        int databaseSizeBeforeUpdate = plateRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlateMockMvc.perform(put("/api/plates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plate)))
            .andExpect(status().isBadRequest());

        // Validate the Plate in the database
        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlate() throws Exception {
        // Initialize the database
        plateRepository.saveAndFlush(plate);

        int databaseSizeBeforeDelete = plateRepository.findAll().size();

        // Delete the plate
        restPlateMockMvc.perform(delete("/api/plates/{id}", plate.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plate> plateList = plateRepository.findAll();
        assertThat(plateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
