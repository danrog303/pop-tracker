package com.github.danrog303.poptracker.domain.profile;

import com.github.danrog303.poptracker.domain.category.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;

/**
 * Exposes REST endpoints with basic operations on user's profile.
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserProfileController {
    private final AwsCredentialsProvider awsCredentials;
    private final Region awsRegion;
    private final UserProfileService userProfileService;
    private final SubcategoryRepository repo;

    @GetMapping("/{userId}")
    public UserProfile getUserProfile(@PathVariable String userId) {
        return userProfileService.getUserProfile(userId);
    }
}
