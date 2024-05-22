package com.github.danrog303.poptracker.domain.movie;

import com.github.danrog303.poptracker.domain.book.MovieService;
import com.github.danrog303.poptracker.domain.category.SubcategoryService;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class MovieController {
    private final MovieService movieService;
    private final SubcategoryService subcategoryService;
    private final AuthorizationProvider authorizationProvider;

    @GetMapping("/subcategories/{subcategoryId}/movies")
    public List<Movie> findBooksOfSubcategory(@PathVariable String subcategoryId) {
        return movieService.findMoviesOfSubcategory(subcategoryId);
    }

    @GetMapping("/movies/{bookId}")
    public Movie getBookById(@PathVariable String bookId) {
        return movieService.getMoviesById(bookId);
    }

    @DeleteMapping("/movies/{bookId}")
    public Movie deleteBook(@PathVariable String bookId) {
        return movieService.deleteMovie(bookId);
    }

    @PostMapping("/subcategories/{subcategoryId}/movies")
    public Movie createBook(@PathVariable String subcategoryId,
                           @RequestBody Movie movie) {
        return movieService.createMovie(subcategoryId, movie);
    }

    @PutMapping("/movies/{bookId}")
    public Movie modifyBook(@PathVariable String bookId,
                           @RequestBody Movie movie) {
        return movieService.modifyMovie(bookId, movie);
    }
}
