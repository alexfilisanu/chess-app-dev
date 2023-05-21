package scoala.altfel.chessApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import scoala.altfel.chessApp.game.GameMapper;
import scoala.altfel.chessApp.moves.MovesMapper;
import scoala.altfel.chessApp.player.PlayerMapper;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
public class ChessAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChessAppApplication.class, args);
	}

	@Bean
	public PlayerMapper playerMapper() {
		return new PlayerMapper();
	}

	@Bean
	public GameMapper gameMapper() {
		return new GameMapper();
	}

	@Bean
	public MovesMapper movesMapper() {
		return new MovesMapper();
	}
}
