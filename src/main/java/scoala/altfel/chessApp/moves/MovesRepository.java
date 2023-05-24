package scoala.altfel.chessApp.moves;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovesRepository extends JpaRepository<Moves, Long> {
	@Query("SELECT m FROM Moves m WHERE m.gameid = :gameid AND m.id = (SELECT MAX(m2.id) FROM Moves m2 WHERE m2.gameid = :gameid)")
	Optional<Moves> findCurrentMove(@Param("gameid") Long gameid);
}
