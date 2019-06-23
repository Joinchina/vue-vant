'use strict'
import utils from '../assets/utils/utils';
let api = "";
if(process.env.NODE_ENV === "development" || utils.host().indexOf("localhost:8080")>-1) {
	api = 'http://app.znkjcz.com'
}else{
	api = 'http://app.znkjcz.com'
}

let WEB_CONFIG = {
	intServiceReqTimeout: 30000,
	accessflag: new Date().getTime(),  //随机标签

	urls: {
		getdata:api+'/intelligence/api/service',			
	}

}

export default WEB_CONFIG;