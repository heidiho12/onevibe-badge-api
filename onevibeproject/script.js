function verifieerCode() {
  const code = document.getElementById("codeInput").value;

  fetch(`http://localhost:3001/verifyBadge?code=${code}`)
    .then(response => response.json())
    .then(data => {
      const resultaat = document.getElementById("resultaat");
      if (data.valid) {
        resultaat.innerText = `✅ ${data.message} (${data.hoodieVariant})`;
      } else {
        resultaat.innerText = `❌ ${data.message}`;
      }
    })
    .catch(error => {
      console.error("Fout:", error);
      document.getElementById("resultaat").innerText = "Server niet bereikbaar.";
    });
}
