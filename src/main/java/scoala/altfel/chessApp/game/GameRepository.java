package scoala.altfel.chessApp.game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
	@Query("SELECT g FROM Game g WHERE g.playerId1 = :playerId1 AND g.playerId2 = :playerId2 AND g.result = 'Still playing'")
	Optional<Game> findCurrentGame(@Param("playerId1") Long playerId1,
									 @Param("playerId2") Long playerId2);
}
