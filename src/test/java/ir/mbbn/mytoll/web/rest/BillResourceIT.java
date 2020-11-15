package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.MyTollApp;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.repository.BillRepository;

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

import ir.mbbn.mytoll.domain.enumeration.TaxCategory;
/**
 * Integration tests for the {@link BillResource} REST controller.
 */
@SpringBootTest(classes = MyTollApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BillResourceIT {

    private static final TaxCategory DEFAULT_CATEGORY = TaxCategory.SIDEPARK;
    private static final TaxCategory UPDATED_CATEGORY = TaxCategory.HIGHWAY;

    private static final String DEFAULT_BILL_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_BILL_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_BILL_TYPE_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_BILL_TYPE_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_BILL_ID = "AAAAAAAAAA";
    private static final String UPDATED_BILL_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final String DEFAULT_EXTERNAL_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNAL_NUMBER = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_BILL_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BILL_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillService billService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBillMockMvc;

    private Bill bill;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bill createEntity(EntityManager em) {
        Bill bill = new Bill()
            .category(DEFAULT_CATEGORY)
            .billType(DEFAULT_BILL_TYPE)
            .billTypeTitle(DEFAULT_BILL_TYPE_TITLE)
            .street(DEFAULT_STREET)
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE)
            .billId(DEFAULT_BILL_ID)
            .amount(DEFAULT_AMOUNT)
            .externalNumber(DEFAULT_EXTERNAL_NUMBER)
            .billDate(DEFAULT_BILL_DATE);
        return bill;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bill createUpdatedEntity(EntityManager em) {
        Bill bill = new Bill()
            .category(UPDATED_CATEGORY)
            .billType(UPDATED_BILL_TYPE)
            .billTypeTitle(UPDATED_BILL_TYPE_TITLE)
            .street(UPDATED_STREET)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE)
            .billId(UPDATED_BILL_ID)
            .amount(UPDATED_AMOUNT)
            .externalNumber(UPDATED_EXTERNAL_NUMBER)
            .billDate(UPDATED_BILL_DATE);
        return bill;
    }

    @BeforeEach
    public void initTest() {
        bill = createEntity(em);
    }

    @Test
    @Transactional
    public void createBill() throws Exception {
        int databaseSizeBeforeCreate = billRepository.findAll().size();
        // Create the Bill
        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isCreated());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeCreate + 1);
        Bill testBill = billList.get(billList.size() - 1);
        assertThat(testBill.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testBill.getBillType()).isEqualTo(DEFAULT_BILL_TYPE);
        assertThat(testBill.getBillTypeTitle()).isEqualTo(DEFAULT_BILL_TYPE_TITLE);
        assertThat(testBill.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testBill.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testBill.getToDate()).isEqualTo(DEFAULT_TO_DATE);
        assertThat(testBill.getBillId()).isEqualTo(DEFAULT_BILL_ID);
        assertThat(testBill.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBill.getExternalNumber()).isEqualTo(DEFAULT_EXTERNAL_NUMBER);
        assertThat(testBill.getBillDate()).isEqualTo(DEFAULT_BILL_DATE);
    }

    @Test
    @Transactional
    public void createBillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = billRepository.findAll().size();

        // Create the Bill with an existing ID
        bill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setCategory(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBillTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setBillType(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBillTypeTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setBillTypeTitle(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStreetIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setStreet(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setFromDate(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkToDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setToDate(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBillIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setBillId(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setAmount(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExternalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setExternalNumber(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBillDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setBillDate(null);

        // Create the Bill, which fails.


        restBillMockMvc.perform(post("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBills() throws Exception {
        // Initialize the database
        billRepository.saveAndFlush(bill);

        // Get all the billList
        restBillMockMvc.perform(get("/api/bills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bill.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].billType").value(hasItem(DEFAULT_BILL_TYPE)))
            .andExpect(jsonPath("$.[*].billTypeTitle").value(hasItem(DEFAULT_BILL_TYPE_TITLE)))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET)))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))))
            .andExpect(jsonPath("$.[*].billId").value(hasItem(DEFAULT_BILL_ID)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].externalNumber").value(hasItem(DEFAULT_EXTERNAL_NUMBER)))
            .andExpect(jsonPath("$.[*].billDate").value(hasItem(sameInstant(DEFAULT_BILL_DATE))));
    }

    @Test
    @Transactional
    public void getBill() throws Exception {
        // Initialize the database
        billRepository.saveAndFlush(bill);

        // Get the bill
        restBillMockMvc.perform(get("/api/bills/{id}", bill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bill.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.billType").value(DEFAULT_BILL_TYPE))
            .andExpect(jsonPath("$.billTypeTitle").value(DEFAULT_BILL_TYPE_TITLE))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)))
            .andExpect(jsonPath("$.billId").value(DEFAULT_BILL_ID))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.externalNumber").value(DEFAULT_EXTERNAL_NUMBER))
            .andExpect(jsonPath("$.billDate").value(sameInstant(DEFAULT_BILL_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingBill() throws Exception {
        // Get the bill
        restBillMockMvc.perform(get("/api/bills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBill() throws Exception {
        // Initialize the database
        billService.save(bill);

        int databaseSizeBeforeUpdate = billRepository.findAll().size();

        // Update the bill
        Bill updatedBill = billRepository.findById(bill.getId()).get();
        // Disconnect from session so that the updates on updatedBill are not directly saved in db
        em.detach(updatedBill);
        updatedBill
            .category(UPDATED_CATEGORY)
            .billType(UPDATED_BILL_TYPE)
            .billTypeTitle(UPDATED_BILL_TYPE_TITLE)
            .street(UPDATED_STREET)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE)
            .billId(UPDATED_BILL_ID)
            .amount(UPDATED_AMOUNT)
            .externalNumber(UPDATED_EXTERNAL_NUMBER)
            .billDate(UPDATED_BILL_DATE);

        restBillMockMvc.perform(put("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBill)))
            .andExpect(status().isOk());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeUpdate);
        Bill testBill = billList.get(billList.size() - 1);
        assertThat(testBill.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testBill.getBillType()).isEqualTo(UPDATED_BILL_TYPE);
        assertThat(testBill.getBillTypeTitle()).isEqualTo(UPDATED_BILL_TYPE_TITLE);
        assertThat(testBill.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testBill.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testBill.getToDate()).isEqualTo(UPDATED_TO_DATE);
        assertThat(testBill.getBillId()).isEqualTo(UPDATED_BILL_ID);
        assertThat(testBill.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBill.getExternalNumber()).isEqualTo(UPDATED_EXTERNAL_NUMBER);
        assertThat(testBill.getBillDate()).isEqualTo(UPDATED_BILL_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingBill() throws Exception {
        int databaseSizeBeforeUpdate = billRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBillMockMvc.perform(put("/api/bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBill() throws Exception {
        // Initialize the database
        billService.save(bill);

        int databaseSizeBeforeDelete = billRepository.findAll().size();

        // Delete the bill
        restBillMockMvc.perform(delete("/api/bills/{id}", bill.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
