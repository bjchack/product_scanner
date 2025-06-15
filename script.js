// Check login status
if (window.location.pathname.includes("scan.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSc7L0-8TQxpw0EL3BEDufG5YOesOOO1Y1VtYeHWxu3zaIqnwQ/formResponse";

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

function startScan() {
  document.getElementById("reader").style.display = "block";
  const scanner = new Html5Qrcode("reader");
  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      document.getElementById("barcode").value = decodedText;
      scanner.stop();
      document.getElementById("reader").style.display = "none";
      document.getElementById("success-sound").play();
    },
    (error) => {}
  ).catch((err) => {
    alert("Camera error: " + err);
    document.getElementById("error-sound").play();
  });
}

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
    })
    .catch(() => {
      document.getElementById("status").textContent = "❌ Submission failed.";
      document.getElementById("status").style.color = "red";
      document.getElementById("error-sound").play();
    });
}
