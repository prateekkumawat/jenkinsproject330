package com.mynx.myca500.commons.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Configuration
@Component
@ConfigurationProperties(prefix = "twilio")
@Data
@Primary
public class TwilioProperties {
    private String accountSid;
    private String authToken;
    private String phoneNumber;

}