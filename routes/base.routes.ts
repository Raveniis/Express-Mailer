import { getToken } from "../controller/authentication.controller.js";
import { sendEmail } from "../controller/mailer.controller.js";
import { auth } from "../middlewares/authentication.middleware.js";
import { emailLimiter, tokenLimiter } from "../middlewares/rate-limiter.middleware.js";
import { Router } from "express";

const baseRoutes = Router();

baseRoutes.post("/mailer/send-email", auth, emailLimiter, sendEmail);
baseRoutes.post("/get-token", tokenLimiter, getToken);

export default baseRoutes;
