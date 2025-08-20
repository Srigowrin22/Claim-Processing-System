package traning.iqgateway.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import traning.iqgateway.repository.HospitalRepository;
import traning.iqgateway.service.HospitalService;

@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public long getHospitalCount() {
        return hospitalRepository.count();
    }
}
