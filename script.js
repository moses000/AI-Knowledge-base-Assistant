const voiceBtn = document.getElementById('voice-btn');
const ttsBtn = document.getElementById('tts-btn');
const sendBtn = document.getElementById('send-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const messageInput = document.getElementById('message-input');
const chatBody = document.getElementById('chat-body');
const historyList = document.getElementById('history-list');

sendBtn.addEventListener("click", () => {
	if (messageInput.value) {
		const messageDiv = document.createElement("div");
		messageDiv.className = `message text`
		messageDiv.innerHTML = messageInput.value;
	}
	messageInput.value = "";
})


