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
// 获取提醒信息列表
export const remindMessageApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=message&a=roiMessageList", Qs.stringify(params));
// 店铺列表页
export const shopListApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=shop&a=infoList", Qs.stringify(params));
// 店铺允许使用系统权限
export const shopLimitsApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=shop&a=system", Qs.stringify(params));
// 店铺登录(v0.12#1218-本地)
export const shopLoginApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=index&a=shopLogin", Qs.stringify(params));
// 投放管理-智能调价
export const pricingApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=index&a=pricing", Qs.stringify(params));
// 投放管理-智能删除
export const intellDelApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=index&a=intellDel", Qs.stringify(params));
// 投放管理-投放管理
export const campaignLaunchApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaignLaunch&a=campaignList", Qs.stringify(params));
// 新建管理-新建计划-资源位列表接口
export const adZoneApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=adZone", Qs.stringify(params));
// 新建管理-新建计划-智能定向
export const intellCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=intellCrowd", Qs.stringify(params));
// 新建管理-新建计划-营销场景定向
export const marketingCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=marketingCrowd", Qs.stringify(params));
// 新建管理-新建计划-达摩盘定向
export const dmpCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=dmpCrowd", Qs.stringify(params));
// 新建管理-新建计划-访客定向
export const visitorCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=visitorCrowd", Qs.stringify(params));
// 新建管理-新建计划-相似宝贝定向
export const similarCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=similarCrowd", Qs.stringify(params));
// 新建管理-新建计划-群体定向
export const groupCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=groupCrowd", Qs.stringify(params));
// 新建管理-新建计划-高级兴趣点定向
export const advancedInterestCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=advancedInterestCrowd", Qs.stringify(params));
// 新建管理-新建计划-行业店铺定向
export const industryShopCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=industryShopCrowd", Qs.stringify(params));
// 新建管理-新建计划-通投定向
export const allCrowdApi = params => axios.post("public/index.php/api/portal/call?m=vue&c=campaign&a=allCrowd", Qs.stringify(params));
