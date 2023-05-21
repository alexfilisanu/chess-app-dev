package scoala.altfel.chessApp.moves;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoveId {

	private Long id;
	private Long gameId;
}
