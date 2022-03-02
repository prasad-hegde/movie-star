package com.model;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.Date;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class Movie {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="movie_id")
    private Long id;
	
	@Column(name="title", length = 256, nullable = true)
    private String title;
	
	@Column(name="description" , length = 2000)
    private String description;

    @Column(name="genre", length = 20)
    private String genre;

    @Column(name="movie_image")
    String movie_image;
    
    
	
	
}
