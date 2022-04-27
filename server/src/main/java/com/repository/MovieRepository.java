package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>{
	
	@Query("SELECT m FROM Movie m WHERE m.title LIKE %?1%"
	/*
	 * + " OR e.city_name LIKE %?1%" + " OR e.city_state LIKE %?1%" +
	 * " OR e.zip_code LIKE %?1%" + " OR e.location_name LIKE %?1%"
	 */
    )
    public List<Movie> search(String keyword);
	
//	@Query(nativeQuery = true, value = "select * from movies where :location IN locations")
	@Query("SELECT m FROM Movie m WHERE :location in elements(m.locations)")
	public List<Movie> findByLocation(String location);
	

}
