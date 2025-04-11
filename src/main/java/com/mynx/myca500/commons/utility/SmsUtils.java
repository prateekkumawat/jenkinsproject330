package com.mynx.myca500.commons.utility;

import com.mynx.myca500.commons.config.TwilioProperties;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.twilio.type.PhoneNumber;



@Service
public class SmsUtils {
  private final TwilioProperties twilioProperties;

    @Autowired
   public SmsUtils(TwilioProperties twilioProperties){
       this.twilioProperties = twilioProperties;
   }




    public void sendSms(String toPhoneNumber, String messageContent) {
        Twilio.init(twilioProperties.getAccountSid(), twilioProperties.getAuthToken());

        Message message = Message.creator(
                        new PhoneNumber(toPhoneNumber),
                        new PhoneNumber(twilioProperties.getPhoneNumber()),
                        messageContent)
                .create();

        System.out.println("SMS sent with SID: " + message.getSid());
    }

}
