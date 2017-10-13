import axios from "axios";
const Qs = require("qs");
// import router from "./../router/index"
var baseURL = process.env.API_ROOT;
axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//API接口响应的预处理
// axios.interceptors.response.use(
// 	response => {
// 		if (response.data.code === 400 && response.data.message === "登陆超时") {
// 			router.push("/login");
// 		}
// 		return response;
// 	}
// );

// 登录
export const loginApi = params => axios.post("public/index.php/api/portal/call?m=index&c=user&a=login", Qs.stringify(params))
