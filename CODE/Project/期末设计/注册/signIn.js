/*
1.用户名不为空
2.用户名必须在 6 -14之间
3.用户名只能由数字和字母组成不能含有其它符合
4.密码不为空和确认密码一致，
5.邮箱不为空，邮箱合理性正则表达式
6.统一失去焦点验证
6. 错误提示信息，统一在span 标签中提示，并且要求字体 12 号 
7. 文本框再次获得焦点后，清除错误提示信息，如果文本框
中的数据不合法，要求清空文本框的value内容
8.最终表单中所有项均合法，方可提交
*/
// 只有当页面所有的数据加载完了,才会触发该事件,调用其中的匿名函数
window.onload = function () { // onload改变js的执行顺序,获取已经加载的id的对象
    // 通过iid获取到用户名对象
    var usernameElt = document.getElementById
        ("username")
    // console.log(username) 测试一下

    // 获取用户名后面的错误提示信息的对象
    var userNameError = document.getElementById("usenameError")

    // 处理用户名的验证,通过用户名对象绑定 onblur失去焦点事件,进行验证
    usernameElt.onblur = function () {

        // 通过对象获取到 用户名文本框的value的值
        var username = usernameElt.value
        // console.log(username)  测试
        username = username.trim();  // trim 去除字符串两边的空格
        // console.log(username)  测试

        if (username == "") { // 或者直接是if(username)或者是if(username.length == 0)
            // 用户不能为空
            userNameError.innerText = "用户名不能为空"
            // innerText 设置赋值span块中显示的内容

        } else {
            // 判断用户名的长度是否合法
            if (username.length < 6 || username.length > 14) {
                userNameError.innerText = "用户名[6~14]区间内"
            } else {
                // 判断用户名是否包含特殊符合,
                var regExp = /^[0-9A-Za-z]+$/ //^开始$结束,{} 表示限定长度

                var ok = regExp.test(username) // 与正则表达式匹配,完全匹配返回true,不匹配返回false
                if (ok) {
                    // 用户名合法
                } else {
                    // 用户名不合法，包含特殊字符
                    userNameError.innerText = "用户名只能由数字和字母组成"
                }


            }
        }
    }


    // 用户名span错误提示处理，通过用户文本框对象绑定上获取onfocus焦点事件处理
    usernameElt.onfocus = function () {
        // 如果username<span>块中存在错误提示,则说明没有用户名不合法,获取焦点,清空文本框的value以及span.innerText的内容
        if (userNameError.innerText != "") {
            // 清空username的value错误输入
            usernameElt.value = ""
        }

        // 再将提示错误的span置为“”
        userNameError.innerText = "";
    }




    // 密码的验证
    // 获取密码的对象
    var userpwdElt = document.getElementById("userpwd")
    // console.log(userpwd) 测试
    var userpwdError = document.getElementById("userpwdError")
    // console.log(userpwdError) 测试

    // 给密码对象绑定上.onblut失去焦点事件: 处理密码为空的验证
    userpwdElt.onblur = function () {
        // 通过对象获取到密码的 value值
        var userpwd = userpwdElt.value;
        // console.log("--->"+userpwd+"<-----") 测试
        userpwd = userpwd.trim();  // 去除左右空格
        // console.log("--->"+userpwd+"<-----") 测试

        if (userpwd == "") {
            // 密码不能为空
            userpwdError.innerText = "密码不能为空"
        }
    }

    // 处理清除密码错误的输入，以及错误提示
    // 为密码对象绑定上 onfocus 获取焦点
    userpwdElt.onfocus = function () {

        if (userpwdError.innerText != "") {
            // span有错误提示，说明输入不合法,清空 value
            userpwdElt.value = ""
        }

        // 清空错误提示
        userpwdError.innerText = ""
    }


    // 处理确认密码的错误处理
    // 确认密码的
    var userpwdElt2 = document.getElementById("userpwd2")
    // console.log(userpwd2) 测试
    var userpwd2Error = document.getElementById("userpwd2Error")
    // console.log(userpwd2Error) 测试
    // 为确认密码绑定上,onblur,失去焦点验证
    userpwdElt2.onblur = function () {
        if (userpwdElt.value != userpwdElt2.value) {
            // 两个密码不一致
            userpwd2Error.innerText = "密码不一致"
        }
    }

    // 处理确认密码的错误提醒
    // 绑定上onfous 获取焦点事件
    userpwdElt2.onfocus = function () {

        if (userpwd2Error.innerText != "") {
            // 存在错误提示，清空错误的输入value
            userpwdElt2.value = ""
        }

        // 清除错误提示
        userpwd2Error.innerText = ""
    }




    // 邮箱的验证处理
    var emailElt = document.getElementById("email")
    // console.log(emailElt) 测试

    var emailError = document.getElementById("emailError")
    // console.log(emailError) 测试

    // 为邮箱绑定上onblur失去焦点事件,
    emailElt.onblur = function () {
        var emailRegExp = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/  // 邮箱的正则表达式
        var email = emailElt.value
        var ok = emailRegExp.test(email) // 匹配返回true,否则返回false

        if (ok) {

        } else {
            emailError.innerText = "邮箱地址不合法"
        }

    }

    // 处理邮错误的提示
    // 为邮箱对象绑定上onfocus获取焦点，处理错误的提示信息
    emailElt.onfocus = function () {
        if (emailError.innerText != "") {
            // 存在错误提醒,输入的数据不合法,清空
            emailElt.value = "";
        }

        // 清空span的错误提示
        emailError.innerText = "";

    }




    // 最后处理只有所有都合法才能提示信息
    // 获取到button 普遍提交按钮的对象，通过id,注意form表单中的提交按钮不能是submit不然就算不合法也会提交的
    var submitElt = document.getElementById("submitBtn")
    // console.log(submitElt) 测试

    // 为该button提交按钮对象绑定上,onclick点击事件
    submitElt.onclick = function () {
        /*
        form 对象方法submit() 提交表单
        当所有表单项都是合法的时候提交表单
        */

        // 点击onclick注册触发点击事件,通过纯js代码,，触发对应的 username用户名和 userpwed密码以及邮箱的bulr,focus事件
        // 不需要人工操作，使用javasprict 触发

        // 用户名的
        usernameElt.focus()
        usernameElt.blur()

        // 密码 和 确认密码 
        userpwdElt.focus();
        userpwdElt.blur();

        userpwdElt2.focus();
        userpwdElt2.blur();

        // 邮箱的
        emailElt.focus();
        emailElt.blur();



        // 当所有的表项都没有 span的错误提示内容，就是所有都合法，提交数据表单
        var boolUserName = userNameError.innerText == ""  // 用户名
        // console.log(boolUserName) 测试

        var boolUserPwd = userpwdError.innerText == ""  // 密码
        // console.log(boolUserpwd2) 测试

        var boolUserPwd2 = userpwd2Error.innerText == ""  // 确认密码
        // console.log(boolUserPwd2) 测试

        var boolUseremail = emailError.innerText == "" // 邮箱
        //  console.log(boolUseremail) 测试

        if (boolUserName && boolUserPwd && boolUserPwd2 && boolUseremail) {
            // 通过id 获取到表单对象,再通过方法 submit()提交数据表单
            var userfromElt = document.getElementById("userfrom")
            // console.log(userfromElt) 测试

            // 这里也可以设置actiojn = 
            userfromElt.action = "http://localhost:8080/js"  // url统一资源定位符

            userfromElt.submit();  // 提交数据表单，方法

        } else {
            window.alert("存在错误,请注意查看")
        }
    }



}
