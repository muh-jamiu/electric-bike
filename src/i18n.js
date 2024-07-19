// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      search: "Search here",
      no_rental: "Number of rentals",
      active_rental: "Active Rentals",
      active_bike: "Active Bikes",
      total_bike: "Total Bikes",
      total_user: "Total Users",
      dashboard:"Dashboard",
      invalid: "Invalid Credentials, Please try again",
      redirect: "Login was successfull, Redirecting",
      processing: "Processing",
      not_support1: "Not Supported",
      not_support: "Admin panel does not support mobile view, Please try again with your desktop.",
      email: "Email Address",
      welcome_to: "Welcome to",
      perform: "Perform several actions like tracking inventory, managing rentals, scheduling maintenance and monitoring transactions",
      welcome: "Login",
      description: "Log in to the admin portal by putting in the correct details. If you have trouble logging in, please reach out to the IT support team."
    }
  },
  it: {
    translation: {
      search: "cerca qui",
      no_rental: "numero di noleggi",
      active_rental: "Noleggi attivi",
      active_bike: "Biciclette Attive",
      total_user: "Totale Utenti",
      total_bike: "Totale Biciclette",
      dashboard: "Pannello di controllo",
      invalid: "Credenziali non valide, per favore riprova.",
      redirect: "Accesso riuscito, reindirizzamento in corso.",
      processing: "Elaborazione",
      not_support1: "Non Supportato",
      not_support: "Il pannello di amministrazione non supporta la visualizzazione mobile. Per favore, riprova utilizzando il desktop.",
      welcome: "Benvenuto",
      description: "Accedi al portale amministrativo inserendo i dettagli corretti. Se hai problemi ad accedere, contatta il team di supporto IT.",
      email: "Indirizzo email",
      welcome_to: "Benvenuto a",
      perform: `Eseguire diverse azioni come il tracciamento dell'inventario, la gestione delle noleggi, la programmazione della manutenzione e il monitoraggio delle transazioni.`
    }
  }
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'it',
    fallbackLng: 'en', // use English as fallback language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
