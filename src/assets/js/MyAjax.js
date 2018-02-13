//function MyAjax() {
//	);
//}
import {cookieTool} from "./cookieTool.js"
import fetchJsonp from "fetch-jsonp"
var MyAjax = {
	urlsy:"http://10.1.31.28:8080",
	urlhw:"http://10.1.31.28:8080",
	ajax(option,callback,errCallback) {
		$.ajax({
			type: option.type,
			url: option.url,
			beforeSend:function(request){
				request.setRequestHeader("token",cookieTool.getCookie("token"));
//				request.withCredentials = true;
			},
			data: option.data,
			dataType: option.dataType,
			contentType: option.contentType, 
			xhrFields: {withCredentials: true},
			crossDomain: true == !(document.all),//IE9不能发起请求
			async: option.async, // 使用同步方式  
			success: function(data){		
				callback(data);
				if(!option.ifFreeLogin){
					if(data.msg==="100004"){//tooken为空
						window.location.hash ="/login"
					}
					if(data.msg=="100003"){//没有成功登陆
						window.location.hash="/login"
					}
				}
			},error:function(error){
				errCallback(error)
			}
		})
	},
	delete(url){
		$.ajax({
			type: "GET",
			url: url, 
			beforeSend:function(request){
				request.setRequestHeader("token",cookieTool.getCookie("token"));
//				request.withCredentials = true;
			},
			async: false, // 使用同步方式  
			success: function(data) {	
				console.log("ok")
			},error:function(error){
				console.log(error)
			}
		})
	},
	fetch(url, successCallback, errCallback){
		fetch(url).then(function(response){
			return response.json();
		}).then(function(data){
			successCallback(data);
		}).catch(function(e){
			errCallback("error");
		});
	},
	fetchJsonp(url, successCallback, errCallback) {
//		debugger;
		fetchJsonp(url).then(function(response) {
			return response.json();
		}).then(function(data){
			successCallback(data);
		}).catch(function(e) {
			errCallback("error");
		});
	}

}
export default MyAjax;