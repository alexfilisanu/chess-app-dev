package scoala.altfel.chessApp.game;

import java.util.function.Function;

public class GameMapper implements Function<Game, GameDTO> {
	@Override
	public GameDTO apply(Game game) {
		return new GameDTO(game.getId(), game.getType(), game.getPlayerId1(), game.getPlayerId2(), game.getRandomCode(),game.getResult());
	}
}
