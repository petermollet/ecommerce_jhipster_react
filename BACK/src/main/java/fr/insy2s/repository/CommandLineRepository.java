package fr.insy2s.repository;

import fr.insy2s.domain.CommandLine;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CommandLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandLineRepository extends JpaRepository<CommandLine, Long> {
}
