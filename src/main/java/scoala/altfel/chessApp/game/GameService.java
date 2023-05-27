package scoala.altfel.chessApp.game;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

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
	public void startOnlineGame(String randomCode, GameDTO gameDTO) {
		Game game = Game.builder()
				.type(gameDTO.type())
				.result(gameDTO.result())
				.playerId1(gameDTO.playerId1())
				.playerId2(gameDTO.playerId2())
				.randomCode(randomCode)
				.build();

		gameRepository.save(game);
	}

	@Transactional
	public void endGame(String result, Long gameId) {
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
				.findCurrentLocalGame(playerId1, playerId2)
				.map(p -> gameMapper.apply(p))
				.orElseThrow(
						() -> new IllegalStateException(
								"Game not found for players: " + playerId1 + " and " + playerId2
						)
				);
	}

	public GameDTO getCurrentOnlineGame(Long playerId1, Long playerId2) {
		return gameRepository
				.findCurrentOnlineGame(playerId1, playerId2)
				.map(p -> gameMapper.apply(p))
				.orElseThrow(
						() -> new IllegalStateException(
								"Game not found for players: " + playerId1 + " and " + playerId2
						)
				);
	}

	@Transactional
	public void joinOnlineGame(String randomCode, Long playerId2) {
		Game game = gameRepository
				.findByTag(randomCode)
				.orElseThrow(
						() -> new IllegalStateException(
								"Game with tag " + randomCode + " does not exist."
						)
				);
		game.setPlayerId2(playerId2);
		game.setResult("Still playing");
	}

	public GameDTO getCurrentOnlineGameAfterMatchmaking(Long playerId2, String randomCode) {
		return gameRepository
				.findCurrentOnlineGameAfterMatchmaking(playerId2, randomCode)
				.map(p -> gameMapper.apply(p))
				.orElseThrow(
						() -> new IllegalStateException(
								"Game not found for player: " + playerId2 + " and tag " + randomCode
						)
				);
	}

	public GameDTO getGameResult(Long gameId) {
		return gameRepository
				.findById(gameId)
				.map(gameMapper::apply)
				.orElseThrow(() -> new IllegalStateException("Game not found for id: " + gameId));
	}

	public History getHistoryMatches(Long playerId) {
		List<Game> matchesAsHost = gameRepository.findMatchesByPlayerIdAsHost(playerId);

		Long victories = matchesAsHost.stream()
				.filter(game -> game.getResult().equals("Win player1"))
				.count();

		Long defeats = matchesAsHost.stream()
				.filter(game -> game.getResult().equals("Win player2"))
				.count();

		List<Game> matchesAsGuest = gameRepository.findMatchesByPlayerIdAsGuest(playerId);

		victories += matchesAsGuest.stream()
				.filter(game -> game.getResult().equals("Win player2"))
				.count();

		defeats += matchesAsGuest.stream()
				.filter(game -> game.getResult().equals("Win player1"))
				.count();

		Long score = victories * 100 - defeats * 50;

		return new History(victories, defeats, score);
	}

}
