import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookirParser from "cookie-parser";
import connectDb from "./config/connectDB.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT

app.use(express.json({
    limit: "1gb"
}));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL, 
}));
app.use(cookirParser());

app.use('/api/auth', authRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});