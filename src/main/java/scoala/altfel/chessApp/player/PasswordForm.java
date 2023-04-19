package scoala.altfel.chessApp.player;

import org.jetbrains.annotations.NotNull;

public record PasswordForm(@NotNull String password, @NotNull String newPassword, @NotNull String confirmNewPassword) { }
