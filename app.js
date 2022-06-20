require('dotenv').config();
//Bypass try catch 
require('express-async-errors');

//Extra security Packages
const express = require('express');
const app = express();

//rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const connectDB = require('./DB/connect');
const notFound = require('./Middlewares/notFound');
const ErrorHandler = require('./Middlewares/error-handler');
const AuthRoutes = require('./Routes/AuthRoutes');
const UserRoutes = require('./Routes/UserRoutes');
const CategoryRoutes = require('./Routes/CategoryRoutes');
const BrandRoutes = require('./Routes/BrandRoutes');
const ProductRoutes = require('./Routes/ProductRoutes');
const ReviewRoutes = require('./Routes/ReviewRoutes');
// const OrderRoutes = require('./Routes/OrderRoutes')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// varibales
const port = process.env.PORT || 3000;

//Middleware
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors(({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders:['set-cookie']
})));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));


//Routes
app.use(express.static('public'));
app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/auth/users', UserRoutes)
app.use('/api/v1/categories', CategoryRoutes)
app.use('/api/v1/brands', BrandRoutes)
app.use('/api/v1/products', ProductRoutes)
app.use('/api/v1/reviews', ReviewRoutes)
// app.use('/api/v1/orders', OrderRoutes)


//Middleware
app.use(ErrorHandler);
app.use(notFound);

                                                             


//Listeners
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
        console.log(error);
    }
    
}
start();