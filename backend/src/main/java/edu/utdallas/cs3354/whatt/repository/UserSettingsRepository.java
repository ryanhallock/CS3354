package edu.utdallas.cs3354.whatt.repository;

import edu.utdallas.cs3354.whatt.entity.UserSettings;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    Optional<UserSettings> findByUserId(String userId);
}
