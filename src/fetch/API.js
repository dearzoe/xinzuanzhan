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
export const loginApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=user&a=login", Qs.stringify(params));
// 店铺列表页
export const shopListApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=shop&a=infoList", Qs.stringify(params));
// 店铺允许使用系统权限
export const shopLimitsApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=shop&a=system", Qs.stringify(params));
// 店铺登录(v0.12#1218-本地)
export const shopLoginApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=index&a=shopLogin", Qs.stringify(params));
// 智能调价-数据列表(v0.12#1218-本地)
export const pricingApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=index&a=pricing", Qs.stringify(params));
// 智能调价-数据列表(v0.12#1218-本地)
export const campaignLaunchApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaignLaunch&a=campaignList", Qs.stringify(params));
