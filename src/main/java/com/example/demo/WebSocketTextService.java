package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class WebSocketTextService {
    @Autowired
    SimpMessagingTemplate template;

    @Scheduled(fixedRate = 2000)
    public void messageRunner() {
        Random rand = new Random();
        int upperbound = 100;
        template.convertAndSend(Topic.MESSAGE, TextMessageDto.builder().message(String.valueOf(rand.nextInt(upperbound))).build());
    }

}
