// Enhanced Routine Generator JavaScript - Same functionality, better UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize routine generator
    initRoutineGenerator();
});

function initRoutineGenerator() {
    // Initialize generate button
    const generateBtn = document.getElementById('generate-routine-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleRoutineGeneration);
    }
    
    // Initialize interactions
    initInteractions();
}

function handleRoutineGeneration() {
    const prompt = document.getElementById('routine-prompt').value;
    const personality = document.getElementById('ai-personality').value;
    const resultContainer = document.getElementById('routine-content');
    const generateBtn = document.getElementById('generate-routine-btn');
    
    if (!prompt.trim()) {
        showError('Please describe your goal for the routine.');
        return;
    }

    // Show loading state
    resultContainer.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner">
                <i class="fas fa-robot"></i>
            </div>
            <p>Generating your personalized routine... 🧘</p>
        </div>
    `;
    
    // Disable button during generation
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span>Generating...</span><i class="fas fa-spinner fa-spin"></i>';

    // Simulate API call
    setTimeout(() => {
        const mockRoutine = `### Your Energizing Morning Routine (${getPersonalityName(personality)})\n\n**1. (5 mins) Hydrate & Awaken:**\n   - Drink a full glass of water immediately upon waking.\n\n**2. (10 mins) Mindful Movement:**\n   - Gentle stretching: focus on neck, shoulders, and hips.\n   - 5 sun salutations to get the blood flowing.\n\n**3. (10 mins) Fuel Up:**\n   - Prepare a simple, protein-rich breakfast like Greek yogurt with berries.\n\n**4. (5 mins) Set Intention:**\n   - Take a moment to think about one key thing you want to accomplish today.`;
        
        // Format the routine with better styling
        resultContainer.innerHTML = formatRoutine(mockRoutine);
        
        // Re-enable button
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span>Generate My Routine</span><i class="fas fa-wand-magic-sparkles"></i>';
        
        // Add success animation
        resultContainer.style.opacity = '0';
        resultContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultContainer.style.transition = 'all 0.5s ease';
            resultContainer.style.opacity = '1';
            resultContainer.style.transform = 'translateY(0)';
        }, 50);
        
    }, 2000);
}

function getPersonalityName(personalityValue) {
    const personalities = {
        'a friendly and encouraging coach': '🌟 Encouraging Coach',
        'a straightforward, no-nonsense drill sergeant': '💪 Drill Sergeant', 
        'a calm and mindful zen master': '🧘 Zen Master'
    };
    return personalities[personalityValue] || 'AI Coach';
}

function formatRoutine(routineText) {
    // Convert markdown-like formatting to HTML
    return routineText
        .replace(/### (.*)/g, '<h4>$1</h4>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</div><div class="routine-section">')
        .replace(/\n/g, '<br>')
        .replace(/<div class="routine-section">/g, '<div class="routine-section">');
}

function initInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Textarea auto-resize
    const textarea = document.getElementById('routine-prompt');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}

function showError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(244, 67, 54, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        max-width: 300px;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .error-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .error-content i {
        font-size: 1.2rem;
    }
    
    .routine-section {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: rgba(76, 175, 80, 0.03);
        border-radius: 8px;
        border-left: 4px solid var(--primary-color);
    }
    
    .routine-section:last-child {
        margin-bottom: 0;
    }
`;
document.head.appendChild(style);