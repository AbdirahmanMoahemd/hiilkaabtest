import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        red: 'User'
    }
    
}, {
    timestamps: true
})


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images:[{
        type : String,
    }],
    colors:[{
        type : String, 
    }],
    sizes:[{
        type : String, 
    }],
    brand: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required:true
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    isDiscounted: {
        type: Boolean,
        default: false,
    },
    newPrice: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    
}, {
    timestamps: true
})

productSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


const Product = mongoose.model('Product', productSchema)

export default Product