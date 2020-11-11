package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.MyTollApp;
import ir.mbbn.mytoll.domain.TollRequest;
import ir.mbbn.mytoll.repository.TollRequestRepository;
import ir.mbbn.mytoll.service.TollRequestService;

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

/**
 * Integration tests for the {@link TollRequestResource} REST controller.
 */
@SpringBootTest(classes = MyTollApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TollRequestResourceIT {

    private static final Integer DEFAULT_PLATE = 1;
    private static final Integer UPDATED_PLATE = 2;

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FROM_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FROM_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TO_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TO_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TollRequestRepository tollRequestRepository;

    @Autowired
    private TollRequestService tollRequestService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTollRequestMockMvc;

    private TollRequest tollRequest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TollRequest createEntity(EntityManager em) {
        TollRequest tollRequest = new TollRequest()
            .plate(DEFAULT_PLATE)
            .mobile(DEFAULT_MOBILE)
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE);
        return tollRequest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TollRequest createUpdatedEntity(EntityManager em) {
        TollRequest tollRequest = new TollRequest()
            .plate(UPDATED_PLATE)
            .mobile(UPDATED_MOBILE)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);
        return tollRequest;
    }

    @BeforeEach
    public void initTest() {
        tollRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createTollRequest() throws Exception {
        int databaseSizeBeforeCreate = tollRequestRepository.findAll().size();
        // Create the TollRequest
        restTollRequestMockMvc.perform(post("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tollRequest)))
            .andExpect(status().isCreated());

        // Validate the TollRequest in the database
        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeCreate + 1);
        TollRequest testTollRequest = tollRequestList.get(tollRequestList.size() - 1);
        assertThat(testTollRequest.getPlate()).isEqualTo(DEFAULT_PLATE);
        assertThat(testTollRequest.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testTollRequest.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testTollRequest.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createTollRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tollRequestRepository.findAll().size();

        // Create the TollRequest with an existing ID
        tollRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTollRequestMockMvc.perform(post("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tollRequest)))
            .andExpect(status().isBadRequest());

        // Validate the TollRequest in the database
        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkPlateIsRequired() throws Exception {
        int databaseSizeBeforeTest = tollRequestRepository.findAll().size();
        // set the field null
        tollRequest.setPlate(null);

        // Create the TollRequest, which fails.


        restTollRequestMockMvc.perform(post("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tollRequest)))
            .andExpect(status().isBadRequest());

        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMobileIsRequired() throws Exception {
        int databaseSizeBeforeTest = tollRequestRepository.findAll().size();
        // set the field null
        tollRequest.setMobile(null);

        // Create the TollRequest, which fails.


        restTollRequestMockMvc.perform(post("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tollRequest)))
            .andExpect(status().isBadRequest());

        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = tollRequestRepository.findAll().size();
        // set the field null
        tollRequest.setFromDate(null);

        // Create the TollRequest, which fails.


        restTollRequestMockMvc.perform(post("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tollRequest)))
            .andExpect(status().isBadRequest());

        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkToDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = tollRequestRepository.findAll().size();
        // set the field null
        tollRequest.setToDate(null);

        // Create the TollRequest, which fails.


        restTollRequestMockMvc.perform(post("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tollRequest)))
            .andExpect(status().isBadRequest());

        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTollRequests() throws Exception {
        // Initialize the database
        tollRequestRepository.saveAndFlush(tollRequest);

        // Get all the tollRequestList
        restTollRequestMockMvc.perform(get("/api/toll-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tollRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].plate").value(hasItem(DEFAULT_PLATE)))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE)))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(DEFAULT_TO_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTollRequest() throws Exception {
        // Initialize the database
        tollRequestRepository.saveAndFlush(tollRequest);

        // Get the tollRequest
        restTollRequestMockMvc.perform(get("/api/toll-requests/{id}", tollRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tollRequest.getId().intValue()))
            .andExpect(jsonPath("$.plate").value(DEFAULT_PLATE))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.toDate").value(DEFAULT_TO_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTollRequest() throws Exception {
        // Get the tollRequest
        restTollRequestMockMvc.perform(get("/api/toll-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTollRequest() throws Exception {
        // Initialize the database
        tollRequestService.save(tollRequest);

        int databaseSizeBeforeUpdate = tollRequestRepository.findAll().size();

        // Update the tollRequest
        TollRequest updatedTollRequest = tollRequestRepository.findById(tollRequest.getId()).get();
        // Disconnect from session so that the updates on updatedTollRequest are not directly saved in db
        em.detach(updatedTollRequest);
        updatedTollRequest
            .plate(UPDATED_PLATE)
            .mobile(UPDATED_MOBILE)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restTollRequestMockMvc.perform(put("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTollRequest)))
            .andExpect(status().isOk());

        // Validate the TollRequest in the database
        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeUpdate);
        TollRequest testTollRequest = tollRequestList.get(tollRequestList.size() - 1);
        assertThat(testTollRequest.getPlate()).isEqualTo(UPDATED_PLATE);
        assertThat(testTollRequest.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testTollRequest.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testTollRequest.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTollRequest() throws Exception {
        int databaseSizeBeforeUpdate = tollRequestRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTollRequestMockMvc.perform(put("/api/toll-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tollRequest)))
            .andExpect(status().isBadRequest());

        // Validate the TollRequest in the database
        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTollRequest() throws Exception {
        // Initialize the database
        tollRequestService.save(tollRequest);

        int databaseSizeBeforeDelete = tollRequestRepository.findAll().size();

        // Delete the tollRequest
        restTollRequestMockMvc.perform(delete("/api/toll-requests/{id}", tollRequest.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TollRequest> tollRequestList = tollRequestRepository.findAll();
        assertThat(tollRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
