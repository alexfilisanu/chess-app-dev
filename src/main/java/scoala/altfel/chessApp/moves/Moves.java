package scoala.altfel.chessApp.moves;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "moves")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Moves {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "gameid")
	private Long gameid;

	@Column(name = "playerid")
	private Long playerid;

	@Column(name = "playerturn")
	private Long playerturn;

	@Column(name = "moves")
	private String moves;
}

