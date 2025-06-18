document.addEventListener("DOMContentLoaded", function () {

    // General popup with close button
    function showPopup(message, type = 'success', autoClose = false, closeDelay = 3000) {
        const existingOverlay = document.querySelector('.modal-overlay');
        if (existingOverlay) existingOverlay.remove();

        const modalOverlay = document.createElement('div');
        const modalBox = document.createElement('div');
        const msgPara = document.createElement('p');
        const closeButton = document.createElement('button');

        msgPara.textContent = message;
        closeButton.textContent = 'Close';

        modalBox.appendChild(msgPara);
        modalBox.appendChild(closeButton);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

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

        Object.assign(modalBox.style, {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
            minWidth: '280px',
            color: type === 'success' ? '#4CAF50' : '#E53935',
            fontFamily: 'Arial'
        });

        Object.assign(closeButton.style, {
            marginTop: '15px',
            padding: '8px 16px',
            border: 'none',
            backgroundColor: type === 'success' ? '#4CAF50' : '#E53935',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '5px'
        });

        closeButton.addEventListener('click', () => modalOverlay.remove());

        if (autoClose) {
            setTimeout(() => modalOverlay.remove(), closeDelay);
        }
    }

    // Auto-close popup without button
    function showWaitingPopup(message, delay = 2000) {
        const existingOverlay = document.querySelector('.modal-overlay');
        if (existingOverlay) existingOverlay.remove();

        const modalOverlay = document.createElement('div');
        const modalBox = document.createElement('div');
        const msgPara = document.createElement('p');

        msgPara.textContent = message;

        modalBox.appendChild(msgPara);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

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

        Object.assign(modalBox.style, {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
            minWidth: '280px',
            color: '#4CAF50',
            fontFamily: 'Arial'
        });

        return modalOverlay;
    }

    document.getElementById("register-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const fullName = document.getElementById("full_name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        if (!fullName || !email || !password || !confirmPassword) {
            showPopup("All fields are required.", "error");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            showPopup("Full name should only contain letters and spaces.", "error");
            return;
        }

        if (password.length < 6) {
            showPopup("Password must be at least 6 characters long.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showPopup("Passwords do not match.", "error");
            return;
        }

        // Show waiting message (only once)
        const waiting = showWaitingPopup("Please wait while your registration is being processed...");

        try {
            const response = await fetch("register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `full_name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });

            const result = await response.text();

            if (result.toLowerCase().includes("success")) {
                try {
                    await fetch("send_welcome_email.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: `email=${encodeURIComponent(email)}&full_name=${encodeURIComponent(fullName)}`
                    });
                } catch (emailErr) {
                    console.error("Email sending failed:", emailErr);
                }

                // Remove wait and show success
                waiting.remove();
                showPopup("Registration complete! Redirecting to login...", "success", true, 3000);
                document.getElementById("register-form").reset();

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);

            } else {
                waiting.remove();
                showPopup( result, "error");
            }

        } catch (err) {
            waiting.remove();
            showPopup("Failed to connect to server.", "error");
        }
    });

});
