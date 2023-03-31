package scoala.altfel.chessApp.player;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {
	// (String)@(String).(2-3 characters)
	private static final String EMAIL_PATTERN =
			"[a-z0-9]+@[a-z]+\\.[a-z]{2,3}";

	private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);

	public static boolean isValid(final String password) {
		Matcher matcher = pattern.matcher(password);

		return matcher.matches();
	}
}
