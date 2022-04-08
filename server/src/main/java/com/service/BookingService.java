package com.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.exceptions.MovieNotFoundException;
import com.mapper.BookingMapper;
import com.model.Booking;
import com.model.Movie;
import com.model.User;
import com.payload.BookingOutput;
import com.payload.BookingRequest;
import com.repository.BookingRepository;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;

@Service
@AllArgsConstructor
@Log4j2
public class BookingService {
	
	
	private final BookingRepository bookingRepository;
    private final MovieService movieService;
    private final BookingMapper bookingMapper;
    private final UserService userService;
    
    @SneakyThrows
    @Transactional(rollbackOn = Exception.class)
    public BookingOutput createBooking(@Valid @NotNull BookingRequest bookingRequest) {
        Booking booking = bookingMapper.toBooking(bookingRequest);
        log.info("invoking repository to save the bookings");
        booking = bookingRepository.save(booking);
        Movie movie = movieService.getMovieById(bookingRequest.getMovieId());
        User user = userService.getUserById(bookingRequest.getUserId());
        return BookingOutput.builder().booking(booking).movie(movie).user(user).build();
    }
    
    public List<BookingOutput> getAllBookings() {
        List<BookingOutput> bookingOutput = new ArrayList<>();
        List<Booking> bookings = bookingRepository.findAll();
        bookings.forEach(booking -> {
            Movie movie = movieService.getMovieById(booking.getMovieId());
            User user = userService.getUserById(booking.getUserId());
            bookingOutput.add(BookingOutput.builder().booking(booking).movie(movie).user(user).build());
        });
        return bookingOutput;
    }
    
    public Status saveBooking(Booking booking) throws IOException {
        
    	bookingRepository.save(booking);
        return Status.SUCCESS;
    }
    
    public BookingOutput getBookingById(Long id) throws MovieNotFoundException {

        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            Movie movie = movieService.getMovieById(booking.getMovieId());
            User user = userService.getUserById(booking.getUserId());
            return BookingOutput.builder().booking(booking).movie(movie).user(user).build();
        } else {
            throw new MovieNotFoundException("Booking Id not found");
        }
    }
    
    public List<BookingOutput> getBookingByUserId(Long userId) throws MovieNotFoundException {
        List<BookingOutput> bookingOutput = new ArrayList<>();
        List<Booking> bookings = bookingRepository.findBookingByUserId(userId);
        bookings.forEach(booking -> {
            Movie movie = movieService.getMovieById(booking.getMovieId());
            User user = userService.getUserById(booking.getUserId());
            bookingOutput.add(BookingOutput.builder().booking(booking).movie(movie).user(user).build());
        });
        return bookingOutput;
    }
    
}
