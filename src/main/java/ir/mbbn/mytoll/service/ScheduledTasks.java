package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.config.SchedulerConfiguration;
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

    private ZonedDateTime startDepositTime;

    public ScheduledTasks(PayRequestRepository payRequestRepository, PaymentService paymentService) {
        this.payRequestRepository = payRequestRepository;
        this.paymentService = paymentService;
    }

    @Scheduled(fixedRate = SchedulerConfiguration.DURATION_TIME, initialDelay = 120000)
    public void depositBills(){
        if(startDepositTime == null){
            payRequestRepository.getFirstByDepositTimeIsNull().ifPresent(payRequest -> startDepositTime = payRequest.getRequestTime());
        }
        List<PaymentDto> paidList = paymentService.paid(startDepositTime, ZonedDateTime.now());
    }
}
