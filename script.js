const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;
let isRecording = false;
let isTtsEnabled = false;
let currentTopicId = null;

const voiceBtn = document.getElementById('voice-btn');
const ttsBtn = document.getElementById('tts-btn');
const sendBtn = document.getElementById('send-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const messageInput = document.getElementById('message-input');
const chatBody = document.getElementById('chat-body');
const historyList = document.getElementById('history-list');

// Load conversation history from localStorage
let conversationHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let topics = organizeByTopics(conversationHistory);
renderTopics();

recognition.lang = 'en-US';
recognition.continuous = false;

voiceBtn.addEventListener('click', () => {
	if (isRecording) {
		recognition.stop();
		voiceBtn.classList.remove('voice-active');
		voiceBtn.querySelector('svg').innerHTML = `
                    <path d="M12 2v8"></path>
                    <path d="M17 3a5 5 0 0 1 0 10"></path>
                    <path d="M7 3a5 5 0 0 0 0 10"></path>
                    <path d="M12 14v8"></path>
                `;
	} else {
		recognition.start();
		voiceBtn.classList.add('voice-active');
		voiceBtn.querySelector('svg').innerHTML = `
                    <rect x="9" y="2" width="2" height="20"></rect>
                    <rect x="13" y="2" width="2" height="20"></rect>
                `;
	}
	isRecording = !isRecording;
});

recognition.onresult = (event) => {
	const transcript = event.results[0][0].transcript;
	messageInput.value = transcript;
	addMessage(transcript, 'user', generateTopicId());
	if (isTtsEnabled) {
		speak(transcript);
	}
	simulateAIResponse(transcript);
};

recognition.onend = () => {
	if (isRecording) {
		recognition.stop();
		voiceBtn.classList.remove('voice-active');
		voiceBtn.querySelector('svg').innerHTML = `
                    <path d="M12 2v8"></path>
                    <path d="M17 3a5 5 0 0 1 0 10"></path>
                    <path d="M7 3a5 5 0 0 0 0 10"></path>
                    <path d="M12 14v8"></path>
                `;
		isRecording = false;
	}
};

ttsBtn.addEventListener('click', () => {
	isTtsEnabled = !isTtsEnabled;
	ttsBtn.classList.toggle('tts-active', isTtsEnabled);
});

sendBtn.addEventListener('click', () => {
	const text = messageInput.value.trim();
	if (text) {
		addMessage(text, 'user', generateTopicId());
		if (isTtsEnabled) {
			speak(text);
		}
		messageInput.value = '';
		simulateAIResponse(text);
	}
});

messageInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		sendBtn.click();
	}
});

document.getElementById('image-upload').addEventListener('change', (e) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (event) => {
			addMessage('Image uploaded!', 'user', generateTopicId(), event.target.result);
			simulateAIResponse('Image received!');
		};
		reader.readAsDataURL(file);
	}
});

clearHistoryBtn.addEventListener('click', () => {
	conversationHistory = [];
	topics = {};
	localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
	chatBody.innerHTML = '';
	historyList.innerHTML = '';
	currentTopicId = null;
});

function generateTopicId() {
	if (!currentTopicId) {
		currentTopicId = `topic-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
	}
	return currentTopicId;
}

function organizeByTopics(history) {
	const topics = {};
	history.forEach((msg, index) => {
		if (!msg.topicId) {
			msg.topicId = `topic-${msg.timestamp}-${index}`;
		}
		if (!topics[msg.topicId]) {
			topics[msg.topicId] = {
				title: msg.type === 'user' ? (msg.image ? 'Image' : msg.text.substring(0, 30)) : null,
				messages: [],
				timestamp: msg.timestamp
			};
		}
		topics[msg.topicId].messages.push({ ...msg, index });
		if (msg.type === 'user' && !topics[msg.topicId].title) {
			topics[msg.topicId].title = msg.image ? 'Image' : msg.text.substring(0, 30);
		}
	});
	return topics;
}

function renderTopics() {
	historyList.innerHTML = '';
	Object.keys(topics).forEach(topicId => {
		const topic = topics[topicId];
		if (topic.title) {
			const historyItem = document.createElement('div');
			historyItem.className = 'history-item';
			const displayText = topic.title.length > 30 ? topic.title.substring(0, 27) + '...' : topic.title;
			const timestamp = new Date(topic.timestamp).toLocaleTimeString();
			historyItem.innerHTML = `${displayText}<span>${timestamp}</span>`;
			historyItem.addEventListener('click', () => {
				currentTopicId = topicId;
				chatBody.innerHTML = '';
				topic.messages.forEach(msg => {
					const messageDiv = document.createElement('div');
					messageDiv.className = `message ${msg.type}`;
					let content = msg.image ? `<img src="${msg.image}" alt="Uploaded Image">` : '';
					content += `<div class="message-content">${msg.text}</div>`;
					messageDiv.innerHTML = content;
					chatBody.appendChild(messageDiv);
				});
				chatBody.scrollTop = chatBody.scrollHeight;
			});
			historyList.appendChild(historyItem);
		}
	});
	historyList.scrollTop = historyList.scrollHeight;
}

function addMessage(text, type, topicId, image = null) {
	const messageDiv = document.createElement('div');
	messageDiv.className = `message ${type}`;
	let content = image ? `<img src="${image}" alt="Uploaded Image">` : '';
	content += `<div class="message-content">${text}</div>`;
	messageDiv.innerHTML = content;

	if (currentTopicId === topicId) {
		chatBody.appendChild(messageDiv);
		chatBody.scrollTop = chatBody.scrollHeight;
	}

	// Save to conversation history
	conversationHistory.push({ text, type, image, timestamp: new Date().toISOString(), topicId });
	localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
	topics = organizeByTopics(conversationHistory);
	renderTopics();
}

function showLoading() {
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

function hideLoading() {
	const loadingDiv = document.getElementById('loading');
	if (loadingDiv) {
		loadingDiv.remove();
	}
}

function simulateAIResponse(userMessage) {
	showLoading();
	setTimeout(() => {
		hideLoading();
		const aiResponse = `Thanks for your message: "${userMessage}". How can I assist you next?`;
		addMessage(aiResponse, 'ai', currentTopicId);
		currentTopicId = null; // Reset topic for new user input
	}, 1000);
}

function speak(text) {
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'en-US';
	synth.speak(utterance);
}