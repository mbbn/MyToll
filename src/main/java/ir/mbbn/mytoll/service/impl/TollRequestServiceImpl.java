package ir.mbbn.mytoll.service.impl;

import ir.mbbn.mytoll.repository.TollRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TollRequest}.
 */
@Service
@Transactional
public class TollRequestServiceImpl implements TollRequestService {

    private final Logger log = LoggerFactory.getLogger(TollRequestServiceImpl.class);

    private final TollRequestRepository tollRequestRepository;

    public TollRequestServiceImpl(TollRequestRepository tollRequestRepository) {
        this.tollRequestRepository = tollRequestRepository;
    }

    @Override
    public TollRequest save(TollRequest tollRequest) {
        log.debug("Request to save TollRequest : {}", tollRequest);
        return tollRequestRepository.save(tollRequest);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TollRequest> findAll() {
        log.debug("Request to get all TollRequests");
        return tollRequestRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TollRequest> findOne(Long id) {
        log.debug("Request to get TollRequest : {}", id);
        return tollRequestRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TollRequest : {}", id);
        tollRequestRepository.deleteById(id);
    }
}
