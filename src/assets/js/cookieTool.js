export var cookieTool = {
    //дcookies
    setCookie: function (name, value, Days) {
        var exp = new Date();
        var expires="";
        if(Days){
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            expires=";expires=" + exp.toGMTString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/";
    },
    getCookie: function (name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name) {
                return decodeURIComponent(arr[1]);
            }
        }
        return null;
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = cookieTool.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
    }
}