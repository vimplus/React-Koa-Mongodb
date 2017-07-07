import mongoose from 'mongoose';
import { config } from './index';

export default function () {
    mongoose.Promise = global.Promise;
    let db = mongoose.connect(config.mongodb);
    return db;
}
