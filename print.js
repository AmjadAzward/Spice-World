
let productCount = 0;

function addProduct() {
  if (productCount >= 100) return;
  productCount++;

  const div = document.createElement('div');
  div.className = 'product-item';

  div.innerHTML = `
    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 12px; padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: #f8f8f8;">
      <div style="flex: 1; min-width: 150px;">
        <label style="font-weight: bold; font-size: 14px;">Product ${productCount}</label>
        <input type="text" name="product" required 
          placeholder="Enter product name" 
          style="padding: 6px 10px; width: 100%; border: 1px solid #ccc; border-radius: 4px; color: #999;">
      </div>

      <div style="flex: 1; min-width: 120px;">
        <input type="number" name="price" required 
          placeholder="Enter price" 
          style="margin-top:47px; padding: 6px 10px; width: 100%; border: 1px solid #ccc; border-radius: 4px; color: #999;">
      </div>

      <div style="flex: 1; min-width: 120px;">
        <input type="number" name="qty" required 
          placeholder="Enter quantity" 
          style="margin-top:47px; padding: 6px 10px; width: 100%; border: 1px solid #ccc; border-radius: 4px; color: #999;">
      </div>

      <div style="min-width: 100px;">
        <button type="button" onclick="removeProduct(this)" 
          style="margin-top:30px; padding: 6px 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Remove
        </button>
      </div>
    </div>
  `;

  document.getElementById('productList').appendChild(div);
  updatePreview(); // Trigger update after adding
}





    function removeProduct(button) {
      const productDiv = button.closest('.product-item');
      productDiv.remove();
      productCount--;
    }


    function numberToWords(num) {
      const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
      const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

      if ((num = num.toString()).length > 9) return 'Overflow';
      let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{3})(\d{3})(\d{1})$/);
      if (!n) return; let str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Thousand ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Hundred ' : '';
      str += (n[4] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' ' : '';
      return str + 'Only';
    }



function updatePreview() {
  const invoiceType = document.getElementById('invoiceType').value;
  document.getElementById('outputInvoiceType').innerText = invoiceType;

  const name = document.getElementById('customerName').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const billNumber = document.getElementById('billNumber').value;
  const amountInWords = document.getElementById('amountInWords').value;

  document.getElementById('outputBillNumber').innerText = 'Bill Number: ' + billNumber;
  document.getElementById('outputCustomer').innerHTML = `Name: ${name}<br>Address: ${address}<br>Phone No: ${phone}<br>Date: ${date}`;

  const productElems = document.querySelectorAll('.product-item');
  const tbody = document.getElementById('outputTableBody');
  tbody.innerHTML = '';
  let total = 0;

  productElems.forEach((row, i) => {
    const inputs = row.querySelectorAll('input');
    if (inputs.length < 3) return;

    const productName = inputs[0].value;
    const price = parseFloat(inputs[1].value) || 0;
    const qty = parseInt(inputs[2].value) || 0;
    const itemTotal = price * qty;
    total += itemTotal;

    const tr = `<tr>
      <td>${(i + 1).toString().padStart(2, '0')}</td>
      <td>${productName}</td>
      <td>${price.toFixed(2)}</td>
      <td>${qty}</td>
      <td>${itemTotal.toFixed(2)}</td>
    </tr>`;

    tbody.innerHTML += tr;
  });

  document.getElementById('outputTotal').innerText = `Total: Rs ${total.toFixed(2)}`;
  document.getElementById('outputTotalWords').innerText = `Amount in words: ${amountInWords}`;
}


    // Add real-time update listener for "amount in words"
    window.onload = function () {
      document.getElementById('amountInWords').addEventListener('input', updatePreview);

      // Optional: trigger live updates for other fields too
      document.querySelectorAll('#customerName, #address, #phone, #date, #billNumber').forEach(el => {
        el.addEventListener('input', updatePreview);
      });

      // Also track input inside each product row
      document.getElementById('productList').addEventListener('input', updatePreview);
    };

    document.getElementById('invoiceForm').addEventListener('submit', function (e) {
      e.preventDefault();

      // Generate PDF
      html2canvas(document.getElementById('invoiceOutput')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const invoiceType = document.getElementById('invoiceType').value;
pdf.save(`${invoiceType}_${document.getElementById('billNumber').value}.pdf`);
// Reset form fields
    document.querySelector("form").reset();

    // Clear dynamic product inputs
    document.getElementById('productList').innerHTML = '';

    // Reset output preview
    updatePreview();

      });
    });
