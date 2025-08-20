package traning.iqgateway.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import traning.iqgateway.repository.CustomerRepository;
import traning.iqgateway.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public long getCustomerCount() {
        return customerRepository.count();
    }
}
