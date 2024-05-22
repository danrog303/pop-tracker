package com.github.danrog303.poptracker.domain.book;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Column @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String bookId;

    @Column
    @CreationTimestamp
    private Date entryCreationDate;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.REMOVE})
    private Subcategory subcategory;

    @Column
    private String name;

    @Column
    private int rating;

    @Column
    private BookStatus status;

    @Column
    private String author;

    @Column
    private int pagesNumber;
}
