package com.github.danrog303.poptracker.domain.book;

import com.github.danrog303.poptracker.domain.category.SubcategoryService;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class BookController {
    private final BookService bookService;
    private final SubcategoryService subcategoryService;
    private final AuthorizationProvider authorizationProvider;

    @GetMapping("/subcategories/{subcategoryId}/books")
    public List<Book> findBooksOfSubcategory(@PathVariable String subcategoryId) {
        return bookService.findBooksOfSubcategory(subcategoryId);
    }

    @GetMapping("/books/{bookId}")
    public Book getBookById(@PathVariable String bookId) {
        return bookService.getBookById(bookId);
    }

    @DeleteMapping("/books/{bookId}")
    public Book deleteBook(@PathVariable String bookId) {
        return bookService.deleteBook(bookId);
    }

    @PostMapping("/subcategories/{subcategoryId}/books")
    public Book createBook(@PathVariable String subcategoryId,
                           @RequestBody Book book) {
        return bookService.createBook(subcategoryId, book);
    }

    @PutMapping("/books/{bookId}")
    public Book modifyBook(@PathVariable String bookId,
                           @RequestBody Book book) {
        return bookService.modifyBook(bookId, book);
    }
}
