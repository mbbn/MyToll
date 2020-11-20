package ir.mbbn.mytoll.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import ir.mbbn.mytoll.domain.enumeration.TaxCategory;

import ir.mbbn.mytoll.domain.enumeration.BillStatus;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill", indexes = {@Index(name = "BILL_UK", columnList = "bill_id", unique = true)})
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
    @Size(min = 9, max = 9)
    @Column(name = "plate", length = 9, nullable = false)
    private String plate;

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
    private ZonedDateTime fromDate;

    @NotNull
    @Column(name = "to_date", nullable = false)
    private ZonedDateTime toDate;

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
    private ZonedDateTime billDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "bill_status", nullable = false)
    private BillStatus billStatus;

    @Column(name = "cpay_tax_id")
    private String cpayTaxId;

    @Column(name = "sepandar_share")
    private Integer sepandarShare;

    @Column(name = "issuer_share")
    private Integer issuerShare;

    @ManyToMany(mappedBy = "bills")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<PayRequest> payRequestLists = new HashSet<>();

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

    public String getPlate() {
        return plate;
    }

    public Bill plate(String plate) {
        this.plate = plate;
        return this;
    }

    public void setPlate(String plate) {
        this.plate = plate;
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

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public Bill fromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public Bill toDate(ZonedDateTime toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(ZonedDateTime toDate) {
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

    public ZonedDateTime getBillDate() {
        return billDate;
    }

    public Bill billDate(ZonedDateTime billDate) {
        this.billDate = billDate;
        return this;
    }

    public void setBillDate(ZonedDateTime billDate) {
        this.billDate = billDate;
    }

    public BillStatus getBillStatus() {
        return billStatus;
    }

    public Bill billStatus(BillStatus billStatus) {
        this.billStatus = billStatus;
        return this;
    }

    public void setBillStatus(BillStatus billStatus) {
        this.billStatus = billStatus;
    }

    public String getCpayTaxId() {
        return cpayTaxId;
    }

    public Bill cpayTaxId(String cpayTaxId) {
        this.cpayTaxId = cpayTaxId;
        return this;
    }

    public void setCpayTaxId(String cpayTaxId) {
        this.cpayTaxId = cpayTaxId;
    }

    public Integer getSepandarShare() {
        return sepandarShare;
    }

    public Bill sepandarShare(Integer sepandarShare) {
        this.sepandarShare = sepandarShare;
        return this;
    }

    public void setSepandarShare(Integer sepandarShare) {
        this.sepandarShare = sepandarShare;
    }

    public Integer getIssuerShare() {
        return issuerShare;
    }

    public Bill issuerShare(Integer issuerShare) {
        this.issuerShare = issuerShare;
        return this;
    }

    public void setIssuerShare(Integer issuerShare) {
        this.issuerShare = issuerShare;
    }

    public Set<PayRequest> getPayRequestLists() {
        return payRequestLists;
    }

    public Bill payRequestLists(Set<PayRequest> payRequests) {
        this.payRequestLists = payRequests;
        return this;
    }

    public Bill addPayRequestList(PayRequest payRequest) {
        this.payRequestLists.add(payRequest);
        payRequest.getBills().add(this);
        return this;
    }

    public Bill removePayRequestList(PayRequest payRequest) {
        this.payRequestLists.remove(payRequest);
        payRequest.getBills().remove(this);
        return this;
    }

    public void setPayRequestLists(Set<PayRequest> payRequests) {
        this.payRequestLists = payRequests;
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
            ", plate='" + getPlate() + "'" +
            ", billType='" + getBillType() + "'" +
            ", billTypeTitle='" + getBillTypeTitle() + "'" +
            ", street='" + getStreet() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", billId='" + getBillId() + "'" +
            ", amount=" + getAmount() +
            ", externalNumber='" + getExternalNumber() + "'" +
            ", billDate='" + getBillDate() + "'" +
            ", billStatus='" + getBillStatus() + "'" +
            ", cpayTaxId='" + getCpayTaxId() + "'" +
            ", sepandarShare=" + getSepandarShare() +
            ", issuerShare=" + getIssuerShare() +
            "}";
    }
}
