const voiceBtn = document.getElementById('voice-btn');
const ttsBtn = document.getElementById('tts-btn');
const sendBtn = document.getElementById('send-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const messageInput = document.getElementById('message-input');
const chatBody = document.getElementById('chat-body');
const historyList = document.getElementById('history-list');

let currentChatID = null;

let conversationHistory = JSON.parse(localStorage.getItem('chatHistory') || []);

class Message {
	constructor(type = 'user' || 'ai', text) {
		this.type = type;
		this.text = text;
	}
}

class Chat {
	constructor(id = new Date().toISOString(), name = '', content = []) {
		this.id = id;
		this.name = name;
		this.content = content;
	}
}

// let chat1 = new Chat('chat-xxx-1');

let chatMap = new Map();

// if (chatTopics.id == currentTopicId) {
// 	// addMessage should have another parameter topicId, which specifies which chat we are appending messages to - 
// }

sendBtn.addEventListener("click", () => {
	const text = messageInput.value.trim();
	if (text) {
		addMessage(text, 'user');

		messageInput.value = '';
		simulateAIResponse(text);
	}
});

messageInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		sendBtn.click();
	}
});

const addMessage = (text, type, chatId) => {
	const messageDiv = document.createElement('div');
	messageDiv.className = `message ${type}`;
	let content = '';
	content += `<div class="message-content">${text}</div>`;
	messageDiv.innerHTML = content;

	if (currentChatID === chatId) {
		chat.content.push(new Message(type, text));
		chatBody.appendChild(messageDiv);
		chatBody.scrollTop = chatBody.scrollHeight;

		console.log(chat);
	}
}

// const addMessage = (text, type) => {
// 	const messageDiv = document.createElement('div');
// 	messageDiv.className = `message ${type}`;
// 	let content = '';
// 	content += `<div class="message-content">${text}</div>`;
// 	messageDiv.innerHTML = content;

// 	chatBody.appendChild(messageDiv);
// 	chatBody.scrollTop = chatBody.scrollHeight;

// 	chat1.content.push(new Message(type, text));
// }

const showLoading = () => {
	const loadingDiv = document.createElement('div');
	loadingDiv.className = 'loading';
	loadingDiv.id = 'loading';
	for (let i = 0; i < 8; i++) {
		const dot = document.createElement('div');
		loadingDiv.appendChild(dot);
	}
	chatBody.appendChild(loadingDiv);
	chatBody.scrollTop = chatBody.scrollHeight;
}

const hideLoading = () => {
	const loadingDiv = document.getElementById('loading');
	if (loadingDiv) {
		loadingDiv.remove();
	}
}

const simulateAIResponse = (userMessage) => {
	showLoading();

	setTimeout(() => {
		hideLoading();
		const aiResponse = `Thanks for your message: "${userMessage}". How can I assist you next?`;
		addMessage(aiResponse, 'ai');
	}, 1000);
}


// let chatTopics = [
	// 	{
	// 		id: "topic-xxx-001",
	// 		name: "Topic one",
	// 		content: [
	// 			{
	// 				messageID: 0,
	// 				messageType: "user",
	// 				text: "Hi, what can you do?"
	// 			},
	// 			{
	// 				messageID: 1,
	// 				messageType: "ai",
	// 				text: "I can answer questions that you have."
	// 			},
	// 			{
	// 				messageID: 2,
	// 				messageType: "user",
	// 				text: "Hi, what can you do?"
	// 			},
	// 			{
	// 				messageID: 3,
	// 				messageType: "ai",
	// 				text: "I can answer questions that you have."
	// 			},
	// 		]
	// 	},
	// 	{
	// 		id: "topic-xxx-002",
	// 		name: "Topic two",
	// 		content: [
	// 			{
	// 				messageID: 0,
	// 				messageType: "user",
	// 				text: "Hi, what can you do?"
	// 			},
	// 			{
	// 				messageID: 1,
	// 				messageType: "ai",
	// 				text: "I can answer questions that you have."
	// 			},
	// 			{
	// 				messageID: 2,
	// 				messageType: "user",
	// 				text: "Hi, what can you do?"
	// 			},
	// 			{
	// 				messageID: 3,
	// 				messageType: "ai",
	// 				text: "I can answer questions that you have."
	// 			},
	// 		]
	// 	}
	// ]