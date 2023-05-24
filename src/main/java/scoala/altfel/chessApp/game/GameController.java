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
		gameService.endLocalGame(result, gameId);
	}

	@GetMapping("/local-game/game-by-player-id/{playerId1}/{playerId2}")
	public GameDTO getCurrentLocalGame(@PathVariable("playerId1") Long playerId1,
								  @PathVariable("playerId2") Long playerId2) {
		return gameService.getCurrentLocalGame(playerId1, playerId2);
	}
}
