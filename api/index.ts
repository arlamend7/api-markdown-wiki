import express from 'express';
import body from "body-parser"
import routes from './routes/qrcode.routes'

const app = express();
app.use(express.json())
app.use(
    body.urlencoded({
        extended : true
    })
    )
    
export let prefix = "/api/";
app.use(routes)
var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('api running')
})
