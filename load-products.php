<?php
$username = 'system'; // Change as needed
$password = 'AMJU';   // Change as needed
$connection_string = 'localhost/XEPDB1'; // Adjust if needed

// Connect to Oracle
$conn = oci_connect($username, $password, $connection_string);
if (!$conn) {
    $error = oci_error();
    echo "Connection failed: " . $error['message'];
    exit;
}

// Fetch products
$sql = "SELECT ProductID,ProductName, ProductStock, ProductPrice, ProductCategory, ProductImagePath, ProductImagePath2 FROM ProductDetails";
$stmt = oci_parse($conn, $sql);
oci_execute($stmt);

// Initialize an array to hold the product data
$products = array();

// Fetch all rows as associative arrays
while ($row = oci_fetch_assoc($stmt)) {
    $products[] = $row;  // Add each product to the array
}

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($products);

// Cleanup
oci_free_statement($stmt);
oci_close($conn);
?>
