document.getElementById('contact').addEventListener('submit', function (event) {
    event.preventDefault();

    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    

    let isValid = true;

    if(name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (phone === '' || !phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = 'Valid 10-digit phone number is required.';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    } 

    if (message === '') {
        document.getElementById('messageError').textContent = 'Please write a message.';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        //alert('Form submitted successfully!');
        //document.getElementById('submit').value = 'Sending...';
       window.location.href = 'response.html';

       document.getElementById('contact').reset();
        
    }
});

// JavaScript to toggle the mobile menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

hamburgerMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});