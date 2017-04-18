/**
 * @overview: user service - Provide user related database operations services.
 * @author: txBoy
 * @created 2017-04-17
 */

import { md5 } from '../utils/util';
import UserModel from '../models/user.model';

var userService = {
    register: async function (info) {
        var user = new UserModel(info);
        try {
            var doc = await user.save();
            if (doc) {
                var obj = {
                    username: doc.username,
                    email: doc.email
                }
                return {data: obj}
            }
        } catch (err) {
            return err;
        }
    }
}

export default userService;
