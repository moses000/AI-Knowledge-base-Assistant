Huawei AI Chat Box
A modern, responsive, and feature-rich AI chat interface built with HTML, CSS, and JavaScript, styled with Huawei's elegant brownish-red theme. This project features a topic-based conversation history sidebar, voice input/output, image upload, and smooth animations, designed to provide a premium user experience.
Features

Huawei-Inspired Design: Styled with a brownish-red color scheme (#4b2e2e, #8b0000), cream (#f9f5f2), and taupe (#e8e1dc) for an elegant, modern aesthetic inspired by Huawei's branding.
Topic-Based Conversation History: Messages are grouped by topic in a sidebar, with clickable titles (derived from the first user message) and timestamps for easy navigation.
Clear History: A button to reset the conversation history, clearing both the chat and sidebar.
Voice Functionality: Supports speech recognition and text-to-speech (TTS) using the Web Speech API, with toggle buttons for voice input and audio output.
Image Upload: Users can upload images, displayed in the chat and saved in the topic history.
Enhanced Animations: Includes fade-in for the container, slide-in for the sidebar, slide-up for the input area, hover effects for messages/buttons, and an aesthetic 8-dot pulsing loading animation.
Responsive Design: Full-screen layout (100vw, 100vh) with a sidebar that stacks above the chat on smaller screens (≤768px), optimized for mobile (≤480px).
Persistent Storage: Conversation history is saved in localStorage for persistence across sessions.

Demo
Note: Replace the placeholder with a screenshot or GIF of the interface.
Installation

Clone the Repository:
git clone https://github.com/your-username/huawei-ai-chat-box.git
cd huawei-ai-chat-box


Serve the Application:

Use a local server (e.g., VS Code Live Server, or Python's HTTP server):python -m http.server 8000


Open http://localhost:8000 in a browser (Chrome/Edge recommended for Web Speech API).


Dependencies:

No external dependencies required; uses vanilla HTML, CSS, and JavaScript.
Ensure HTTPS for Web Speech API microphone access in production.



Usage

Start Chatting:

Type a message in the input field or use the voice button (microphone icon) to dictate.
Upload images via the upload button (arrow icon).
Toggle text-to-speech with the TTS button (speaker icon).


Navigate Topics:

Click a topic in the sidebar to view its messages in the chat body.
Topics are created from the first user message (text or image).


Clear History:

Click the "Clear History" button in the sidebar to reset the conversation.


Production Integration:

Replace the simulateAIResponse function in index.html with an API call (e.g., xAI's API at https://x.ai/api) for real AI responses.



Browser Compatibility

Best Support: Chrome, Edge (Web Speech API for voice features).
Limitations: Firefox/Safari may have limited Web Speech API support遭遇System: support. Ensure HTTPS for microphone access.

Contributing
Contributions are welcome! Please submit a pull request or open an issue for suggestions.

Fork the repository.
Create a branch (git checkout -b feature-name).
Commit changes (git commit -am 'Add feature').
Push to the branch (git push origin feature-name).
Create a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
About
The Huawei AI Chat Box is a sleek, user-friendly chat interface designed to emulate a modern AI assistant with a Huawei-inspired aesthetic. It combines voice input/output, image upload, and a topic-based conversation history for an engaging experience. Built with accessibility and responsiveness in mind, it works seamlessly across devices.
Tags

#AIChat
#WebApp
#HuaweiTheme
#VoiceAssistant
#ResponsiveDesign
#JavaScript
#HTML
#CSS
#WebSpeechAPI
#Animation
#ChatInterface
#ImageUpload
#ConversationHistory

