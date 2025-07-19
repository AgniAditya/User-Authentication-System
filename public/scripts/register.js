const form = document.getElementById('registerForm');
const msgBox = document.getElementById('msg');
const registerBtn = form.querySelector('.register-btn');
const btnText = registerBtn.querySelector('.btn-text');
const spinner = registerBtn.querySelector('.loading-spinner');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('userpassword');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.classList.toggle('active');
});

// Password strength checker
function checkPasswordStrength(password) {
  let strength = 0;
  let feedback = '';

  if (password.length >= 6) strength += 1;
  if (password.length >= 8) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  switch (strength) {
    case 0:
    case 1:
      feedback = 'Very weak';
      strengthFill.className = 'strength-fill weak';
      break;
    case 2:
    case 3:
      feedback = 'Weak';
      strengthFill.className = 'strength-fill medium';
      break;
    case 4:
      feedback = 'Good';
      strengthFill.className = 'strength-fill good';
      break;
    case 5:
    case 6:
      feedback = 'Strong';
      strengthFill.className = 'strength-fill strong';
      break;
  }

  strengthFill.style.width = `${(strength / 6) * 100}%`;
  strengthText.textContent = feedback;
}

passwordInput.addEventListener('input', (e) => {
  checkPasswordStrength(e.target.value);
});

// Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Reset message
  msgBox.textContent = '';
  msgBox.className = 'message';
  
  // Show loading state
  registerBtn.classList.add('loading');
  registerBtn.disabled = true;

  const body = {
    username: form.username.value.trim(),
    useremail: form.useremail.value.trim(),
    userpassword: form.userpassword.value
  };

  try {
    const res = await fetch('https://user-authentication-system-95u2.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    
    if (res.ok) {
      msgBox.textContent = '✅ Registration successful! You can now sign in.';
      msgBox.className = 'message success';
      form.reset();
      
      // Reset password strength indicator
      strengthFill.style.width = '0%';
      strengthText.textContent = 'Password strength';
      strengthFill.className = 'strength-fill';
      
      // Redirect to login after delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      msgBox.textContent = `❌ ${data.error || 'Registration failed'}`;
      msgBox.className = 'message error';
    }
  } catch (err) {
    msgBox.textContent = '❌ Network error. Please try again.';
    msgBox.className = 'message error';
  } finally {
    // Hide loading state
    registerBtn.classList.remove('loading');
    registerBtn.disabled = false;
  }
});

// Add input focus effects
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
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