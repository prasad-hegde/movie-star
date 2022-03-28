package com.model;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

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
    private long movie_id;
	
	@Column(name="title", length = 256, nullable = true)
    private String title;
	
	@Column(name="synopsis" , length = 2000)
    private String synopsis;
	
	@Column(name="language", length = 100)
    private String language;
	
	@Column(name="type", length = 20)
    private String type;
	
	@Column(name="runtime", length = 18)
    private String runtime;

    @Column(name="genre", length = 200)
    private String genre;
    
    
    @Column(name="locations" , length = 200)
    private String[] locations;
//    private String locations;
    
    
    @Column(name="theatres" , length = 200)
    private String[] theatres;
//        private String theatres;
    
    
    public String[] getLocations() {
        return locations;
    }

    public void setLocations(String[] locations) {
    	
    	
        this.locations = locations;
    }
    
    public String[] getTheatres() {
        return theatres;
    }

    public void setTheatres(String[] theatres) {
        this.theatres = theatres;
    }
    
    
}
