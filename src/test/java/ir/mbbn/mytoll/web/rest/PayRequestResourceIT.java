package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.MyTollApp;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.domain.Customer;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import ir.mbbn.mytoll.service.PayRequestService;
import ir.mbbn.mytoll.service.dto.PayRequestCriteria;
import ir.mbbn.mytoll.service.PayRequestQueryService;

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
import java.time.LocalDate;
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

    private static final ZonedDateTime DEFAULT_REQUEST_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_REQUEST_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_REQUEST_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_TRACKING_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_ID = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_ID = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_NO = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NO = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_EXPIRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRATION_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_EXPIRATION_DATE = LocalDate.ofEpochDay(-1L);

    private static final Boolean DEFAULT_SEND_SMS = false;
    private static final Boolean UPDATED_SEND_SMS = true;

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;
    private static final Integer SMALLER_AMOUNT = 1 - 1;

    private static final String DEFAULT_CALL_BACK_SERVICE = "AAAAAAAAAA";
    private static final String UPDATED_CALL_BACK_SERVICE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PAID = false;
    private static final Boolean UPDATED_PAID = true;

    private static final ZonedDateTime DEFAULT_PAYMENT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAYMENT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_PAYMENT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_BANK_TRACKING_ID = "AAAAAAAAAA";
    private static final String UPDATED_BANK_TRACKING_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PAYMENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_ID = "BBBBBBBBBB";

    @Autowired
    private PayRequestRepository payRequestRepository;

    @Mock
    private PayRequestRepository payRequestRepositoryMock;

    @Mock
    private PayRequestService payRequestServiceMock;

    @Autowired
    private PayRequestService payRequestService;

    @Autowired
    private PayRequestQueryService payRequestQueryService;

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
            .requestTime(DEFAULT_REQUEST_TIME)
            .trackingId(DEFAULT_TRACKING_ID)
            .shortId(DEFAULT_SHORT_ID)
            .accountNo(DEFAULT_ACCOUNT_NO)
            .title(DEFAULT_TITLE)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .sendSms(DEFAULT_SEND_SMS)
            .amount(DEFAULT_AMOUNT)
            .callBackService(DEFAULT_CALL_BACK_SERVICE)
            .paid(DEFAULT_PAID)
            .paymentDate(DEFAULT_PAYMENT_DATE)
            .bankTrackingId(DEFAULT_BANK_TRACKING_ID)
            .paymentId(DEFAULT_PAYMENT_ID);
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
            .requestTime(UPDATED_REQUEST_TIME)
            .trackingId(UPDATED_TRACKING_ID)
            .shortId(UPDATED_SHORT_ID)
            .accountNo(UPDATED_ACCOUNT_NO)
            .title(UPDATED_TITLE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .sendSms(UPDATED_SEND_SMS)
            .amount(UPDATED_AMOUNT)
            .callBackService(UPDATED_CALL_BACK_SERVICE)
            .paid(UPDATED_PAID)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .bankTrackingId(UPDATED_BANK_TRACKING_ID)
            .paymentId(UPDATED_PAYMENT_ID);
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
        assertThat(testPayRequest.getRequestTime()).isEqualTo(DEFAULT_REQUEST_TIME);
        assertThat(testPayRequest.getTrackingId()).isEqualTo(DEFAULT_TRACKING_ID);
        assertThat(testPayRequest.getShortId()).isEqualTo(DEFAULT_SHORT_ID);
        assertThat(testPayRequest.getAccountNo()).isEqualTo(DEFAULT_ACCOUNT_NO);
        assertThat(testPayRequest.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPayRequest.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testPayRequest.isSendSms()).isEqualTo(DEFAULT_SEND_SMS);
        assertThat(testPayRequest.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testPayRequest.getCallBackService()).isEqualTo(DEFAULT_CALL_BACK_SERVICE);
        assertThat(testPayRequest.isPaid()).isEqualTo(DEFAULT_PAID);
        assertThat(testPayRequest.getPaymentDate()).isEqualTo(DEFAULT_PAYMENT_DATE);
        assertThat(testPayRequest.getBankTrackingId()).isEqualTo(DEFAULT_BANK_TRACKING_ID);
        assertThat(testPayRequest.getPaymentId()).isEqualTo(DEFAULT_PAYMENT_ID);
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
    public void checkRequestTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setRequestTime(null);

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
    public void checkShortIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = payRequestRepository.findAll().size();
        // set the field null
        payRequest.setShortId(null);

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
            .andExpect(jsonPath("$.[*].requestTime").value(hasItem(sameInstant(DEFAULT_REQUEST_TIME))))
            .andExpect(jsonPath("$.[*].trackingId").value(hasItem(DEFAULT_TRACKING_ID)))
            .andExpect(jsonPath("$.[*].shortId").value(hasItem(DEFAULT_SHORT_ID)))
            .andExpect(jsonPath("$.[*].accountNo").value(hasItem(DEFAULT_ACCOUNT_NO)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].sendSms").value(hasItem(DEFAULT_SEND_SMS.booleanValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].callBackService").value(hasItem(DEFAULT_CALL_BACK_SERVICE)))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.booleanValue())))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(sameInstant(DEFAULT_PAYMENT_DATE))))
            .andExpect(jsonPath("$.[*].bankTrackingId").value(hasItem(DEFAULT_BANK_TRACKING_ID)))
            .andExpect(jsonPath("$.[*].paymentId").value(hasItem(DEFAULT_PAYMENT_ID)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPayRequestsWithEagerRelationshipsIsEnabled() throws Exception {
        when(payRequestServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPayRequestMockMvc.perform(get("/api/pay-requests?eagerload=true"))
            .andExpect(status().isOk());

        verify(payRequestServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPayRequestsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(payRequestServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPayRequestMockMvc.perform(get("/api/pay-requests?eagerload=true"))
            .andExpect(status().isOk());

        verify(payRequestServiceMock, times(1)).findAllWithEagerRelationships(any());
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
            .andExpect(jsonPath("$.requestTime").value(sameInstant(DEFAULT_REQUEST_TIME)))
            .andExpect(jsonPath("$.trackingId").value(DEFAULT_TRACKING_ID))
            .andExpect(jsonPath("$.shortId").value(DEFAULT_SHORT_ID))
            .andExpect(jsonPath("$.accountNo").value(DEFAULT_ACCOUNT_NO))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.expirationDate").value(DEFAULT_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.sendSms").value(DEFAULT_SEND_SMS.booleanValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.callBackService").value(DEFAULT_CALL_BACK_SERVICE))
            .andExpect(jsonPath("$.paid").value(DEFAULT_PAID.booleanValue()))
            .andExpect(jsonPath("$.paymentDate").value(sameInstant(DEFAULT_PAYMENT_DATE)))
            .andExpect(jsonPath("$.bankTrackingId").value(DEFAULT_BANK_TRACKING_ID))
            .andExpect(jsonPath("$.paymentId").value(DEFAULT_PAYMENT_ID));
    }


    @Test
    @Transactional
    public void getPayRequestsByIdFiltering() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        Long id = payRequest.getId();

        defaultPayRequestShouldBeFound("id.equals=" + id);
        defaultPayRequestShouldNotBeFound("id.notEquals=" + id);

        defaultPayRequestShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPayRequestShouldNotBeFound("id.greaterThan=" + id);

        defaultPayRequestShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPayRequestShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime equals to DEFAULT_REQUEST_TIME
        defaultPayRequestShouldBeFound("requestTime.equals=" + DEFAULT_REQUEST_TIME);

        // Get all the payRequestList where requestTime equals to UPDATED_REQUEST_TIME
        defaultPayRequestShouldNotBeFound("requestTime.equals=" + UPDATED_REQUEST_TIME);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime not equals to DEFAULT_REQUEST_TIME
        defaultPayRequestShouldNotBeFound("requestTime.notEquals=" + DEFAULT_REQUEST_TIME);

        // Get all the payRequestList where requestTime not equals to UPDATED_REQUEST_TIME
        defaultPayRequestShouldBeFound("requestTime.notEquals=" + UPDATED_REQUEST_TIME);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime in DEFAULT_REQUEST_TIME or UPDATED_REQUEST_TIME
        defaultPayRequestShouldBeFound("requestTime.in=" + DEFAULT_REQUEST_TIME + "," + UPDATED_REQUEST_TIME);

        // Get all the payRequestList where requestTime equals to UPDATED_REQUEST_TIME
        defaultPayRequestShouldNotBeFound("requestTime.in=" + UPDATED_REQUEST_TIME);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime is not null
        defaultPayRequestShouldBeFound("requestTime.specified=true");

        // Get all the payRequestList where requestTime is null
        defaultPayRequestShouldNotBeFound("requestTime.specified=false");
    }

    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime is greater than or equal to DEFAULT_REQUEST_TIME
        defaultPayRequestShouldBeFound("requestTime.greaterThanOrEqual=" + DEFAULT_REQUEST_TIME);

        // Get all the payRequestList where requestTime is greater than or equal to UPDATED_REQUEST_TIME
        defaultPayRequestShouldNotBeFound("requestTime.greaterThanOrEqual=" + UPDATED_REQUEST_TIME);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime is less than or equal to DEFAULT_REQUEST_TIME
        defaultPayRequestShouldBeFound("requestTime.lessThanOrEqual=" + DEFAULT_REQUEST_TIME);

        // Get all the payRequestList where requestTime is less than or equal to SMALLER_REQUEST_TIME
        defaultPayRequestShouldNotBeFound("requestTime.lessThanOrEqual=" + SMALLER_REQUEST_TIME);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsLessThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime is less than DEFAULT_REQUEST_TIME
        defaultPayRequestShouldNotBeFound("requestTime.lessThan=" + DEFAULT_REQUEST_TIME);

        // Get all the payRequestList where requestTime is less than UPDATED_REQUEST_TIME
        defaultPayRequestShouldBeFound("requestTime.lessThan=" + UPDATED_REQUEST_TIME);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByRequestTimeIsGreaterThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where requestTime is greater than DEFAULT_REQUEST_TIME
        defaultPayRequestShouldNotBeFound("requestTime.greaterThan=" + DEFAULT_REQUEST_TIME);

        // Get all the payRequestList where requestTime is greater than SMALLER_REQUEST_TIME
        defaultPayRequestShouldBeFound("requestTime.greaterThan=" + SMALLER_REQUEST_TIME);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByTrackingIdIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where trackingId equals to DEFAULT_TRACKING_ID
        defaultPayRequestShouldBeFound("trackingId.equals=" + DEFAULT_TRACKING_ID);

        // Get all the payRequestList where trackingId equals to UPDATED_TRACKING_ID
        defaultPayRequestShouldNotBeFound("trackingId.equals=" + UPDATED_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTrackingIdIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where trackingId not equals to DEFAULT_TRACKING_ID
        defaultPayRequestShouldNotBeFound("trackingId.notEquals=" + DEFAULT_TRACKING_ID);

        // Get all the payRequestList where trackingId not equals to UPDATED_TRACKING_ID
        defaultPayRequestShouldBeFound("trackingId.notEquals=" + UPDATED_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTrackingIdIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where trackingId in DEFAULT_TRACKING_ID or UPDATED_TRACKING_ID
        defaultPayRequestShouldBeFound("trackingId.in=" + DEFAULT_TRACKING_ID + "," + UPDATED_TRACKING_ID);

        // Get all the payRequestList where trackingId equals to UPDATED_TRACKING_ID
        defaultPayRequestShouldNotBeFound("trackingId.in=" + UPDATED_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTrackingIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where trackingId is not null
        defaultPayRequestShouldBeFound("trackingId.specified=true");

        // Get all the payRequestList where trackingId is null
        defaultPayRequestShouldNotBeFound("trackingId.specified=false");
    }
                @Test
    @Transactional
    public void getAllPayRequestsByTrackingIdContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where trackingId contains DEFAULT_TRACKING_ID
        defaultPayRequestShouldBeFound("trackingId.contains=" + DEFAULT_TRACKING_ID);

        // Get all the payRequestList where trackingId contains UPDATED_TRACKING_ID
        defaultPayRequestShouldNotBeFound("trackingId.contains=" + UPDATED_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTrackingIdNotContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where trackingId does not contain DEFAULT_TRACKING_ID
        defaultPayRequestShouldNotBeFound("trackingId.doesNotContain=" + DEFAULT_TRACKING_ID);

        // Get all the payRequestList where trackingId does not contain UPDATED_TRACKING_ID
        defaultPayRequestShouldBeFound("trackingId.doesNotContain=" + UPDATED_TRACKING_ID);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByShortIdIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where shortId equals to DEFAULT_SHORT_ID
        defaultPayRequestShouldBeFound("shortId.equals=" + DEFAULT_SHORT_ID);

        // Get all the payRequestList where shortId equals to UPDATED_SHORT_ID
        defaultPayRequestShouldNotBeFound("shortId.equals=" + UPDATED_SHORT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByShortIdIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where shortId not equals to DEFAULT_SHORT_ID
        defaultPayRequestShouldNotBeFound("shortId.notEquals=" + DEFAULT_SHORT_ID);

        // Get all the payRequestList where shortId not equals to UPDATED_SHORT_ID
        defaultPayRequestShouldBeFound("shortId.notEquals=" + UPDATED_SHORT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByShortIdIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where shortId in DEFAULT_SHORT_ID or UPDATED_SHORT_ID
        defaultPayRequestShouldBeFound("shortId.in=" + DEFAULT_SHORT_ID + "," + UPDATED_SHORT_ID);

        // Get all the payRequestList where shortId equals to UPDATED_SHORT_ID
        defaultPayRequestShouldNotBeFound("shortId.in=" + UPDATED_SHORT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByShortIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where shortId is not null
        defaultPayRequestShouldBeFound("shortId.specified=true");

        // Get all the payRequestList where shortId is null
        defaultPayRequestShouldNotBeFound("shortId.specified=false");
    }
                @Test
    @Transactional
    public void getAllPayRequestsByShortIdContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where shortId contains DEFAULT_SHORT_ID
        defaultPayRequestShouldBeFound("shortId.contains=" + DEFAULT_SHORT_ID);

        // Get all the payRequestList where shortId contains UPDATED_SHORT_ID
        defaultPayRequestShouldNotBeFound("shortId.contains=" + UPDATED_SHORT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByShortIdNotContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where shortId does not contain DEFAULT_SHORT_ID
        defaultPayRequestShouldNotBeFound("shortId.doesNotContain=" + DEFAULT_SHORT_ID);

        // Get all the payRequestList where shortId does not contain UPDATED_SHORT_ID
        defaultPayRequestShouldBeFound("shortId.doesNotContain=" + UPDATED_SHORT_ID);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByAccountNoIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where accountNo equals to DEFAULT_ACCOUNT_NO
        defaultPayRequestShouldBeFound("accountNo.equals=" + DEFAULT_ACCOUNT_NO);

        // Get all the payRequestList where accountNo equals to UPDATED_ACCOUNT_NO
        defaultPayRequestShouldNotBeFound("accountNo.equals=" + UPDATED_ACCOUNT_NO);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAccountNoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where accountNo not equals to DEFAULT_ACCOUNT_NO
        defaultPayRequestShouldNotBeFound("accountNo.notEquals=" + DEFAULT_ACCOUNT_NO);

        // Get all the payRequestList where accountNo not equals to UPDATED_ACCOUNT_NO
        defaultPayRequestShouldBeFound("accountNo.notEquals=" + UPDATED_ACCOUNT_NO);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAccountNoIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where accountNo in DEFAULT_ACCOUNT_NO or UPDATED_ACCOUNT_NO
        defaultPayRequestShouldBeFound("accountNo.in=" + DEFAULT_ACCOUNT_NO + "," + UPDATED_ACCOUNT_NO);

        // Get all the payRequestList where accountNo equals to UPDATED_ACCOUNT_NO
        defaultPayRequestShouldNotBeFound("accountNo.in=" + UPDATED_ACCOUNT_NO);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAccountNoIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where accountNo is not null
        defaultPayRequestShouldBeFound("accountNo.specified=true");

        // Get all the payRequestList where accountNo is null
        defaultPayRequestShouldNotBeFound("accountNo.specified=false");
    }
                @Test
    @Transactional
    public void getAllPayRequestsByAccountNoContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where accountNo contains DEFAULT_ACCOUNT_NO
        defaultPayRequestShouldBeFound("accountNo.contains=" + DEFAULT_ACCOUNT_NO);

        // Get all the payRequestList where accountNo contains UPDATED_ACCOUNT_NO
        defaultPayRequestShouldNotBeFound("accountNo.contains=" + UPDATED_ACCOUNT_NO);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAccountNoNotContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where accountNo does not contain DEFAULT_ACCOUNT_NO
        defaultPayRequestShouldNotBeFound("accountNo.doesNotContain=" + DEFAULT_ACCOUNT_NO);

        // Get all the payRequestList where accountNo does not contain UPDATED_ACCOUNT_NO
        defaultPayRequestShouldBeFound("accountNo.doesNotContain=" + UPDATED_ACCOUNT_NO);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByTitleIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where title equals to DEFAULT_TITLE
        defaultPayRequestShouldBeFound("title.equals=" + DEFAULT_TITLE);

        // Get all the payRequestList where title equals to UPDATED_TITLE
        defaultPayRequestShouldNotBeFound("title.equals=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTitleIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where title not equals to DEFAULT_TITLE
        defaultPayRequestShouldNotBeFound("title.notEquals=" + DEFAULT_TITLE);

        // Get all the payRequestList where title not equals to UPDATED_TITLE
        defaultPayRequestShouldBeFound("title.notEquals=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTitleIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where title in DEFAULT_TITLE or UPDATED_TITLE
        defaultPayRequestShouldBeFound("title.in=" + DEFAULT_TITLE + "," + UPDATED_TITLE);

        // Get all the payRequestList where title equals to UPDATED_TITLE
        defaultPayRequestShouldNotBeFound("title.in=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTitleIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where title is not null
        defaultPayRequestShouldBeFound("title.specified=true");

        // Get all the payRequestList where title is null
        defaultPayRequestShouldNotBeFound("title.specified=false");
    }
                @Test
    @Transactional
    public void getAllPayRequestsByTitleContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where title contains DEFAULT_TITLE
        defaultPayRequestShouldBeFound("title.contains=" + DEFAULT_TITLE);

        // Get all the payRequestList where title contains UPDATED_TITLE
        defaultPayRequestShouldNotBeFound("title.contains=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByTitleNotContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where title does not contain DEFAULT_TITLE
        defaultPayRequestShouldNotBeFound("title.doesNotContain=" + DEFAULT_TITLE);

        // Get all the payRequestList where title does not contain UPDATED_TITLE
        defaultPayRequestShouldBeFound("title.doesNotContain=" + UPDATED_TITLE);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate equals to DEFAULT_EXPIRATION_DATE
        defaultPayRequestShouldBeFound("expirationDate.equals=" + DEFAULT_EXPIRATION_DATE);

        // Get all the payRequestList where expirationDate equals to UPDATED_EXPIRATION_DATE
        defaultPayRequestShouldNotBeFound("expirationDate.equals=" + UPDATED_EXPIRATION_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate not equals to DEFAULT_EXPIRATION_DATE
        defaultPayRequestShouldNotBeFound("expirationDate.notEquals=" + DEFAULT_EXPIRATION_DATE);

        // Get all the payRequestList where expirationDate not equals to UPDATED_EXPIRATION_DATE
        defaultPayRequestShouldBeFound("expirationDate.notEquals=" + UPDATED_EXPIRATION_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate in DEFAULT_EXPIRATION_DATE or UPDATED_EXPIRATION_DATE
        defaultPayRequestShouldBeFound("expirationDate.in=" + DEFAULT_EXPIRATION_DATE + "," + UPDATED_EXPIRATION_DATE);

        // Get all the payRequestList where expirationDate equals to UPDATED_EXPIRATION_DATE
        defaultPayRequestShouldNotBeFound("expirationDate.in=" + UPDATED_EXPIRATION_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate is not null
        defaultPayRequestShouldBeFound("expirationDate.specified=true");

        // Get all the payRequestList where expirationDate is null
        defaultPayRequestShouldNotBeFound("expirationDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate is greater than or equal to DEFAULT_EXPIRATION_DATE
        defaultPayRequestShouldBeFound("expirationDate.greaterThanOrEqual=" + DEFAULT_EXPIRATION_DATE);

        // Get all the payRequestList where expirationDate is greater than or equal to UPDATED_EXPIRATION_DATE
        defaultPayRequestShouldNotBeFound("expirationDate.greaterThanOrEqual=" + UPDATED_EXPIRATION_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate is less than or equal to DEFAULT_EXPIRATION_DATE
        defaultPayRequestShouldBeFound("expirationDate.lessThanOrEqual=" + DEFAULT_EXPIRATION_DATE);

        // Get all the payRequestList where expirationDate is less than or equal to SMALLER_EXPIRATION_DATE
        defaultPayRequestShouldNotBeFound("expirationDate.lessThanOrEqual=" + SMALLER_EXPIRATION_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsLessThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate is less than DEFAULT_EXPIRATION_DATE
        defaultPayRequestShouldNotBeFound("expirationDate.lessThan=" + DEFAULT_EXPIRATION_DATE);

        // Get all the payRequestList where expirationDate is less than UPDATED_EXPIRATION_DATE
        defaultPayRequestShouldBeFound("expirationDate.lessThan=" + UPDATED_EXPIRATION_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByExpirationDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where expirationDate is greater than DEFAULT_EXPIRATION_DATE
        defaultPayRequestShouldNotBeFound("expirationDate.greaterThan=" + DEFAULT_EXPIRATION_DATE);

        // Get all the payRequestList where expirationDate is greater than SMALLER_EXPIRATION_DATE
        defaultPayRequestShouldBeFound("expirationDate.greaterThan=" + SMALLER_EXPIRATION_DATE);
    }


    @Test
    @Transactional
    public void getAllPayRequestsBySendSmsIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where sendSms equals to DEFAULT_SEND_SMS
        defaultPayRequestShouldBeFound("sendSms.equals=" + DEFAULT_SEND_SMS);

        // Get all the payRequestList where sendSms equals to UPDATED_SEND_SMS
        defaultPayRequestShouldNotBeFound("sendSms.equals=" + UPDATED_SEND_SMS);
    }

    @Test
    @Transactional
    public void getAllPayRequestsBySendSmsIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where sendSms not equals to DEFAULT_SEND_SMS
        defaultPayRequestShouldNotBeFound("sendSms.notEquals=" + DEFAULT_SEND_SMS);

        // Get all the payRequestList where sendSms not equals to UPDATED_SEND_SMS
        defaultPayRequestShouldBeFound("sendSms.notEquals=" + UPDATED_SEND_SMS);
    }

    @Test
    @Transactional
    public void getAllPayRequestsBySendSmsIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where sendSms in DEFAULT_SEND_SMS or UPDATED_SEND_SMS
        defaultPayRequestShouldBeFound("sendSms.in=" + DEFAULT_SEND_SMS + "," + UPDATED_SEND_SMS);

        // Get all the payRequestList where sendSms equals to UPDATED_SEND_SMS
        defaultPayRequestShouldNotBeFound("sendSms.in=" + UPDATED_SEND_SMS);
    }

    @Test
    @Transactional
    public void getAllPayRequestsBySendSmsIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where sendSms is not null
        defaultPayRequestShouldBeFound("sendSms.specified=true");

        // Get all the payRequestList where sendSms is null
        defaultPayRequestShouldNotBeFound("sendSms.specified=false");
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount equals to DEFAULT_AMOUNT
        defaultPayRequestShouldBeFound("amount.equals=" + DEFAULT_AMOUNT);

        // Get all the payRequestList where amount equals to UPDATED_AMOUNT
        defaultPayRequestShouldNotBeFound("amount.equals=" + UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount not equals to DEFAULT_AMOUNT
        defaultPayRequestShouldNotBeFound("amount.notEquals=" + DEFAULT_AMOUNT);

        // Get all the payRequestList where amount not equals to UPDATED_AMOUNT
        defaultPayRequestShouldBeFound("amount.notEquals=" + UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount in DEFAULT_AMOUNT or UPDATED_AMOUNT
        defaultPayRequestShouldBeFound("amount.in=" + DEFAULT_AMOUNT + "," + UPDATED_AMOUNT);

        // Get all the payRequestList where amount equals to UPDATED_AMOUNT
        defaultPayRequestShouldNotBeFound("amount.in=" + UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount is not null
        defaultPayRequestShouldBeFound("amount.specified=true");

        // Get all the payRequestList where amount is null
        defaultPayRequestShouldNotBeFound("amount.specified=false");
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount is greater than or equal to DEFAULT_AMOUNT
        defaultPayRequestShouldBeFound("amount.greaterThanOrEqual=" + DEFAULT_AMOUNT);

        // Get all the payRequestList where amount is greater than or equal to UPDATED_AMOUNT
        defaultPayRequestShouldNotBeFound("amount.greaterThanOrEqual=" + UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount is less than or equal to DEFAULT_AMOUNT
        defaultPayRequestShouldBeFound("amount.lessThanOrEqual=" + DEFAULT_AMOUNT);

        // Get all the payRequestList where amount is less than or equal to SMALLER_AMOUNT
        defaultPayRequestShouldNotBeFound("amount.lessThanOrEqual=" + SMALLER_AMOUNT);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsLessThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount is less than DEFAULT_AMOUNT
        defaultPayRequestShouldNotBeFound("amount.lessThan=" + DEFAULT_AMOUNT);

        // Get all the payRequestList where amount is less than UPDATED_AMOUNT
        defaultPayRequestShouldBeFound("amount.lessThan=" + UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByAmountIsGreaterThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where amount is greater than DEFAULT_AMOUNT
        defaultPayRequestShouldNotBeFound("amount.greaterThan=" + DEFAULT_AMOUNT);

        // Get all the payRequestList where amount is greater than SMALLER_AMOUNT
        defaultPayRequestShouldBeFound("amount.greaterThan=" + SMALLER_AMOUNT);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByCallBackServiceIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where callBackService equals to DEFAULT_CALL_BACK_SERVICE
        defaultPayRequestShouldBeFound("callBackService.equals=" + DEFAULT_CALL_BACK_SERVICE);

        // Get all the payRequestList where callBackService equals to UPDATED_CALL_BACK_SERVICE
        defaultPayRequestShouldNotBeFound("callBackService.equals=" + UPDATED_CALL_BACK_SERVICE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByCallBackServiceIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where callBackService not equals to DEFAULT_CALL_BACK_SERVICE
        defaultPayRequestShouldNotBeFound("callBackService.notEquals=" + DEFAULT_CALL_BACK_SERVICE);

        // Get all the payRequestList where callBackService not equals to UPDATED_CALL_BACK_SERVICE
        defaultPayRequestShouldBeFound("callBackService.notEquals=" + UPDATED_CALL_BACK_SERVICE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByCallBackServiceIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where callBackService in DEFAULT_CALL_BACK_SERVICE or UPDATED_CALL_BACK_SERVICE
        defaultPayRequestShouldBeFound("callBackService.in=" + DEFAULT_CALL_BACK_SERVICE + "," + UPDATED_CALL_BACK_SERVICE);

        // Get all the payRequestList where callBackService equals to UPDATED_CALL_BACK_SERVICE
        defaultPayRequestShouldNotBeFound("callBackService.in=" + UPDATED_CALL_BACK_SERVICE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByCallBackServiceIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where callBackService is not null
        defaultPayRequestShouldBeFound("callBackService.specified=true");

        // Get all the payRequestList where callBackService is null
        defaultPayRequestShouldNotBeFound("callBackService.specified=false");
    }
                @Test
    @Transactional
    public void getAllPayRequestsByCallBackServiceContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where callBackService contains DEFAULT_CALL_BACK_SERVICE
        defaultPayRequestShouldBeFound("callBackService.contains=" + DEFAULT_CALL_BACK_SERVICE);

        // Get all the payRequestList where callBackService contains UPDATED_CALL_BACK_SERVICE
        defaultPayRequestShouldNotBeFound("callBackService.contains=" + UPDATED_CALL_BACK_SERVICE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByCallBackServiceNotContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where callBackService does not contain DEFAULT_CALL_BACK_SERVICE
        defaultPayRequestShouldNotBeFound("callBackService.doesNotContain=" + DEFAULT_CALL_BACK_SERVICE);

        // Get all the payRequestList where callBackService does not contain UPDATED_CALL_BACK_SERVICE
        defaultPayRequestShouldBeFound("callBackService.doesNotContain=" + UPDATED_CALL_BACK_SERVICE);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByPaidIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paid equals to DEFAULT_PAID
        defaultPayRequestShouldBeFound("paid.equals=" + DEFAULT_PAID);

        // Get all the payRequestList where paid equals to UPDATED_PAID
        defaultPayRequestShouldNotBeFound("paid.equals=" + UPDATED_PAID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaidIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paid not equals to DEFAULT_PAID
        defaultPayRequestShouldNotBeFound("paid.notEquals=" + DEFAULT_PAID);

        // Get all the payRequestList where paid not equals to UPDATED_PAID
        defaultPayRequestShouldBeFound("paid.notEquals=" + UPDATED_PAID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaidIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paid in DEFAULT_PAID or UPDATED_PAID
        defaultPayRequestShouldBeFound("paid.in=" + DEFAULT_PAID + "," + UPDATED_PAID);

        // Get all the payRequestList where paid equals to UPDATED_PAID
        defaultPayRequestShouldNotBeFound("paid.in=" + UPDATED_PAID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaidIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paid is not null
        defaultPayRequestShouldBeFound("paid.specified=true");

        // Get all the payRequestList where paid is null
        defaultPayRequestShouldNotBeFound("paid.specified=false");
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate equals to DEFAULT_PAYMENT_DATE
        defaultPayRequestShouldBeFound("paymentDate.equals=" + DEFAULT_PAYMENT_DATE);

        // Get all the payRequestList where paymentDate equals to UPDATED_PAYMENT_DATE
        defaultPayRequestShouldNotBeFound("paymentDate.equals=" + UPDATED_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate not equals to DEFAULT_PAYMENT_DATE
        defaultPayRequestShouldNotBeFound("paymentDate.notEquals=" + DEFAULT_PAYMENT_DATE);

        // Get all the payRequestList where paymentDate not equals to UPDATED_PAYMENT_DATE
        defaultPayRequestShouldBeFound("paymentDate.notEquals=" + UPDATED_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate in DEFAULT_PAYMENT_DATE or UPDATED_PAYMENT_DATE
        defaultPayRequestShouldBeFound("paymentDate.in=" + DEFAULT_PAYMENT_DATE + "," + UPDATED_PAYMENT_DATE);

        // Get all the payRequestList where paymentDate equals to UPDATED_PAYMENT_DATE
        defaultPayRequestShouldNotBeFound("paymentDate.in=" + UPDATED_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate is not null
        defaultPayRequestShouldBeFound("paymentDate.specified=true");

        // Get all the payRequestList where paymentDate is null
        defaultPayRequestShouldNotBeFound("paymentDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate is greater than or equal to DEFAULT_PAYMENT_DATE
        defaultPayRequestShouldBeFound("paymentDate.greaterThanOrEqual=" + DEFAULT_PAYMENT_DATE);

        // Get all the payRequestList where paymentDate is greater than or equal to UPDATED_PAYMENT_DATE
        defaultPayRequestShouldNotBeFound("paymentDate.greaterThanOrEqual=" + UPDATED_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate is less than or equal to DEFAULT_PAYMENT_DATE
        defaultPayRequestShouldBeFound("paymentDate.lessThanOrEqual=" + DEFAULT_PAYMENT_DATE);

        // Get all the payRequestList where paymentDate is less than or equal to SMALLER_PAYMENT_DATE
        defaultPayRequestShouldNotBeFound("paymentDate.lessThanOrEqual=" + SMALLER_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsLessThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate is less than DEFAULT_PAYMENT_DATE
        defaultPayRequestShouldNotBeFound("paymentDate.lessThan=" + DEFAULT_PAYMENT_DATE);

        // Get all the payRequestList where paymentDate is less than UPDATED_PAYMENT_DATE
        defaultPayRequestShouldBeFound("paymentDate.lessThan=" + UPDATED_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentDate is greater than DEFAULT_PAYMENT_DATE
        defaultPayRequestShouldNotBeFound("paymentDate.greaterThan=" + DEFAULT_PAYMENT_DATE);

        // Get all the payRequestList where paymentDate is greater than SMALLER_PAYMENT_DATE
        defaultPayRequestShouldBeFound("paymentDate.greaterThan=" + SMALLER_PAYMENT_DATE);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByBankTrackingIdIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where bankTrackingId equals to DEFAULT_BANK_TRACKING_ID
        defaultPayRequestShouldBeFound("bankTrackingId.equals=" + DEFAULT_BANK_TRACKING_ID);

        // Get all the payRequestList where bankTrackingId equals to UPDATED_BANK_TRACKING_ID
        defaultPayRequestShouldNotBeFound("bankTrackingId.equals=" + UPDATED_BANK_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByBankTrackingIdIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where bankTrackingId not equals to DEFAULT_BANK_TRACKING_ID
        defaultPayRequestShouldNotBeFound("bankTrackingId.notEquals=" + DEFAULT_BANK_TRACKING_ID);

        // Get all the payRequestList where bankTrackingId not equals to UPDATED_BANK_TRACKING_ID
        defaultPayRequestShouldBeFound("bankTrackingId.notEquals=" + UPDATED_BANK_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByBankTrackingIdIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where bankTrackingId in DEFAULT_BANK_TRACKING_ID or UPDATED_BANK_TRACKING_ID
        defaultPayRequestShouldBeFound("bankTrackingId.in=" + DEFAULT_BANK_TRACKING_ID + "," + UPDATED_BANK_TRACKING_ID);

        // Get all the payRequestList where bankTrackingId equals to UPDATED_BANK_TRACKING_ID
        defaultPayRequestShouldNotBeFound("bankTrackingId.in=" + UPDATED_BANK_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByBankTrackingIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where bankTrackingId is not null
        defaultPayRequestShouldBeFound("bankTrackingId.specified=true");

        // Get all the payRequestList where bankTrackingId is null
        defaultPayRequestShouldNotBeFound("bankTrackingId.specified=false");
    }
                @Test
    @Transactional
    public void getAllPayRequestsByBankTrackingIdContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where bankTrackingId contains DEFAULT_BANK_TRACKING_ID
        defaultPayRequestShouldBeFound("bankTrackingId.contains=" + DEFAULT_BANK_TRACKING_ID);

        // Get all the payRequestList where bankTrackingId contains UPDATED_BANK_TRACKING_ID
        defaultPayRequestShouldNotBeFound("bankTrackingId.contains=" + UPDATED_BANK_TRACKING_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByBankTrackingIdNotContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where bankTrackingId does not contain DEFAULT_BANK_TRACKING_ID
        defaultPayRequestShouldNotBeFound("bankTrackingId.doesNotContain=" + DEFAULT_BANK_TRACKING_ID);

        // Get all the payRequestList where bankTrackingId does not contain UPDATED_BANK_TRACKING_ID
        defaultPayRequestShouldBeFound("bankTrackingId.doesNotContain=" + UPDATED_BANK_TRACKING_ID);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByPaymentIdIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentId equals to DEFAULT_PAYMENT_ID
        defaultPayRequestShouldBeFound("paymentId.equals=" + DEFAULT_PAYMENT_ID);

        // Get all the payRequestList where paymentId equals to UPDATED_PAYMENT_ID
        defaultPayRequestShouldNotBeFound("paymentId.equals=" + UPDATED_PAYMENT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentIdIsNotEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentId not equals to DEFAULT_PAYMENT_ID
        defaultPayRequestShouldNotBeFound("paymentId.notEquals=" + DEFAULT_PAYMENT_ID);

        // Get all the payRequestList where paymentId not equals to UPDATED_PAYMENT_ID
        defaultPayRequestShouldBeFound("paymentId.notEquals=" + UPDATED_PAYMENT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentIdIsInShouldWork() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentId in DEFAULT_PAYMENT_ID or UPDATED_PAYMENT_ID
        defaultPayRequestShouldBeFound("paymentId.in=" + DEFAULT_PAYMENT_ID + "," + UPDATED_PAYMENT_ID);

        // Get all the payRequestList where paymentId equals to UPDATED_PAYMENT_ID
        defaultPayRequestShouldNotBeFound("paymentId.in=" + UPDATED_PAYMENT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentId is not null
        defaultPayRequestShouldBeFound("paymentId.specified=true");

        // Get all the payRequestList where paymentId is null
        defaultPayRequestShouldNotBeFound("paymentId.specified=false");
    }
                @Test
    @Transactional
    public void getAllPayRequestsByPaymentIdContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentId contains DEFAULT_PAYMENT_ID
        defaultPayRequestShouldBeFound("paymentId.contains=" + DEFAULT_PAYMENT_ID);

        // Get all the payRequestList where paymentId contains UPDATED_PAYMENT_ID
        defaultPayRequestShouldNotBeFound("paymentId.contains=" + UPDATED_PAYMENT_ID);
    }

    @Test
    @Transactional
    public void getAllPayRequestsByPaymentIdNotContainsSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);

        // Get all the payRequestList where paymentId does not contain DEFAULT_PAYMENT_ID
        defaultPayRequestShouldNotBeFound("paymentId.doesNotContain=" + DEFAULT_PAYMENT_ID);

        // Get all the payRequestList where paymentId does not contain UPDATED_PAYMENT_ID
        defaultPayRequestShouldBeFound("paymentId.doesNotContain=" + UPDATED_PAYMENT_ID);
    }


    @Test
    @Transactional
    public void getAllPayRequestsByCustomerIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);
        Customer customer = CustomerResourceIT.createEntity(em);
        em.persist(customer);
        em.flush();
        payRequest.setCustomer(customer);
        payRequestRepository.saveAndFlush(payRequest);
        Long customerId = customer.getId();

        // Get all the payRequestList where customer equals to customerId
        defaultPayRequestShouldBeFound("customerId.equals=" + customerId);

        // Get all the payRequestList where customer equals to customerId + 1
        defaultPayRequestShouldNotBeFound("customerId.equals=" + (customerId + 1));
    }


    @Test
    @Transactional
    public void getAllPayRequestsByBillsIsEqualToSomething() throws Exception {
        // Initialize the database
        payRequestRepository.saveAndFlush(payRequest);
        Bill bills = BillResourceIT.createEntity(em);
        em.persist(bills);
        em.flush();
        payRequest.addBills(bills);
        payRequestRepository.saveAndFlush(payRequest);
        Long billsId = bills.getId();

        // Get all the payRequestList where bills equals to billsId
        defaultPayRequestShouldBeFound("billsId.equals=" + billsId);

        // Get all the payRequestList where bills equals to billsId + 1
        defaultPayRequestShouldNotBeFound("billsId.equals=" + (billsId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPayRequestShouldBeFound(String filter) throws Exception {
        restPayRequestMockMvc.perform(get("/api/pay-requests?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(payRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].requestTime").value(hasItem(sameInstant(DEFAULT_REQUEST_TIME))))
            .andExpect(jsonPath("$.[*].trackingId").value(hasItem(DEFAULT_TRACKING_ID)))
            .andExpect(jsonPath("$.[*].shortId").value(hasItem(DEFAULT_SHORT_ID)))
            .andExpect(jsonPath("$.[*].accountNo").value(hasItem(DEFAULT_ACCOUNT_NO)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].sendSms").value(hasItem(DEFAULT_SEND_SMS.booleanValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].callBackService").value(hasItem(DEFAULT_CALL_BACK_SERVICE)))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.booleanValue())))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(sameInstant(DEFAULT_PAYMENT_DATE))))
            .andExpect(jsonPath("$.[*].bankTrackingId").value(hasItem(DEFAULT_BANK_TRACKING_ID)))
            .andExpect(jsonPath("$.[*].paymentId").value(hasItem(DEFAULT_PAYMENT_ID)));

        // Check, that the count call also returns 1
        restPayRequestMockMvc.perform(get("/api/pay-requests/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPayRequestShouldNotBeFound(String filter) throws Exception {
        restPayRequestMockMvc.perform(get("/api/pay-requests?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPayRequestMockMvc.perform(get("/api/pay-requests/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
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
        payRequestService.save(payRequest);

        int databaseSizeBeforeUpdate = payRequestRepository.findAll().size();

        // Update the payRequest
        PayRequest updatedPayRequest = payRequestRepository.findById(payRequest.getId()).get();
        // Disconnect from session so that the updates on updatedPayRequest are not directly saved in db
        em.detach(updatedPayRequest);
        updatedPayRequest
            .requestTime(UPDATED_REQUEST_TIME)
            .trackingId(UPDATED_TRACKING_ID)
            .shortId(UPDATED_SHORT_ID)
            .accountNo(UPDATED_ACCOUNT_NO)
            .title(UPDATED_TITLE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .sendSms(UPDATED_SEND_SMS)
            .amount(UPDATED_AMOUNT)
            .callBackService(UPDATED_CALL_BACK_SERVICE)
            .paid(UPDATED_PAID)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .bankTrackingId(UPDATED_BANK_TRACKING_ID)
            .paymentId(UPDATED_PAYMENT_ID);

        restPayRequestMockMvc.perform(put("/api/pay-requests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPayRequest)))
            .andExpect(status().isOk());

        // Validate the PayRequest in the database
        List<PayRequest> payRequestList = payRequestRepository.findAll();
        assertThat(payRequestList).hasSize(databaseSizeBeforeUpdate);
        PayRequest testPayRequest = payRequestList.get(payRequestList.size() - 1);
        assertThat(testPayRequest.getRequestTime()).isEqualTo(UPDATED_REQUEST_TIME);
        assertThat(testPayRequest.getTrackingId()).isEqualTo(UPDATED_TRACKING_ID);
        assertThat(testPayRequest.getShortId()).isEqualTo(UPDATED_SHORT_ID);
        assertThat(testPayRequest.getAccountNo()).isEqualTo(UPDATED_ACCOUNT_NO);
        assertThat(testPayRequest.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPayRequest.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testPayRequest.isSendSms()).isEqualTo(UPDATED_SEND_SMS);
        assertThat(testPayRequest.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPayRequest.getCallBackService()).isEqualTo(UPDATED_CALL_BACK_SERVICE);
        assertThat(testPayRequest.isPaid()).isEqualTo(UPDATED_PAID);
        assertThat(testPayRequest.getPaymentDate()).isEqualTo(UPDATED_PAYMENT_DATE);
        assertThat(testPayRequest.getBankTrackingId()).isEqualTo(UPDATED_BANK_TRACKING_ID);
        assertThat(testPayRequest.getPaymentId()).isEqualTo(UPDATED_PAYMENT_ID);
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
        payRequestService.save(payRequest);

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
