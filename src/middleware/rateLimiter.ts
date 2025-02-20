import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs:24 * 60 * 60 * 1000,
  max: 50,
  message:'You have exceeded thr 50 requests in 24hrs limit',
  standardHeaders:true,
  legacyHeaders:false
});