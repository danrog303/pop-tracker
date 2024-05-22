package com.github.danrog303.poptracker.domain.profile;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import com.github.danrog303.poptracker.domain.category.SubcategoryRepository;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import com.github.danrog303.poptracker.services.auth.UserInfo;
import com.github.danrog303.poptracker.services.auth.UserInfoProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Provides basic CRUD operations on {@link UserProfile} instances.
 */
@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final SubcategoryRepository shelfRepository;
    private final UserInfoProvider userInfoProvider;
    private final AuthorizationProvider authorizationProvider;

    /**
     * Retrieves {@link UserProfile} instance from the database.
     * If there is no profile, creates new profile, saves it in the database and then returns.
     */
    @PreAuthorize("isAuthenticated() and @authorizationProvider.authenticatedUserId == #userId")
    @Transactional
    public UserProfile getUserProfile(String userId) {
        Optional<UserProfile> profile = userProfileRepository.findById(userId);

        if (profile.isPresent()) {
            return profile.get();
        } else {
            UserProfile newProfile = createUserProfile(userId);
            userProfileRepository.save(newProfile);
            return newProfile;
        }
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    public UserProfile getCurrentUserProfile() {
        return getUserProfile(authorizationProvider.getAuthenticatedUserId());
    }

    /**
     * Retrieves information about the user from authentication server and
     * creates new user profile for the specified user.
     */
    private UserProfile createUserProfile(String userId) {
        UserInfo userInfo = userInfoProvider.getUserInfo(userId);
        List<Subcategory> subcategories = new ArrayList<>();
        return new UserProfile(userInfo.getNickname(), userInfo.getNickname(), subcategories);
    }
}
