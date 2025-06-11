const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');
const messageInput = document.getElementById('message-input');
const chatBody = document.getElementById('chat-body');
const chatListContainer = document.getElementById('chat-list');

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
    this.messages.push(new Message(sender, content));
  }

  get lastMessage() {
    return this.messages.length ? this.messages[this.messages.length - 1].content : "No messages yet";
  }
}

let chatData = [];
let currentChatId = null;

const saveToLocalStorage = () => {
  localStorage.setItem('chatData', JSON.stringify(chatData));
}

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('chatData');
  if (!saved) return;

  const raw = JSON.parse(saved);
  chatData = raw.map(c => {
    const chat = new Chat(c.chat_id, c.title);
    chat.created_at = c.created_at;
    chat.messages = c.messages.map(m => new Message(m.sender, m.content, m.timestamp));
    return chat;
  });
}

const addMessage = (text, sender = 'user') => {
  const currentChat = chatData.find(c => c.chat_id === currentChatId);
  if (!currentChat) return;

  currentChat.addMessage(sender, text);
  saveToLocalStorage();
  renderMessages(currentChat);
  updateChatList();
}

const sendMessage = () => {
  const text = messageInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  messageInput.value = '';

  showLoading();

  setTimeout(() => {
    const reply = `Thanks for your message: "${text}". How can I assist you next?`;
    addMessage(reply, 'ai');
    hideLoading();
  }, 1000);
}

function renderMessages(chat) {
  chatBody.innerHTML = '';

  chat.messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.sender}`;
    div.innerHTML = `<div class="message-content">${msg.content}</div>`;
    chatBody.appendChild(div);
  });

  chatBody.scrollTop = chatBody.scrollHeight;
}

function updateChatList() {
  chatListContainer.innerHTML = '';

  chatData.forEach(chat => {
    const item = document.createElement('div');
    item.className = 'history-item';
    const displayText = chat.lastMessage.length > 30 ? chat.lastMessage.substring(0, 27) + '...' : chat.lastMessage;
    item.innerHTML = `
      <div class="chat-title">${chat.title}</div>
      <div class="chat-last_message">${displayText}</div>
    `;
    item.addEventListener('click', () => openChat(chat.chat_id));
    chatListContainer.appendChild(item);
  });
}

function openChat(chatId) {
  currentChatId = chatId;
  const chat = chatData.find(c => c.chat_id === chatId);
  if (!chat) return;
  renderMessages(chat);
}

window.onload = () => {
  loadFromLocalStorage();

  if (!chatData.length) {
    chatData = [
      (() => {
        const chat = new Chat("123", "Project Ideas");
        chat.addMessage("user", "Hello");
        chat.addMessage("ai", "Hi! What would you like to discuss?");
        return chat;
      })(),
      (() => {
        const chat = new Chat("456", "Code Help");
        chat.addMessage("user", "How do I write a loop?");
        chat.addMessage("ai", "Here's an example of a loop in JS...");
        return chat;
      })()
    ];
    saveToLocalStorage();
  }

  updateChatList();
  if (chatData.length) openChat(chatData[0].chat_id);

  sendBtn.addEventListener('click', sendMessage);

  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });

  newChatBtn.addEventListener('click', () => {
    const newId = Date.now().toString();
    const newChat = new Chat(newId, 'New Chat');
    chatData.unshift(newChat);
    saveToLocalStorage();
    updateChatList();
    openChat(newId);
  });
};


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