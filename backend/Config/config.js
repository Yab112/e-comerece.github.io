import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export { PORT, MONGO_URI , JWT_SECRET,STRIPE_SECRET_KEY };