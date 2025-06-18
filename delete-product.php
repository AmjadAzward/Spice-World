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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['product_id'])) {
        echo json_encode(['success' => false, 'message' => 'Missing product_id']);
        exit;
    }

    $productId = $_POST['product_id'];

    $deleteSql = "DELETE FROM ProductDetails WHERE PRODUCTID = :product_id";
    $stmt = oci_parse($conn, $deleteSql);
    oci_bind_by_name($stmt, ":product_id", $productId);

    if (oci_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Product deleted successfully.']);
    } else {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Error deleting product: ' . $error['message']]);
    }

    oci_free_statement($stmt);
    oci_close($conn);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
