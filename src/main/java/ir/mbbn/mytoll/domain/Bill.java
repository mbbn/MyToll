package ir.mbbn.mytoll.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import ir.mbbn.mytoll.domain.enumeration.TaxCategory;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private TaxCategory category;

    @NotNull
    @Column(name = "bill_type", nullable = false)
    private String billType;

    @NotNull
    @Column(name = "bill_type_title", nullable = false)
    private String billTypeTitle;

    @NotNull
    @Column(name = "street", nullable = false)
    private String street;

    @NotNull
    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @NotNull
    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @NotNull
    @Column(name = "bill_id", nullable = false)
    private String billId;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @NotNull
    @Column(name = "external_number", nullable = false)
    private String externalNumber;

    @NotNull
    @Column(name = "bill_date", nullable = false)
    private LocalDate billDate;

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

    public TaxCategory getCategory() {
        return category;
    }

    public Bill category(TaxCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(TaxCategory category) {
        this.category = category;
    }

    public String getBillType() {
        return billType;
    }

    public Bill billType(String billType) {
        this.billType = billType;
        return this;
    }

    public void setBillType(String billType) {
        this.billType = billType;
    }

    public String getBillTypeTitle() {
        return billTypeTitle;
    }

    public Bill billTypeTitle(String billTypeTitle) {
        this.billTypeTitle = billTypeTitle;
        return this;
    }

    public void setBillTypeTitle(String billTypeTitle) {
        this.billTypeTitle = billTypeTitle;
    }

    public String getStreet() {
        return street;
    }

    public Bill street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public Bill fromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public Bill toDate(LocalDate toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public String getBillId() {
        return billId;
    }

    public Bill billId(String billId) {
        this.billId = billId;
        return this;
    }

    public void setBillId(String billId) {
        this.billId = billId;
    }

    public Integer getAmount() {
        return amount;
    }

    public Bill amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getExternalNumber() {
        return externalNumber;
    }

    public Bill externalNumber(String externalNumber) {
        this.externalNumber = externalNumber;
        return this;
    }

    public void setExternalNumber(String externalNumber) {
        this.externalNumber = externalNumber;
    }

    public LocalDate getBillDate() {
        return billDate;
    }

    public Bill billDate(LocalDate billDate) {
        this.billDate = billDate;
        return this;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }

    public Plate getPlate() {
        return plate;
    }

    public Bill plate(Plate plate) {
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
        if (!(o instanceof Bill)) {
            return false;
        }
        return id != null && id.equals(((Bill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", billType='" + getBillType() + "'" +
            ", billTypeTitle='" + getBillTypeTitle() + "'" +
            ", street='" + getStreet() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", billId='" + getBillId() + "'" +
            ", amount=" + getAmount() +
            ", externalNumber='" + getExternalNumber() + "'" +
            ", billDate='" + getBillDate() + "'" +
            "}";
    }
}
