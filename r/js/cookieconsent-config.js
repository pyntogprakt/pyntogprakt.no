import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

CookieConsent.run({
	autoShow: false,
	guiOptions: {
		consentModal: {
			layout: "cloud inline",
			position: "bottom center",
			equalWeightButtons: true,
			flipButtons: true
		},
		preferencesModal: {
			layout: "box",
			position: "right",
			equalWeightButtons: true,
			flipButtons: false
		}
	},
	categories: {
		necessary: {
			readOnly: true
		},
		functionality: {

		},
		analytics: {

		}
	},
	language: {
		default: "no",
		autoDetect: "browser",
		translations: {
			no: {
				consentModal: {
					title: "Vi tar personvernet ditt på alvor.",
					description: "Denne nettsiden bruker informasjonskapsler for å analysere hvordan du bruker den, og tilby funksjonalitet. Ved å trykke \"Godta alle\" aksepterer du dette.",
					acceptAllBtn: "Godta alle",
					acceptNecessaryBtn: "Avvis alle",
					showPreferencesBtn: "Samtykkeinnstillinger",
					footer: "<a href=\"/personvern\">Personvernerklæring</a>"
				},
				preferencesModal: {
					title: "Samtykkeinstillinger",
					acceptAllBtn: "Godta alle",
					acceptNecessaryBtn: "Avvis alle",
					savePreferencesBtn: "Lagre innstillinger",
					closeIconLabel: "Lukk",
					serviceCounterLabel: "tjeneste|tjenester",
					sections: [
						{
							title: "Bruk av informasjonskapsler",
							description: "Når du besøker pyntogprakt.no lagres informasjonskapsler som er nødvendige for at du skal kunne benytte deg av nettsidene våre. Med ditt samtykke kan vi også lagre informasjonskapsler for skjemafunksjonalitet og besøksanalyse. Du kan når som helst trekke tilbake eller endre samtykket. Vi ønsker ikke lagre flere informasjonskapsler enn nødvendig for å tilby tjenestene våre, og er nøye på hvilke tjenester vi velger for å håndtere informasjon du gir oss."
						},
						{
							title: "Nødvendige informasjonskapsler <span class=\"pm__badge\">Alltid aktivert</span>",
							description: "I tillegg til anonyme informasjonskapsler som lagres når du besøker nettsiden, lagres samtykkevalget ditt for bruk av øvrige informasjonskapsler.",
							linkedCategory: "necessary"
						},
						{
							title: "Analyse",
							description: "Vi bruker et analyseverktøy som ikke lagrer informasjonskapsler. Vi får likevel anonym informasjon om besøkende, om hvordan du bruker nettsiden, og hvor du kommer fra (land). Dette bruker vi til å se hvordan du bruker nettsiden. Derfor kan du deaktivere skriptet som muliggjør analysen.",
							linkedCategory: "analytics"
						},
						{
							title: "Mer informasjon",
							description: "For spørsmål om personvernerklæringen og dine valg, ta gjerne <a class=\"cc__link\" href=\"mailto:hei@pyntogprakt.no\">kontakt med oss</a> eller se <a class=\"cc__link\" href=\"/personvern\">personvernerklæringen vår</a>."
						}
					]
				}
			}
		}
	}
});

setTimeout(CookieConsent.show, 900);

const im = iframemanager();

im.run({
	onChange: ({ changedServices, eventSource }) => {
		if(eventSource.type === 'click') {
			const servicesToAccept = [
				...CookieConsent.getUserPreferences().acceptedServices['analytics'],
				...changedServices
			];

			CookieConsent.acceptService(servicesToAccept, 'analytics');
		}
	},

	services: {
		youtube: {
			// ...
		},

		vimeo: {
			// ...
		}
	}
});
