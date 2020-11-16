package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.Customer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findOneCustomerByMobile(String mobile);
}
