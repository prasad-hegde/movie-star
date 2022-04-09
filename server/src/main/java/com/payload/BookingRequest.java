package com.payload;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingRequest {

	
	private Long movieId;
	
	@NotNull(message = "Number of tickets cannot be empty")
	private String seatTotal;
	
	@NotNull(message = "totalPrice cannot be empty")
    private BigDecimal totalPrice;
	
	private String[] seatNo;
	private String[] seatType;
	private String showTime;
	private Long userId;
	private String venue;
	private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
}
