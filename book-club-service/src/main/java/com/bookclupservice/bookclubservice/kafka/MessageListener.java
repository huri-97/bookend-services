package com.bookclupservice.bookclubservice.kafka;

import com.bookclupservice.bookclubservice.payload.KafkaUserRegistered;
import com.bookclupservice.bookclubservice.service.ClubService;
import com.bookclupservice.bookclubservice.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class MessageListener {

    @Autowired
    MemberService memberService;

    @KafkaListener(topics = "user-registered",
            groupId ="bookclub")
    public void saveUser(String message) {
        System.out.println(message);
        ObjectMapper mapper = new ObjectMapper();
        try {
            KafkaUserRegistered kafkaUserRegistered = mapper.readValue(message, KafkaUserRegistered.class);
            memberService.save(kafkaUserRegistered.getId(),kafkaUserRegistered.getUserName());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
