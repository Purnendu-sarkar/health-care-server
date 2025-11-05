import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

interface EmailSenderConfig {
  email: string;
  app_pass: string;
}

interface JwtConfig {
  jwt_access_secret: string;
  jwt_refresh_secret: string;
  jwt_access_expires: string;
  jwt_refresh_expires: string;
  reset_pass_secret: string;
  reset_pass_token_expires_in: string;
}

interface AppConfig {
  node_env: string;
  port: string;
  database_url: string;
  bcrypt_salt_rounds: number;
  jwt: JwtConfig;
  cloudinary: CloudinaryConfig;
  emailSender: EmailSenderConfig;
  reset_pass_link: string;
  openrouter_api_key?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
}

const config: AppConfig = {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "5000",
  database_url: process.env.DATABASE_URL || "",
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET || "defaultAccessSecret",
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || "defaultRefreshSecret",
    jwt_access_expires: process.env.JWT_ACCESS_EXPIRES || "1h",
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES || "90d",
    reset_pass_secret: process.env.RESET_PASS_SECRET || "defaultResetSecret",
    reset_pass_token_expires_in:
      process.env.RESET_PASS_TOKEN_EXPIRES_IN || "10m",
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
  },
  emailSender: {
    email: process.env.EMAIL_SENDER_EMAIL || "",
    app_pass: process.env.EMAIL_SENDER_APP_PASS || "",
  },
  reset_pass_link: process.env.RESET_PASS_LINK || "http://localhost:3000/reset-password",
  openrouter_api_key: process.env.OPENROUTER_API_KEY || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

export default config;
