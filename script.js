function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('result').innerText = decodedText;
  html5QrcodeScanner.clear(); // stop scanning after 1 successful read
}

function onScanFailure(error) {
  // Ignore scan failures
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  {
    fps: 10,
    qrbox: { width: 250, height: 250 }
  },
  false
);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);
