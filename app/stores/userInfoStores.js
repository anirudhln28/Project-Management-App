import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";

class UserInfoStores extends EventEmitter{
	constructor(){
		super();
		this.initData();
	}

	initData(){
		this.userInfo={};
		this.allOrgUsers= [];
	}

	showSnackbar(str){
		console.log('stores', str);
		this.snackbarStr = str;
		this.emit('change','snackbar');
	}

	showLoader(loader){
		this.loader = loader;
		this.emit('change','loader');
	}

	setUserData(userData){
		this.userInfo = userData;
		this.emit('change', 'userInfo');
	}

	setOrgUserData(orgUserArr){
		this.allOrgUsers = orgUserArr;
		this.emit('change', 'org_users');
	}

	_getOrgUsers(){
		return this.allOrgUsers;
	}

	_getUserInfo(){
		return this.userInfo;
	}

	_handleActions(action){
		switch(action.type){
			case 'SNACKBAR' : {
				this.showSnackbar(action.str);
				break;
			}
			case 'LOADER' : {
				this.showLoader(action.loader);
				break;
			}
			case 'USERINFO':{
				this.setUserData(action.response);
				break;
			}
			case 'ORG_USERS':{
				this.setOrgUserData(action.response);
				break;
			}
			case 'CLEAR_ALL':{
				this.initData();
				break;
			}
		}
	}
}
const userInfoStores = new UserInfoStores;
dispatcher.register(userInfoStores._handleActions.bind(userInfoStores));
export default userInfoStores;
