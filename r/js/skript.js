document.addEventListener("DOMContentLoaded", function() {
	// Referanse til skjemaet og meldingsdiven
	const skjema = document.getElementById('kontakt-skjema');
	const meldingDiv = document.getElementById('melding');

	// Lytter på skjemaets submit-hendelse
	skjema.addEventListener('submit', function(event) {
		event.preventDefault(); // Forhindre standardsending av skjema

		// Opprett et nytt FormData-objekt med skjemaets innhold
		const formData = new FormData(skjema);

		// Opprett AJAX-forespørselen
		fetch('send.php', {
			method: 'POST',
			body: formData
		})
		.then(response => response.text())
		.then(data => {
			// Sjekk responsen fra send.php
			if (data.includes("Meldingen har blitt sendt")) {
				// Vis en varsel i nettleseren
				if (Notification.permission === "granted") {
					new Notification("Melding sendt", {
						body: "Din melding ble sendt med suksess.",
						icon: "/path/to/success-icon.png" // Bruk en ikonbane om ønskelig
					});
				} else if (Notification.permission !== "denied") {
					// Spør om tillatelse til å vise varsler
					Notification.requestPermission().then(permission => {
						if (permission === "granted") {
							new Notification("Melding sendt", {
								body: "Din melding ble sendt med suksess.",
								icon: "/path/to/success-icon.png"
							});
						}
					});
				}

				// Tøm skjemaet etter suksessfull sending
				skjema.reset();
				// Vis melding på siden
				meldingDiv.innerHTML = '<p style="color: green;">Meldingen har blitt sendt!</p>';
			} else {
				// Vis feilmelding på siden hvis sending mislykkes
				meldingDiv.innerHTML = '<p style="color: red;">Meldingen kunne ikke sendes. Vennligst prøv igjen senere.</p>';
			}
		})
		.catch(error => {
			console.error('Feil ved sending av skjema:', error);
			meldingDiv.innerHTML = '<p style="color: red;">En feil oppstod ved sending av meldingen. Vennligst prøv igjen.</p>';
		});
	});
});
