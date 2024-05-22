package com.github.danrog303.poptracker.domain.book;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import com.github.danrog303.poptracker.domain.category.SubcategoryService;
import com.github.danrog303.poptracker.domain.movie.Movie;
import com.github.danrog303.poptracker.domain.movie.MovieRepository;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
@AllArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final SubcategoryService subcategoryService;
    private final AuthorizationProvider authorizationProvider;

    @PreAuthorize("isAuthenticated()")
    public List<Movie> findMoviesOfSubcategory(String subcategoryId) {
        Subcategory subcategory = subcategoryService.getCategoryById(subcategoryId);
        return movieRepository.findAllBySubcategorySubcategoryId(subcategory.getSubcategoryId());
    }

    @PreAuthorize("isAuthenticated()")
    public Movie getMoviesById(String movieId) {
        Movie movie = movieRepository.findById(movieId).orElseThrow();
        if (!movie.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        return movie;
    }

    @PreAuthorize("isAuthenticated()")
    public Movie deleteMovie(String movieId) {
        Movie movie = movieRepository.findById(movieId).orElseThrow();
        if (!movie.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        movieRepository.deleteById(movieId);
        return movie;
    }

    @PreAuthorize("isAuthenticated()")
    public Movie createMovie(String subcategoryId, Movie movie) {
        Subcategory subcategory = subcategoryService.getCategoryById(subcategoryId);
        movie.setMovieId(null);
        movie.setSubcategory(subcategory);
        movieRepository.save(movie);
        return movie;
    }

    @PreAuthorize("isAuthenticated()")
    public Movie modifyMovie(String movieId, Movie movie) {
        Movie m = movieRepository.findById(movieId).orElseThrow();
        if (!m.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        movie.setMovieId(movieId);
        movie.setSubcategory(m.getSubcategory());
        movie.setEntryCreationDate(m.getEntryCreationDate());
        return movieRepository.save(movie);
    }
}
