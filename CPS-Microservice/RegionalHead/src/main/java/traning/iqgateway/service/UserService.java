package traning.iqgateway.service;

import traning.iqgateway.entities.UserEO;

public interface UserService {
	
	UserEO getUserById(Integer id);

    UserEO updateIsActive(Integer id, Boolean isActive);


}
