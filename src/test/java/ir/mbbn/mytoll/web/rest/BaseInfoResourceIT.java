package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.MyTollApp;
import ir.mbbn.mytoll.domain.BaseInfo;
import ir.mbbn.mytoll.repository.BaseInfoRepository;

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

import ir.mbbn.mytoll.domain.enumeration.BaseInfoCategory;
/**
 * Integration tests for the {@link BaseInfoResource} REST controller.
 */
@SpringBootTest(classes = MyTollApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BaseInfoResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final BaseInfoCategory DEFAULT_CATEGORY = BaseInfoCategory.PLATE_MAP;
    private static final BaseInfoCategory UPDATED_CATEGORY = BaseInfoCategory.PLATE_MAP;

    private static final ZonedDateTime DEFAULT_CREATION_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATION_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATION_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_LAST_UPDATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_UPDATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_UPDATED_BY = "BBBBBBBBBB";

    @Autowired
    private BaseInfoRepository baseInfoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBaseInfoMockMvc;

    private BaseInfo baseInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BaseInfo createEntity(EntityManager em) {
        BaseInfo baseInfo = new BaseInfo()
            .title(DEFAULT_TITLE)
            .code(DEFAULT_CODE)
            .category(DEFAULT_CATEGORY)
            .creationTime(DEFAULT_CREATION_TIME)
            .creationBy(DEFAULT_CREATION_BY)
            .lastUpdateTime(DEFAULT_LAST_UPDATE_TIME)
            .lastUpdatedBy(DEFAULT_LAST_UPDATED_BY);
        return baseInfo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BaseInfo createUpdatedEntity(EntityManager em) {
        BaseInfo baseInfo = new BaseInfo()
            .title(UPDATED_TITLE)
            .code(UPDATED_CODE)
            .category(UPDATED_CATEGORY)
            .creationTime(UPDATED_CREATION_TIME)
            .creationBy(UPDATED_CREATION_BY)
            .lastUpdateTime(UPDATED_LAST_UPDATE_TIME)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY);
        return baseInfo;
    }

    @BeforeEach
    public void initTest() {
        baseInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createBaseInfo() throws Exception {
        int databaseSizeBeforeCreate = baseInfoRepository.findAll().size();
        // Create the BaseInfo
        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isCreated());

        // Validate the BaseInfo in the database
        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeCreate + 1);
        BaseInfo testBaseInfo = baseInfoList.get(baseInfoList.size() - 1);
        assertThat(testBaseInfo.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testBaseInfo.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testBaseInfo.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testBaseInfo.getCreationTime()).isEqualTo(DEFAULT_CREATION_TIME);
        assertThat(testBaseInfo.getCreationBy()).isEqualTo(DEFAULT_CREATION_BY);
        assertThat(testBaseInfo.getLastUpdateTime()).isEqualTo(DEFAULT_LAST_UPDATE_TIME);
        assertThat(testBaseInfo.getLastUpdatedBy()).isEqualTo(DEFAULT_LAST_UPDATED_BY);
    }

    @Test
    @Transactional
    public void createBaseInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = baseInfoRepository.findAll().size();

        // Create the BaseInfo with an existing ID
        baseInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BaseInfo in the database
        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseInfoRepository.findAll().size();
        // set the field null
        baseInfo.setTitle(null);

        // Create the BaseInfo, which fails.


        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseInfoRepository.findAll().size();
        // set the field null
        baseInfo.setCode(null);

        // Create the BaseInfo, which fails.


        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseInfoRepository.findAll().size();
        // set the field null
        baseInfo.setCategory(null);

        // Create the BaseInfo, which fails.


        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseInfoRepository.findAll().size();
        // set the field null
        baseInfo.setCreationTime(null);

        // Create the BaseInfo, which fails.


        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationByIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseInfoRepository.findAll().size();
        // set the field null
        baseInfo.setCreationBy(null);

        // Create the BaseInfo, which fails.


        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastUpdateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseInfoRepository.findAll().size();
        // set the field null
        baseInfo.setLastUpdateTime(null);

        // Create the BaseInfo, which fails.


        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastUpdatedByIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseInfoRepository.findAll().size();
        // set the field null
        baseInfo.setLastUpdatedBy(null);

        // Create the BaseInfo, which fails.


        restBaseInfoMockMvc.perform(post("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBaseInfos() throws Exception {
        // Initialize the database
        baseInfoRepository.saveAndFlush(baseInfo);

        // Get all the baseInfoList
        restBaseInfoMockMvc.perform(get("/api/base-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(baseInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].creationTime").value(hasItem(sameInstant(DEFAULT_CREATION_TIME))))
            .andExpect(jsonPath("$.[*].creationBy").value(hasItem(DEFAULT_CREATION_BY)))
            .andExpect(jsonPath("$.[*].lastUpdateTime").value(hasItem(sameInstant(DEFAULT_LAST_UPDATE_TIME))))
            .andExpect(jsonPath("$.[*].lastUpdatedBy").value(hasItem(DEFAULT_LAST_UPDATED_BY)));
    }
    
    @Test
    @Transactional
    public void getBaseInfo() throws Exception {
        // Initialize the database
        baseInfoRepository.saveAndFlush(baseInfo);

        // Get the baseInfo
        restBaseInfoMockMvc.perform(get("/api/base-infos/{id}", baseInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(baseInfo.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.creationTime").value(sameInstant(DEFAULT_CREATION_TIME)))
            .andExpect(jsonPath("$.creationBy").value(DEFAULT_CREATION_BY))
            .andExpect(jsonPath("$.lastUpdateTime").value(sameInstant(DEFAULT_LAST_UPDATE_TIME)))
            .andExpect(jsonPath("$.lastUpdatedBy").value(DEFAULT_LAST_UPDATED_BY));
    }
    @Test
    @Transactional
    public void getNonExistingBaseInfo() throws Exception {
        // Get the baseInfo
        restBaseInfoMockMvc.perform(get("/api/base-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBaseInfo() throws Exception {
        // Initialize the database
        baseInfoRepository.saveAndFlush(baseInfo);

        int databaseSizeBeforeUpdate = baseInfoRepository.findAll().size();

        // Update the baseInfo
        BaseInfo updatedBaseInfo = baseInfoRepository.findById(baseInfo.getId()).get();
        // Disconnect from session so that the updates on updatedBaseInfo are not directly saved in db
        em.detach(updatedBaseInfo);
        updatedBaseInfo
            .title(UPDATED_TITLE)
            .code(UPDATED_CODE)
            .category(UPDATED_CATEGORY)
            .creationTime(UPDATED_CREATION_TIME)
            .creationBy(UPDATED_CREATION_BY)
            .lastUpdateTime(UPDATED_LAST_UPDATE_TIME)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY);

        restBaseInfoMockMvc.perform(put("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBaseInfo)))
            .andExpect(status().isOk());

        // Validate the BaseInfo in the database
        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeUpdate);
        BaseInfo testBaseInfo = baseInfoList.get(baseInfoList.size() - 1);
        assertThat(testBaseInfo.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testBaseInfo.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testBaseInfo.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testBaseInfo.getCreationTime()).isEqualTo(UPDATED_CREATION_TIME);
        assertThat(testBaseInfo.getCreationBy()).isEqualTo(UPDATED_CREATION_BY);
        assertThat(testBaseInfo.getLastUpdateTime()).isEqualTo(UPDATED_LAST_UPDATE_TIME);
        assertThat(testBaseInfo.getLastUpdatedBy()).isEqualTo(UPDATED_LAST_UPDATED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingBaseInfo() throws Exception {
        int databaseSizeBeforeUpdate = baseInfoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBaseInfoMockMvc.perform(put("/api/base-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(baseInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BaseInfo in the database
        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBaseInfo() throws Exception {
        // Initialize the database
        baseInfoRepository.saveAndFlush(baseInfo);

        int databaseSizeBeforeDelete = baseInfoRepository.findAll().size();

        // Delete the baseInfo
        restBaseInfoMockMvc.perform(delete("/api/base-infos/{id}", baseInfo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BaseInfo> baseInfoList = baseInfoRepository.findAll();
        assertThat(baseInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
