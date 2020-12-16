import express from 'express';
import passport from 'passport';
import { criarwebToken } from '../authentication';
import UsersController from '../controllers/users/users.controller';

import { prefix } from '../index'

const routes = express.Router();

var url = prefix + "users"

routes.route(url)
    .get(UsersController.index)
    .post(UsersController.create);

routes.route(url + "/login")
    .post(passport.authenticate('local',{session:false}), (req , res) => {        
        res.set('NV-Token',criarwebToken(req.user))
        res.status(204).send();
    })


export default routes;
