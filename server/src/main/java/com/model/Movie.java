package com.model;

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
	
	@Column(name="type", length = 30)
    private String type;
	
	@Column(name="runtime", length = 8)
    private String runtime;

    @Column(name="genre", length = 200)
    private String genre;
    
    
    @ElementCollection
    private List<String> locations;
    
    
    @ElementCollection
    private List<String> theatres;
   
    
//    @Column(name="locations" , length = 200)
//    private String[] locations;
//    private String locations;
    
    
//    @Column(name="theatres" , length = 200)
//    private String[] theatres;
//  private String theatres;
    
    @Column(name="image" , length = 10485760 , nullable = true)
    private String image;
    
    /*
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
    }*/
    
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    
    /*public byte[] getImage(byte[] image) {
    	
    	return image;
    }
    
    public void setImage(byte[] image) {
    	
    	this.image = image;
    }*/
    
}
