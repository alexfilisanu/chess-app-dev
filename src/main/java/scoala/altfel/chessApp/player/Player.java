package scoala.altfel.chessApp.player;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;


@Data
@Entity
@Table(name = "player")
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = "UPDATE player SET deleted = true WHERE id = ?")
@Where(clause = "deleted=false")
public class Player {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "id")
	private Long id;

	@Column(name = "username")
	private String username;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "score")
	private Integer score;

	@Column(name = "deleted")
	private boolean deleted = Boolean.FALSE;
}
