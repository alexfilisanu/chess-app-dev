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
								"Player with id " + playerId + " doesn't exist."
						)
				);
	}

	public PlayerDTO getPlayerByName(String playerName) {
		Player player = playerRepository
				.findPlayerByName(playerName)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with name " + playerName + " doesn't exist."
						)
				);

		return playerToPlayerDTOMapper.apply(player);
	}

	public void deletePlayerById(Long playerId) {
		if (!playerRepository.findById(playerId).isPresent()) {
			throw new IllegalStateException(
					"Player with id " + playerId + " doesn't exist."
			);
		}

		playerRepository.deleteById(playerId);
	}

	@Transactional
	public void addNewPlayer(PlayerConfidentialDTO playerConfidentialDTO) {
		if (playerRepository.findPlayerByName(playerConfidentialDTO.username()).isPresent()) {
			throw new IllegalStateException(
					"Player with name " + playerConfidentialDTO.username() + " already exists."
			);
		}

		if (!EmailValidator.isValid(playerConfidentialDTO.email())) {
			throw new IllegalStateException(
					"Email inserted is not valid."
			);
		}

		if (!PasswordValidator.isValid(playerConfidentialDTO.password())) {
			throw new IllegalStateException(
					"Password inserted is not valid. Password must contain at least " +
							"1 special character, 1 digit, 1 lowercase letter and 1 upercase letter."
			);
		}

		if (!playerConfidentialDTO.confirmPassword().equals(playerConfidentialDTO.password())) {
			throw new IllegalStateException(
					"Password and confirm password does not match."
			);
		}

		Player player = Player.builder()
				.username(playerConfidentialDTO.username())
				.email(playerConfidentialDTO.email())
				.password(playerConfidentialDTO.password())
				.confirmPassword(playerConfidentialDTO.confirmPassword())
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
								"Player with id " + playerId + " does not exist."
						)
				);

		if (!player.getPassword().equals(passwordForm.password())) {
			throw new IllegalStateException(
					"Password inserted is not correct."
			);
		}

		if (!PasswordValidator.isValid(passwordForm.newPassword())) {
			throw new IllegalStateException(
					"Password inserted is not valid. Password must contain..."
			);
		}

		player.setPassword(passwordForm.newPassword());
	}

	@Transactional
	public void updateEmail(EmailForm emailForm, Long playerId) {
		Player player = playerRepository
				.findById(playerId)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with id " + playerId + " doesn't exist."
						)
				);

		if (!EmailValidator.isValid(emailForm.newEmail())) {
			throw new IllegalStateException(
					"Email inserted is not valid."
			);
		}

		if (player.getPassword().equals(emailForm.password())) {
			player.setEmail(emailForm.newEmail());
		}
	}

	@Transactional
	public void updateUsername(UsernameForm usernameForm, Long playerId) {
		Player player = playerRepository
				.findById(playerId)
				.orElseThrow(
						() -> new IllegalStateException(
								"Player with id " + playerId + " doesn't exist."
						)
				);

		if (player.getPassword().equals(usernameForm.password())) {
			player.setUsername(usernameForm.newUsername());
		}
	}
}