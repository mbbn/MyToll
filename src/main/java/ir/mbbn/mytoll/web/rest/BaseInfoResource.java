package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.domain.BaseInfo;
import ir.mbbn.mytoll.repository.BaseInfoRepository;
import ir.mbbn.mytoll.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ir.mbbn.mytoll.domain.BaseInfo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BaseInfoResource {

    private final Logger log = LoggerFactory.getLogger(BaseInfoResource.class);

    private static final String ENTITY_NAME = "baseInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BaseInfoRepository baseInfoRepository;

    public BaseInfoResource(BaseInfoRepository baseInfoRepository) {
        this.baseInfoRepository = baseInfoRepository;
    }

    /**
     * {@code POST  /base-infos} : Create a new baseInfo.
     *
     * @param baseInfo the baseInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new baseInfo, or with status {@code 400 (Bad Request)} if the baseInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/base-infos")
    public ResponseEntity<BaseInfo> createBaseInfo(@Valid @RequestBody BaseInfo baseInfo) throws URISyntaxException {
        log.debug("REST request to save BaseInfo : {}", baseInfo);
        if (baseInfo.getId() != null) {
            throw new BadRequestAlertException("A new baseInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BaseInfo result = baseInfoRepository.save(baseInfo);
        return ResponseEntity.created(new URI("/api/base-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /base-infos} : Updates an existing baseInfo.
     *
     * @param baseInfo the baseInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated baseInfo,
     * or with status {@code 400 (Bad Request)} if the baseInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the baseInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/base-infos")
    public ResponseEntity<BaseInfo> updateBaseInfo(@Valid @RequestBody BaseInfo baseInfo) throws URISyntaxException {
        log.debug("REST request to update BaseInfo : {}", baseInfo);
        if (baseInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BaseInfo result = baseInfoRepository.save(baseInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, baseInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /base-infos} : get all the baseInfos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of baseInfos in body.
     */
    @GetMapping("/base-infos")
    public ResponseEntity<List<BaseInfo>> getAllBaseInfos(Pageable pageable) {
        log.debug("REST request to get a page of BaseInfos");
        Page<BaseInfo> page = baseInfoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /base-infos/:id} : get the "id" baseInfo.
     *
     * @param id the id of the baseInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the baseInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/base-infos/{id}")
    public ResponseEntity<BaseInfo> getBaseInfo(@PathVariable Long id) {
        log.debug("REST request to get BaseInfo : {}", id);
        Optional<BaseInfo> baseInfo = baseInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(baseInfo);
    }

    /**
     * {@code DELETE  /base-infos/:id} : delete the "id" baseInfo.
     *
     * @param id the id of the baseInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/base-infos/{id}")
    public ResponseEntity<Void> deleteBaseInfo(@PathVariable Long id) {
        log.debug("REST request to delete BaseInfo : {}", id);
        baseInfoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
