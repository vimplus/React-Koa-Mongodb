/**
 * @overview: Provide userInfo related services.
 * @author: txBoy
 * @created 2017-04-14
 */
"use strict";

const COLLECTION = 'lms_customer';

module.exports = function userInfo(options) {

	// Services get userInfo list.
	this.add('role:userInfo, cmd:list', (args, done) => {
		const userInfo = this.make$( COLLECTION );
		userInfo.list$({}, done);
	});

	this.add('role:userInfo, cmd:detail', (args, done) => {
		const userInfo = this.make$( COLLECTION );
		userInfo.load$(args.id, done);
	});

	this.add('role:userInfo, cmd:add', (args, done) => {
		const userInfo = this.make$( COLLECTION );
		let { name, certID } = args;
		userInfo.name = name;
		userInfo.certID = certID;
		userInfo.createdAt = Date.now();
		userInfo.save$((err, userInfo) => {
			done(err, userInfo.data$(false));
		});
	});

	this.add('role:userInfo, cmd:edit', (args, done) => {
		let { id, name, certID } = args;
		this.act('role:userInfo, cmd:detail, id:' + id, (err, res) => {
			res.data$({
				name: name,
				certID: certID,
				updateAt: Date.now()
			});
			res.save$((err, userInfo) => {
				done(err, userInfo.data$(false));
			});
		});

	});

	// Services for userInfo delete.
	this.add('role:userInfo, cmd:del', (args, done) => {
		console.log(args.id)
		const userInfo = this.make$( COLLECTION );
		userInfo.remove$(args.id, (err) =>  {
			done(err, null);
		});
	});

}
