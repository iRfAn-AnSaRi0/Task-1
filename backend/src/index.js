import dotenv from "dotenv"
import { app } from "./app.js"
import { dbconnection } from "./db/dbconnection.js";


dotenv.config({
    path: "./.env"
})

dbconnection()
    .then(app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running on ${process.env.PORT}`);

    }))
    .catch((error) => {
        console.log("Error : ", error);

    })