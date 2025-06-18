function handleLoginCheck(e) {
    if (e) e.preventDefault(); // Prevent default link behavior if triggered by event

    const loggedIn = localStorage.getItem('loggedIn');
    const emailData = localStorage.getItem('email');
    const email1 = localStorage.getItem('email1'); // Actual email value

    if (loggedIn === 'true' && emailData && emailData.includes('User') && emailData.includes('Spice World')) {
        if (email1 && email1.toLowerCase() === 'spicestoworld@gmail.com') {
            // Redirect admin
            window.location.href = 'admin_dashboard.html';
        } else {
            // Redirect normal logged-in user
            window.location.href = 'loggedin.html';
        }
    } else {
        // Not logged in
        window.location.href = 'login.html';
    }
}