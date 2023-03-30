package scoala.altfel.chessApp.player;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import static java.util.stream.Collectors.toList;

@AllArgsConstructor
@Service
public class PlayerService {
	PlayerRepository playerRepository;
	PlayerMapper playerToPlayerDTOMapper;

	public List<PlayerDTO> getPlayers() {
		return playerRepository
				.findAll()
				.stream()
				.map(p -> playerToPlayerDTOMapper.apply(p))
				.collect(toList());
	}

	public PlayerDTO getPlayerById(Long playerId) {
		return playerRepository
				.findById(playerId)
				.map(p -> playerToPlayerDTOMapper.apply(p))
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with id " + playerId + "doesn't exist.\n"
						)
				);
	}

	public PlayerDTO getPlayerByName(String playerName) {
		Player player = playerRepository
				.findPlayerByName(playerName)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with name " + playerName + "doesn't exist.\n"
						)
				);
		return playerToPlayerDTOMapper.apply(player);
	}

	public void deletePlayerById(Long playerId) {
		if (playerRepository.findById(playerId).isPresent()) {
			playerRepository.deleteById(playerId);
		} else {
			throw new IllegalStateException(
					"Player with id " + playerId + "doesn't exist.\n"
			);
		}
	}

	public void addNewPlayer(PlayerConfidentialDTO playerConfidentialDTO) {
		if (playerRepository.findPlayerByName(playerConfidentialDTO.username()).isPresent()) {
			throw new IllegalStateException(
					"Player with name " + playerConfidentialDTO.username() + "already exists.\n"
			);
		}
		Player player = new Player(
				playerConfidentialDTO.id(),
				playerConfidentialDTO.username(),
				playerConfidentialDTO.email(),
				playerConfidentialDTO.password(),
				0,
				false);
		playerRepository.save(player);
	}

	@Transactional
	public void updatePassword(Password password, Long playerId) {
		Player player = playerRepository
				.findById(playerId)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with id " + playerId + "doesn't exist.\n"
						)
				);
		if (player.getPassword().equals(password.oldPassword())
				&& password.newPassword().length() >= Password.DIGITS) {
			player.setPassword(password.newPassword());
		}
	}
}
