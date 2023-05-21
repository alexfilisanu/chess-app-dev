package scoala.altfel.chessApp.moves;
import java.util.function.Function;

public class MovesMapper implements Function<Moves, MovesDTO> {
	@Override
	public MovesDTO apply(Moves moves) {
		return new MovesDTO(moves.getId(), moves.getGameid(), moves.getPlayerid(), moves.getMoves());
	}
}

