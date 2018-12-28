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
        dataStr = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
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
    }
}