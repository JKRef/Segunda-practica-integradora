import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import passport from 'passport';

// --- pasword hash
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPass = (user, password) => bcrypt.compareSync(password, user.password);

// --- file path correccion
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// --- passport
export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if(err) return next(err);
            if(!user) {
                return res.status(401).send({error: info.messages ? info.messages : info.toString()})
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}