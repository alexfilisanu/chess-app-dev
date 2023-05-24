package scoala.altfel.chessApp.game;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class GameService {
	GameRepository gameRepository;
	GameMapper gameMapper;

	@Transactional
	public void startLocalGame(GameDTO gameDTO) {
		Game game = Game.builder()
				.type(gameDTO.type())
				.result(gameDTO.result())
				.playerId1(gameDTO.playerId1())
				.playerId2(gameDTO.playerId2())
				.build();

		gameRepository.save(game);
	}

	@Transactional
	public void endLocalGame(String result, Long gameId) {
		Game game = gameRepository
				.findById(gameId)
				.orElseThrow(
						() -> new IllegalStateException(
								"Game with id " + gameId + " does not exist."
						)
				);
		game.setResult(result);
	}

	public GameDTO getCurrentLocalGame(Long playerId1, Long playerId2) {
		return gameRepository
				.findCurrentGame(playerId1, playerId2)
				.map(p -> gameMapper.apply(p))
				.orElseThrow(
						() -> new IllegalStateException(
								"Game not found for players: " + playerId1 + " and " + playerId2
						)
				);
	}
}