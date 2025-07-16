import express from "express"
import cors from "cors"

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true
}))


app.use(express.json({ limit: "24kb" }))
app.use(express.urlencoded({ limit: "24kb", extended: true }))

import { userrouter } from "./routes/UserRoutes.js"
import { pointrouter } from "./routes/PointsRoutes.js"
import { pointhistoryrouter } from "./routes/PointsHistoryRoutes.js"

app.use("/api/users", userrouter);
app.use("/api/points", pointrouter);
app.use("/api/history", pointhistoryrouter);

export { app }