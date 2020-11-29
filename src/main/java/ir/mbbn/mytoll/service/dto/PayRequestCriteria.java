package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;
import io.github.jhipster.service.filter.ZonedDateTimeFilter;

/**
 * Criteria class for the {@link ir.mbbn.mytoll.domain.PayRequest} entity. This class is used
 * in {@link ir.mbbn.mytoll.web.rest.PayRequestResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /pay-requests?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PayRequestCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private ZonedDateTimeFilter requestTime;

    private StringFilter trackingId;

    private StringFilter shortId;

    private StringFilter accountNo;

    private StringFilter title;

    private LocalDateFilter expirationDate;

    private BooleanFilter sendSms;

    private IntegerFilter amount;

    private StringFilter callBackService;

    private BooleanFilter paid;

    private ZonedDateTimeFilter paymentDate;

    private StringFilter bankTrackingId;

    private StringFilter paymentId;

    private StringFilter customer;

    private LongFilter customerId;

    private LongFilter billsId;

    public PayRequestCriteria() {
    }

    public PayRequestCriteria(PayRequestCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.requestTime = other.requestTime == null ? null : other.requestTime.copy();
        this.trackingId = other.trackingId == null ? null : other.trackingId.copy();
        this.shortId = other.shortId == null ? null : other.shortId.copy();
        this.accountNo = other.accountNo == null ? null : other.accountNo.copy();
        this.title = other.title == null ? null : other.title.copy();
        this.expirationDate = other.expirationDate == null ? null : other.expirationDate.copy();
        this.sendSms = other.sendSms == null ? null : other.sendSms.copy();
        this.amount = other.amount == null ? null : other.amount.copy();
        this.callBackService = other.callBackService == null ? null : other.callBackService.copy();
        this.paid = other.paid == null ? null : other.paid.copy();
        this.paymentDate = other.paymentDate == null ? null : other.paymentDate.copy();
        this.bankTrackingId = other.bankTrackingId == null ? null : other.bankTrackingId.copy();
        this.paymentId = other.paymentId == null ? null : other.paymentId.copy();
        this.customer = other.customer == null ? null : other.customer.copy();
        this.customerId = other.customerId == null ? null : other.customerId.copy();
        this.billsId = other.billsId == null ? null : other.billsId.copy();
    }

    @Override
    public PayRequestCriteria copy() {
        return new PayRequestCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public ZonedDateTimeFilter getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(ZonedDateTimeFilter requestTime) {
        this.requestTime = requestTime;
    }

    public StringFilter getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(StringFilter trackingId) {
        this.trackingId = trackingId;
    }

    public StringFilter getShortId() {
        return shortId;
    }

    public void setShortId(StringFilter shortId) {
        this.shortId = shortId;
    }

    public StringFilter getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(StringFilter accountNo) {
        this.accountNo = accountNo;
    }

    public StringFilter getTitle() {
        return title;
    }

    public void setTitle(StringFilter title) {
        this.title = title;
    }

    public LocalDateFilter getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateFilter expirationDate) {
        this.expirationDate = expirationDate;
    }

    public BooleanFilter getSendSms() {
        return sendSms;
    }

    public void setSendSms(BooleanFilter sendSms) {
        this.sendSms = sendSms;
    }

    public IntegerFilter getAmount() {
        return amount;
    }

    public void setAmount(IntegerFilter amount) {
        this.amount = amount;
    }

    public StringFilter getCallBackService() {
        return callBackService;
    }

    public void setCallBackService(StringFilter callBackService) {
        this.callBackService = callBackService;
    }

    public BooleanFilter getPaid() {
        return paid;
    }

    public void setPaid(BooleanFilter paid) {
        this.paid = paid;
    }

    public ZonedDateTimeFilter getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(ZonedDateTimeFilter paymentDate) {
        this.paymentDate = paymentDate;
    }

    public StringFilter getBankTrackingId() {
        return bankTrackingId;
    }

    public void setBankTrackingId(StringFilter bankTrackingId) {
        this.bankTrackingId = bankTrackingId;
    }

    public StringFilter getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(StringFilter paymentId) {
        this.paymentId = paymentId;
    }

    public StringFilter getCustomer() {
        return customer;
    }

    public void setCustomer(StringFilter customer) {
        this.customer = customer;
    }

    public LongFilter getCustomerId() {
        return customerId;
    }

    public void setCustomerId(LongFilter customerId) {
        this.customerId = customerId;
    }

    public LongFilter getBillsId() {
        return billsId;
    }

    public void setBillsId(LongFilter billsId) {
        this.billsId = billsId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PayRequestCriteria that = (PayRequestCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(requestTime, that.requestTime) &&
            Objects.equals(trackingId, that.trackingId) &&
            Objects.equals(shortId, that.shortId) &&
            Objects.equals(accountNo, that.accountNo) &&
            Objects.equals(title, that.title) &&
            Objects.equals(expirationDate, that.expirationDate) &&
            Objects.equals(sendSms, that.sendSms) &&
            Objects.equals(amount, that.amount) &&
            Objects.equals(callBackService, that.callBackService) &&
            Objects.equals(paid, that.paid) &&
            Objects.equals(paymentDate, that.paymentDate) &&
            Objects.equals(bankTrackingId, that.bankTrackingId) &&
            Objects.equals(paymentId, that.paymentId) &&
            Objects.equals(customer, that.customer) &&
            Objects.equals(customerId, that.customerId) &&
            Objects.equals(billsId, that.billsId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        requestTime,
        trackingId,
        shortId,
        accountNo,
        title,
        expirationDate,
        sendSms,
        amount,
        callBackService,
        paid,
        paymentDate,
        bankTrackingId,
        paymentId,
        customer,
        customerId,
        billsId
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PayRequestCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (requestTime != null ? "requestTime=" + requestTime + ", " : "") +
                (trackingId != null ? "trackingId=" + trackingId + ", " : "") +
                (shortId != null ? "shortId=" + shortId + ", " : "") +
                (accountNo != null ? "accountNo=" + accountNo + ", " : "") +
                (title != null ? "title=" + title + ", " : "") +
                (expirationDate != null ? "expirationDate=" + expirationDate + ", " : "") +
                (sendSms != null ? "sendSms=" + sendSms + ", " : "") +
                (amount != null ? "amount=" + amount + ", " : "") +
                (callBackService != null ? "callBackService=" + callBackService + ", " : "") +
                (paid != null ? "paid=" + paid + ", " : "") +
                (paymentDate != null ? "paymentDate=" + paymentDate + ", " : "") +
                (bankTrackingId != null ? "bankTrackingId=" + bankTrackingId + ", " : "") +
                (paymentId != null ? "paymentId=" + paymentId + ", " : "") +
                (customer != null ? "customer=" + customer + ", " : "") +
                (customerId != null ? "customerId=" + customerId + ", " : "") +
                (billsId != null ? "billsId=" + billsId + ", " : "") +
            "}";
    }

}
