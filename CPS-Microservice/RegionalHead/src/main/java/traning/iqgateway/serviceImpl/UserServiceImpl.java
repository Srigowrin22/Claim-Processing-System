package traning.iqgateway.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import traning.iqgateway.entities.UserEO;
import traning.iqgateway.repository.UserRepository;
import traning.iqgateway.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserEO getUserById(Integer id) {
		Optional<UserEO> user = userRepository.findById(id);
		return user.orElse(null);
	}

	@Override
	public UserEO updateIsActive(Integer id, Boolean isActive) {
		Optional<UserEO> userOpt = userRepository.findById(id);
		if (userOpt.isEmpty()) {
			return null;
		}
		UserEO user = userOpt.get();
		user.setIsActive(isActive);
		return userRepository.save(user);
	}
}
