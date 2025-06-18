<?php
header('Content-Type: application/json');

// Hardcoded input for test
//$email = 'i@gmail.com';
//$password_input = 'i12345';


$email = $_POST['email'];
$password_input = $_POST['password'];

// Oracle DB connection credentials
$db_user = 'system';
$db_pass = 'AMJU';
$connection_string = 'localhost/XEPDB1';

try {
    $conn = oci_connect($db_user, $db_pass, $connection_string);
    if (!$conn) {
        $error = oci_error();
        echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $error['message']]);
        exit;
    }

    // Check user by email
    $sql = "SELECT USERNAME, PASSWORD FROM USERS WHERE EMAIL = :email";
    $stid = oci_parse($conn, $sql);
    oci_bind_by_name($stid, ':email', $email);
    oci_execute($stid);

    $row = oci_fetch_assoc($stid);

    if ($row && $password_input === $row['PASSWORD']) {
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'username' => $row['USERNAME']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or password'
        ]);
    }

    oci_free_statement($stid);
    oci_close($conn);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>
