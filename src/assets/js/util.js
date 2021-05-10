// //                            _ooOoo_
// //                           o8888888o
// //                           88" . "88
// //                           (| -_- |)
// //                            O\ = /O
// //                        ____/`---'\____
// //                      .   ' \\| |// `.
// //                       / \\||| : |||// \
// //                     / _||||| -:- |||||- \
// //                       | | \\\ - /// | |
// //                     | \_| ''\---/'' | |
// //                      \ .-\__ `-` ___/-. /
// //                   ___`. .' /--.--\ `. . __
// //                ."" '< `.___\_<|>_/___.' >'"".
// //               | | : `- \`.;`\ _ /`;.`/ - ` : | |
// //                 \ \ `-. \_ __\ /__ _/ .-` / /
// //         ======`-.____`-.___\_____/___.-`____.-'======
// //                            `=---='
// //         .............................................
// //                  佛祖保佑             永无BUG
// //                  佛曰:
// //                  写字楼里写字间，写字间里程序员；
// //                  程序人员写程序，又拿程序换酒钱。
// //                  酒醒只在网上坐，酒醉还来网下眠；
// //                  酒醉酒醒日复日，网上网下年复年。
// //                  但愿老死电脑间，不愿鞠躬老板前；
// //                  奔驰宝马贵者趣，公交自行程序员。
// //                  别人笑我忒疯癫，我笑自己命太贱；
// //                  不见满街漂亮妹，哪个归得程序员？
import axios from 'axios';
// import { get, post } from '../../utils/axios'
export default {
    install(Vue, options) {
        Vue.prototype.getWSDomain = function() {    //获取当前axios请求的域名
            let protocol = location.protocol;       //获取当前http请求头
            let origin = axios.defaults.baseURL;    //获取当前ip
            return protocol + origin;
        },
        // Vue.prototype.getApi = function(url,params) {//get请求
        //     return get(url,params)
        // },
        // Vue.prototype.postApi = function(url,params,config) {//post请求
        //     return post(url,params,config)
        // },
        Vue.prototype.reverseList = function(array){//反转数组
            var newArr = [];
            for(var i = array.length - 1;i >= 0;i --){
                newArr[newArr.length] = array[i];
            }
            return newArr;
        },
        Vue.prototype.msgBox = function(message,type,btnText){ //弹出对话框
            var btnTextS = btnText == undefined ? "确定":btnText
            return this.$confirm(message, '提示', {
                confirmButtonText: btnTextS,
                showCancelButton:false,
                type: type
            })
        },
        Vue.prototype.notify = function(message,type){  //通知提示框
            var title = ""
            if(type == 'success'){
                title = '成功'
            }else if(type == 'warning'){
                title = '警告'
            }else if(type == 'info'){
                title = '消息'
            }else if(type == 'error'){
                title = '错误'
            }
            return this.$notify({
                title: title,
                message: message,
                type: type
            });
            },
        Vue.prototype.msgSuccess = function (msg) {
            this.$message({ showClose: true, message: msg, type: "success" });
            }

        Vue.prototype.msgError = function (msg) {
            this.$message({ showClose: true, message: msg, type: "error" });
        }
        Vue.prototype.msgWarning = function (msg) {
            this.$message({ showClose: true, message: msg, type: "warning" });
        }

        Vue.prototype.message = function(message,type){  //消息提示
            this.$message({
                type: type,
                message: message
            });
        },
        Vue.prototype.showLoading = function() {       //打开loading
            this.$store.commit('showLoading')
        },
        Vue.prototype.hideLoading = function() {        //关闭loading
            this.$store.commit('hideLoading')
        },
        Vue.prototype.isValid = function(value) {
            return value != "" && value != null && typeof value != 'undefined'
        }
    }
}
