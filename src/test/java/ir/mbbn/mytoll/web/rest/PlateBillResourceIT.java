package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.MyTollApp;
import ir.mbbn.mytoll.domain.PlateBill;
import ir.mbbn.mytoll.repository.PlateBillRepository;
import ir.mbbn.mytoll.service.PlateBillService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ir.mbbn.mytoll.domain.enumeration.BillCategory;
/**
 * Integration tests for the {@link PlateBillResource} REST controller.
 */
@SpringBootTest(classes = MyTollApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlateBillResourceIT {

    private static final BillCategory DEFAULT_CATEGORY = BillCategory.SIDEPARK;
    private static final BillCategory UPDATED_CATEGORY = BillCategory.HIGHWAY;

    private static final LocalDate DEFAULT_FROM_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FROM_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TO_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TO_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PlateBillRepository plateBillRepository;

    @Autowired
    private PlateBillService plateBillService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlateBillMockMvc;

    private PlateBill plateBill;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlateBill createEntity(EntityManager em) {
        PlateBill plateBill = new PlateBill()
            .category(DEFAULT_CATEGORY)
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE);
        return plateBill;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlateBill createUpdatedEntity(EntityManager em) {
        PlateBill plateBill = new PlateBill()
            .category(UPDATED_CATEGORY)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);
        return plateBill;
    }

    @BeforeEach
    public void initTest() {
        plateBill = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlateBill() throws Exception {
        int databaseSizeBeforeCreate = plateBillRepository.findAll().size();
        // Create the PlateBill
        restPlateBillMockMvc.perform(post("/api/plate-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plateBill)))
            .andExpect(status().isCreated());

        // Validate the PlateBill in the database
        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeCreate + 1);
        PlateBill testPlateBill = plateBillList.get(plateBillList.size() - 1);
        assertThat(testPlateBill.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testPlateBill.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testPlateBill.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createPlateBillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plateBillRepository.findAll().size();

        // Create the PlateBill with an existing ID
        plateBill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlateBillMockMvc.perform(post("/api/plate-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plateBill)))
            .andExpect(status().isBadRequest());

        // Validate the PlateBill in the database
        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateBillRepository.findAll().size();
        // set the field null
        plateBill.setCategory(null);

        // Create the PlateBill, which fails.


        restPlateBillMockMvc.perform(post("/api/plate-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plateBill)))
            .andExpect(status().isBadRequest());

        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateBillRepository.findAll().size();
        // set the field null
        plateBill.setFromDate(null);

        // Create the PlateBill, which fails.


        restPlateBillMockMvc.perform(post("/api/plate-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plateBill)))
            .andExpect(status().isBadRequest());

        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkToDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = plateBillRepository.findAll().size();
        // set the field null
        plateBill.setToDate(null);

        // Create the PlateBill, which fails.


        restPlateBillMockMvc.perform(post("/api/plate-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plateBill)))
            .andExpect(status().isBadRequest());

        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlateBills() throws Exception {
        // Initialize the database
        plateBillRepository.saveAndFlush(plateBill);

        // Get all the plateBillList
        restPlateBillMockMvc.perform(get("/api/plate-bills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plateBill.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(DEFAULT_TO_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPlateBill() throws Exception {
        // Initialize the database
        plateBillRepository.saveAndFlush(plateBill);

        // Get the plateBill
        restPlateBillMockMvc.perform(get("/api/plate-bills/{id}", plateBill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plateBill.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.toDate").value(DEFAULT_TO_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPlateBill() throws Exception {
        // Get the plateBill
        restPlateBillMockMvc.perform(get("/api/plate-bills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlateBill() throws Exception {
        // Initialize the database
        plateBillService.save(plateBill);

        int databaseSizeBeforeUpdate = plateBillRepository.findAll().size();

        // Update the plateBill
        PlateBill updatedPlateBill = plateBillRepository.findById(plateBill.getId()).get();
        // Disconnect from session so that the updates on updatedPlateBill are not directly saved in db
        em.detach(updatedPlateBill);
        updatedPlateBill
            .category(UPDATED_CATEGORY)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restPlateBillMockMvc.perform(put("/api/plate-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlateBill)))
            .andExpect(status().isOk());

        // Validate the PlateBill in the database
        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeUpdate);
        PlateBill testPlateBill = plateBillList.get(plateBillList.size() - 1);
        assertThat(testPlateBill.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testPlateBill.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testPlateBill.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlateBill() throws Exception {
        int databaseSizeBeforeUpdate = plateBillRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlateBillMockMvc.perform(put("/api/plate-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plateBill)))
            .andExpect(status().isBadRequest());

        // Validate the PlateBill in the database
        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlateBill() throws Exception {
        // Initialize the database
        plateBillService.save(plateBill);

        int databaseSizeBeforeDelete = plateBillRepository.findAll().size();

        // Delete the plateBill
        restPlateBillMockMvc.perform(delete("/api/plate-bills/{id}", plateBill.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlateBill> plateBillList = plateBillRepository.findAll();
        assertThat(plateBillList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
