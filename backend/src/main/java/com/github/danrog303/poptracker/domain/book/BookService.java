package com.github.danrog303.poptracker.domain.book;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import com.github.danrog303.poptracker.domain.category.SubcategoryService;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final SubcategoryService subcategoryService;
    private final AuthorizationProvider authorizationProvider;

    @PreAuthorize("isAuthenticated()")
    public List<Book> findBooksOfSubcategory(String subcategoryId) {
        Subcategory subcategory = subcategoryService.getCategoryById(subcategoryId);
        return bookRepository.findAllBySubcategorySubcategoryId(subcategory.getSubcategoryId());
    }

    @PreAuthorize("isAuthenticated()")
    public Book getBookById(String bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        if (!book.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        return book;
    }

    @PreAuthorize("isAuthenticated()")
    public Book deleteBook(String bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        if (!book.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        bookRepository.deleteById(bookId);
        return book;
    }

    @PreAuthorize("isAuthenticated()")
    public Book createBook(String subcategoryId, Book book) {
        Subcategory subcategory = subcategoryService.getCategoryById(subcategoryId);
        book.setBookId(null);
        book.setSubcategory(subcategory);
        bookRepository.save(book);
        return book;
    }

    @PreAuthorize("isAuthenticated()")
    public Book modifyBook(String bookId, Book book) {
        Book b = bookRepository.findById(bookId).orElseThrow();
        if (!b.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        book.setBookId(bookId);
        book.setSubcategory(b.getSubcategory());
        book.setEntryCreationDate(b.getEntryCreationDate());
        return bookRepository.save(book);
    }
}
