import dotenv from "dotenv";

const envFile = `.env${process.env.NODE_ENV === "development" ? ".development" : ""}`;
dotenv.config({ path: envFile });

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,

  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,

  RECAPTCHA_VERIFICATION_URL: process.env.RECAPTCHA_VERIFICATION_URL,

  EMAIL_USER: process.env.EMAIL_USER,

  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

  EMAIL_RECIPIENT: process.env.EMAIL_RECIPIENT,

  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:4200",

  JWT_SECRET: process.env.JWT_SECRET,
};

function validateConfig(obj: Record<string, any>) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === "") {
      throw new Error(`Missing required config: ${key}`);
    }
  }
}

if (config.NODE_ENV === "production") validateConfig(config);

export default config;
