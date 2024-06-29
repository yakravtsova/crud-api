import "dotenv/config";
import { app } from "./server";

app().listen(process.env.PORT, () => {
    console.log("Listen: ", process.env.PORT)
})