function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('result').innerText = `✅ Scanned: ${decodedText}`;
  // Optional: stop after first scan
  html5QrcodeScanner.clear();
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: 250 },
  false
);

html5QrcodeScanner.render(onScanSuccess);
