package com.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "booking")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class Booking {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booking_id")
    private Long bookingId;
	
	@Column(name="movie_id")
	private Long movieId;
	
	@Column(name="user_id")
    private Long userId;
	
	@JsonFormat(pattern="MM-dd-yyyy HH:mm:ss")
	@Column(name="show_time")
    private LocalDateTime showTime;
	
	@Column(name="seat_no")
	private String[] seatNo;
	
	@Column(name="seat_type")
	private String[] seatType;
	
	@Column(name="total_price")
	private BigDecimal totalPrice;
	
	@Column(name = "venue")
	private String venue;
	
	@Column(name="seat_total")
	private String seatTotal;
	
	@Column(name="theatre")
	private String theatre;
	
	@CreationTimestamp
    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @UpdateTimestamp
    @Column(name = "updated_on")
    private LocalDateTime updatedOn;
	
	
}
