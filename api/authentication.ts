import pass from "passport";
import { Strategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

let Usuario = {
    buscarPorEmail: (email: any) => ({ Senha : ""}),
    RecuperarPeloId: (ID: any) => ({})
}

pass.use(new Strategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    },
        async (email, senha, done) => {
            console.log(email, senha);
            try {
                let usuario = Usuario.buscarPorEmail(email);
                
                if (!usuario) {
                    throw new Error("Usuario não existe");
                }
                if (senha) {
                    if (!await bcrypt.compare(senha, usuario.Senha)) {
                        throw new Error("Senha Invalida");
                    }
                }
                done(null, usuario)
            } catch (error) {
                done(error)
            }
        }))
pass.use( 
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token,"senha-secret");
                const usuario = await Usuario.RecuperarPeloId(payload);
                done(null,usuario);
            } catch (error) {
                
            }
        }
    )
)
export function criarwebToken(user : any){
    const payload = {
        id : user.id,
        day : new Date().getDay(),
        start : new Date().getHours()
    }
    return jwt.sign(payload,"senha-secret", {expiresIn:"10m"})
}