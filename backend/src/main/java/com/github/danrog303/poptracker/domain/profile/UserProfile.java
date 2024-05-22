package com.github.danrog303.poptracker.domain.profile;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class UserProfile {
    @Column @Id
    private String userId;

    @Column
    private String nickname;

    @Column
    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Subcategory> subcategories;
}
