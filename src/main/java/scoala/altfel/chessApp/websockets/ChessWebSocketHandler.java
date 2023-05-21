package scoala.altfel.chessApp.websockets;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import scoala.altfel.chessApp.moves.Moves;
import scoala.altfel.chessApp.moves.MovesRepository;
import java.io.IOException;
import java.util.Map;
import java.util.Set;

@Component
@AllArgsConstructor
@Service
public class ChessWebSocketHandler extends TextWebSocketHandler {

	private Set<WebSocketSession> sessions;
	private MovesRepository movesRepository;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		String initialState = getCurrentGameState();
		session.sendMessage(new TextMessage(initialState));
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String receivedMessage = message.getPayload();
		System.out.println(receivedMessage);
		session.sendMessage(new TextMessage(receivedMessage));
		processMessageAndUpdateGameState(receivedMessage);
		broadcastGameState();
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	private void broadcastGameState() {
		String gameState = getCurrentGameState();
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(new TextMessage(gameState));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private String getCurrentGameState() {
		return "Handshake!";
	}

	@Transactional
	private void processMessageAndUpdateGameState(String message) {
		ObjectMapper objectMapper = new ObjectMapper();

		try {
			Map<String, Object> payload = objectMapper.readValue(message, new TypeReference<>() {
			});

			Map<String, Object> messageData = (Map<String, Object>) payload.get("message");
			Long gameId = Long.valueOf(payload.get("gameid").toString());
			Long playerId = Long.valueOf(payload.get("playerid").toString());
			String positions = objectMapper.writeValueAsString(messageData);

			Moves moves = Moves.builder()
					.gameid(gameId)
					.playerid(playerId)
					.moves(positions)
					.build();
			movesRepository.save(moves);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
