package com.github.danrog303.poptracker.domain.game;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class Game {
    @Column @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String gameId;

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
    private GameStatus status;

    @Column
    private double percentage;

    @Column
    private String platform;
}
