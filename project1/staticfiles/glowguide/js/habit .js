// Enhanced Habit Tracker JavaScript - Same functionality, better UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize habit tracker
    initHabitTracker();
});

function initHabitTracker() {
    // Initialize form submission
    initHabitForm();
    
    // Load and display habits
    loadHabits();
    
    // Initialize interactions
    initInteractions();
}

function initHabitForm() {
    const form = document.getElementById('add-habit-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewHabit();
        });
    }
}

function addNewHabit() {
    const habitInput = document.getElementById('habit-name');
    const habitName = habitInput.value.trim();
    
    if (!habitName) return;
    
    // Create new habit object
    const newHabit = {
        id: Date.now().toString(),
        name: habitName,
        completed: false,
        createdAt: new Date().toISOString(),
        streak: 0
    };
    
    // Get existing habits
    const habits = getHabitsFromStorage();
    habits.push(newHabit);
    
    // Save to storage
    saveHabitsToStorage(habits);
    
    // Clear input
    habitInput.value = '';
    
    // Refresh habit list
    loadHabits();
    
    // Show success feedback
    showSuccessFeedback('Habit added successfully!');
}

function loadHabits() {
    const habitList = document.getElementById('habit-list');
    const habits = getHabitsFromStorage();
    
    if (habits.length === 0) {
        habitList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>No habits yet</h3>
                <p>Add your first habit to get started on your wellness journey!</p>
            </div>
        `;
        return;
    }
    
    // Create habit items
    habitList.innerHTML = habits.map(habit => `
        <div class="habit-item ${habit.completed ? 'completed' : ''}" data-habit-id="${habit.id}">
            <div class="habit-content">
                <div class="habit-icon">
                    <i class="fas ${getHabitIcon(habit.name)}"></i>
                </div>
                <div class="habit-text">
                    <h3 class="habit-name">${habit.name}</h3>
                    <p class="habit-date">Added ${formatDate(habit.createdAt)}</p>
                </div>
            </div>
            <div class="habit-actions">
                <button class="btn-icon btn-toggle" onclick="toggleHabit('${habit.id}')" title="${habit.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                    <i class="fas ${habit.completed ? 'fa-undo' : 'fa-check'}"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteHabit('${habit.id}')" title="Delete habit">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function toggleHabit(habitId) {
    const habits = getHabitsFromStorage();
    const habitIndex = habits.findIndex(h => h.id === habitId);
    
    if (habitIndex !== -1) {
        habits[habitIndex].completed = !habits[habitIndex].completed;
        
        // Update streak
        if (habits[habitIndex].completed) {
            habits[habitIndex].streak += 1;
        } else {
            habits[habitIndex].streak = Math.max(0, habits[habitIndex].streak - 1);
        }
        
        saveHabitsToStorage(habits);
        loadHabits();
        
        // Show feedback
        const habit = habits[habitIndex];
        const message = habit.completed ? 'Habit completed! Great job! 🎉' : 'Habit marked as incomplete';
        showSuccessFeedback(message);
    }
}

function deleteHabit(habitId) {
    if (!confirm('Are you sure you want to delete this habit?')) {
        return;
    }
    
    const habits = getHabitsFromStorage();
    const filteredHabits = habits.filter(h => h.id !== habitId);
    
    saveHabitsToStorage(filteredHabits);
    loadHabits();
    
    showSuccessFeedback('Habit deleted successfully');
}

// Helper functions
function getHabitsFromStorage() {
    const habitsJSON = localStorage.getItem('glowGuideHabits');
    return habitsJSON ? JSON.parse(habitsJSON) : [];
}

function saveHabitsToStorage(habits) {
    localStorage.setItem('glowGuideHabits', JSON.stringify(habits));
}

function getHabitIcon(habitName) {
    const name = habitName.toLowerCase();
    
    if (name.includes('water') || name.includes('drink') || name.includes('hydrate')) {
        return 'fa-glass-water';
    } else if (name.includes('exercise') || name.includes('workout') || name.includes('gym')) {
        return 'fa-dumbbell';
    } else if (name.includes('read') || name.includes('book')) {
        return 'fa-book';
    } else if (name.includes('meditate') || name.includes('meditation')) {
        return 'fa-spa';
    } else if (name.includes('sleep') || name.includes('bed')) {
        return 'fa-moon';
    } else if (name.includes('walk') || name.includes('run')) {
        return 'fa-person-walking';
    } else if (name.includes('fruit') || name.includes('vegetable') || name.includes('eat')) {
        return 'fa-apple-whole';
    } else if (name.includes('journal') || name.includes('write')) {
        return 'fa-pen';
    } else {
        return 'fa-star';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function initInteractions() {
    // Add hover effects to form container
    const formContainer = document.querySelector('.habit-form-container');
    if (formContainer) {
        formContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        formContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function showSuccessFeedback(message) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.innerHTML = `
        <div class="feedback-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        max-width: 300px;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
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
    
    .feedback-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .feedback-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);