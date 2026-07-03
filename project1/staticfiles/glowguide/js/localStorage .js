// This file manages the habit page logic using Local Storage for persistence in the prototype.
document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('add-habit-form');
    if (habitForm) {
        loadHabits();
        habitForm.addEventListener('submit', addHabit);
    }
    // Add event listener for delete buttons
    document.getElementById('habit-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const habitId = e.target.parentElement.dataset.id;
            deleteHabit(habitId);
        }
    });
});

function getHabitsFromStorage() {
    return JSON.parse(localStorage.getItem('Glow GuideHabits')) || [];
}

function saveHabitsToStorage(habits) {
    localStorage.setItem('Glow GuideHabits', JSON.stringify(habits));
}

function loadHabits() {
    const habits = getHabitsFromStorage();
    const habitListEl = document.getElementById('habit-list');
    habitListEl.innerHTML = '';

    if (habits.length === 0) {
        habitListEl.innerHTML = '<p>No habits yet. Add one above to get started!</p>';
        return;
    }

    habits.forEach(habit => {
        const habitEl = document.createElement('div');
        habitEl.className = 'habit-item';
        habitEl.dataset.id = habit.id;
        habitEl.innerHTML = `
            <span>${habit.name}</span>
            <button class="delete-btn">Delete</button>
        `;
        habitListEl.appendChild(habitEl);
    });
}

function addHabit(event) {
    event.preventDefault();
    const habitInput = document.getElementById('habit-name');
    const habitName = habitInput.value.trim();

    if (habitName) {
        const newHabit = {
            id: Date.now().toString(), // Simple unique ID
            name: habitName,
            completedDates: []
        };
        const habits = getHabitsFromStorage();
        habits.push(newHabit);
        saveHabitsToStorage(habits);
        
        habitInput.value = '';
        loadHabits();
    }
}

function deleteHabit(habitId) {
    let habits = getHabitsFromStorage();
    habits = habits.filter(habit => habit.id !== habitId);
    saveHabitsToStorage(habits);
    loadHabits();
}