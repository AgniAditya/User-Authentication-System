const form = document.getElementById('loginForm');
const msgBox = document.getElementById('msg');
const loginBtn = form.querySelector('.login-btn');
const btnText = loginBtn.querySelector('.btn-text');
const spinner = loginBtn.querySelector('.loading-spinner');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.classList.toggle('active');
});

// Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Reset message
  msgBox.textContent = '';
  msgBox.className = 'message';
  
  // Show loading state
  loginBtn.classList.add('loading');
  loginBtn.disabled = true;

  const body = {
    useremail: form.email.value.trim(),
    userpassword: form.password.value
  };

  try {
    const res = await fetch('https://user-authentication-system-95u2.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok) {
      // Store token
      localStorage.setItem('token', data.token);
      msgBox.textContent = '✅ Login successful!';
      msgBox.className = 'message success';
      
      // Simulate redirect delay
      setTimeout(() => {
        msgBox.textContent = '✅ Login successful! Redirecting...';
      }, 1000);
    } else {
      msgBox.textContent = `❌ ${data.error || 'Login failed'}`;
      msgBox.className = 'message error';
    }
  } catch (err) {
    msgBox.textContent = '❌ Network error. Please try again.';
    msgBox.className = 'message error';
  } finally {
    // Hide loading state
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
  }
});

// Add input focus effects
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });
  
  // Check if input has value on load
  if (input.value) {
    input.parentElement.classList.add('focused');
  }
});