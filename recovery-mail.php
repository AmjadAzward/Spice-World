<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json');

// Oracle DB credentials
$username = 'system';
$password = 'AMJU';
$connection_string = 'localhost/XEPDB1';

// Connect to Oracle
$conn = oci_connect($username, $password, $connection_string);
if (!$conn) {
    $error = oci_error();
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $error['message']]);
    exit;
}

// Get email from POST
$email = $_POST["email"] ?? '';
if (empty($email)) {
    echo json_encode(["success" => false, "message" => "Email is required."]);
    exit;
}

// Fetch user from DB
$query = 'SELECT USERNAME, password FROM users WHERE email = :email';
$statement = oci_parse($conn, $query);
oci_bind_by_name($statement, ':email', $email);
oci_execute($statement);

$user = oci_fetch_assoc($statement);

if (!$user) {
    echo json_encode(["success" => false, "message" => "Email not found."]);
    exit;
}

$full_name = $user['USERNAME'];
$password = $user['PASSWORD']; // ⚠️ Insecure if plaintext

// Send email using PHPMailer
$mail = new PHPMailer(true);
try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'spicestoworld@gmail.com'; // Your email
    $mail->Password   = 'fsuz ylji tscf xrio';    // App password (never share real password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Email content
    $mail->setFrom('spicestoworld@gmail.com', 'Spice World');
    $mail->addAddress($email, $full_name);
    $mail->isHTML(true);
    $mail->Subject = 'Your Account Password';
    $mail->Body    = "
        <p>Hello <strong>$full_name</strong>,</p>
        <p>Your current password is: <strong>$password</strong></p>
        <p>We recommend you to change your password for better security.</p>
    ";
    $mail->AltBody = "Hello $full_name,\nYour current password is: $password\nPlease change it.";

    $mail->send();
    echo json_encode(["success" => true, "message" => "Email sent successfully."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Mailer Error: {$mail->ErrorInfo}"]);
}
?>
