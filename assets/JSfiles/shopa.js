document.addEventListener('DOMContentLoaded', function () {
    // Select the form and its elements
    const productForm = document.querySelector('#productForm');
    const productName = document.getElementById('productName');
    const productCode = document.getElementById('productCode');
    const productPrice = document.getElementById('productPrice');
    const productCategory = document.getElementById('productCategory');
    const productImage = document.getElementById('productImage');


    // Function to display a generic error message
    function showFillError(message) {
        removeFillError(); // Ensure only one error message is shown

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    productForm.insertBefore(errorMessage, productForm.firstChild);


        // Style the error message
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '14px';
        errorMessage.style.padding = '10px';
        errorMessage.style.border = '1px solid red';
        errorMessage.style.marginBottom = '10px';
        errorMessage.style.textAlign = 'center';

        // Scroll the page until the error message is in view
        errorMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center' // Align the error message to the center of the view
        });
    }

    // Function to remove all error messages
    function removeFillError() {
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Function to display a custom popup modal for success message
    function showSuccessPopup(message) {
        // Create the modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modalBox = document.createElement('div');
        modalBox.classList.add('modal-box');

        const successMessage = document.createElement('p');
        successMessage.textContent = message;
        modalBox.appendChild(successMessage);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.classList.add('close-button');
        modalBox.appendChild(closeButton);

        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        // Style the modal overlay
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';

        // Style the modal box
        modalBox.style.backgroundColor = '#fff';
        modalBox.style.padding = '20px';
        modalBox.style.borderRadius = '10px';
        modalBox.style.textAlign = 'center';
        modalBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';

        // Style the close button
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.border = 'none';
        closeButton.style.backgroundColor = '#4CAF50';
        closeButton.style.color = '#fff';
        closeButton.style.cursor = 'pointer';
        closeButton.style.borderRadius = '5px';

        // Close the modal when the close button is clicked
        closeButton.addEventListener('click', function () {
            modalOverlay.remove();
        });
    }


    function loadProducts(category = '*') {
        fetch('load-products.php')
            .then(response => response.json())
            .then(data => {
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

                data.forEach(product => {
                    if (category === '*' || product.PRODUCTCATEGORY.toLowerCase() === category.toLowerCase()) {
                        const productBox = document.createElement('div');
                        productBox.classList.add('product-box');

                        // Main image
                        const productImage = document.createElement('img');
                        productImage.src = product.PRODUCTIMAGEPATH;
                        productImage.alt = product.PRODUCTNAME;
                        productImage.classList.add('product-image');

                        // Save the second image path if available
                        const secondImagePath = product.PRODUCTIMAGEPATH2;

                        // Hover effect to change image
                        if (secondImagePath && secondImagePath.trim() !== '') {
                            productBox.addEventListener('mouseenter', function () {
                                productImage.src = secondImagePath;
                            });
                            productBox.addEventListener('mouseleave', function () {
                                productImage.src = product.PRODUCTIMAGEPATH;
                            });
                        }

                        productBox.appendChild(productImage);

                        // Product details
                        const productName = document.createElement('h3');
                        productName.textContent = product.PRODUCTNAME;
                        productName.classList.add('product-name');

                        const productCode = document.createElement('p');
                        productCode.textContent = `Stock : ${product.PRODUCTSTOCK}`;
                        productCode.classList.add('product-code');

                        const productPrice = document.createElement('p');
                        productPrice.textContent = `Price: Rs. ${product.PRODUCTPRICE}`;
                        productPrice.classList.add('product-price');

                        const productCategory = document.createElement('p');
                        productCategory.textContent = `Category: ${product.PRODUCTCATEGORY}`;
                        productCategory.classList.add('product-category');

                        productBox.appendChild(productName);
                        productBox.appendChild(productCode);
                        productBox.appendChild(productPrice);
                        productBox.appendChild(productCategory);

                        // Update button
                        const updateBtn = document.createElement('button');
                        updateBtn.textContent = 'Update';
                        updateBtn.classList.add('update-btn');
                        updateBtn.addEventListener('click', function () {

                            // Populate the form with the product's data
                            localStorage.setItem('selectedProductId', null);
                            localStorage.setItem('selectedProductId', product.PRODUCTID);

                            document.getElementById('productName').value = product.PRODUCTNAME;
                            document.getElementById('productCode').value = product.PRODUCTSTOCK;
                            document.getElementById('productPrice').value = product.PRODUCTPRICE;
                            document.getElementById('productCategory').value = product.PRODUCTCATEGORY;

                            document.getElementById("update-btn").hidden = false;

                            // Hide the Add button (replace 'add-btn' with the actual ID if different)

                            if (document.getElementById("addBTN").hidden !== true) {
                                document.getElementById("addBTN").hidden = true;

                            }


                            // Scroll to the top of the form
                            document.querySelector('form').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });

                            // Make sure Button 1 (Update button) is visible
                            updateBtn.style.display = 'inline-block';  // Make it visible

                            // Disable Button 1 (Update button)
                            //  updateBtn.disabled = true;


                        });

                        // Delete button
                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = 'Delete';
                        deleteBtn.classList.add('delete-btn');

                        // Event listener for delete button
                        deleteBtn.addEventListener('click', function () {
                            // Call showDeleteConfirmation with the product's ID and name
                            showDeleteConfirmation(product.PRODUCTID, product.PRODUCTNAME);
                        });

                        // Append buttons to product box
                        productBox.appendChild(updateBtn);
                        productBox.appendChild(deleteBtn);

                        // Add the product box to the product list
                        productList.appendChild(productBox);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading products:', error);
            });
    }


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Function to display a custom confirmation modal for delete
    function showDeleteConfirmation(productId, productName) {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modalBox = document.createElement('div');
        modalBox.classList.add('modal-box');

        const confirmationMessage = document.createElement('p');
        confirmationMessage.textContent = `Are you sure you want to delete the product: ${productName}?`;
        modalBox.appendChild(confirmationMessage);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        modalBox.appendChild(deleteButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');
        modalBox.appendChild(cancelButton);

        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        // Style the modal overlay
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';

        // Style the modal box
        modalBox.style.backgroundColor = '#fff';
        modalBox.style.padding = '20px';
        modalBox.style.borderRadius = '10px';
        modalBox.style.textAlign = 'center';
        modalBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';

        // Style the delete and cancel buttons
        deleteButton.style.marginTop = '10px';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.border = 'none';
        deleteButton.style.backgroundColor = '#FF5733';
        deleteButton.style.color = '#fff';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.borderRadius = '5px';

        cancelButton.style.marginTop = '10px';
        cancelButton.style.padding = '5px 10px';
        cancelButton.style.border = 'none';
        cancelButton.style.backgroundColor = '#4CAF50';
        cancelButton.style.color = '#fff';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.borderRadius = '5px';

        // Add a gap between buttons
        cancelButton.style.marginLeft = '15px';  // This creates a gap between the buttons

        // Handle the delete button click
        deleteButton.addEventListener('click', function () {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete-product.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    showSuccessPopup('Product deleted successfully!');
                    loadProducts(); // Reload the product list
                } else {
                    showSuccessPopup('Error deleting product. Please try again.');
                }
            };
            xhr.onerror = function () {
                showSuccessPopup('Request failed. Please check your internet connection or server status.');
            };
            xhr.send('product_id=' + productId);
            modalOverlay.remove();  // Remove the confirmation modal
        });

        // Handle the cancel button click
        cancelButton.addEventListener('click', function () {
            modalOverlay.remove(); // Remove the confirmation modal
        });
    }

    // Function to show a success message in a popup
    function showSuccessPopup(message) {
        // Create the modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modalBox = document.createElement('div');
        modalBox.classList.add('modal-box');

        const successMessage = document.createElement('p');
        successMessage.textContent = message;
        modalBox.appendChild(successMessage);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.classList.add('close-button');
        modalBox.appendChild(closeButton);

        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        // Style the modal overlay
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';

        // Style the modal box
        modalBox.style.backgroundColor = '#fff';
        modalBox.style.padding = '20px';
        modalBox.style.borderRadius = '10px';
        modalBox.style.textAlign = 'center';
        modalBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';

        // Style the close button
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.border = 'none';
        closeButton.style.backgroundColor = '#4CAF50';
        closeButton.style.color = '#fff';
        closeButton.style.cursor = 'pointer';
        closeButton.style.borderRadius = '5px';

        // Close the modal when the close button is clicked
        closeButton.addEventListener('click', function () {
            modalOverlay.remove();
        });
    }





    const filterButtons = document.querySelectorAll('.product-filters li');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' to the clicked button
            this.classList.add('active');

            // Get the selected category
            const selectedCategory = this.getAttribute('data-filter').replace('.', '');

            // Load products based on the selected category
            loadProducts(selectedCategory);
        });
    });


    loadProducts();

    const productImage1 = document.getElementById('productImage1'); // Add this line


    function clearForm() {

        removeFillError();

        // Clear all input fields
        document.getElementById('productName').value = '';
        document.getElementById('productCode').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productCategory').value = '';

        // Hide the Update button
        document.getElementById("update-btn").hidden = true;

        // Show the Add button
        document.getElementById("addBTN").hidden = false;

        // Clear file inputs
        document.getElementById('productImage').value = '';
        document.getElementById('productImage1').value = '';
    }




    document.getElementById('clear-btn').addEventListener('click', clearForm);




    function handleUpdateProduct(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        removeFillError();

        let isValid = true;

        // Validate required fields except images
        if (
            productName.value.trim() === '' ||
            productCode.value.trim() === '' ||
            productPrice.value.trim() === '' ||
            productCategory.value === ''
        ) {
            isValid = false;
            showFillError('Please fill in all required fields.');
        }

        if (!isValid) return;

        // Get the updated product data from the form
        const updatedProduct = {
            productId: localStorage.getItem('selectedProductId'),
            name: productName.value,
            code: productCode.value,
            price: productPrice.value,
            category: productCategory.value
        };

        // Create a FormData object to handle the file upload
        const formData = new FormData();
        formData.append('product_id', updatedProduct.productId);
        formData.append('product_name', updatedProduct.name);
        formData.append('product_code', updatedProduct.code);
        formData.append('product_price', updatedProduct.price);
        formData.append('product_category', updatedProduct.category);

        // Append first image if selected
        if (productImage.files.length > 0) {
            formData.append('product_image', productImage.files[0]);
        }

        // Append second image if selected
        const secondImage = document.getElementById('productImage1');
        if (secondImage && secondImage.files.length > 0) {
            formData.append('product_image_2', secondImage.files[0]);
        }

        // Send the updated product data to the server via a POST request
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'update-products.php', true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                // Show success message
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    showSuccessPopup('Product updated successfully!');
                    clearForm();
                    loadProducts();
                    productForm.reset();
                    document.getElementById("addBTN").hidden = false;
                    document.getElementById("update-btn").hidden = true;

                } else {
                    showErrorPopup(response.message); // Show error message from server
                }
            } else {
                showErrorPopup('Error updating product. Please try again.');
            }
        };

        xhr.onerror = function () {
            showErrorPopup('Request failed. Please check your internet connection or server status.');
        };

        // Send the form data (which includes images if any)
        xhr.send(formData);
    }

    // Add event listener to the Update button

    const updatebtn = document.getElementById('update-btn');
    updatebtn.addEventListener('click', handleUpdateProduct);
    /*
        const addbtn = document.getElementById('addBTN');
        updatebtn.addEventListener('click', newadd);*/


    document.getElementById('productForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = document.getElementById('productForm');
        const formData = new FormData(form);

        // Get input values
        const productName = document.getElementById('productName').value.trim();
        const productStock = document.getElementById('productCode').value.trim();
        const productPrice = document.getElementById('productPrice').value.trim();
        const productCategory = document.getElementById('productCategory').value;
        const productImage = document.getElementById('productImage').files[0];
        const productImage2 = document.getElementById('productImage1').files[0];

        // Validation
        if (!productName) {
            removeFillError();
            showFillError("Please enter a product name.");
            return;
        }
        if (!productStock || isNaN(productStock) || Number(productStock) <= 0) {
            removeFillError();

            showFillError("Please enter a valid product stock (positive number).");
            return;
        }
        if (!productPrice || isNaN(productPrice) || Number(productPrice) <= 0) {
            removeFillError();

            showFillError("Please enter a valid product price (positive number).");
            return;
        }
        if (!productCategory) {
            removeFillError();

            showFillError("Please select a product category.");
            return;
        }
        if (!productImage && !productImage2) {
            removeFillError();

            showFillError("Please upload at least one product image.");
            return;
        }

        // Append second image manually if exists
        if (productImage2) {
            formData.append('product_image_2', productImage2);
        }

        // Submit via fetch
        fetch('submit-product.php', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showSuccessPopup(data.message);
                    form.reset(); // Clear form on success
                    loadProducts();
                    removeFillError();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            });
    });


});





