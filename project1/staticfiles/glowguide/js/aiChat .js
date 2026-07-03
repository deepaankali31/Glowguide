document.addEventListener('DOMContentLoaded', () => {
    // For full-page chat on chat.html
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmit);
    }

    // For routine generator on routine.html
    const routineBtn = document.getElementById('generate-routine-btn');
    if(routineBtn) {
        routineBtn.addEventListener('click', handleRoutineGeneration);
    }
});

let chatHistory = [];

function handleChatSubmit(event) {
    event.preventDefault();
    const chatInput = document.getElementById('chat-input');
    const userMessage = chatInput.value.trim();

    if (userMessage === '') return;

    addMessageToUI(userMessage, 'user');
    chatHistory.push({ role: 'user', content: userMessage });
    chatInput.value = '';

    getAIChatResponse();
}

function addMessageToUI(message, sender, containerId = 'chat-window') {
    const chatWindow = document.getElementById(containerId);
    if (!chatWindow) return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getAIChatResponse() {
    const personality = document.getElementById('chat-personality').value;
    
    // Simulate API call
    addMessageToUI('...', 'ai');
    setTimeout(() => {
        const lastMessage = document.querySelector('#chat-window .ai-message:last-child p');
        const mockReply = `As ${personality}, I suggest focusing on small, consistent steps. What's one tiny action you can take today towards your goal?`;
        if (lastMessage) {
            lastMessage.textContent = mockReply;
        }
        chatHistory.push({ role: 'assistant', content: mockReply });
    }, 1200);
}

function handleRoutineGeneration() {
    const prompt = document.getElementById('routine-prompt').value;
    const personality = document.getElementById('ai-personality').value;
    const resultContainer = document.getElementById('routine-content');
    
    if (!prompt) {
        alert("Please describe your goal for the routine.");
        return;
    }

    resultContainer.innerHTML = '<p>Generating your routine... 🧘</p>';

    // Simulate API call
    setTimeout(() => {
        const mockRoutine = `### Your Energizing Morning Routine (${personality})\n\n**1. (5 mins) Hydrate & Awaken:**\n   - Drink a full glass of water immediately upon waking.\n\n**2. (10 mins) Mindful Movement:**\n   - Gentle stretching: focus on neck, shoulders, and hips.\n   - 5 sun salutations to get the blood flowing.\n\n**3. (10 mins) Fuel Up:**\n   - Prepare a simple, protein-rich breakfast like Greek yogurt with berries.\n\n**4. (5 mins) Set Intention:**\n   - Take a moment to think about one key thing you want to accomplish today.`;
        resultContainer.innerHTML = mockRoutine;
    }, 2000);
}