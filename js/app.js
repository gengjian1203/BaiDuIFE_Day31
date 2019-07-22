

window.onload = function() {
    // localStorage.clear();
    // localStorage 读取
    funLoadLocalStorage();
    // localStorage 存储
    funSaveLocalStorage();

    // Init table
    // console.log("sss");
    funShowLocationStatue();
    funSelectChange();
    
    //

    var arrSelect = [];
    for (var i = 0; i < 12; i++) {
        // arrSelect[i] = _arrTableData[1][i + 2];
        arrSelect[i] = _arrSourceData[1].sale[i];
    }

    // Init Bar    
    var bar = new Bar(arrSelect);
    bar.funBarDraw();
    // Init Line
    var line = new Line(arrSelect);
    line.funLineDraw();

    // Event
    // product event
    var objDiv = document.getElementById("product-radio-wrapper");
    funEventChange(objDiv);
    // region event
    var objDiv = document.getElementById("region-radio-wrapper");
    funEventChange(objDiv); 
    // table event
    var objDiv = document.getElementById("table-wrapper");
    // 鼠标移入
    objDiv.onmouseover = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        
        if (target.nodeName.toLowerCase() == "td") {
            if("1月" == target.parentNode.getElementsByTagName("td")[2].innerHTML) {
                // console.log("error data.");
            } else {

                /////////////////////////////
                funEventTableMoveOver(target, arrSelect);
                // 重新绘制Bar
                document.getElementById("bar").innerHTML = "";
                var bar = new Bar(arrSelect);
                bar.funBarDraw();
                // 重新绘制Line
                var ctx = document.getElementById("line").getContext("2d");
                ctx.beginPath();
                ctx.clearRect(0, 0, 600, 390);
                var line = new Line(arrSelect);
                line.funLineDraw();

                /////////////////////////////
                // 移动至Td
                funEventTdMoveOver(target);
            }
        }
    }
    // 鼠标移出
    objDiv.onmouseout = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;

        if (target.nodeName.toLowerCase() == "td") {
            // 移动至Td
            funEventTdMoveOut(target);
        }
    }
    // 鼠标点击
    objDiv.onclick = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;

        if (target.nodeName.toLowerCase() == "td") {
            funEventTdClick(target);
        }
        
        if (target.nodeName.toLowerCase() == "button") {
            switch(target.id) {
                case "ok":
                    funEventOKClick(target.parentNode);
                    break;
                case "cancel":
                    funEventCancelClick(target.parentNode);
                    break;
                default:

                    break;
            }
        }
    }
    // 键盘按下
    objDiv.onkeydown = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        if (target.nodeName.toLowerCase() == "input") {
            switch(e.keyCode) {
                // Esc
                case 27:
                    funEventCancelClick(target.parentNode);
                    break;
                // Enter
                case 13:
                    funEventOKClick(target.parentNode);
                    break;
                default:
                    break;
            }
        }
    }
    //
    var objDiv = document.getElementsByTagName("body");
    objDiv[0].onclick = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        if ((target.nodeName.toLowerCase() != "table") &&
            (target.nodeName.toLowerCase() != "tr") && 
            (target.nodeName.toLowerCase() != "td") && 
            (target.nodeName.toLowerCase() != "input") &&
            (target.nodeName.toLowerCase() != "button")) {
            funEventCancelClick(target.parentNode);
        }
    }

}

// window.onhashchange = funShowLocationStatue;
window.onpopstate = function() {
    funShowLocationStatue();
    funSelectChange();
}