package scoala.altfel.chessApp.player;

import java.util.function.Function;

public class PlayerMapper implements Function<Player, PlayerDTO> {
	@Override
	public PlayerDTO apply(Player player) {
		return new PlayerDTO(player.getId(), player.getUsername(), player.getEmail(), player.getScore());
	}
}
