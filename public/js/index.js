function animateText() {
    var text = document.getElementsByClassName("animate");
    text.style.animation = 'none'; // Reset the animation
    void text.offsetWidth; // Trigger reflow
    text.style.animation = null; // Remove inline style to reapply the animation
  }

  function animateImage() {
    var image = document.getElementById('animatedImage');
    image.style.animation = 'none'; // Reset the animation
    void image.offsetWidth; // Trigger reflow
    image.style.animation = null; // Remove inline style to reapply the animation
  }

  document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, perform further actions here (e.g., submit to server)
      console.log('Form submitted successfully!');
      // Reset the form
      this.reset();
    }
  });
  
  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const balance = document.getElementById('balance').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value.trim();
    let isValid = true;
  
    // Simple validation example, you can add more complex validations as needed
    if (name === '') {
      showError('name', 'Name is required');
      isValid = false;
    }
  
    if (email === '') {
      showError('email', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Email is not valid');
      isValid = false;
    }
  
    // Add validations for other fields
  
    return isValid;
  }
  
  function showError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('span');
    errorElement.className = 'error';
    errorElement.innerText = errorMessage;
    const parentElement = field.parentNode;
    parentElement.insertBefore(errorElement, field.nextSibling);
  }
  
  function isValidEmail(email) {
    // Simple email validation regex, you can use a more comprehensive one
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }