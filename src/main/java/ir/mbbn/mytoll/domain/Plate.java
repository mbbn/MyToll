package ir.mbbn.mytoll.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import ir.mbbn.mytoll.domain.enumeration.PlateType;

/**
 * A Plate.
 */
@Entity
@Table(name = "plate")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Plate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 8, max = 8)
    @Column(name = "plain", length = 8, nullable = false)
    private String plain;

    @NotNull
    @Column(name = "code", nullable = false)
    private Integer code;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private PlateType type;

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

    @OneToMany(mappedBy = "plate")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Bill> bills = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "plates", allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlain() {
        return plain;
    }

    public Plate plain(String plain) {
        this.plain = plain;
        return this;
    }

    public void setPlain(String plain) {
        this.plain = plain;
    }

    public Integer getCode() {
        return code;
    }

    public Plate code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public PlateType getType() {
        return type;
    }

    public Plate type(PlateType type) {
        this.type = type;
        return this;
    }

    public void setType(PlateType type) {
        this.type = type;
    }

    public ZonedDateTime getCreationTime() {
        return creationTime;
    }

    public Plate creationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
        return this;
    }

    public void setCreationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public String getCreationBy() {
        return creationBy;
    }

    public Plate creationBy(String creationBy) {
        this.creationBy = creationBy;
        return this;
    }

    public void setCreationBy(String creationBy) {
        this.creationBy = creationBy;
    }

    public ZonedDateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public Plate lastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
        return this;
    }

    public void setLastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public Plate lastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
        return this;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public Set<Bill> getBills() {
        return bills;
    }

    public Plate bills(Set<Bill> bills) {
        this.bills = bills;
        return this;
    }

    public Plate addBills(Bill bill) {
        this.bills.add(bill);
        bill.setPlate(this);
        return this;
    }

    public Plate removeBills(Bill bill) {
        this.bills.remove(bill);
        bill.setPlate(null);
        return this;
    }

    public void setBills(Set<Bill> bills) {
        this.bills = bills;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Plate customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plate)) {
            return false;
        }
        return id != null && id.equals(((Plate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Plate{" +
            "id=" + getId() +
            ", plain='" + getPlain() + "'" +
            ", code=" + getCode() +
            ", type='" + getType() + "'" +
            ", creationTime='" + getCreationTime() + "'" +
            ", creationBy='" + getCreationBy() + "'" +
            ", lastUpdateTime='" + getLastUpdateTime() + "'" +
            ", lastUpdatedBy='" + getLastUpdatedBy() + "'" +
            "}";
    }
}
