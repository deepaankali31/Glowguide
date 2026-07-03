// Enhanced AI Chat JavaScript with Real Chatbot API
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat
    initChat();
});

function initChat() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    
    let chatHistory = [
        {
            role: "assistant",
            content: "Hello! I'm your AI Lifestyle Coach. How can I help you on your wellness journey today? 🌱"
        }
    ];

    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmit);
    }

    // Auto-focus input on load
    if (chatInput) {
        chatInput.focus();
    }

    // Display initial message
    displayChatHistory();

    async function handleChatSubmit(event) {
        event.preventDefault();
        const userMessage = chatInput.value.trim();

        if (userMessage === '') return;

        // Add user message to UI
        addMessageToUI(userMessage, 'user');
        chatHistory.push({ role: 'user', content: userMessage });
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get AI response from real API
        await getAIChatResponse(userMessage);
    }

    function addMessageToUI(message, sender) {
        const chatWindow = document.getElementById('chat-window');
        if (!chatWindow) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const avatarIcon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
        const avatarBg = sender === 'user' ? 
            'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' : 
            'rgba(76, 175, 80, 0.1)';
        const avatarColor = sender === 'user' ? 'white' : 'var(--primary-color)';

        messageDiv.innerHTML = `
            <div class="message-avatar" style="background: ${avatarBg}; color: ${avatarColor};">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${timestamp}</span>
            </div>
        `;
        
        // Remove typing indicator if it exists
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        chatWindow.appendChild(messageDiv);
        scrollToBottom();
    }

    function displayChatHistory() {
        const chatWindow = document.getElementById('chat-window');
        if (!chatWindow) return;

        chatWindow.innerHTML = '';
        
        chatHistory.forEach(message => {
            addMessageToUI(message.content, message.role === 'user' ? 'user' : 'ai');
        });
    }

    function showTypingIndicator() {
        const chatWindow = document.getElementById('chat-window');
        if (!chatWindow) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar" style="background: rgba(76, 175, 80, 0.1); color: var(--primary-color);">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        chatWindow.appendChild(typingDiv);
        scrollToBottom();
    }

    async function getAIChatResponse(userMessage) {
        const personality = document.getElementById('chat-personality').value;
        
        try {
            // Option 1: Hugging Face API (Free tier available)
            const response = await callHuggingFaceAPI(userMessage, personality);
            
            // Option 2: OpenAI-compatible API (using Hugging Face as proxy)
            // const response = await callOpenAICompatibleAPI(userMessage, personality);
            
            addMessageToUI(response, 'ai');
            chatHistory.push({ role: 'assistant', content: response });
            
        } catch (error) {
            console.error('API Error:', error);
            
            // Fallback to mock responses if API fails
            const fallbackResponse = getFallbackResponse(userMessage, personality);
            addMessageToUI(fallbackResponse, 'ai');
            chatHistory.push({ role: 'assistant', content: fallbackResponse });
        }
    }

    // Option 1: Hugging Face API (Using a good open-source model)
    async function callHuggingFaceAPI(userMessage, personality) {
        // Using Microsoft's DialoGPT-medium model via Hugging Face
        const API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
        const API_TOKEN = 'YOUR_HUGGING_FACE_TOKEN'; // Get free token from huggingface.co

        // Format the prompt for wellness coaching
        const prompt = formatPrompt(userMessage, personality);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: {
                    text: prompt,
                },
                parameters: {
                    max_length: 150,
                    temperature: 0.7,
                    do_sample: true,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        return data.generated_text || "I'm here to help with your wellness journey! Could you tell me more about your goals?";
    }

    // Option 2: OpenAI-compatible API (Using Hugging Face as proxy)
    async function callOpenAICompatibleAPI(userMessage, personality) {
        // Using Hugging Face's OpenAI-compatible endpoint
        const API_URL = 'https://api-inference.huggingface.co/models/openai/gpt-3.5-turbo';
        const API_TOKEN = 'YOUR_HUGGING_FACE_TOKEN';

        const prompt = formatPrompt(userMessage, personality);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_tokens: 150,
                    temperature: 0.7,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data[0]?.generated_text || "I'd love to help you with your wellness goals! What specific area are you focusing on?";
    }

    // Format prompt based on personality and wellness context
    function formatPrompt(userMessage, personality) {
        const personalityContext = {
            'a friendly and encouraging coach': 'You are an encouraging, supportive wellness coach. Be positive, motivational, and focus on small achievable steps.',
            'a straightforward, no-nonsense drill sergeant': 'You are a direct, no-nonsense fitness coach. Be straightforward, focused on action, and push for immediate steps.',
            'a calm and mindful zen master': 'You are a calm, mindful wellness guide. Be peaceful, focus on mindfulness, and speak about balance and inner peace.'
        };

        const basePrompt = `As ${personality}, respond to this wellness-related question. Keep responses under 150 words, focused on practical wellness advice.

User: ${userMessage}
AI Coach:`;

        return basePrompt;
    }

    // Fallback responses if API fails
    function getFallbackResponse(userMessage, personality) {
        const wellnessResponses = {
            'a friendly and encouraging coach': [
                "That's a wonderful goal! Remember, progress is progress no matter how small. What's one tiny step you can take today? 🌟",
                "I love your enthusiasm! Consistency is key - even 5 minutes a day can create amazing changes over time. 💫",
                "You're doing great by just thinking about this! Let's break it down into manageable steps together. 🌱",
                "Every journey begins with a single step! What's one small change you can make this week? 🎯",
                "I believe in you! Remember to celebrate your small wins along the way. 🏆"
            ],
            'a straightforward, no-nonsense drill sergeant': [
                "Stop overthinking and start doing! What's your first action step? NOW! 💪",
                "Excuses don't burn calories. Let's see some action. What's the plan? 🏃‍♂️",
                "Time to stop planning and start executing. What's your move? ⏰",
                "No more delays! What's the very first thing you'll do today? 🚀",
                "Action beats intention every time. Show me what you've got! 🔥"
            ],
            'a calm and mindful zen master': [
                "Breathe deeply and find your center. The journey of wellness begins with a single mindful step. 🧘‍♂️",
                "In stillness, we find our path. What intention calls to your heart today? 🌿",
                "Each moment is a new beginning. Approach your wellness with gentle curiosity. ☁️",
                "Let go of expectations and simply be present with your journey. 🌊",
                "True wellness flows from within. Listen to what your body and mind need. 🌸"
            ]
        };

        const responses = wellnessResponses[personality] || wellnessResponses['a friendly and encouraging coach'];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function scrollToBottom() {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

    // Enhanced input interactions
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    // Personality selector change effect
    const personalitySelect = document.getElementById('chat-personality');
    if (personalitySelect) {
        personalitySelect.addEventListener('change', function() {
            const chatHeader = document.querySelector('.chat-header');
            chatHeader.style.transform = 'scale(1.02)';
            setTimeout(() => {
                chatHeader.style.transform = 'scale(1)';
            }, 200);
        });
    }
}