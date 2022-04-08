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
	
}
