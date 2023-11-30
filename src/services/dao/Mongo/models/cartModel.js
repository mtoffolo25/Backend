import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: [
                    {
                       productId:{
                            type:mongoose.Schema.Types.ObjectId,
                            ref: "products"
                       }     
                    }
                ],
                default:[]
            },
            quantity: {
                type: Number
            }
        }

    ]
});


cartSchema.pre('findOne',function () {
    this.populate('products.product.productId')
})

cartSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model(cartCollection, cartSchema);