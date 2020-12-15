import express from 'express';
import body from "body-parser"
import { RoutesResolve } from './routes.handle';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
app.use(
    body.urlencoded({
        extended : true
    })
    )
    
export let prefix = "/api/";
RoutesResolve('/routes',(module) => {
    app.use(module.default)
});
var port = process.env.port || 3000
app.listen(port, () => {
    console.log('api running')
})
