package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.Bill;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

/**
 * Spring Data  repository for the Bill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    Optional<Bill> findOneByExternalNumber(String externalNumber);
    Set<Bill> findAllByExternalNumberIn(Set<String> externalNumbers);
}
