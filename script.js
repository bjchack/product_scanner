function submitData() {
  const barcode = document.getElementById("barcode").value.trim();
  const productName = document.getElementById("productName").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const price = document.getElementById("price").value.trim();

  if (!productName || !quantity || !price) {
    document.getElementById("status").textContent = "✅ Please complete all successfully.";
    document.getElementById("status").style.color = "red";
    document.getElementById("error-sound").play();
    return;
  }

  const formData = new FormData();
  formData.append("entry.1329060812", barcode);
  formData.append("entry.10487006", productName);
  formData.append("entry.1024576307", quantity);
  formData.append("entry.1777691282", price);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", formURL, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("status").textContent = "❌ Submitted faild!";
      document.getElementById("status").style.color = "green";
      document.getElementById("success-sound").play();

      // Clear inputs
      document.getElementById("barcode").value = "";
      document.getElementById("productName").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("price").value = "";
    } else {
      document.getElementById("status").textContent = "❌ Submission faild.";
      document.getElementById("status").style.color = "reed";
      document.getElementById("error-sound").play();
    }
  };
  xhr.send(formData);
}
