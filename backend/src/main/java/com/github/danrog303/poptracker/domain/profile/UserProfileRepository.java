package com.github.danrog303.poptracker.domain.profile;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Exposes CRUD operations on {@link UserProfile} DynamoDB table.
 */
@Repository
public interface UserProfileRepository extends CrudRepository<UserProfile, String> {
}
