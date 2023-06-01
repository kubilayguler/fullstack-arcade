import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema} = mongoose

const USER_Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
 timestamps: true,   
}
);

USER_Schema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    });
});

const USER = mongoose.model("USER", USER_Schema);

export default USER;

