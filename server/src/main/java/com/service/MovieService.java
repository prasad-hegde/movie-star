package com.service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exceptions.MovieNotFoundException;
import com.model.Movie;
import com.repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    
    public Status saveMovie(Movie movie) throws IOException {
        
    	movieRepository.save(movie);
        return Status.SUCCESS;
    }
    
    public List<Movie> findAllMovies(String keyword) {
        if (keyword != null) {
            return movieRepository.search(keyword);
        }

        //return eventsRepository.search(eventresult.findAll());
        return movieRepository.findAll();
        
       
    }
    
    public Movie getMovieById(Long id) throws MovieNotFoundException{

        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            return movie.get();
        }
		else{	
			
			throw new MovieNotFoundException("Movie not found");
		}	 
        
    }
   
    public List<Movie> filterMoviesByLocation(String locations){
    	
    	List<Movie> movieList = new ArrayList<>();
    	
    	
    	movieList = movieRepository.findByLocation(locations);
		return movieList;
    	 	
    }
    
 
    public List<Movie> listAllMovies() {
        return movieRepository.findAll();
    }
    
    
}