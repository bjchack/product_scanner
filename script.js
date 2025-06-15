function submitData() {
  const barcode = document.getElementById("barcode").value.trim();
  const productName = document.getElementById("productName").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const price = document.getElementById("price").value.trim();

  if (!productName || !quantity || !price) {
    document.getElementById("status").textContent = "❌ Please complete all fields.";
    document.getElementById("status").style.color = "red";
    document.getElementById("error-sound").play();
    return;
  }

  const formData = new FormData();
  formData.append("entry.1329060812", barcode);
  formData.append("entry.10487006", productName);
  formData.append("entry.1024576307", quantity);
  formData.append("entry.1777691282", price);

  fetch(formURL, { method: "POST", body: formData })
    .then(() => {
      document.getElementById("status").textContent = "✅ Submitted!";
      document.getElementById("status").style.color = "green";
      document.getElementById("barcode").value = "";
      document.getElementById("productName").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("price").value = "";
      document.getElementById("success-sound").play();
    });

  // REMOVE the .catch block – Google Forms always returns 200
}
