package scoala.altfel.chessApp.player;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scoala.altfel.chessApp.Constants.PasswordConstraints;

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

		Player player = Player.builder()
				.username(playerConfidentialDTO.username())
				.email(playerConfidentialDTO.email())
				.password(playerConfidentialDTO.password())
				.score(0)
				.deleted(Boolean.FALSE)
				.build();

		playerRepository.save(player);
	}

	@Transactional
	public void updatePassword(PasswordForm passwordForm, Long playerId) {
		Player player = playerRepository
				.findById(playerId)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with id " + playerId + "doesn't exist.\n"
						)
				);

		if (player.getPassword().equals(passwordForm.password())
				&& passwordForm.newPassword().length() >= PasswordConstraints.MIN_LENGTH) {
			player.setPassword(passwordForm.newPassword());
		}
	}

	@Transactional
	public void updateEmail(EmailForm emailForm, Long playerId) {
		Player player = playerRepository
				.findById(playerId)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with id " + playerId + "doesn't exist.\n"
						)
				);

		if (player.getPassword().equals(emailForm.password()))
			player.setEmail(emailForm.newEmail());
	}

	@Transactional
	public void updateUsername(UsernameForm usernameForm, Long playerId) {
		Player player = playerRepository
				.findById(playerId)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with id " + playerId + "doesn't exist.\n"
						)
				);

		if (player.getPassword().equals(usernameForm.password()))
			player.setUsername(usernameForm.newUsername());

	}
}