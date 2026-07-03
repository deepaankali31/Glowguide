// Enhanced but minimal JavaScript - Same functionality, better UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts with better styling
    initCharts();
    
    // Add smooth interactions
    initInteractions();
});

function initCharts() {
    // Habit Over Time Chart - Enhanced styling
    const habitOverTimeCtx = document.getElementById('habit-over-time-chart');
    if (habitOverTimeCtx) {
        new Chart(habitOverTimeCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Habit Score',
                    data: [65, 72, 70, 78, 85, 88],
                    fill: true,
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderColor: 'rgb(76, 175, 80)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(76, 175, 80)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Most Consistent Habits Chart - Enhanced styling
    const mostConsistentCtx = document.getElementById('most-consistent-chart');
    if (mostConsistentCtx) {
        new Chart(mostConsistentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Workout', 'Meditate', 'Read', 'Hydrate'],
                datasets: [{
                    label: 'Habit Consistency',
                    data: [300, 50, 100, 120],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.8)',
                        'rgba(139, 195, 74, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(33, 150, 243, 0.8)'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // AI Insight Button - Same functionality
    const getInsightBtn = document.getElementById('get-insight-btn');
    if (getInsightBtn) {
        getInsightBtn.addEventListener('click', getAIInsight);
    }
}

function initInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.analytics-card');
    
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
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Same getAIInsight function - just with better loading states
function getAIInsight() {
    const insightContainer = document.getElementById('ai-insight');
    const button = document.getElementById('get-insight-btn');
    
    // Show loading state
    const originalContent = insightContainer.innerHTML;
    insightContainer.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🧠</div>
            <p>Analyzing your data...</p>
        </div>
    `;
    
    button.disabled = true;
    button.innerHTML = 'Analyzing...';

    // Simulate API call
    setTimeout(() => {
        const mockResponse = {
            story: "Based on your data, you're like a gardener who diligently waters their plants every day (great job on hydration!). However, the 'workout' plant seems to be getting less sun. Maybe try scheduling workouts earlier in the day to ensure it thrives too. Consistency in one area proves you have the discipline to apply it to others!"
        };
        
        insightContainer.innerHTML = `
            <p style="color: var(--text-color); line-height: 1.6; text-align: left;">${mockResponse.story}</p>
            <button id="get-insight-btn" class="btn btn-primary">Get New Insight</button>
        `;
        
        // Re-attach event listener
        document.getElementById('get-insight-btn').addEventListener('click', getAIInsight);
        
    }, 1500);
}