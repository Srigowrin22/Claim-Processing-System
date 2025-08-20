package traning.iqgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class CustomerMicroserviceApplication {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate(); // plain RestTemplate, no @LoadBalanced
    }

    public static void main(String[] args) {
        SpringApplication.run(CustomerMicroserviceApplication.class, args);
    }
}
