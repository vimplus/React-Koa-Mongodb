var Storage = {
    setSession: function(key, val) {
        try {
            var val_str = JSON.stringify(val || {});
            window.sessionStorage.setItem('$' + key, val_str);
        }
        catch (ex) {
            console.error(ex);
        }
    },
    getSession: function(key) {
        try {
            var val = window.sessionStorage.getItem('$' + key) || '{}';
            return JSON.parse(val);
        }
        catch (ex) {
            console.error(ex);
        }
    },
    setLocal: function(key, val) {
        try {
            var val_str = JSON.stringify(val || {});
            window.localStorage.setItem('$' + key, val_str);
        }
        catch (ex) {
            console.error(ex);
        }
    },
    getLocal: function(key) {
        try {
            var val = window.localStorage.getItem('$' + key);
            return val ? JSON.parse(val):'';
        }
        catch (ex) {
            console.error(ex);
        }
    },
    delLocal: function(key) {
        try {
            window.localStorage.removeItem('$' + key);
            return;
        }
        catch (ex) {
            console.error(ex);
        }
    },
    setCookie: function(name, value, ds) {
        var Days = ds ? ds:30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;";
    },
    getCookie: function(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return decodeURIComponent(arr[2]);
        else {
            return null;
        }
    }
};

module.exports = Storage;
