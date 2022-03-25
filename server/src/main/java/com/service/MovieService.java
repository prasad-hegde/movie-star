package com.service;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
   
    
    public List<Movie> listAllMovies() {
        return movieRepository.findAll();
    }

}