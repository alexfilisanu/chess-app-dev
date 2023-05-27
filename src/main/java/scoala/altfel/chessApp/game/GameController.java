package scoala.altfel.chessApp.game;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chess-app")
@AllArgsConstructor
@CrossOrigin(origins = "${frontend.origin}")
public class GameController {
	GameService gameService;

	@PostMapping(value = "/local-game/new")
	public void startLocalGame(@RequestBody GameDTO gameDTO) {
		gameService.startLocalGame(gameDTO);
	}

	@PutMapping("/local-game/{gameId}/result")
	public void endLocalGame(@RequestParam("result") String result,
							 @PathVariable("gameId") Long gameId) {
		gameService.endGame(result, gameId);
	}

	@GetMapping("/local-game/game-by-player-id/{playerId1}/{playerId2}")
	public GameDTO getCurrentLocalGame(@PathVariable("playerId1") Long playerId1,
									   @PathVariable("playerId2") Long playerId2) {
		return gameService.getCurrentLocalGame(playerId1, playerId2);
	}

	@PostMapping(value = "/online-game/new/{randomCode}")
	public void startOnlineGame(@RequestBody GameDTO gameDTO,
								@PathVariable("randomCode") String randomCode) {
		gameService.startOnlineGame(randomCode, gameDTO);
	}

	@PutMapping("/online-game/{gameId}/result")
	public void endOnlineGame(@RequestParam("result") String result,
							  @PathVariable("gameId") Long gameId) {
		gameService.endGame(result, gameId);
	}

	@PutMapping("/online-game/join/{randomCode}/{playerId2}")
	public void joinOnlineGame(@PathVariable("randomCode") String randomCode,
							   @PathVariable("playerId2") Long playerId2) {
		gameService.joinOnlineGame(randomCode, playerId2);
	}

	@GetMapping("/online-game/game-after-matchmaking/{playerId2}/{randomCode}")
	public GameDTO getCurrentOnlineGameAfterMatchmaking(@PathVariable("playerId2") Long playerId2,
									   					@PathVariable("randomCode") String randomCode) {
		return gameService.getCurrentOnlineGameAfterMatchmaking(playerId2, randomCode);
	}

	@GetMapping("/online-game/game-by-player-id/{playerId1}/{playerId2}")
	public GameDTO getCurrentOnlineGame(@PathVariable("playerId1") Long playerId1,
									    @PathVariable("playerId2") Long playerId2) {
		return gameService.getCurrentOnlineGame(playerId1, playerId2);
	}

	@GetMapping("/online-game/game-by-id/{gameId}")
	public GameDTO getGameResult(@PathVariable("gameId") Long gameId) {
		return gameService.getGameResult(gameId);
	}

	@GetMapping("/matches/{playerId}")
	public History getHistoryMatches(@PathVariable("playerId") Long playerId) {
		return gameService.getHistoryMatches(playerId);
	}
}
