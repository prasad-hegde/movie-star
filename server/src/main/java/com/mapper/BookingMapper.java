package com.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.model.Booking;
import com.payload.BookingRequest;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class BookingMapper {
	
	public Booking toBooking(BookingRequest bookingRequest) {
        return Booking.builder()
                .totalPrice(bookingRequest.getTotalPrice())
                .movieId(bookingRequest.getMovieId())
                .seatTotal(bookingRequest.getSeatTotal())
                .seatNo(bookingRequest.getSeatNo())
                .showTime(bookingRequest.getShowTime())
                .venue(bookingRequest.getVenue())
                .userId(bookingRequest.getUserId())
                .updatedOn(bookingRequest.getUpdatedOn())
                .createdOn(LocalDateTime.now())
                .build();
    }
}
