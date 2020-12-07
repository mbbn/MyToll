package ir.mbbn.mytoll.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("scheduledTasks")
public class ScheduledTasks {

    private final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    public ScheduledTasks() {
    }

    /*@Scheduled(cron = "0 0 0/4 * * *")
    public void depositBills(){
        Optional<PayRequest> optionalPayRequest = payRequestRepository.getFirstByPaidIsNull();
        optionalPayRequest.ifPresent(firstUnpaidRequest -> {
            LocalDateTime startDepositTime = firstUnpaidRequest.getRequestTime().toLocalDateTime();
            List<PaymentDto> paidList = paymentService.paid(startDepositTime, LocalDateTime.now());
            for(PaymentDto paymentDto:paidList){
                PayRequest payRequest = payRequestRepository.findOneByShortIdAndPaidIsNull(paymentDto.getShortId()).orElse(null);
                if (payRequest != null) {
                    payRequest.setPaid(true);
                    payRequest.setPaymentDate(paymentDto.getPaymentDate());
                    payRequest.setBankTrackingId(paymentDto.getBankTrackingId());
                    payRequest.setPaymentId(paymentDto.getPaymentId());
                    payRequest.getBills().forEach(bill -> bill.setBillStatus(BillStatus.DEPOSIT));
                    payRequestRepository.save(payRequest);
                }
            }
        });
    }*/
}
