package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.PayRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PayRequest entity.
 */
@Repository
public interface PayRequestRepository extends JpaRepository<PayRequest, Long> {

    @Query(value = "select distinct payRequest from PayRequest payRequest left join fetch payRequest.bills",
        countQuery = "select count(distinct payRequest) from PayRequest payRequest")
    Page<PayRequest> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct payRequest from PayRequest payRequest left join fetch payRequest.bills")
    List<PayRequest> findAllWithEagerRelationships();

    @Query("select payRequest from PayRequest payRequest left join fetch payRequest.bills where payRequest.id =:id")
    Optional<PayRequest> findOneWithEagerRelationships(@Param("id") Long id);

    Optional<PayRequest> findOneByTrackingId(@Param("trackingId") String trackingId);
}
