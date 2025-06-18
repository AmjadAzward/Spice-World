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

$sql = "SELECT * FROM PRODUCTDETAILS";
$stid = oci_parse($conn, $sql);
oci_execute($stid);

$products = [];

while ($row = oci_fetch_assoc($stid)) {
    $products[] = [
        "id" => $row["PRODUCTID"],
        "name" => $row["PRODUCTNAME"],
        "stock" => $row["PRODUCTSTOCK"],
        "price" => $row["PRODUCTPRICE"],
        "category" => $row["PRODUCTCATEGORY"],
        "image" => $row["PRODUCTIMAGEPATH"],
        "image2" => $row["PRODUCTIMAGEPATH2"]
    ];
}

oci_free_statement($stid);
oci_close($conn);

echo json_encode($products);
?>
