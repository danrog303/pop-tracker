package com.github.danrog303.poptracker.domain.category;

import com.github.danrog303.poptracker.domain.profile.UserProfile;
import com.github.danrog303.poptracker.domain.profile.UserProfileRepository;
import com.github.danrog303.poptracker.domain.profile.UserProfileService;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
@AllArgsConstructor
public class SubcategoryService {
    private final UserProfileService userProfileService;
    private final UserProfileRepository userProfileRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final AuthorizationProvider authorizationProvider;

    @PreAuthorize("isAuthenticated()")
    public List<Subcategory> getAllCategoriesOfUser() {
        return subcategoryRepository.findByOwnerUserId(authorizationProvider.getAuthenticatedUserId());
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    public Subcategory createCategory(Subcategory subcategory) {
        String currentUserId = authorizationProvider.getAuthenticatedUserId();
        UserProfile up = userProfileRepository.findById(currentUserId).orElseThrow();
        subcategory.setOwner(up);
        subcategory.setSubcategoryId(null);
        subcategoryRepository.save(subcategory);
        return subcategory;
    }

    @PreAuthorize("isAuthenticated()")
    public Subcategory modifyCategory(String subcategoryId, Subcategory subcategory) {
        Subcategory subcat = subcategoryRepository.getReferenceById(subcategoryId);
        if (!subcat.getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        subcat.setName(subcategory.getName());
        subcategoryRepository.save(subcat);
        return subcat;
    }

    @PreAuthorize("isAuthenticated()")
    public Subcategory deleteCategory(String subcategoryId) {
        Subcategory subcategory = subcategoryRepository.getReferenceById(subcategoryId);
        if (!subcategory.getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        subcategoryRepository.deleteById(subcategoryId);
        return subcategory;
    }

    @PreAuthorize("isAuthenticated()")
    public Subcategory getCategoryById(String subcategoryId) {
        Subcategory subcategory = subcategoryRepository.findById(subcategoryId).orElseThrow();
        if (! subcategory.getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }
        return subcategory;
    }
}
