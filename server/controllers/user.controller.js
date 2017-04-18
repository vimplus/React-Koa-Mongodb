/**
 * @overview: user controller - Provide user related controller.
 * @author: txBoy
 * @created 2017-04-17
 */

 import { md5 } from '../utils/util';
 import userService from '../services/user.service';

 var user = {
     register: async (ctx, next) => {
         var userInfo = ctx.request.body;
         var res = await userService.register(userInfo);
         console.log('res:', res);
         ctx.response.body = {
             code: 10000,
             content: res,
             msg: 'success'
         }
     }
 }

 export default user;
