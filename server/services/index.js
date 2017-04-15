module.exports = function api(options) {

	this.use( require('./math.js') );
	this.use( require('./contract.js') );
	this.use( require('./userInfo.js') );

	var valid_ops = { sum:'sum', product:'product' }

	// This router role url eg: /api/caculate?operation=sum&left=1&rigth=2
	this.add('role:calculate', function (msg, respond) {
		console.log(operation)
		var left = msg.args.query.left
		var right = msg.args.query.right
		this.act('role:math', {
			cmd:   msg.cmd,
			left:  left,
			right: right,
		}, respond)
	});

	this.add('role:contract_service', function(msg, respond) {
		let { args, request$ } = msg;
		let obj = {
			cmd: msg.cmd,
			...(request$.method === 'GET' ? args.query : args.body)
		}
		this.act('role:contract', obj, respond);
	})

	this.add('role:userInfo_service', function (msg, respond) {
		let { args, request$ } = msg;
		let obj = {
			cmd: msg.cmd,
			...(request$.method === 'GET' ? args.query : args.body)
		}
		this.act('role:userInfo', obj, respond);
	})

	this.add('init:api', function (msg, respond) {
		this.act('role:web', { routes: {
			prefix: '/api/calculate',
			pin:    'role:calculate,cmd:*',
			map: {
				sum: { GET: true },
				product: { GET: true }
			}
		}}, respond);

		// This route matchs: /api/contract/list etc.
		this.act('role:web', { routes: {
			prefix: '/api/contract',
			pin:	'role:contract_service,cmd:*',
			map: {
				add: { POST: true },
				del: { GET: true },
				edit: { POST: true },
				list: { GET: true },
				detail: { GET: true },
			}
		}}, respond);

		this.act('role:web', {
			routes: {
				prefix: '/api/userInfo',
				pin:	'role:userInfo_service, cmd:*',
				map: {
					add: { GET:true, POST: true },
					del: { GET: true },
					edit: { POST: true },
					list: { GET: true },
					detail: { GET: true }
				}
			}
		}, respond);

		// Add api routes here
	})

}
