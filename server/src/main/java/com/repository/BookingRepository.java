package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

	@Query("SELECT b FROM Booking b WHERE b.userId = :userId")
    List<Booking> findBookingByUserId(long userId);
	
	@Query("SELECT b FROM Booking b WHERE b.email = :email")
    List<Booking> findBookingByEmail(String email);
	
	
//	@Query("SELECT b FROM Booking b WHERE b.venue = :venue AND b.movieId = :movieId")
	@Query(value = "SELECT * FROM Booking b WHERE b.venue = ?1 AND b.movie_id = ?2 AND b.show_time = ?3 AND b.location = ?4", nativeQuery = true)
	List<Booking> findReservedSeats(String venue , Long movieId , String showTime , String location);
	
	
}
 