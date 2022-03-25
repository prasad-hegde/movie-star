package com.payload;

import lombok.Data;

@Data
public class MailRequest {

    private String name;
    private String to;
    private String from;
    private String subject;
    private String event_date;
    private String location;
    private String price;
    private String status;
    private String n_person;
    private String event_title;
}
