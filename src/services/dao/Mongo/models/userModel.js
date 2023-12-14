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
    password: String,
    logedBy: String,
    role:{
        type: String,
        default: 'user',
        enum : ['user', 'admin']
    },
    carts:{
        type:[
            {
                cart:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carts'
                },
            }
        ],
        default: [],
    },
    documents:{
        type:[
            {
                name: String,
                reference : String,
            }
        ]
    },
    
    last_connection:String
})

userSchema.pre('findOne', function() {
    this.populate('carts.cart');
})

const userModel = mongoose.model(colection, userSchema)

export default userModel;