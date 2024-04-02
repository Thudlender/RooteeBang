// สำหรับเพิ่มสินค้าลงในตะกร้าของลูกค้าเมื่อมีการคลิกที่ปุ่ม "Add to Cart"
const cart = {};

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    if (!cart[productId]) {
      cart[productId] = { quantity: 1, price: price };
    } else {
      cart[productId].quantity++;
    }
    updateCartDisplay();
  });
});
// นับราคารวมในตะกร้าสินค้าโดยเริ่มต้นจาก 0
function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;

  // Create a table
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Product", "Quantity", "Price", "Total", "Actions"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");

  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    const tr = document.createElement("tr");

    const productNameCell = document.createElement("td");
    productNameCell.textContent = getProductMenu(productId); // เรียกใช้ฟังก์ชันเพื่อรับชื่อเมนูอาหาร
    tr.appendChild(productNameCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    tr.appendChild(quantityCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `฿${item.price}`;
    tr.appendChild(priceCell);

    const totalCell = document.createElement("td");
    totalCell.textContent = `฿${itemTotalPrice}`;
    tr.appendChild(totalCell);

    //ปุ่มลบ
    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "delete-product");
    deleteButton.setAttribute("data-product-id", productId);
    deleteButton.addEventListener("click", () => {
      delete cart[productId];
      updateCartDisplay();
    });
    actionsCell.appendChild(deleteButton);

    //ปุ่มลดจำนวน
    const reduceButton = document.createElement("button");
    reduceButton.textContent = "Reduce";
    reduceButton.classList.add("btn", "btn-secondary", "reduce-quantity");
    reduceButton.setAttribute("data-product-id", productId);
    reduceButton.addEventListener("click", () => {
      if (cart[productId].quantity > 1) {
        cart[productId].quantity--;
        updateCartDisplay();
      }
    });
    actionsCell.appendChild(reduceButton);

    tr.appendChild(actionsCell);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  cartElement.appendChild(table);

  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: ฿${totalPrice}`;
    cartElement.appendChild(totalPriceElement);
  }
}

// เพิ่มฟังก์ชันเพื่อรับชื่อเมนูอาหารตาม productId
function getProductMenu(productId) {
  switch (productId) {
    case "1":
      return "โรตีสูตรดั่งเดิม";
    case "2":
      return "โรตีใส่ไข่";
    case "3":
      return "โรตีแป้งใบเตย พร้อมสังขยา";
    case "4":
      return "โรตีใส่ช็อกโกแลต";
    case "5":
      return "โรตีฝอยทอง";
      case "6":
        return "โรตีใส่แยมสตอเบอร์รี่";
        case "7":
      return "โรตีเนื้อกล้วยผสม";
      case "8":
      return "โรตีลาวา ใส่นมข้นและเนยสอดไส้ข้างใน";
      case "9":
      return "โรตีแป้งอัญชัน";
      case "10":
        return "โรตีกรอบพิเศษ";
    default:
      return "Unknown Menu";
  }
}


document.getElementById("printCart").addEventListener("click", () => {
  const customerName = prompt("Please enter your name:");
  printReceipt("Cart Receipt", generateCartReceipt(customerName));
  // แสดง SweetAlert เมื่อทำการพิมพ์ใบเสร็จเรียบร้อยแล้ว
  Swal.fire({
    icon: "success",
    title: "ํYour receipt has been printed",
    showConfirmButton: false,
    timer: 1500,
  });
});

function printReceipt(title, content) {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(
    `<html><head><title>${title}</title></head><body>${content}</body></html>`
  );
  printWindow.document.close();
  printWindow.print();
}
//รูปแบบตาราง จัดเรียงตาราง
function generateCartReceipt() {
  let receiptContent = `
  <style>
  @page {
    size: 100mm 100mm;
  }
  body {
    width: 100mm;
    height: 100mm;
    margin: 0;
    padding: 10px;
    font-family: Arial, sans-serif;
    color: #ffffff; /* เปลี่ยนสีข้อความเป็นสีขาว */
  }
  h2 {
    text-align: center;
    margin-bottom: 10px;
    color: #ffffff; /* เปลี่ยนสีข้อความเป็นสีขาว */
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    
  }
  th, td {
    border: 1px solid #ddd;
    padding: 5px; /* ลดระยะห่างระหว่างข้อมูล */
    text-align: left;
    color: #ffffff; /* เปลี่ยนสีข้อความเป็นสีขาว */
  }
  th {
    background-color: #f2f2f2;
    color: #ffffff; /* เปลี่ยนสีข้อความเป็นสีดำ */
  }
  td {
    color: #ffffff; /* เปลี่ยนสีข้อความเป็นสีดำ */
  }
</style>

<h2>Cart Receipt</h2>
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
  </thead>`;

  let totalPrice = 0;

  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
// เรียกส่วนที่จะนำมาโชว์บนหน้าเว็บ
    receiptContent += `
      <tr>
        <td>Product ${productName}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>$${itemTotalPrice}</td>
       
      </tr>`;

    totalPrice += itemTotalPrice;
  }

  receiptContent += `
      </tbody>
    </table>
    
    <p>Total Price: ${totalPrice} ฿</p>`;

  return receiptContent;
}

//โชว์หัวตาราง
function generateCartReceipt(customerName) {
  let receiptContent = `
  <style>
    /* Your existing CSS for receipt styling */
  </style>

  <h2>Cart Receipt</h2>
  <p>ชื่อของลูก: ${customerName}</p>
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>`;

  let totalPrice = 0;

  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;

    // Get the name of the product using getProductMenu function
    const productName = getProductMenu(productId);

    receiptContent += `
      <tr>
        <td>${productName}</td>
        <td>${item.quantity}</td>
        <td>฿${item.price}</td>
        <td>฿${itemTotalPrice}</td>
      </tr>`;

    totalPrice += itemTotalPrice;
  }

  receiptContent += `
    </tbody>
  </table>
  <p>Total Price: ${totalPrice} บาท</p>
  <p>&copy; 2024 Rootee Jao Gao. All rights reserved.</p>
    <p>Email: contact@Rootee.com</p>
    <p>Phone: +123-456-7890</p>`;

  return receiptContent;
}

function promptCustomerName() {
  const customerName = prompt("Please enter your name:");
  if (customerName) {
    printReceipt("Cart Receipt", generateCartReceipt(customerName));
  }
}

document.getElementById("printCart").addEventListener("click", () => {
  promptCustomerName();
});


