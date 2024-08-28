import app from "./app.js"
import {connectDB} from "./Config/db.js"

const port = process.env.PORT || 4000;


connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);})
                            })
.catch((err)=>{
    console.log(err)
        })