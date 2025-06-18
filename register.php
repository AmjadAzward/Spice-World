<?php
$username = 'system';
$password = 'AMJU';
$connection_string = 'localhost/XEPDB1';

header('Content-Type: application/json');

$conn = oci_connect($username, $password, $connection_string);
if (!$conn) {
    $error = oci_error();
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $error['message']]);
    exit;
}

// Get POST data
$full_name = $_POST['full_name'] ?? '';
$email = $_POST['email'] ?? '';
$pass = $_POST['password'] ?? '';

// Call the PL/SQL procedure to check and insert user
$plsql = "BEGIN
             check_and_insert_user(:full_name, :email, :password, :result);
          END;";

$stid = oci_parse($conn, $plsql);

// Bind the input parameters and the output parameter
oci_bind_by_name($stid, ':full_name', $full_name);
oci_bind_by_name($stid, ':email', $email);
oci_bind_by_name($stid, ':password', $pass);
oci_bind_by_name($stid, ':result', $result, 200);

// Execute the PL/SQL block
oci_execute($stid);

// Return the result as plain text (no extra formatting)
echo $result;

oci_free_statement($stid);
oci_close($conn);
?>

