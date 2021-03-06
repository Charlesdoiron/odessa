const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "not_so_secret_4";
const ENVIRONMENT = process.env.NODE_ENV || "development";

const MONGODB_DB_NAME = "convois-ukraine";
const MONGODB_ADDON_URI = process.env.MONGODB_ADDON_URI;
const SENTRY_KEY = process.env.SENTRY_KEY;
const APP_URL = process.env.APP_URL || "http://localhost:3000";
const APP_NAME = process.env.APP_NAME || "Convois pour l'Ukraine";

const MAPBOX_API_TOKEN = process.env.MAPBOX_API_TOKEN;

const CORS_ORIGIN_ALLOWED = [APP_URL, "https://odessafront.vercel.app/"];

const CELLAR_ADDON_HOST = process.env.CELLAR_ADDON_HOST;
const CELLAR_ADDON_KEY_ID = process.env.CELLAR_ADDON_KEY_ID;
const CELLAR_ADDON_KEY_SECRET = process.env.CELLAR_ADDON_KEY_SECRET;

module.exports = {
  PORT,
  SECRET,
  ENVIRONMENT,
  MONGODB_DB_NAME,
  MONGODB_ADDON_URI,
  SENTRY_KEY,
  CORS_ORIGIN_ALLOWED,
  APP_URL,
  APP_NAME,
  MAPBOX_API_TOKEN,
  CELLAR_ADDON_HOST,
  CELLAR_ADDON_KEY_ID,
  CELLAR_ADDON_KEY_SECRET,
};
