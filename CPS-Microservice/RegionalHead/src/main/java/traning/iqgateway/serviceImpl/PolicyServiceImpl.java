package traning.iqgateway.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import traning.iqgateway.repository.PolicyRepository;
import traning.iqgateway.service.PolicyService;

@Service
public class PolicyServiceImpl implements PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Override
    public long getPolicyCount() {
        return policyRepository.count();
    }
}
