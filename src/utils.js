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
    multiplyFloat: function (arg1, arg2) {
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    },
    //格式化日期
    /**
     * time 需要转换的时间
     * type 需要转换时间的格式
     *      hms 返回 h:m:s
     *      ymd 返回 y-m-d
     *      其他或者不传为：y-m-d h:m:s
     * custom 自定义返回时间格式，需要传入一个数组，
     *      长度不为2，并且同时为空字符串时，返回 y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s并有alert提示
     *      [0]值为""时，[1]有值时返回hms 用[1]传入的符号隔开
     *      [0]有值，[1]值为""时，返回ymd 用[0]传入的符号隔开
     *      都有值时，返回 y + [0] + m + [0] + d + " " + h + [1] + M + [1] + s;
     * */
    formatTime: function(time, type, custom){
        let date = new Date(parseInt(time));
        let dataStr = "";
        let y = date.getFullYear().toString(),
            m = date.getMonth() < 9 ? "0" + (date.getMonth()  + 1) : date.getMonth() + 1,
            d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() ,
            h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
            M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
            s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        dataStr = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
        if(custom){
            if(custom.length == 2 && (custom[0] != "" || custom[1] != "")){
                if(custom[0] == ""){
                    dataStr = h + custom[1] + M + custom[0] + s;
                }else if(custom[1] == "") {
                    dataStr = y + custom[0] + m + custom[0] + d;
                }else{
                    dataStr = y + custom[0] + m + custom[0] + d + " " + h + custom[1] + M + custom[1] + s;
                }
            }else{
                alert("自定义传入错误！");
            }
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