package ir.mbbn.mytoll.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.domain.*; // for static metamodels
import ir.mbbn.mytoll.repository.PayRequestRepository;
import ir.mbbn.mytoll.service.dto.PayRequestCriteria;

/**
 * Service for executing complex queries for {@link PayRequest} entities in the database.
 * The main input is a {@link PayRequestCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PayRequest} or a {@link Page} of {@link PayRequest} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PayRequestQueryService extends QueryService<PayRequest> {

    private final Logger log = LoggerFactory.getLogger(PayRequestQueryService.class);

    private final PayRequestRepository payRequestRepository;

    public PayRequestQueryService(PayRequestRepository payRequestRepository) {
        this.payRequestRepository = payRequestRepository;
    }

    /**
     * Return a {@link List} of {@link PayRequest} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PayRequest> findByCriteria(PayRequestCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<PayRequest> specification = createSpecification(criteria);
        return payRequestRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link PayRequest} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PayRequest> findByCriteria(PayRequestCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<PayRequest> specification = createSpecification(criteria);
        return payRequestRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PayRequestCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<PayRequest> specification = createSpecification(criteria);
        return payRequestRepository.count(specification);
    }

    /**
     * Function to convert {@link PayRequestCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<PayRequest> createSpecification(PayRequestCriteria criteria) {
        Specification<PayRequest> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), PayRequest_.id));
            }
            if (criteria.getRequestTime() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRequestTime(), PayRequest_.requestTime));
            }
            if (criteria.getTrackingId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTrackingId(), PayRequest_.trackingId));
            }
            if (criteria.getShortId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getShortId(), PayRequest_.shortId));
            }
            if (criteria.getAccountNo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAccountNo(), PayRequest_.accountNo));
            }
            if (criteria.getTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitle(), PayRequest_.title));
            }
            if (criteria.getExpirationDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getExpirationDate(), PayRequest_.expirationDate));
            }
            if (criteria.getSendSms() != null) {
                specification = specification.and(buildSpecification(criteria.getSendSms(), PayRequest_.sendSms));
            }
            if (criteria.getAmount() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAmount(), PayRequest_.amount));
            }
            if (criteria.getCallBackService() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCallBackService(), PayRequest_.callBackService));
            }
            if (criteria.getPaid() != null) {
                specification = specification.and(buildSpecification(criteria.getPaid(), PayRequest_.paid));
            }
            if (criteria.getPaymentDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPaymentDate(), PayRequest_.paymentDate));
            }
            if (criteria.getBankTrackingId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getBankTrackingId(), PayRequest_.bankTrackingId));
            }
            if (criteria.getPaymentId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPaymentId(), PayRequest_.paymentId));
            }
            if (criteria.getCustomerId() != null) {
                specification = specification.and(buildSpecification(criteria.getCustomerId(),
                    root -> root.join(PayRequest_.customer, JoinType.LEFT).get(Customer_.id)));
            }
            if (criteria.getBillsId() != null) {
                specification = specification.and(buildSpecification(criteria.getBillsId(),
                    root -> root.join(PayRequest_.bills, JoinType.LEFT).get(Bill_.id)));
            }
        }
        return specification;
    }
}
