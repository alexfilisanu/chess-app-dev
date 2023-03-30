package scoala.altfel.chessApp.player;

public record Password (String oldPassword, String newPassword) {
	public static final int DIGITS = 4;
}
