document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("fruitkha-contact");
    const statusDiv = document.getElementById("form_status");

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "popup-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";
    overlay.style.display = "none";
    document.body.appendChild(overlay);

    // Create popup
    const popup = document.createElement("div");
    popup.id = "success-popup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#ffffff";
    popup.style.borderRadius = "10px";
    popup.style.padding = "25px 30px";
    popup.style.fontFamily = "Arial, sans-serif";
    popup.style.color = "#2f855a";
    popup.style.fontSize = "16px";
    popup.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    popup.style.zIndex = "1001";
    popup.style.textAlign = "center";
    popup.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    overlay.appendChild(popup);

    // Show any popup message
    function showPopup(message, autoClose = true, duration = 4000) {
        popup.innerHTML = `<p>${message}</p>`;
        overlay.style.display = "block";

        if (autoClose) {
            setTimeout(() => {
                overlay.style.display = "none";
            }, duration);
        }
    }

    // Show loading popup
    function showLoadingPopup() {
        showPopup("Sending your message...<br>Please do not close or reload the page.", false);
    }

    // Hide popup
    function hidePopup() {
        overlay.style.display = "none";
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        statusDiv.innerHTML = "";

        if (!valid_datas(this)) {
            return;
        }

        const formData = new FormData(form);
        showLoadingPopup(); // Show "please wait" popup

        try {
            const response = await fetch("send-mail.php", {
                method: "POST",
                body: formData,
            });

            const text = await response.text();
            hidePopup(); // Hide loading popup

            if (text.includes("Thank you for contacting us")) {
                showPopup("Thank you for contacting us. We will get back to you shortly!");
                form.reset();
            } else {
                statusDiv.innerHTML = `<p style="color: red;">There was an error submitting the form. Please try again.</p>`;
                console.error("Server response:", text);
            }
        } catch (error) {
            hidePopup();
            statusDiv.innerHTML = `<p style="color: red;">An error occurred. Please try again later.</p>`;
            console.error("Fetch error:", error);
        }
    });
});

function valid_datas(form) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    const statusDiv = document.getElementById("form_status");

    if (!name || !email || !phone || !subject || !message) {
        statusDiv.innerHTML = `<p style="color: red;">Please fill out all fields.</p>`;
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        statusDiv.innerHTML = `<p style="color: red;">Please enter a valid email address.</p>`;
        return false;
    }

    return true;
}
