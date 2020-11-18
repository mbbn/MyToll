package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;

public class TrackingVerificationRequestDto implements Serializable {

    private String exTrackingId;

    public String getExTrackingId() {
        return exTrackingId;
    }

    public void setExTrackingId(String exTrackingId) {
        this.exTrackingId = exTrackingId;
    }
}
