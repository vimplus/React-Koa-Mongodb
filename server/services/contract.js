/**
 * Purpose: Provide contract related services.
 *
 * @author: Andy.
 * @time: 2017-04-11.
 */

"use strict";

const COLLECTION = 'lms_contract';

module.exports = function(options) {

	const _this = this;

	_this.add('role:contract,cmd:list', (args, done) => {
		const contracts = _this.make$( COLLECTION );
		contracts.list$({}, done);
	});

	_this.add('role:contract,cmd:detail', (args, done) => {
		const contract = _this.make$( COLLECTION );
		contract.load$(args.id, done);
	});

	_this.add('role:contract,cmd:add', (args, done) => {
		const contracts = _this.make$( COLLECTION );
		let { name, certId } = args;
		contracts.name = name;
		contracts.certId = certId;
		contracts.time = Date.now();
		contracts.save$((err, contract) => {
			done(err, contracts.data$(false));
		});
	});

	_this.add('role:contract,cmd:edit', (args, done) => {
		let { id, name, certId } = args;
		_this.act('role:contract,cmd:detail,id:' + id, (err, result) => {
			result.data$({
				name: args.name,
				certId: args.certId,
				time: Date.now()
			});
			result.save$((err, contract) => {
				done(err, contract.data$(false));
			});
		});
	});

	_this.add('role:contract,cmd:del', (args, done) => {
		console.log( args )
		const contract = _this.make$( COLLECTION );
		contract.remove&(args.id, (err) => {
			done(err, null);
		})
	});

}
