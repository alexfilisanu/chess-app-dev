package scoala.altfel.chessApp.game;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "game")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Game {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "id")
	private Long id;

	@Column(name = "type")
	private String type;

	@Column(name = "playerid1")
	private Long playerId1;

	@Column(name = "playerid2")
	private Long playerId2;

	@Column(name = "result")
	private String result;
}
