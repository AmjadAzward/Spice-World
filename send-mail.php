<?php
// Include Composer autoload file
require 'vendor/autoload.php';

// Use PHPMailer classes with the correct namespaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Use your SMTP server here (Gmail example)
        $mail->SMTPAuth = true;
    $mail->Username   = 'spicestoworld@gmail.com'; // Your email
    $mail->Password   = 'fsuz ylji tscf xrio';   
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // SMTP port for Gmail is 587

        // Enable SMTP debugging
        $mail->SMTPDebug = 2; // Change to 0 to disable debugging, 2 shows detailed output

        // Recipients
        $mail->setFrom($email, $name); // From email and name
        $mail->addAddress('spicestoworld@gmail.com'); // Recipient email

        // Email content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "<html><body>
                        <h2>Contact Form Submission</h2>
                        <p><strong>Name: </strong>" . $name . "</p>
                        <p><strong>Email: </strong>" . $email . "</p>
                        <p><strong>Phone: </strong>" . $phone . "</p>
                        <p><strong>Subject: </strong>" . $subject . "</p>
                        <p><strong>Message: </strong><br>" . nl2br($message) . "</p>
                        </body></html>";

        // Send email
        if ($mail->send()) {
            echo "<p>Thank you for contacting us. We will get back to you shortly!</p>";
        } else {
            echo "<p>Sorry, there was an error submitting your message. Please try again later.</p>";
        }
    } catch (Exception $e) {
        echo "<p>Message could not be sent. Mailer Error: {$mail->ErrorInfo}</p>";
        error_log("Mailer Error: " . $mail->ErrorInfo); // Log the error for debugging
    }
}
?>
