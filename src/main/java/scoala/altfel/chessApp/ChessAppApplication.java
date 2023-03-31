package scoala.altfel.chessApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import scoala.altfel.chessApp.player.PlayerMapper;

@SpringBootApplication
public class ChessAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChessAppApplication.class, args);
	}

	@Bean
	public PlayerMapper playerMapper() {
		return new PlayerMapper();
	}

}
