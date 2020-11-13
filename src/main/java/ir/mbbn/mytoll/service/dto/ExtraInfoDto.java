package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;

public class ExtraInfoDto implements Serializable {

    private String street;
    private ZonedDateTime from;
    private ZonedDateTime to;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public ZonedDateTime getFrom() {
        return from;
    }

    public void setFrom(ZonedDateTime from) {
        this.from = from;
    }

    public ZonedDateTime getTo() {
        return to;
    }

    public void setTo(ZonedDateTime to) {
        this.to = to;
    }
}
