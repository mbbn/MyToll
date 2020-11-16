package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.MyTollApp;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.repository.PayRequestRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static ir.mbbn.mytoll.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PayRequestResource} REST controller.
 */
@SpringBootTest(classes = MyTollApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PayRequestResourceIT {

    private static final String DEFAULT_TRACKING_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_NO = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NO = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_EXPIRATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EXPIRATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_SEND_SMS = false;
    private static final Boolean UPDATED_SEND_SMS = true;

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final String DEFAULT_CALL_BACK_SERVICE = "AAAAAAAAAA";
    private static final String UPDATED_CALL_BACK_SERVICE = "BBBBBBBBBB";

    @Autowired
    private PayRequestRepository payRequestRepository;

    @Mock
    private PayRequestRepository payRequestRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPayRequestMockMvc;

    private PayRequest payRequest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PayRequest createEntity(EntityManager em) {
        PayRequest payRequest = new PayRequest()
            .trackingId(DEFAULT_TRACKING_ID)
            .accountNo(DEFAULT_ACCOUNT_NO)
            .title(DEFAULT_TITLE)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .sendSms(DEFAULT_SEND_SMS)
            .amount(DEFAULT_AMOUNT)
            .callBackService(DEFAULT_CALL_BACK_SERVICE);
        return payRequest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PayRequest createUpdatedEntity(EntityManager em) {
        PayRequest payRequest = new PayRequest()
            .trackingId(UPDATED_TRACKING_ID)
            .accountNo(UPDATED_ACCOUNT_NO)
            .title(UPDATED_TITLE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .sendSms(UPDATED_SEND_SMS)
            .amount(UPDATED_AMOUNT)
            .callBackService(UPDATED_CALL_BACK_SERVICE);
        return payRequest;
    }

    @BeforeEach
    public void initTest() {
        payRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createPayRequest() throws Exception {
        int databaseSizeBeforeCreate = payRequestRepository.findAll().size();
        // Create the PayRequest
        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isCreated());

        // Validate the PayRequest in the database
        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeCreate + 1);
        PayRequest testPayRequest = payRequestList.get(payRequestList.size() - 1);
        assertThat(testPayRequest.getTrackingId()).isEqualTo(DEFAULT_TRACKING_ID);
        assertThat(testPayRequest.getAccountNo()).isEqualTo(DEFAULT_ACCOUNT_NO);
        assertThat(testPayRequest.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPayRequest.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testPayRequest.isSendSms()).isEqualTo(DEFAULT_SEND_SMS);
        assertThat(testPayRequest.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testPayRequest.getCallBackService()).isEqualTo(DEFAULT_CALL_BACK_SERVICE);
    }

    @Test
    @Transactional
    public void createPayRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = payRequestRepository.findAll().size();

        // Create the PayRequest with an existing ID
        payRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        // Validate the PayRequest in the database
        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTrackingIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setTrackingId(null);

        // Create the PayRequest, which fails.


        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAccountNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setAccountNo(null);

        // Create the PayRequest, which fails.


        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setTitle(null);

        // Create the PayRequest, which fails.


        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExpirationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setExpirationDate(null);

        // Create the PayRequest, which fails.


        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSendSmsIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setSendSms(null);

        // Create the PayRequest, which fails.


        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setAmount(null);

        // Create the PayRequest, which fails.


        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCallBackServiceIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setCallBackService(null);

        // Create the PayRequest, which fails.


        restPayRequestMockMvc.perform(post("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPayRequests() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList
        restPayRequestMockMvc.perform(get("/api/pay-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(payRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].trackingId").value(hasItem(DEFAULT_TRACKING_ID)))
            .andExpect(jsonPath("$.[*].accountNo").value(hasItem(DEFAULT_ACCOUNT_NO)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(sameInstant(DEFAULT_EXPIRATION_DATE))))
            .andExpect(jsonPath("$.[*].sendSms").value(hasItem(DEFAULT_SEND_SMS.booleanValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].callBackService").value(hasItem(DEFAULT_CALL_BACK_SERVICE)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPayRequestsWithEagerRelationshipsIsEnabled() throws Exception {
        when(payRequestRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPayRequestMockMvc.perform(get("/api/pay-requests?eagerload=true"))
            .andExpect(status().isOk());

        verify(payRequestRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPayRequestsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(payRequestRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPayRequestMockMvc.perform(get("/api/pay-requests?eagerload=true"))
            .andExpect(status().isOk());

        verify(payRequestRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPayRequest() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get the payRequest
        restPayRequestMockMvc.perform(get("/api/pay-requests/{id}", payRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(payRequest.getId().intValue()))
            .andExpect(jsonPath("$.trackingId").value(DEFAULT_TRACKING_ID))
            .andExpect(jsonPath("$.accountNo").value(DEFAULT_ACCOUNT_NO))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.expirationDate").value(sameInstant(DEFAULT_EXPIRATION_DATE)))
            .andExpect(jsonPath("$.sendSms").value(DEFAULT_SEND_SMS.booleanValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.callBackService").value(DEFAULT_CALL_BACK_SERVICE));
    }
    @Test
    @Transactional
    public void getNonExistingPayRequest() throws Exception {
        // Get the payRequest
        restPayRequestMockMvc.perform(get("/api/pay-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePayRequest() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        int databaseSizeBeforeUpdate = payRequestRepository.findAll().size();

        // Update the payRequest
        PayRequest updatedPayRequest = payRequestRepository.findById(payRequest.getId()).get();
        // Disconnect from session so that the updates on updatedPayRequest are not directly saved in db
        em.detach(updatedPayRequest);
        updatedPayRequest
            .trackingId(UPDATED_TRACKING_ID)
            .accountNo(UPDATED_ACCOUNT_NO)
            .title(UPDATED_TITLE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .sendSms(UPDATED_SEND_SMS)
            .amount(UPDATED_AMOUNT)
            .callBackService(UPDATED_CALL_BACK_SERVICE);

        restPayRequestMockMvc.perform(put("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPayRequest)))
            .andExpect(status().isOk());

        // Validate the PayRequest in the database
        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeUpdate);
        PayRequest testPayRequest = payRequestList.get(payRequestList.size() - 1);
        assertThat(testPayRequest.getTrackingId()).isEqualTo(UPDATED_TRACKING_ID);
        assertThat(testPayRequest.getAccountNo()).isEqualTo(UPDATED_ACCOUNT_NO);
        assertThat(testPayRequest.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPayRequest.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testPayRequest.isSendSms()).isEqualTo(UPDATED_SEND_SMS);
        assertThat(testPayRequest.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPayRequest.getCallBackService()).isEqualTo(UPDATED_CALL_BACK_SERVICE);
    }

    @Test
    @Transactional
    public void updateNonExistingPayRequest() throws Exception {
        int databaseSizeBeforeUpdate = payRequestRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPayRequestMockMvc.perform(put("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payRequest)))
            .andExpect(status().isBadRequest());

        // Validate the PayRequest in the database
        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePayRequest() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        int databaseSizeBeforeDelete = payRequestRepository.findAll().size();

        // Delete the payRequest
        restPayRequestMockMvc.perform(delete("/api/pay-requests/{id}", payRequest.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
