function generateInvoice() {
    let productCount = 0;

    // Add Product Function
    function addProduct() {
        if (productCount >= 100) return;
        productCount++;

        const div = document.createElement('div');
        div.className = 'product-item';

        div.innerHTML = `
    <label style="display: flex; flex-wrap: wrap; align-items: center; margin-bottom: 10px; padding: 5px 0;">
      <span style="margin-right: 20px; display: inline-block; width: 100%; max-width: 200px;">
        Product ${productCount}:
      </span>
      <span style="margin-right: 20px; display: inline-block; width: 100%; max-width: 200px;">
        Name: <input type="text" name="product" required oninput="updatePreview()" style="padding: 5px; width: 100%; box-sizing: border-box;">
      </span>
      <span style="margin-right: 20px; display: inline-block; width: 100%; max-width: 150px;">
        Price: <input type="number" name="price" required oninput="updatePreview()" style="padding: 5px; width: 100%; box-sizing: border-box;">
      </span>
      <span style="margin-right: 20px; display: inline-block; width: 100%; max-width: 150px;">
        Quantity: <input type="number" name="qty" required oninput="updatePreview()" style="padding: 5px; width: 100%; box-sizing: border-box;">
      </span>
      <button type="button" onclick="removeProduct(this)" style="vertical-align: top; padding: 5px 10px; background-color: red; color: white; border: none; cursor: pointer; margin-top: 10px;">Remove</button>
    </label>
    `;
        document.getElementById('productList').appendChild(div);
    }

    function removeProduct(button) {
        const productDiv = button.closest('.product-item');
        productDiv.remove();
        productCount--;
    }

    // Number to Words Conversion
    function numberToWords(num) {
        const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if ((num = num.toString()).length > 9) return 'Overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{3})(\d{3})(\d{1})$/);
        if (!n) return;
        let str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Thousand ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Hundred ' : '';
        str += (n[4] != 0) ? 'And ' : '';
        str += (n[4] != 0) ? (a[n[4]] || b[n[4][0]] + ' ' + a[n[4][1]]) : '';
        return str.trim();
    }

    // Generate Invoice Preview
    function updatePreview() {
        // Logic for updating the invoice preview based on form data
    }

    // Attach event listener to form submit to generate the PDF (could use jsPDF for this part)
    document.getElementById('invoiceForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect all form data and generate invoice content
        const billNumber = document.getElementById('billNumber').value;
        const customerName = document.getElementById('customerName').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const amountInWords = document.getElementById('amountInWords').value;

        // Populate invoice preview
        document.getElementById('outputCustomer').textContent = customerName + '\n' + address + '\n' + phone;
        document.getElementById('outputBillNumber').textContent = billNumber;

        // Generate table rows for products
        const productRows = document.getElementById('productList').children;
        let tableBody = '';
        let total = 0;
        Array.from(productRows).forEach((row, index) => {
            const productName = row.querySelector('input[name="product"]').value;
            const price = parseFloat(row.querySelector('input[name="price"]').value);
            const quantity = parseFloat(row.querySelector('input[name="qty"]').value);
            const totalPrice = price * quantity;
            total += totalPrice;
            tableBody += `
        <tr>
          <td>${index + 1}</td>
          <td>${productName}</td>
          <td>${price.toFixed(2)}</td>
          <td>${quantity}</td>
          <td>${totalPrice.toFixed(2)}</td>
        </tr>
      `;
        });

        document.getElementById('outputTableBody').innerHTML = tableBody;
        document.getElementById('outputTotal').textContent = 'Total: Rs ' + total.toFixed(2);
        document.getElementById('outputTotalWords').textContent = 'Amount in Words: ' + numberToWords(total);

        // Further actions like generating PDF can be added here (using jsPDF)
    };

    // Add event listener for the add product button
    document.getElementById('addProductButton').addEventListener('click', addProduct);
}

window.onload = function () {
    generateInvoice();
};