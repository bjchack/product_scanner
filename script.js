function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "scan.html";
  } else {
    document.getElementById("login-status").innerText = "Invalid login!";
    playSound("error");
  }
}

function checkLogin() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

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
    },
    (error) => {}
  ).catch((err) => alert("Camera error: " + err));
}

function submitData() {
  const barcode = encodeURIComponent(document.getElementById("barcode").value.trim());
  const product = encodeURIComponent(document.getElementById("productName").value.trim());
  const quantity = encodeURIComponent(document.getElementById("quantity").value.trim());

  if (!barcode || !product || !quantity) {
    document.getElementById("status").textContent = "❗ Please complete all fields.";
    document.getElementById("status").style.color = "red";
    playSound("error");
    return;
  }

  const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSc7L0-8TQxpw0EL3BEDufG5YOesOOO1Y1VtYeHWxu3zaIqnwQ/formResponse?";
  const fullURL = `${formURL}entry.1329060812=${barcode}&entry.10487006=${product}&entry.1024576307=${quantity}`;

  fetch(fullURL, { method: "POST", mode: "no-cors" })
    .then(() => {
      document.getElementById("status").textContent = "✅ Submitted successfully!";
      document.getElementById("status").style.color = "green";
      document.getElementById("barcode").value = "";
      document.getElementById("productName").value = "";
      document.getElementById("quantity").value = "";
      playSound("success");
    })
    .catch(() => {
      document.getElementById("status").textContent = "❌ Failed to submit.";
      document.getElementById("status").style.color = "red";
      playSound("error");
    });
}

function playSound(type) {
  const sound = new Audio("sounds/" + (type === "success" ? "success.mp3" : "error.mp3"));
  sound.play();
}
