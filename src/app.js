import express from "express";
import cors from "cors";

import { registerUser } from "./controllers/sign-up.js";
import { loginUser } from "./controllers/sign-in.js";
import {  postNewRegister, getUserRegisters } from "./controllers/registers.js";


const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", registerUser);

app.post("/sign-in", loginUser);

app.post("/registers", postNewRegister);

app.get("/registers", getUserRegisters);

export default app;
