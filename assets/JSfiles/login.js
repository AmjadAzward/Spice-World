document.addEventListener("DOMContentLoaded", function () {
    // Reusable function to show styled popup with a callback on "OK" click
    function showPopup(message, type = 'success', autoClose = false, closeDelay = 3000, onCloseCallback = null) {
        const existingOverlay = document.querySelector('.modal-overlay');
        if (existingOverlay) existingOverlay.remove();

        const modalOverlay = document.createElement('div');
        const modalBox = document.createElement('div');
        const msgPara = document.createElement('p');
        const closeButton = document.createElement('button');

        msgPara.textContent = message;
        closeButton.textContent = 'OK';

        modalBox.appendChild(msgPara);
        modalBox.appendChild(closeButton);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

      // Overlay styles
Object.assign(modalOverlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999'
});

// Box styles
// Box styles
Object.assign(modalBox.style, {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
    width: '80%',          // Reduced from 90% to 80%
    maxWidth: '300px',     // Reduced from 400px to 300px
    color: type === 'success' ? '#4CAF50' : '#E53935',
    fontFamily: 'Arial',
    boxSizing: 'border-box'
});


// Button styles
Object.assign(closeButton.style, {
    marginTop: '15px',
    padding: '8px 16px',
    border: 'none',
    backgroundColor: type === 'success' ? '#4CAF50' : '#E53935',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px'
});

        closeButton.onmouseover = () => {
            closeButton.style.opacity = '0.9';
        };
        closeButton.onmouseout = () => {
            closeButton.style.opacity = '1';
        };

        closeButton.addEventListener('click', () => {
            modalOverlay.remove();
            if (onCloseCallback) onCloseCallback();  // Trigger the callback after closing
        });

        if (autoClose) {
            setTimeout(() => {
                modalOverlay.remove();
                if (onCloseCallback) onCloseCallback();  // Trigger the callback after auto-close
            }, closeDelay);
        }
    }

    // Function to validate login
    function valid_login(event) {
        event.preventDefault();  // Prevent the form from submitting traditionally

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Basic client-side validation
        if (email === "" || password === "") {
            showPopup('Please fill in all fields', 'error');
            return false;
        }

        // Prepare data for the server
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        // Send login request to the server via AJAX
        fetch('login.php', {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(responseData => {
                console.log('Server Response:', responseData);  // Log the full response
                if (responseData.success) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', `User ${email} logged in for Spice World`);
                    localStorage.setItem('email1', email);

                    const redirectPage = (email.toLowerCase() === 'spicestoworld@gmail.com')
                        ? 'indexa.html'
                        : 'index.html';

                    showPopup(responseData.message, 'success', false, 3000, function () {
                        window.location.href = redirectPage;
                    });
                    document.getElementById("login-form").reset();
                } else {
                    showPopup(responseData.message, 'error');
                }

            })
            .catch(error => {
                showPopup('An error occurred. Please try again later.', 'error');
                console.error('Error:', error);
            });

        return false; // Prevent the default form submission
    }

    // Attach the validation to the form submit event
    document.getElementById("login-form").addEventListener("submit", valid_login);

    // Forgot Password logic
    document.getElementById("forgot-link").addEventListener("click", function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        if (email === '') {
            showPopup("Please enter your email address first.", "error");
        } else {
            // Send the email to PHP
            const data = new FormData();
            data.append('email', email);

            fetch('recovery-mail.php', {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(responseData => {
                    if (responseData.success) {
                        showPopup("Check your email to get your password back.", "success");
                    } else {
                        showPopup(responseData.message, "error");
                    }
                })
                .catch(error => {
                    showPopup("Something went wrong. Try again later.", "error");
                    console.error('Error:', error);
                });
        }
    });
});
