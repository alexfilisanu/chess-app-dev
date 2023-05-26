package scoala.altfel.chessApp.websockets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import scoala.altfel.chessApp.game.GameDTO;
import scoala.altfel.chessApp.game.GameMapper;
import scoala.altfel.chessApp.game.GameRepository;
import scoala.altfel.chessApp.moves.Moves;
import scoala.altfel.chessApp.moves.MovesDTO;
import scoala.altfel.chessApp.moves.MovesMapper;
import scoala.altfel.chessApp.moves.MovesRepository;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
@Scope("singleton")
@Service
public class ChessWebSocketHandler extends TextWebSocketHandler {

	private Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
	private MovesRepository movesRepository;
	private MovesMapper movesMapper;
	private GameRepository gameRepository;
	private GameMapper gameMapper;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		String uriPath = session.getUri().getPath();
		String randomCode = uriPath.substring(uriPath.lastIndexOf("/") + 1);
		session.getAttributes().put("randomCode", randomCode);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String receivedMessage = message.getPayload();
		Long gameid = processMessageAndUpdateGameState(receivedMessage);

		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> payload = objectMapper.readValue(receivedMessage, new TypeReference<>() {});
		String gameType = (String) payload.get("gametype");

		if ("Local".equals(gameType)) {
			broadcastLocalGameState(gameid, session);
		} else if ("Online".equals(gameType)) {
			broadcastOnlineGameState(gameid, session);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	private void broadcastLocalGameState(Long gameid, WebSocketSession senderSession) {
		String gameState = getCurrentGameState(gameid);
		for (WebSocketSession session : sessions) {
			if (session != senderSession) {
				continue;
			}
			try {
				session.sendMessage(new TextMessage(gameState));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private void broadcastOnlineGameState(Long gameid, WebSocketSession senderSession) {
		String randomCode = (String) senderSession.getAttributes().get("randomCode");

		List<WebSocketSession> gameSessions = sessions.stream()
				.filter(session -> {
					String sessionRandomCode = (String) session.getAttributes().get("randomCode");
					return randomCode.equals(sessionRandomCode);
				})
				.collect(Collectors.toList());

		String gameState = getCurrentGameState(gameid);
		GameDTO game = gameRepository
				.findById(gameid)
				.map(gameMapper::apply)
				.orElseThrow(() -> new IllegalStateException("Game not found for id: " + gameid));
		String gameResult = game.result();
		boolean gameEnded = "Win player1".equals(gameResult) || "Win player2".equals(gameResult);

		for (WebSocketSession session : gameSessions) {
			if (!gameEnded) {
				try {
					session.sendMessage(new TextMessage(gameState));
				} catch (IOException e) {
					e.printStackTrace();
				}
			} else {
				sessions.remove(session);
			}
		}
	}

	private String getCurrentGameState(Long gameid) {
		Map<String, Object> gameState = new HashMap<>();
		MovesDTO currMove = movesRepository.findCurrentMove(gameid)
				.map(movesMapper::apply)
				.orElseThrow(() -> new IllegalStateException("Move not found for game with id: " + gameid));
		gameState.put("message", currMove);
		String jsonGameState = null;
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			jsonGameState = objectMapper.writeValueAsString(gameState);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return jsonGameState != null ? jsonGameState : "{}";
	}

	@Transactional
	private Long processMessageAndUpdateGameState(String message) {
		ObjectMapper objectMapper = new ObjectMapper();

		try {
			Map<String, Object> payload = objectMapper.readValue(message, new TypeReference<>() {});

			Map<String, Object> messageData = (Map<String, Object>) payload.get("message");
			Long gameId = Long.valueOf(payload.get("gameid").toString());
			Long playerId = Long.valueOf(payload.get("playerid").toString());
			Long playerTurn = Long.valueOf(payload.get("playerturn").toString());
			String positions = objectMapper.writeValueAsString(messageData);

			Moves moves = Moves.builder()
					.gameid(gameId)
					.playerid(playerId)
					.playerturn(playerTurn)
					.moves(positions)
					.build();

			movesRepository.save(moves);
			return gameId;

		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return -1L;
	}
}
