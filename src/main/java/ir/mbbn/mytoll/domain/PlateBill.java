package ir.mbbn.mytoll.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import ir.mbbn.mytoll.domain.enumeration.BillCategory;

/**
 * A PlateBill.
 */
@Entity
@Table(name = "plate_bill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PlateBill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private BillCategory category;

    @NotNull
    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @NotNull
    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @ManyToOne
    @JsonIgnoreProperties(value = "plateBills", allowSetters = true)
    private BaseInfo billType;

    @ManyToOne
    @JsonIgnoreProperties(value = "bills", allowSetters = true)
    private Plate plate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BillCategory getCategory() {
        return category;
    }

    public PlateBill category(BillCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(BillCategory category) {
        this.category = category;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public PlateBill fromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public PlateBill toDate(LocalDate toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public BaseInfo getBillType() {
        return billType;
    }

    public PlateBill billType(BaseInfo baseInfo) {
        this.billType = baseInfo;
        return this;
    }

    public void setBillType(BaseInfo baseInfo) {
        this.billType = baseInfo;
    }

    public Plate getPlate() {
        return plate;
    }

    public PlateBill plate(Plate plate) {
        this.plate = plate;
        return this;
    }

    public void setPlate(Plate plate) {
        this.plate = plate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlateBill)) {
            return false;
        }
        return id != null && id.equals(((PlateBill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlateBill{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            "}";
    }
}
