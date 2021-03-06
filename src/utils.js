export default {
    //小数减法
    subFloat: function(num1,num2){
        let r1,r2,m;
        try{
            r1 = num1.toString().split('.')[1].length;
        }catch(e){
            r1 = 0;
        }
        try{
            r2=num2.toString().split(".")[1].length;
        }catch(e){
            r2=0;
        }
        m=Math.pow(10,Math.max(r1,r2));
        let n=(r1>=r2)?r1:r2;
        return (Math.round(num1*m-num2*m)/m).toFixed(n);
    },
    //小数加法
    addFloat: function(num1, num2){
        var r1,r2,m;
        try{r1=num1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=num2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return Math.round(num1*m+num2*m)/m;
    },
    //小数乘法
    multiplyFloat: function (num1, num2) {
        var m=0,s1=num1.toString(),s2=num2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    },
    //格式化日期
    /**
     * time 一个日期或者时间戳(number)
     * type 需要转换时间的格式
     *      hms 返回 h:m:s
     *      ymd 返回 y-m-d
     *      其他或者不传为：y-m-d h:m:s
     * customFormat 自定义返回时间格式
     *      例 y-m-d h:M:s、 yy/m/d、h:M:s、m/d h:M:s
     *      y:年，yy:年后两位，m:月，d:日，h:时，M:分，s: 秒
     *
     * */
    formatTime: function(time, type, customFormat){
        let date = new Date(time);
        if(date == "Invalid Date"){
            alert("日期格式错误");
            return
        }
        let dataStr = "";
        let y = date.getFullYear().toString(),
            m = date.getMonth() < 9 ? "0" + (date.getMonth()  + 1) : date.getMonth() + 1,
            d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() ,
            h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
            M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
            s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        if(customFormat){
          customFormat = customFormat.replace(/yy/g, y.substring(2));
          customFormat = customFormat.replace(/y/g, y);
          customFormat = customFormat.replace(/m/g, m);
          customFormat = customFormat.replace(/d/g, d);
          customFormat = customFormat.replace(/h/g, h);
          customFormat = customFormat.replace(/M/g, M);
          customFormat = customFormat.replace(/s/g, s);
          return customFormat;
        }else{
            if(type == "hms"){
                dataStr = h + ":" + M + ":" + s;
            }else if(type == "ymd"){
                dataStr = y + "-" + m + "-" + d;
            }
        }
        dataStr = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
        return dataStr;
    },
    //复制文本
    /**
     * btn 复制按钮
     * input 需要复制的输入框
     * 返回值 复制结果
     * */
    copyText: function(btn, input){
        let divDit = $(btn);
        let ipt = $(input);
        ipt[0].select()
        document.execCommand('copy')
        if(!document.execCommand('copy'))
            return "请按下ctrl + c, 手动复制。";
        else {
            return "复制成功";
        }
    },

    //判断是否为数字
    isRealNum: function (val){
        if(val === "" || val == null){
            return false;
        }
        if(!isNaN(val)){
            return true;
        }else{
            return false;
        }
    },
    //格式化科学计数法的数字
    formatNum: function(num){
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
        return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    },
    //查询第一个非0数字的位置,后保留五位
    getFZeroWz: function(num){
        //12.123
        if(num == 0){
            return 0;
        }
        let result = 0;
        let numS = num + "";
        if (numS.indexOf('-') >= 0) {
            numS = '0' + String(Number(numS) + 1).substr(1);
        }
        let len = 5;
        let x = numS.match(/[1-9]/);
        if(x){
            let i = x.index;
            let y = numS.indexOf(".");
            if(y == -1){
                result = 0;
            }else{
                if(i > y){
                    result = i + len - 2;
                }else{
                    result = len - y > 0 ? len - y : 0;
                }
            }
            if(num < 0){
                result++;
            }
        }
        return result;
    },
    //数字转汉字数字
    numToCHS: function(num){
        let n = parseFloat(num);
        let arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        if(n > 10){
            return n;
        }else{
            return arr[n];
        }
    },
    //获取上标或者下标数组
    getSmallNum(num, type){
        if(type){
            return 'º¹²³⁴⁵⁶⁷⁸⁹'.substring(num, num + 1);
        }else{
            return '₀₁₂₃₄₅₆₇₈₉'.substring(num, num + 1);
        }
    },
}