package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;

public class MPayBillRequestDto implements Serializable {

    private String[] bills;
    private String exTrackingId;

    public String[] getBills() {
        return bills;
    }

    public void setBills(String[] bills) {
        this.bills = bills;
    }

    public String getExTrackingId() {
        return exTrackingId;
    }

    public void setExTrackingId(String exTrackingId) {
        this.exTrackingId = exTrackingId;
    }
}
