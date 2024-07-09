
const Config = {
    APP_NAME : import.meta.env.VITE_APP_NAME,
    APP_DOMAIN : import.meta.env.VITE_APP_DOMAIN,
    SITENAME : import.meta.env.VITE_SITENAME,
    VITE_API_URL_LOCAL : import.meta.env.VITE_VITE_API_URL_LOCAL,
    API_URL : import.meta.env.VITE_API_URL ?? "https://electric-bike-rental.onrender.com",
    COUNTRY : import.meta.env.VITE_COUNTRY,
    DEF_CURRENCY_CODE : import.meta.env.VITE_DEF_CURRENCY_CODE,
    COUNTRY_CODE : import.meta.env.VITE_COUNTRY_CODE,
};

export default Config;