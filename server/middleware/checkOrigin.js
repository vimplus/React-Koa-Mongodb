/**
 * @overview: Check allow origin.
 * @author: txBoy
 * @created 2017-07-05
 */

function checkOrigin(origin) {
	var whiteList = [
		'http://lms-dev.yylending.com',
		'http://127.0.0.1:4000'
	]
	if (whiteList.indexOf(origin) != -1) {
		return true;
	}
	return false;
}

export default checkOrigin;
