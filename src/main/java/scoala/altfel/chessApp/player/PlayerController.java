package scoala.altfel.chessApp.player;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chess-app")
@AllArgsConstructor
public class PlayerController {
	PlayerService playerService;

	@GetMapping("/players")
	public List<PlayerDTO> getPlayers() {
		return playerService.getPlayers();
	}

	@GetMapping("/player-by-id/{playerId}")
	public PlayerDTO getPlayerById(@PathVariable("playerId") Long playerId) {
		return playerService.getPlayerById(playerId);
	}

	@GetMapping("/player-by-name/{playerName}")
	public PlayerDTO getPlayerByName(@PathVariable("playerName") String playerName) {
		return playerService.getPlayerByName(playerName);
	}

	@DeleteMapping("/player/{playerId}")
	public void deletePlayerById(@PathVariable("playerId") Long playerId) {
		playerService.deletePlayerById(playerId);
	}

	@PostMapping(value = "/register")
	public void registerNewPlayer(@RequestBody PlayerConfidentialDTO playerConfidentialDTO) {
		playerService.addNewPlayer(playerConfidentialDTO);
	}

	@PutMapping(value = "/password/{playerId}")
	public void updatePassword(@RequestBody Password password,
							   @PathVariable("playerId") Long playerId) {
		playerService.updatePassword(password, playerId);
	}
}
