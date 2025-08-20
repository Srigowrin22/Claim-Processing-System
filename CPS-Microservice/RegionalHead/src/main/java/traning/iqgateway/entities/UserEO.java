package traning.iqgateway.entities;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "users")
public class UserEO {

	@Id
	@Field("_id")
	private Integer id;

	@Field("user_name")
	private String userName;

	@Field("user_address")
	private String userAddress;

	@Field("user_email")
	private String userEmail;

	@Field("user_password")
	private String userPassword;

	@Field("hire_date")
	private LocalDate hireDate;

	@Field("is_active")
	private Boolean isActive;

	@Field("role_id")
	private Integer roleId;

	public UserEO() {
		super();
	}

	public UserEO(Integer id, String userName, String userAddress, String userEmail, String userPassword,
			LocalDate hireDate, Boolean isActive, Integer roleId) {
		super();
		this.id = id;
		this.userName = userName;
		this.userAddress = userAddress;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.hireDate = hireDate;
		this.isActive = isActive;
		this.roleId = roleId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public LocalDate getHireDate() {
		return hireDate;
	}

	public void setHireDate(LocalDate hireDate) {
		this.hireDate = hireDate;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

}
