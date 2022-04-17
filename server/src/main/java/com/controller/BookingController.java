package com.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.model.Booking;
import com.model.Movie;
import com.payload.BookingOutput;
import com.payload.BookingRequest;
import com.service.BookingService;
import com.service.Status;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class BookingController {
	
	
	private final BookingService bookingService;

    @PostMapping(
            value = "/booking",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookingOutput> createBooking(@Valid @RequestBody BookingRequest bookingRequest) {
        return ResponseEntity.ok(bookingService.createBooking(bookingRequest));
    }
    
    
    @PostMapping(
            value = "/createBooking",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Booking createBooking(@Valid @RequestBody Booking booking) throws IOException{
        
    	bookingService.saveBooking(booking);
//		return Status.SUCCESS;
    	return booking;
    }
    
    
    @GetMapping(value = "/booking/all")
    public ResponseEntity<List<BookingOutput>> getAllBooking() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    
    @GetMapping(value = "/booking/{id}")
    public ResponseEntity<BookingOutput> getBookingById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }
    
    
    /*@GetMapping(value = "/booking/user/{email}")
    public ResponseEntity<List<BookingOutput>> getBookingGuest(@PathVariable("email") String email) {
        return ResponseEntity.ok(bookingService.getBookingByEmail(email));
    }*/
    
    @GetMapping(value = "/booking/user")
    public ResponseEntity<List<BookingOutput>> getBookingUsingEmail(@Param("email") String email){
    	
    	return ResponseEntity.ok(bookingService.getBookingByEmail(email));
    }

    /*@GetMapping(value = "/booking/user/{user_id}")
    public ResponseEntity<List<BookingOutput>> getBookingByUserId(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(bookingService.getBookingByUserId(userId));
    }*/
    
    
    //get reserved seats at a theatre
    @PostMapping(value= "/booking/reserved" ,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Booking> getSeatsReserved(@RequestBody Booking booking){
    	
    	
    	List<Booking> booking1 = bookingService.getReservedSeats(booking);
    	
    	return booking1;
    	
    }
    
    
}
