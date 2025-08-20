package traning.iqgateway.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import traning.iqgateway.entities.CoversEO;
import traning.iqgateway.entities.CustomerEO;
import traning.iqgateway.entities.CustomerEO.PolicyEntry;
import traning.iqgateway.repository.CoversRepository;
import traning.iqgateway.repository.CustomerRepository;
import traning.iqgateway.service.CoversService;

@Service
public class CoversServiceImpl implements CoversService {

	@Autowired
	private CoversRepository coverRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Override
	public List<CoversEO> getAllCovers() {
		return coverRepository.findAll();
	}

	@Override
	public List<CoversEO> getCoversByCustomerId(Integer customerId) {
		CustomerEO customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));

		List<Integer> coverIds = customer.getPolicies().stream().map(PolicyEntry::getCoverId)
				.collect(Collectors.toList());

		if (coverIds.isEmpty()) {
			return List.of(); // empty list
		}

		Iterable<CoversEO> iterable = coverRepository.findAllById(coverIds);

		return StreamSupport.stream(iterable.spliterator(), false).collect(Collectors.toList());
	}
}
