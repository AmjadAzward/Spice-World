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
    $productId = $_POST['product_id'];
    $productName = htmlspecialchars($_POST['product_name']);
    $productCode = htmlspecialchars($_POST['product_code']);
    $productPrice = htmlspecialchars($_POST['product_price']);
    $productCategory = htmlspecialchars($_POST['product_category']);

    $productImage = $_FILES['product_image'];
    $productImage2 = isset($_FILES['product_image_2']) ? $_FILES['product_image_2'] : null;

    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $setImage1 = "";
    $setImage2 = "";
    $targetFile = null;
    $targetFile2 = null;

    // Handle first image upload
    if ($productImage && $productImage['size'] > 0) {
        $fileName = uniqid() . '_' . basename($productImage["name"]);
        $targetFile = $uploadDir . $fileName;
        if (move_uploaded_file($productImage["tmp_name"], $targetFile)) {
            $setImage1 = ", ProductImagePath = :product_image_path";
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload Image 1.']);
            exit;
        }
    }

    // Handle second image upload (optional)
    if ($productImage2 && $productImage2['size'] > 0) {
        $fileName2 = uniqid() . '_' . basename($productImage2["name"]);
        $targetFile2 = $uploadDir . $fileName2;
        if (move_uploaded_file($productImage2["tmp_name"], $targetFile2)) {
            $setImage2 = ", ProductImagePath2 = :product_image_path2";
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload Image 2.']);
            exit;
        }
    }

    // Prepare the UPDATE query with dynamic parts
    $sql = "UPDATE ProductDetails 
            SET ProductName = :product_name, 
                ProductStock = :product_code, 
                ProductPrice = :product_price, 
                ProductCategory = :product_category
                $setImage1
                $setImage2
            WHERE ProductID = :product_id";

    $stmt = oci_parse($conn, $sql);

    // Bind required fields
    oci_bind_by_name($stmt, ":product_id", $productId);
    oci_bind_by_name($stmt, ":product_name", $productName);
    oci_bind_by_name($stmt, ":product_code", $productCode);
    oci_bind_by_name($stmt, ":product_price", $productPrice);
    oci_bind_by_name($stmt, ":product_category", $productCategory);

    // Bind image paths if applicable
    if ($setImage1) {
        oci_bind_by_name($stmt, ":product_image_path", $targetFile);
    }
    if ($setImage2) {
        oci_bind_by_name($stmt, ":product_image_path2", $targetFile2);
    }

    $result = oci_execute($stmt);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Product updated successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Update failed.']);
        // Rollback and cleanup
        if ($targetFile) unlink($targetFile);
        if ($targetFile2) unlink($targetFile2);
    }

    oci_free_statement($stmt);
    oci_close($conn);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
