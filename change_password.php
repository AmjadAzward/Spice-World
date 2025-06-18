<?php
// Database connection details (same as the above example)
$username = 'system';
$password = 'AMJU';
$connection_string = 'localhost/XEPDB1';

//header('Content-Type: application/json');

$conn = oci_connect($username, $password, $connection_string);
if (!$conn) {
    $error = oci_error();
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $error['message']]);
    exit;
}
// Get POST data
$email = $_POST['email'];
$current_password = $_POST['current_password'];
$new_password = $_POST['new_password'];

// Validate user input
if (empty($email) || empty($current_password) || empty($new_password)) {
    echo json_encode(['success' => false, 'message' => 'Please fill all fields']);
    exit;
}

// Check if the current password matches the one in the database
$query = "SELECT * FROM users WHERE email = :email AND password = :current_password"; // Adjust for your actual table and column names
$stid = oci_parse($conn, $query);

oci_bind_by_name($stid, ":email", $email);
oci_bind_by_name($stid, ":current_password", $current_password);

oci_execute($stid);

// If no user is found, return an error
if ($row = oci_fetch_assoc($stid)) {
    // Update the password
    $updateQuery = "UPDATE users SET password = :new_password WHERE email = :email";
    $stidUpdate = oci_parse($conn, $updateQuery);

    oci_bind_by_name($stidUpdate, ":new_password", $new_password);
    oci_bind_by_name($stidUpdate, ":email", $email);

    $updateSuccess = oci_execute($stidUpdate);

    if ($updateSuccess) {
        echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update password']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Incorrect current password']);
}

// Free resources and close the connection
oci_free_statement($stid);
oci_free_statement($stidUpdate);
oci_close($conn);
?>
