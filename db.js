import mongoose from 'mongoose';

const conn = () => {
    mongoose
    .connect(process.env.DB_URI, {
        dbName: 'arcade',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('connected to the DATABASE succesully');
    }).catch((err) => {
        console.log(`DB connection err:, ${err}`);
    })
};

export default conn;