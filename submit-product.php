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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $productName = htmlspecialchars($_POST['product_name']);
    $productStock = htmlspecialchars($_POST['product_code']);
    $productPrice = htmlspecialchars($_POST['product_price']);
    $productCategory = htmlspecialchars($_POST['product_category']);
    $productImage = $_FILES['product_image'];
    $productImage2 = isset($_FILES['product_image_2']) ? $_FILES['product_image_2'] : null;

    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = uniqid() . '_' . basename($productImage["name"]);
    $targetFile = $uploadDir . $fileName;
    $targetFile2 = null;

    if (move_uploaded_file($productImage["tmp_name"], $targetFile)) {
        // Check for optional second image
        if ($productImage2 && $productImage2['size'] > 0) {
            $fileName2 = uniqid() . '_' . basename($productImage2["name"]);
            $targetFile2 = $uploadDir . $fileName2;
            move_uploaded_file($productImage2["tmp_name"], $targetFile2);
        }

        $sql = "INSERT INTO ProductDetails 
                    (ProductName, ProductStock, ProductPrice, ProductCategory, ProductImagePath, ProductImagePath2) 
                VALUES 
                    (:product_name, :product_stock, :product_price, :product_category, :product_image_path, :product_image_path2)";

        $stmt = oci_parse($conn, $sql);

        oci_bind_by_name($stmt, ":product_name", $productName);
        oci_bind_by_name($stmt, ":product_stock", $productStock);
        oci_bind_by_name($stmt, ":product_price", $productPrice);
        oci_bind_by_name($stmt, ":product_category", $productCategory);
        oci_bind_by_name($stmt, ":product_image_path", $targetFile);
        oci_bind_by_name($stmt, ":product_image_path2", $targetFile2);

        $result = oci_execute($stmt);

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Product added successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error adding product to database.']);
            unlink($targetFile);
            if ($targetFile2) {
                unlink($targetFile2);
            }
        }

        oci_free_statement($stmt);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
    }

    oci_close($conn);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
