window.onload = function() {
    // Init table
    funSelectChange();

    var arrSelect = [];
    for (var i = 0; i < 12; i++) {
        arrSelect[i] = _arrTableData[1][i + 2];
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
    objDiv.onmouseover = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        
        if (target.nodeName.toLowerCase() == "td") {
            if("1月" == target.parentNode.getElementsByTagName("td")[2].innerHTML) {
                console.log("error data.");
            } else {
                funEventTableMove(target.parentNode, arrSelect);
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

            }
        }
    }

}