package com.github.danrog303.poptracker.domain.category;

import com.github.danrog303.poptracker.domain.book.Book;
import com.github.danrog303.poptracker.domain.game.Game;
import com.github.danrog303.poptracker.domain.profile.UserProfile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subcategory {
    @Column @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String subcategoryId;

    @Column
    private SubcategoryType type;

    @Column
    private String name;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private UserProfile owner;
}
