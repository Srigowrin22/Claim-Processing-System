package training.iqgateway.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class MongoConfig {

   @Autowired
   private MappingMongoConverter mappingMongoConverter;

   // This method runs after bean initialization
   @javax.annotation.PostConstruct
   public void setUp() {
       // Remove _class field from the Mongo documents globally
       mappingMongoConverter.setTypeMapper(new DefaultMongoTypeMapper(null));
   }
}