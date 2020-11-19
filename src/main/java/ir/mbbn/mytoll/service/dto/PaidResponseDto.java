package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.List;

public class PaidResponseDto implements Serializable {

    private List<PaymentDto> payments;
    private Integer count;

    public List<PaymentDto> getPayments() {
        return payments;
    }

    public void setPayments(List<PaymentDto> payments) {
        this.payments = payments;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
