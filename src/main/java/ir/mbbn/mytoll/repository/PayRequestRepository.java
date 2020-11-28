package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.PayRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PayRequest entity.
 */
@Repository
public interface PayRequestRepository extends JpaRepository<PayRequest, Long>, JpaSpecificationExecutor<PayRequest> {

    @Query(value = "select distinct payRequest from PayRequest payRequest left join fetch payRequest.bills",
        countQuery = "select count(distinct payRequest) from PayRequest payRequest")
    Page<PayRequest> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct payRequest from PayRequest payRequest left join fetch payRequest.bills")
    List<PayRequest> findAllWithEagerRelationships();

    @Query("select payRequest from PayRequest payRequest left join fetch payRequest.bills where payRequest.id =:id")
    Optional<PayRequest> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select payRequest from PayRequest payRequest left join fetch payRequest.bills where payRequest.trackingId =:trackingId")
    Optional<PayRequest> findOneByTrackingId(@Param("trackingId") String trackingId);

    @Query("select payRequest from PayRequest payRequest left join fetch payRequest.bills where payRequest.shortId =:shortId and payRequest.paid is null")
    Optional<PayRequest> findOneByShortIdAndPaidIsNull(@Param("shortId") String shortId);

    @Query("select payRequest from PayRequest payRequest left join fetch payRequest.bills where payRequest.paid is null and payRequest.expirationDate > current_date ")
    Optional<PayRequest> getFirstByPaidIsNull();

    @Query("select payRequest from PayRequest payRequest left join fetch payRequest.bills where payRequest.paid is null and payRequest.expirationDate <= current_date ")
    List<PayRequest> findAllExpireRequest();
}
