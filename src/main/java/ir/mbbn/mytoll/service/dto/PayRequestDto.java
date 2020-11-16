package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;

public class PayRequestDto implements Serializable {

    private String accountNo;
    private String title;
    private String[] externalId;
    private String expirationDate;
    private String mobileNumber;
    private Boolean sendSms;
    private Boolean sendEmail;
    private Integer amount;
    private String callBackUrl;
    private String failureCallBackUrl;
    private String callBackService;
    private String source;

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getExternalId() {
        return externalId;
    }

    public void setExternalId(String[] externalId) {
        this.externalId = externalId;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Boolean getSendSms() {
        return sendSms;
    }

    public void setSendSms(Boolean sendSms) {
        this.sendSms = sendSms;
    }

    public Boolean getSendEmail() {
        return sendEmail;
    }

    public void setSendEmail(Boolean sendEmail) {
        this.sendEmail = sendEmail;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCallBackUrl() {
        return callBackUrl;
    }

    public void setCallBackUrl(String callBackUrl) {
        this.callBackUrl = callBackUrl;
    }

    public String getFailureCallBackUrl() {
        return failureCallBackUrl;
    }

    public void setFailureCallBackUrl(String failureCallBackUrl) {
        this.failureCallBackUrl = failureCallBackUrl;
    }

    public String getCallBackService() {
        return callBackService;
    }

    public void setCallBackService(String callBackService) {
        this.callBackService = callBackService;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
