package ir.mbbn.mytoll.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "mobile", nullable = false)
    private String mobile;

    @NotNull
    @Column(name = "creation_time", nullable = false)
    private ZonedDateTime creationTime;

    @NotNull
    @Column(name = "creation_by", nullable = false)
    private String creationBy;

    @NotNull
    @Column(name = "last_update_time", nullable = false)
    private ZonedDateTime lastUpdateTime;

    @NotNull
    @Column(name = "last_updated_by", nullable = false)
    private String lastUpdatedBy;

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Plate> plates = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public Customer mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public ZonedDateTime getCreationTime() {
        return creationTime;
    }

    public Customer creationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
        return this;
    }

    public void setCreationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public String getCreationBy() {
        return creationBy;
    }

    public Customer creationBy(String creationBy) {
        this.creationBy = creationBy;
        return this;
    }

    public void setCreationBy(String creationBy) {
        this.creationBy = creationBy;
    }

    public ZonedDateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public Customer lastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
        return this;
    }

    public void setLastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public Customer lastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
        return this;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public Set<Plate> getPlates() {
        return plates;
    }

    public Customer plates(Set<Plate> plates) {
        this.plates = plates;
        return this;
    }

    public Customer addPlates(Plate plate) {
        this.plates.add(plate);
        plate.setCustomer(this);
        return this;
    }

    public Customer removePlates(Plate plate) {
        this.plates.remove(plate);
        plate.setCustomer(null);
        return this;
    }

    public void setPlates(Set<Plate> plates) {
        this.plates = plates;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", mobile='" + getMobile() + "'" +
            ", creationTime='" + getCreationTime() + "'" +
            ", creationBy='" + getCreationBy() + "'" +
            ", lastUpdateTime='" + getLastUpdateTime() + "'" +
            ", lastUpdatedBy='" + getLastUpdatedBy() + "'" +
            "}";
    }
}
