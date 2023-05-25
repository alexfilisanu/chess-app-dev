package scoala.altfel.chessApp.game;

public record GameDTO(Long id, String type, Long playerId1, Long playerId2, String randomCode, String result) { }