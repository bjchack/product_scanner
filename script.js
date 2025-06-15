const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSc7L0-8TQxpw0EL3BEDufG5YOesOOO1Y1VtYeHWxu3zaIqnwQ/formResponse";

let muted = false;

function toggleMute() {
  muted = !muted;
  document.getElementById("muteBtn").textContent = muted ? "🔇 Sound OFF" : "🔊 Sound ON";
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
    },
    (error) => {}
  ).catch((err) => alert("Camera error: " + err));
}

function submitData() {
  const barcode = document.getElementById("barcode").value.trim();
  const productName = document.getElementById("productName").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const price = document.getElementById("price").value.trim();

  if (!productName || !quantity || !price) {
    document.getElementById("status").textContent = "❌ Please complete all fields.";
    document.getElementById("status").style.color = "red";
    if (!muted) document.getElementById("error-sound").play();
    return;
  }

  const formData = new FormData();
  formData.append("entry.1329060812", barcode);
  formData.append("entry.10487006", productName);
  formData.append("entry.1024576307", quantity);
  formData.append("entry.1777691282", price);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", formURL, true);
  xhr.send(formData);

  document.getElementById("status").textContent = "✅ Submitted!";
  document.getElementById("status").style.color = "green";
  if (!muted) document.getElementById("success-sound").play();

  document.getElementById("barcode").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";

  setTimeout(() => {
    document.getElementById("status").textContent = "";
  }, 3000);
}
