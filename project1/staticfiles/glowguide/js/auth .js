// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});

function initAuth() {
    // Password visibility toggles
    initPasswordToggles();
    
    // Password strength indicator
    initPasswordStrength();
    
    // Form submissions
    initFormSubmissions();
    
    // Social auth buttons
    initSocialAuth();
}

function initPasswordToggles() {
    // Login password toggle
    const loginToggle = document.getElementById('toggle-login-password');
    const loginPassword = document.getElementById('login-password');
    
    if (loginToggle && loginPassword) {
        loginToggle.addEventListener('click', function() {
            togglePasswordVisibility(loginPassword, this);
        });
    }
    
    // Signup password toggle
    const signupToggle = document.getElementById('toggle-signup-password');
    const signupPassword = document.getElementById('signup-password');
    
    if (signupToggle && signupPassword) {
        signupToggle.addEventListener('click', function() {
            togglePasswordVisibility(signupPassword, this);
        });
    }
    
    // Confirm password toggle
    const confirmToggle = document.getElementById('toggle-confirm-password');
    const confirmPassword = document.getElementById('signup-confirm-password');
    
    if (confirmToggle && confirmPassword) {
        confirmToggle.addEventListener('click', function() {
            togglePasswordVisibility(confirmPassword, this);
        });
    }
}

function togglePasswordVisibility(passwordField, toggleButton) {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    
    const icon = toggleButton.querySelector('i');
    icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    
    // Add visual feedback
    toggleButton.style.transform = 'scale(1.1)';
    setTimeout(() => {
        toggleButton.style.transform = 'scale(1)';
    }, 200);
}

function initPasswordStrength() {
    const passwordInput = document.getElementById('signup-password');
    const strengthBar = document.getElementById('password-strength');
    const strengthText = document.getElementById('password-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            updateStrengthIndicator(strength, strengthBar, strengthText);
        });
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (!password) return 0;
    
    // Length check
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    
    // Character variety
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^a-zA-Z0-9]/.test(password)) score += 10;
    
    // Repeated characters penalty
    if (/(.)\1{2,}/.test(password)) score -= 10;
    
    return Math.min(Math.max(score, 0), 100);
}

function updateStrengthIndicator(strength, bar, text) {
    // Update progress bar
    bar.style.width = `${strength}%`;
    
    // Update colors and text based on strength
    if (strength < 40) {
        bar.style.background = '#f44336';
        text.textContent = 'Weak password';
        text.style.color = '#f44336';
    } else if (strength < 70) {
        bar.style.background = '#ff9800';
        text.textContent = 'Fair password';
        text.style.color = '#ff9800';
    } else if (strength < 90) {
        bar.style.background = '#4CAF50';
        text.textContent = 'Good password';
        text.style.color = '#4CAF50';
    } else {
        bar.style.background = '#2E7D32';
        text.textContent = 'Strong password';
        text.style.color = '#2E7D32';
    }
}

function initFormSubmissions() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    const submitButton = event.target.querySelector('.btn-auth');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Signing In...</span>';
    submitButton.disabled = true;
    
    try {
        // Simulate API call
        await simulateAPICall(1500);
        
        // Validate credentials (in real app, this would be server-side)
        if (validateCredentials(email, password)) {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }
            
            showFeedback('Successfully signed in!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            
        } else {
            throw new Error('Invalid email or password');
        }
        
    } catch (error) {
        showFeedback(error.message, 'error');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const newsletter = document.getElementById('newsletter').checked;
    const terms = document.getElementById('terms').checked;
    
    const submitButton = event.target.querySelector('.btn-auth');
    const originalText = submitButton.innerHTML;
    
    // Validate form
    if (password !== confirmPassword) {
        showFeedback('Passwords do not match', 'error');
        return;
    }
    
    if (!terms) {
        showFeedback('Please accept the Terms of Service', 'error');
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Creating Account...</span>';
    submitButton.disabled = true;
    
    try {
        // Simulate API call
        await simulateAPICall(2000);
        
        // Store user data (in real app, this would be server-side)
        const userData = {
            firstName,
            lastName,
            email,
            newsletter,
            joined: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        showFeedback('Account created successfully!', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        showFeedback('Error creating account. Please try again.', 'error');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

function validateCredentials(email, password) {
    // Simple validation - in real app, this would be server-side
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    if (password.length < 6) {
        return false;
    }
    
    return true;
}

function initSocialAuth() {
    const googleButtons = document.querySelectorAll('.btn-google');
    const appleButtons = document.querySelectorAll('.btn-apple');
    
    googleButtons.forEach(button => {
        button.addEventListener('click', () => {
            showFeedback('Google authentication would open here', 'info');
        });
    });
    
    appleButtons.forEach(button => {
        button.addEventListener('click', () => {
            showFeedback('Apple authentication would open here', 'info');
        });
    });
}

function simulateAPICall(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

function showFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.auth-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `auth-feedback auth-feedback-${type}`;
    feedback.innerHTML = `
        <div class="feedback-content">
            <i class="fas fa-${getFeedbackIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getFeedbackColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 3.7s forwards;
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after animation
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 4000);
}

function getFeedbackIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getFeedbackColor(type) {
    const colors = {
        success: 'var(--primary-color)',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    return colors[type] || '#2196F3';
}

// Add CSS for animations
const authStyles = document.createElement('style');
authStyles.textContent = `
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
document.head.appendChild(authStyles);