package com.controller;
import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Movie;
import com.service.MovieService;
import com.service.Status;

@RestController
@RequestMapping("/movies")
@CrossOrigin
public class MovieController {
	
	@Autowired
	private MovieService movieService;
	
	//publish movies
	@PostMapping(value="/publish")
	@CrossOrigin
	public Status addMovie(@Valid @RequestBody Movie movie) throws IOException 
	{ 
		System.out.print("inside publish movie");
		movieService.saveMovie(movie);
		return Status.SUCCESS; 
	}
	
	
	//find movies using keyword
	@GetMapping("/findAll")
	@CrossOrigin
	public List<Movie> findEvents(Model model, @Param("keyword") String keyword){
	    List<Movie> listMovies = movieService.findAllMovies(keyword);
	   
		
		 model.addAttribute("listMovies", listMovies);
		 model.addAttribute("keyword",keyword);
		 return listMovies;
		 
	}
	
	//get all movies
	@GetMapping(value = "/all")
	@CrossOrigin
    	public ResponseEntity getAllEvents() {
        	return ResponseEntity.ok(movieService.listAllMovies());
    	}
	
}