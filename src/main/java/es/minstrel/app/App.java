package es.minstrel.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.io.File;

@SpringBootApplication
public class App 
{

    @Value("${app.folders}")
    private String[] folderPaths;

    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public MessageSource messageSource() {

        ReloadableResourceBundleMessageSource bean = new ReloadableResourceBundleMessageSource();

        bean.setBasename("classpath:messages");
        bean.setDefaultEncoding("UTF-8");

        return bean;
    }

    @Bean
    public LocalValidatorFactoryBean validator() {

        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();

        bean.setValidationMessageSource(messageSource());

        return bean;

    }

    @Bean
    public CommandLineRunner createFoldersAtStartup() {
        return args -> {
            createFoldersIfNotExist(folderPaths);
        };
    }

    private void createFoldersIfNotExist(String... folderPaths) {
        for (String path : folderPaths) {
            File folder = new File(path);
            if (!folder.exists()) {
                boolean created = folder.mkdirs();
                if (created) {
                    System.out.println("Folder created: " + path);
                } else {
                    System.out.println("Failed to create folder: " + path);
                }
            } else {
                System.out.println("Folder already exists: " + path);
            }
        }
    }

}
