const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');
const messageInput = document.getElementById('message-input');
const chatBody = document.getElementById('chat-body');
const chatListContainer = document.getElementById('chat-list');

let currentChatID = null;

class Message {
    constructor(sender, content, timestamp = new Date().toISOString()) {
        this.sender = sender;
        this.content = content;
        this.timestamp = timestamp;
    }
}

class Chat {
    constructor(chat_id, title) {
        this.chat_id = chat_id;
        this.title = title;
        this.created_at = new Date().toISOString();
        this.messages = [];
    }

    addMessage(sender, content) {
        const message = new Message(sender, content);
        this.messages.push(message);
        return message;
    }

    get lastMessage() {
        return this.messages.length ? this.messages[this.messages.length - 1].content : "No messages yet";
    }
}

let chatData = [
    (() => {
        const chat = new Chat("123", "Project Ideas");
        chat.addMessage("user", "Hello");
        chat.addMessage("copilot", "Hi! What would you like to discuss?");
        return chat;
    })(),
    (() => {
        const chat = new Chat("456", "Code Help");
        chat.addMessage("user", "How do I write a loop?");
        chat.addMessage("copilot", "Here's an example of a loop in JS...");
        return chat;
    })()
];

const loadChatList = () => {
    chatBody.innerHTML = '';

    chatData.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.innerHTML = `
        <div class="chat-title">${chat.title}</div>
        <div class="chat-last-message">${chat.last_message}</div>
      `;
        chatItem.addEventListener('click', () => {
            openChat(chat.chat_id);
        });

        chatListContainer.appendChild(chatItem);
    });
}

const sendMessage = () => {
    const text = messageInput.value.trim();
    if (!text || !currentChatId) return;

    const chat = chatData.find(c => c.chat_id === currentChatId);
    if (!chat) return;

    // Add user's message via method
    chat.addMessage('user', text);

    addMessage(text, 'user');
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    showLoading();

    // Simulate Copilot response
    setTimeout(() => {
        const reply = `You said: "${text}"`;
        chat.addMessage('copilot', reply);
        addMessage(reply, 'ai');
        chatBody.scrollTop = chatBody.scrollHeight;
        loadChatList();
        hideLoading(); // Update last message in chat list
    }, 1000);
}

const newChat = () => {
    const newChatObj = new Chat(Date.now().toString(), "New Chat");
    chatData.unshift(newChatObj); // Add to top
    loadChatList();
    openChat(newChatObj.chat_id);
}

const addMessage = (text, sender = 'user') => {
    const currentChat = chatData.find(c => c.chat_id === currentChatId);
    if (!currentChat) return;

    currentChat.addMessage(sender, text);
    saveToLocalStorage();
    renderMessages(currentChat);
    updateChatList(); // to refresh last message preview
}

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