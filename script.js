const formActionURL = 
  "https://docs.google.com/forms/d/e/1FAIpQLSc98BxdIwb6-4iDDXxq-lZFc-20xEpXbSxuBhQ9pzL1-bycsA/formResponse";
const entryField = "entry.1234567890";  // ← palitan ito ng real ID

function sendToSheet(code) {
  const data = new FormData();
  data.append(entryField, code);
  fetch(formActionURL, {
    method: "POST",
    mode: "no-cors",
    body: data
  }).then(() => console.log("Logged:", code));
}

function onScanSuccess(text) {
  document.getElementById('result').innerText = text;
  html5QrCodeScanner.clear();  // stop scan
  sendToSheet(text);          // log to Google Sheet
}

const html5QrCodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
html5QrCodeScanner.render(onScanSuccess, error => {});
