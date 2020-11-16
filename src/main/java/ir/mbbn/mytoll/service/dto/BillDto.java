package ir.mbbn.mytoll.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.time.ZonedDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BillDto implements Serializable {

    private BillTypeDto billType;
    private ExtraInfoDto extraInfo;
    private String _id;
    private int amount;
    private String externalNumber;
    private ZonedDateTime billDate;

    public BillTypeDto getBillType() {
        return billType;
    }

    public void setBillType(BillTypeDto billType) {
        this.billType = billType;
    }

    public ExtraInfoDto getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(ExtraInfoDto extraInfo) {
        this.extraInfo = extraInfo;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getExternalNumber() {
        return externalNumber;
    }

    public void setExternalNumber(String externalNumber) {
        this.externalNumber = externalNumber;
    }

    public ZonedDateTime getBillDate() {
        return billDate;
    }

    public void setBillDate(ZonedDateTime billDate) {
        this.billDate = billDate;
    }
}
