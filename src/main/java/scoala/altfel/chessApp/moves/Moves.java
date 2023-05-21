package scoala.altfel.chessApp.moves;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "moves")
@IdClass(MoveId.class)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Moves {

	@Id
	@Column(name = "id")
	private Long id;

	@Id
	@Column(name = "gameId")
	private Long gameId;

	@Column(name = "playerId")
	private Long playerId;

	@Column(name = "moves")
	private String moves;
}
