/*
 * package com.controller;
 * 
 * import java.io.IOException;
 * 
 * import javax.validation.Valid;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.web.bind.annotation.PostMapping; import
 * org.springframework.web.bind.annotation.RequestBody;
 * 
 * import com.model.Movie; import com.service.MovieService; import
 * com.service.Status;
 * 
 * public class MovieController {
 * 
 * 
 * @Autowired private MovieService movieService;
 * 
 * @PostMapping(value="/add") public Status addMovie(@Valid @RequestBody Movie
 * movie) throws IOException { movieService.saveMovie(movie); return
 * Status.SUCCESS; }
 * 
 * 
 * 
 * }
 */