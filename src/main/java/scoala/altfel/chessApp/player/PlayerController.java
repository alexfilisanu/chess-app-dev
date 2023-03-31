package scoala.altfel.chessApp.player;

import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chess-app")
@AllArgsConstructor
@Validated
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
	public void registerNewPlayer(@Valid @RequestBody PlayerConfidentialDTO playerConfidentialDTO) {
		playerService.addNewPlayer(playerConfidentialDTO);
	}

	@PutMapping(value = "/password/{playerId}")
	public void updatePassword(@Valid @RequestBody PasswordForm passwordForm,
							   @PathVariable("playerId") Long playerId) {
		playerService.updatePassword(passwordForm, playerId);
	}

	@PutMapping(value = "/email/{playerId}")
	public void updateEmail(@RequestBody EmailForm emailForm,
							   @PathVariable("playerId") Long playerId) {
		playerService.updateEmail(emailForm, playerId);
	}

	@PutMapping(value = "/username/{playerId}")
	public void updateUsername(@RequestBody UsernameForm usernameForm,
							   @PathVariable("playerId") Long playerId) {
		playerService.updateUsername(usernameForm, playerId);
	}
}
