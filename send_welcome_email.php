<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    $email = $_POST["email"] ?? '';
    $full_name = $_POST["full_name"] ?? '';

    if (empty($email) || empty($full_name)) {
        exit('Missing email or name');
    }

    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'spicestoworld@gmail.com'; // Your email
    $mail->Password   = 'fsuz ylji tscf xrio';   
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Email settings for the new user
    $mail->setFrom('spicestoworld@gmail.com', 'Spice World');
    $mail->addAddress($email, $full_name);

    $mail->isHTML(true);
    $mail->Subject = 'Welcome!';
    $mail->Body    = "<h3>Hello $full_name,</h3><p>Thanks for registering with us!</p>";
    $mail->AltBody = "Hello $full_name,\nThanks for registering with us.";

    // Send email to the new user
    $mail->send();

    // Email settings for yourself (admin)
    $mail->clearAddresses();  // Clear the previous recipient
    $mail->addAddress('spicestoworld@gmail.com', 'Admin');  // Replace with your email

    // Email content for yourself
    $mail->Subject = 'New Registration Notification';
    $mail->Body    = "<h3>A new user has registered:</h3><p><strong>Name:</strong> $full_name<br><strong>Email:</strong> $email</p>";
    $mail->AltBody = "A new user has registered:\nName: $full_name\nEmail: $email";

    // Send email to yourself (admin)
    $mail->send();

    echo 'Email sent successfully to both the user and the admin.';
} catch (Exception $e) {
    http_response_code(500); // Set 500 error code for frontend
    echo "Mailer Error: {$mail->ErrorInfo}";
}
?>
