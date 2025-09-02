import dotenv from 'dotenv'
import { app } from "./app.js";
import connectDb from "./db/index.js";


dotenv.config({
    path:'../.env'
})


connectDb()
.then(() => {
    app.listen(5000, () => {
    console.log("Server is running on 5000")
})
}).catch((err) => {
    console.log("MONGO db connection failed !!! : " ,err);
});

