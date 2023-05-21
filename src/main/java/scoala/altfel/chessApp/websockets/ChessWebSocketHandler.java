package scoala.altfel.chessApp.websockets;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class ChessWebSocketHandler extends TextWebSocketHandler {

	private Set<WebSocketSession> sessions = new HashSet<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// Add the new session to the set of sessions
		sessions.add(session);

		// Send the initial game state to the newly connected client
		String initialState = getCurrentGameState(); // Replace this with your logic to get the game state
		session.sendMessage(new TextMessage(initialState));
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// Handle incoming text messages from clients
		String receivedMessage = message.getPayload();
		System.out.println(receivedMessage);
		session.sendMessage(new TextMessage(receivedMessage));

		// Process the received message, update the game state, and broadcast the updated state
//		processMessageAndUpdateGameState(receivedMessage);

		// Broadcast the updated game state to all connected clients
//		broadcastGameState();
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// Remove the closed session from the set of sessions
		sessions.remove(session);
	}

	private void broadcastGameState() {
		String gameState = getCurrentGameState(); // Replace this with your logic to get the game state

		// Iterate over all sessions and send the game state to each one
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(new TextMessage(gameState));
			} catch (IOException e) {
				// Handle the exception if sending the message fails
				e.printStackTrace();
			}
		}
	}

	private String getCurrentGameState() {
		// Replace this method with your logic to get the current game state
		// Convert the game state to a string representation (e.g., JSON) and return it
		return "";
	}

	private void processMessageAndUpdateGameState(String message) {
		// Replace this method with your logic to process the received message
		// Update the game state based on the message contents
	}
}
