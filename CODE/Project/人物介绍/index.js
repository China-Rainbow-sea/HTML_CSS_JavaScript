

// 通过点击图片,改变文字显示的信息
function show() {
    // 通过class类名获取到同类名对应的文本对象的集合(数组)
    let userText = document.getElementsByClassName("user-text")
    // console.log(userText) 测试

    // 通过类名获取同类名中需要显示的图片对象集合数组
    var userPics = document.getElementsByClassName("user-pic")

    // 移动遍历该文本对象集合数组,移除显示信息
    for(var i = 0; i < userText.length; i++) {
        // remover js中移除对应的元素
        userText[i].classList.remove("active-text")
        // console.log(userText[i]) 测试
    }

    // 点击哪个图片就可以找到对应在数组的下标位置,在通过indexOf检索.
    var i = Array.from(userPics).indexOf(event.target)
    console.log(i) 
    // 最后将对应下标的文字信息显示出来,因为文字信息和所点击的图片信息的在数组中的下标是相对应的.
    userText[i].classList.add("active-text")
}