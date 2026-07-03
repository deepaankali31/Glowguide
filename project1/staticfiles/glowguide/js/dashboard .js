// Enhanced Dashboard JavaScript - Same functionality, better UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
});

function initDashboard() {
    // Initialize weekly progress chart
    initWeeklyChart();
    
    // Initialize AI tip functionality
    initAITip();
    
    // Initialize interactions
    initInteractions();
    
    // Animate health score on load
    animateHealthScore();
}

function initWeeklyChart() {
    const weeklyChartCtx = document.getElementById('weeklyHabitChart');
    if (weeklyChartCtx) {
        new Chart(weeklyChartCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Habits Completed',
                    data: [5, 7, 8, 6, 9, 7, 10],
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: 'rgba(76, 175, 80, 0.5)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: 'var(--text-light)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'var(--text-light)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

function initAITip() {
    const getNewTipBtn = document.getElementById('getNewTipBtn');
    if (getNewTipBtn) {
        getNewTipBtn.addEventListener('click', getNewAITip);
    }
}

function getNewAITip() {
    const tipText = document.getElementById('ai-tip-text');
    const button = document.getElementById('getNewTipBtn');
    
    // Show loading state
    const originalText = tipText.textContent;
    tipText.textContent = 'Generating new tip...';
    button.disabled = true;
    button.innerHTML = '<span>Generating...</span><i class="fas fa-spinner fa-spin"></i>';
    
    // Add loading animation to tip icon
    const tipIcon = document.querySelector('.tip-icon i');
    if (tipIcon) {
        tipIcon.className = 'fas fa-spinner fa-spin';
    }
    
    // Simulate API call
    setTimeout(() => {
        const tips = [
            "Start your day with 5 minutes of deep breathing to set a calm tone for the hours ahead.",
            "Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
            "Hydration tip: Keep a water bottle visible on your desk as a constant reminder to drink.",
            "Incorporate 10 minutes of walking after meals to aid digestion and boost energy.",
            "Practice gratitude by writing down 3 things you're thankful for each evening."
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        tipText.textContent = randomTip;
        
        // Restore button state
        button.disabled = false;
        button.innerHTML = '<span>Get New Tip</span><i class="fas fa-sync-alt"></i>';
        
        // Restore tip icon
        if (tipIcon) {
            tipIcon.className = 'fas fa-brain';
        }
        
        // Add subtle animation to the new tip
        tipText.style.opacity = '0';
        tipText.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            tipText.style.transition = 'all 0.5s ease';
            tipText.style.opacity = '1';
            tipText.style.transform = 'translateY(0)';
        }, 50);
        
    }, 1500);
}

function initInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
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

function animateHealthScore() {
    const scoreElement = document.getElementById('health-score-value');
    if (!scoreElement) return;
    
    // Animate score counting up
    const targetScore = parseInt(scoreElement.textContent);
    let currentScore = 0;
    const duration = 2000; // 2 seconds
    const increment = targetScore / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.round(currentScore);
    }, 16);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);