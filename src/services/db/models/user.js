import mongoose from "mongoose";

const colection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String
})

const userModel = mongoose.model(colection, userSchema)

export default userModel;