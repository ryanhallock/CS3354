package edu.utdallas.cs3354.whatt.repository;

import edu.utdallas.cs3354.whatt.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
