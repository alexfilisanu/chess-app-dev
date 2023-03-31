package scoala.altfel.chessApp.player;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import javax.validation.constraints.Pattern;

@Data
@Entity
@Table(name = "player")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE player SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
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
	@Pattern(regexp = "^((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])){4,12}$",
		message = "nu e pattern la scoala")
	private String password;

	@Column(name = "score")
	private Integer score;

	@Column(name = "deleted")
	private Boolean deleted;
}
