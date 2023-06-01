import USER from "../models/USERS.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createUser = async (req, res) => {
    try {
        const user = await USER.create(req.body);
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        
        const {username, password} = req.body
        const user = await USER.findOne({username})
        let same = false
        if(user) {
            same = await bcrypt.compare(password, user.password)
        } else {
            return res.status(401).json({
                succeded: false,
                error: "There is no such user",
            });
        }
        if (same) {
            const token = createToken(user._id);
            res.cookie("jwt",token, {
                httpOnly:true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.redirect("/users/dashboard");
        } else {
            res.status(401).json({
                succeded: false,
                error: "Passwords are not matched",
            });
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
};
const getDashboardPage = (req, res) => {
    res.render('dashboard');
};

export { createUser, loginUser, getDashboardPage };