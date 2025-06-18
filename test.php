<?php
// Include Composer's autoloader to load PHPMailer
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'ilmaa200308@gmail.com';  // Your Gmail address
    $mail->Password = 'dgcv eisc lwnl lqmp';   // Your Gmail password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Sender and recipient settings
    $mail->setFrom('ilmaa200308@gmail.com', 'Your Name');
    $mail->addAddress('amjadazward693@gmail.com');  // Add a recipient

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email';
    $mail->Body    = 'This is a test email message.';

    // Send the email
    $mail->send();
    echo 'Email has been sent successfully';
} catch (Exception $e) {
    echo "Email could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
