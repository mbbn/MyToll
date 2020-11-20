package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.config.SchedulerConfiguration;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.domain.enumeration.BillStatus;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import ir.mbbn.mytoll.service.dto.PaymentDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.List;

@Component("scheduledTasks")
public class ScheduledTasks {

    private final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private final PayRequestRepository payRequestRepository;
    private final PaymentService paymentService;
    private final TollRequestService tollRequestService;

    private ZonedDateTime startDepositTime;

    public ScheduledTasks(PayRequestRepository payRequestRepository, PaymentService paymentService, TollRequestService tollRequestService) {
        this.payRequestRepository = payRequestRepository;
        this.paymentService = paymentService;
        this.tollRequestService = tollRequestService;
    }

    @Scheduled(fixedRate = SchedulerConfiguration.DURATION_TIME, initialDelay = 1000)
    public void depositBills(){
        if(startDepositTime == null){
            payRequestRepository.getFirstByPaidIsNull().ifPresent(payRequest -> startDepositTime = payRequest.getRequestTime().minusHours(1));
        }
        List<PaymentDto> paidList = paymentService.paid(startDepositTime, ZonedDateTime.now());
        for(PaymentDto paymentDto:paidList){
            PayRequest payRequest = payRequestRepository.findOneByTrackingId(paymentDto.getTrackingId()).orElse(null);
            if(payRequest != null){
                payRequest.setPaid(true);
//                payRequest.setPaymentDate(paymentDto.getPaymentDate());
//                payRequest.setBankTrackingId(paymentDto.getBankTrackingId());
//                tollRequestService.mPayBill(payRequest);
            }
        }
    }

    @Scheduled(cron = "0 0 1/8 * * *")
    public void expirePayRequest(){
        for (PayRequest payRequest : payRequestRepository.findAllExpireRequest()) {
            payRequest.setPaid(false);
            for(Bill bill:payRequest.getBills()){
                if(!BillStatus.DEPOSIT.equals(bill.getBillStatus())){
                    bill.setBillStatus(BillStatus.UNPAID);
                }
            }
            payRequestRepository.save(payRequest);
        }
    }
}
