
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// 鼠标移动到table的td
function funEventTdMoveOver(target) {
    // console.log(parseInt(target.innerHTML));
    if (("1月" == target.parentNode.getElementsByTagName("td")[2].innerHTML) || isNaN(parseInt(target.innerHTML))) {
        // console.log("no edit.");
    } else {
        target.style = "background: url('img/icon.jpeg') right center no-repeat; background-size:20px 20px;";
    }
}

// 鼠标移出table的td
function funEventTdMoveOut(target) {
    target.style = "background: none;";
}

// 鼠标点击table的td
function funEventTdClick(target) {
    // 初始化其他编辑框
    var objTable = target.parentNode.parentNode;
    var objChild = objTable.getElementsByTagName("td");
    for (index in objChild) {
        if (String(objChild[index].innerText).includes("确定")) {
            // target.innerHTML = _arrTableData[y][x + 2];
            // objChild[index].innerHTML = objChild[index].getElementsByTagName("input")[0].value;
            var x = objChild[index].getAttribute("x");
            var y = objChild[index].getAttribute("y");
            // console.log(x);
            // console.log(y);
            // console.log(_arrTableData);
            objChild[index].innerHTML = _arrTableData[y][x];
        }
    }

    var objtd = target.parentNode.getElementsByTagName("td");
    if("1月" == objtd[2].innerHTML) {
        // console.log("click error data.");
    } else {
        var strTmp = target.innerText;
        if (isNaN(parseInt(strTmp))) {
            // console.log("click error data.");
        } else {
            target.innerHTML = "<input style='float:left; width:30px;' type='number' value='" + strTmp + "'/>";
            target.innerHTML += "<button id='ok' style='float:left; width:25px;'>确定</button>";
            target.innerHTML += "<button id='cancel' style='float:left; width:25px;'>取消</button>";
        }

    }
}

// 鼠标移动到table的tr，
function funEventTableMoveOver(target, arrSelect) {
    // var objtd = target.getElementsByTagName("td");
    // if (13 == objtd.length) {
    //     for (var i = 1; i < objtd.length; i++) {
    //         arrSelect[i - 1] = objtd[i].innerHTML;
    //     }
    // } else {
    //     for (var i = 2; i < objtd.length; i++) {
    //         arrSelect[i - 2] = objtd[i].innerHTML;
    //     }
    // }
    var y = target.getAttribute("y");
    for (var i = 0; i < 12; i++) {
        arrSelect[i] = _arrTableData[y][i + 2];
    }

}

function funEventOKClick(target) {
    // console.log("click ok?");
    if (isNaN(parseInt(target.getElementsByTagName("input")[0].value))) {
        alert("not number");
    } else {
        // target.innerHTML = target.getElementsByTagName("input")[0].value;
        // console.log("x:" + target.getAttribute("x") + "y:" + target.getAttribute("y"));
        var x = target.getAttribute("x");
        var y = target.getAttribute("y");
        // _arrTableData[y][x] = target.getElementsByTagName("input")[0].value;
        var strValue = target.getElementsByTagName("input")[0].value;
        var hashKey = {};
        hashKey["地区"] = "region";
        hashKey["商品"] = "product";
        var arrKey1 = [hashKey[_arrTableData[0][0]], _arrTableData[y][0]];
        var arrKey2 = [hashKey[_arrTableData[0][1]], _arrTableData[y][1]];
        // console.log("key1:" + arrKey1 + " key2:" + arrKey2);

        for (index in _arrSourceData) {
            // console.log(_arrSourceData[index]["sale"][y - 2]);
            // console.log(_arrSourceData[index][arrKey1[0]] + "|||" + arrKey1[1]);
            if ((_arrSourceData[index][arrKey1[0]] == arrKey1[1]) && (_arrSourceData[index][arrKey2[0]] == arrKey2[1])) {
                _arrSourceData[index]["sale"][x - 2] = Number(strValue.replace(/\b(0+)/g, ""));
                // console.log(_arrSourceData[index]["sale"][y - 2]);
            }
        }
    }

    // 重绘table
    funSelectChange();
    // 存储loacl Storage
    funSaveLocalStorage();

}
function funEventCancelClick(target) {
    
    // 重绘table
    funSelectChange();
    // 读取loacl Storage
    funLoadLocalStorage();
}