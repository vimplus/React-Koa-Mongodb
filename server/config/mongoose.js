import mongoose from 'mongoose';
import { config } from './config';

export default function () {
    mongoose.Promise = global.Promise;
    let db = mongoose.connect(config.mongodb);
    return db;
}
