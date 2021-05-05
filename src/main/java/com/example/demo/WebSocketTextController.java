package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketTextController {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/send/general")
    public ResponseEntity sendGeneralMessage(@RequestBody TextMessageDto textMessageDto) {
        template.convertAndSend(Topic.GENERAL_MESSAGE, textMessageDto);
        return ResponseEntity.ok().body(textMessageDto);
    }

    @PostMapping("/send/user/{id}")
    public ResponseEntity sendUserMessage(@PathVariable("id") Integer id, @RequestBody TextMessageDto textMessageDto) {
        UserMessageDto userMessageDto = UserMessageDto.builder().id(id).message(textMessageDto.getMessage()).build();
        template.convertAndSend(Topic.USER_MESSAGE, userMessageDto);
        return ResponseEntity.ok().body(userMessageDto);
    }

    @MessageMapping("/general") //STOPM client uses this path to send messages to relevant topic
    @SendTo(Topic.GENERAL_MESSAGE)
    public TextMessageDto broadcastGeneralMessage(@Payload TextMessageDto textMessageDto) {
        return textMessageDto;
    }

    @MessageMapping("/user/{id}")
    @SendTo(Topic.USER_MESSAGE)
    public UserMessageDto broadcastUserMessage(@DestinationVariable Integer id, @Payload TextMessageDto textMessageDto) {
        return UserMessageDto.builder().id(id).message(textMessageDto.getMessage()).build();
    }

}