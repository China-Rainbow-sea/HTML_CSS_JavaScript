
// 对输入的物品的数量进行一个校验,
// 1.输入的只能是数字[0-9]的数字,但是第一数字不能为0,
// 当输入的内容不符合条件是,置为 1 
// 2. 输入的数值不能 小于 1 大于 64
// 3. 商品的数量修改了,重新计算商品的总价
// 参数分别是 thisNode:当前需要输入的本文框对象(用于获取value值)，
//thisPrice:隐藏域<input type="hidden">对应存放的单价的 id 属性(用于获取value值),
//thisItem对应显示总价的位置的id属性(用于修改其innerText=显示的内容)
function modiffCount(thisNode, thisPrice, thisItem) {
    // console.log(thisNode.value) 测试

    // 获取到文本框中输入的value值
    var userInput = thisNode.value;
    // console.log(userInput) 测试
    // 当输入的数据不符合如下正则表达式,不合法,置为1
    // 该正则的意思是,第一个数字可以是[1-9],第二个数字是[0-9],*其中第二个数字可以没有也可以有
    var regExp = /^[1-9][0-9]*$/ // 

    var ok = regExp.test(userInput) // 匹配返回true,否则返回false
    if (ok) {
        // 符合全是数字
        // 再判断是否是在 [1,64]之间,不是value置为 1
        // 这里 1就不用判断了,上面的正则校验了
        if (thisNode.value > 64) {
            // 超过了最大数量 value 置为 1
            thisNode.value = 1;
        }

        // 最后,合理:重新计算总价
        sumPrice(thisNode, thisPrice, thisItem)  // 注意传的是对象

    } else {
        // 不符合条件,vaLue 置为 1
        thisNode.value = 1;
    }

}



// 计算单个物品的总单价
// 通过传入，对应商品的单价的id,提高该函数的复用性
// 参数分别是 thisNode:当前需要输入的本文框对象(用于获取value值)，
//thisPrice:隐藏域<input type="hidden">对应存放的单价的 id 属性(用于获取value值),
//thisItem对应显示总价的位置的id属性(用于修改其innerText=显示的内容)
function sumPrice(thisNode, thisPrice, thisItem) {
    var userNum = thisNode.value
    // console.log(userNum) 测试

    // 获取到隐藏域中的对应的单价的 value值
    var price1 = document.getElementById(thisPrice).value
    //  console.log(price1) 测试

    // 计算出总价
    // toFixed() 保留几位小数
    var total = (userNum * price1).toFixed(2)

    // console.log(total) 测试

    // 将总价设置显示到对应的 div当中
    var item_total_price = document.getElementById(thisItem)

    // console.log(item_total_price1) 测试
    item_total_price.innerText = "¥" + total

}



// 商品数量 + 功能的实现
/*
实现思路
因为我们的 + 号 和 记录商品总数的文本框在同一个 父节点的div当中，
所以我们可以使用 thisNode.parentNode.childNodes; 获取父节点下的所有子节点的对象集合
再通过循环遍历该子节点的对象集合，通过方法childNodes[i].tagName 找到记录到
商品数量的文本框的标签名，找到后通过该对象获取到其中的 value(商品的数量)+1,达到按键+ 1 的效果
最后，修改记录商品数量的文本框的value值，
再通过复用sumPrice(thisNode)函数重新求总价
注意：需要将从文本框中读取到的字符，转换为数值，才能计算parseInt() 函数可解析一个字符串，并返回一个整数。
注意：复用上述实现的，商品数量的输入，防止+加到不合法的数值了
*/
//参数分别是 thisNode:当前调用该函数的对象(用于获取value值)，
//thisPrice:隐藏域<input type="hidden">对应存放的单价的 id 属性(用于获取value值),
//thisItem对应显示总价的位置的id属性(用于修改其innerText=显示的内容)
function addProdact(thisNode, thisPrice, thisItem) {
    // console.log(thisNode) 测试

    var newCount; // 数量的统计计算

    // 获取到父节点中所有子节点的（对象数组集合）,注意是集合
    // DOM parentNode 属性返回指定节点的父节点。
    // DOM childNodes 属性可返回指定节点的子节点的节点列表(数组)。
    var childNodes = thisNode.parentNode.childNodes;

    var i  // 定义到外面用于标记,
    // 循环遍历父节点的所有子节点找记录“商品数量信息的” input标签名,
    for (i = 0; i < childNodes.length; i++) {
        // console.log(childNodes[i].tagName) 测试获取到对应的标签的名称

        //DOM agName 属性返回被选元素的标签名。注意是大写的
        if (childNodes[i].tagName == "INPUT") { // 注意是大写的,找到了退出

            // parseInt() 函数可解析一个字符串，并返回一个整数。
            // 需要将从文本框中读取到的字符，转换为数值，才能计算
            newCount = parseInt(childNodes[i].value) + 1;
            // console.log(newCount) 测试
            break;
        }
    }

    // 然后修改条目[文本框]中的商品的数量
    childNodes[i].value = newCount

    // 复用上述实现的，商品数量的输入，防止+到不合法的数值了
    modiffCount(childNodes[i], thisPrice, thisItem)

    // 调用计算总和的函数，重新计算商品的总价
    sumPrice(childNodes[i], thisPrice, thisItem) // 注意传的是对象
}



// 同理处理，商品数量 - 功能的实现
//参数分别是 thisNode:当前调用该函数的对象(用于获取value值)，
//thisPrice:隐藏域<input type="hidden">对应存放的单价的 id 属性(用于获取value值),
//thisItem对应显示总价的位置的id属性(用于修改其innerText=显示的内容)
function minusProdact(thisNode, thisPrice, thisItem) {
    // 获取到该父节点的所有子节点的数组集合
    var childNodes = thisNode.parentNode.childNodes;
    var newCount; // 计算数量

    var i; // 定义在循环外面用于标记
    // 循环遍历找到，记录商品数量的标签名称
    for (i = 0; i < childNodes.length; i++) {
        // console.log(childNodes[i].tagName) 测试获取到对应的标签名
        if (childNodes[i].tagName == "INPUT") { // 注意是大写的
            // console.log(childNodes[i].tagName) 测试

            // 找到了，value -1
            // 需要将从文本框中读取到的字符，转换为数值，才能计算
            // parseInt() 函数可解析一个字符串，并返回一个整数。
            newCount = parseInt(childNodes[i].value) - 1
            // console.log(newCount) 测试
            break; // 找到了,跳出循环不要再找了
        }

    }

    // 重新修改文本框中的商品数量
    childNodes[i].value = newCount
    // console.log(childNodes[i].value) 测试

    // 复用上述实现的，商品数量的输入，防止 -减到0了，
    modiffCount(childNodes[i], thisPrice, thisItem)
    // 重新计算总价
    sumPrice(childNodes[i], thisPrice, thisItem) // 注意传的参数是对象


}



// 删除对应的条目的物品
//参数分别是 thisNode:当前调用该函数的对象
function del(thisNode) {
    // 1. 删除之前要提示用户是否确认删除,使用window.confirm确认提示框,点击确认,返回true,取消返回false

    var ok = window.confirm("您,确定要删除该物品吗 ?")
    if (ok) {
        // 1. 确认删除,使用 remove()删除从一个 Dictionary 对象中删除一个主键，条目对。
        // 获取到当前节点的父节点的父节点就是这个条目物品的div 这里时先是操作的div,最后时该条目的div
        // parentNode 属性返回指定节点的父节点。
        thisNode.parentNode.parentNode.remove()
    }

}




