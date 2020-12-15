import qr from 'qr-image';
import express from 'express';
import fs from 'fs'
import marked from 'marked';
const routes = express.Router()

routes.route('/qrcode')
    .get((req, res) => {
        const { url } = req.params
        const code = qr.image(url, { type: 'svg' });
        res.type('svg');
        code.pipe(res);
    })
routes.route('/wiki')
    .get((req,res) => {
        res.status(200).json({dir: fs.readdirSync("./api/markdown")})
    })
routes.route('/wiki/:name')
    .get((req, res) => {
        const { name } = req.params
        var text = fs.readFileSync(`./api/markdown/${name}.md`, { encoding: "utf-8" })
        res.status(200).json({ text, name });
        
    })
    .post((req, res) => {
        const { name } = req.params
        const { text } = req.body
        if (!fs.existsSync(`./api/markdown/${name}.md`)) {
            fs.writeFileSync(`./api/markdown/${name}.md`, text);
            res.redirect("./" + name);
        }
        else {
            res.status(201).json({ message: "already exist this file!" })
        }
    })
    .put((req, res) => {
        const { name } = req.params
        const { text } = req.body
        if (fs.existsSync(`./api/markdown/${name}.md`)) {
            fs.writeFileSync(`./api/markdown/${name}.md`, text);
            res.json({message: "updated"})
        }
        res.json({message: "it's doesn't exist"})

    })
    .delete((req, res) => {
        const { name } = req.params
        if (fs.existsSync(`./api/markdown/${name}.md`)) {
            fs.unlinkSync(`./api/markdown/${name}.md`);
            res.json({message: "deleted"})
        }
        res.json({message: "it's doesn't exist"})

    })
routes.route('/wiki/:name/html')
    .get((req, res) => {
        const { name } = req.params
        if (fs.existsSync(`./api/markdown/${name}.md`)) {
            var text = fs.readFileSync(`./api/markdown/${name}.md`, { encoding: "utf-8" })
            res.writeHead(200, { 'Content-type': 'text/html' })
                .write(marked(text));
            res.end();
        }
        else {
            res.status(200).json({ message: "not found" });
        }
    })

export default routes;

