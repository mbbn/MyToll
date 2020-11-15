package ir.mbbn.mytoll.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PayRequest.
 */
@Entity
@Table(name = "pay_request")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PayRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "account_no", nullable = false)
    private String accountNo;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "mobile_number", nullable = false)
    private String mobileNumber;

    @NotNull
    @Column(name = "send_sms", nullable = false)
    private Boolean sendSms;

    @NotNull
    @Column(name = "amount", nullable = false)
    private String amount;

    @NotNull
    @Column(name = "call_back_service", nullable = false)
    private String callBackService;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "pay_request_bills",
               joinColumns = @JoinColumn(name = "pay_request_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "bills_id", referencedColumnName = "id"))
    private Set<Bill> bills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public PayRequest accountNo(String accountNo) {
        this.accountNo = accountNo;
        return this;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getTitle() {
        return title;
    }

    public PayRequest title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public PayRequest mobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        return this;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Boolean isSendSms() {
        return sendSms;
    }

    public PayRequest sendSms(Boolean sendSms) {
        this.sendSms = sendSms;
        return this;
    }

    public void setSendSms(Boolean sendSms) {
        this.sendSms = sendSms;
    }

    public String getAmount() {
        return amount;
    }

    public PayRequest amount(String amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCallBackService() {
        return callBackService;
    }

    public PayRequest callBackService(String callBackService) {
        this.callBackService = callBackService;
        return this;
    }

    public void setCallBackService(String callBackService) {
        this.callBackService = callBackService;
    }

    public Set<Bill> getBills() {
        return bills;
    }

    public PayRequest bills(Set<Bill> bills) {
        this.bills = bills;
        return this;
    }

    public PayRequest addBills(Bill bill) {
        this.bills.add(bill);
        bill.getPayRequestLists().add(this);
        return this;
    }

    public PayRequest removeBills(Bill bill) {
        this.bills.remove(bill);
        bill.getPayRequestLists().remove(this);
        return this;
    }

    public void setBills(Set<Bill> bills) {
        this.bills = bills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PayRequest)) {
            return false;
        }
        return id != null && id.equals(((PayRequest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PayRequest{" +
            "id=" + getId() +
            ", accountNo='" + getAccountNo() + "'" +
            ", title='" + getTitle() + "'" +
            ", mobileNumber='" + getMobileNumber() + "'" +
            ", sendSms='" + isSendSms() + "'" +
            ", amount='" + getAmount() + "'" +
            ", callBackService='" + getCallBackService() + "'" +
            "}";
    }
}
