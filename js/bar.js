var _strNameSpace = "http://www.w3.org/2000/svg";
var _nMaxHeight = 350;
var _nMaxValue = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function funDrawCaption(bar) {
    var text = document.createElementNS(_strNameSpace, "text");
    text.setAttribute("x", 220);
    text.setAttribute("y", 15);
    text.setAttribute("fill", "black");
    text.innerHTML = "柱形图";
    bar.appendChild(text);
}

function funDrawLineX(bar, arrPoint) {
    // 绘制X轴
    var line = document.createElementNS(_strNameSpace, "line");
    line.setAttribute("style", "stroke:black; stroke-width:1;");
    line.setAttribute("x1", arrPoint[0][0]);
    line.setAttribute("y1", arrPoint[0][1]);
    line.setAttribute("x2", arrPoint[1][0]);
    line.setAttribute("y2", arrPoint[1][1]);
    bar.appendChild(line);
    // 绘制刻度
    var nStepLong = _nMaxHeight / 10;
    for (var i = 0; i <= 12; i++) {
        var lineStep = document.createElementNS(_strNameSpace, "line");
        lineStep.setAttribute("style", "stroke:black; stroke-width:1;");
        lineStep.setAttribute("x1", arrPoint[0][0] + (nStepLong * i));
        lineStep.setAttribute("y1", arrPoint[0][1]);
        lineStep.setAttribute("x2", arrPoint[0][0] + (nStepLong * i));
        lineStep.setAttribute("y2", arrPoint[0][1] + 5);
        bar.appendChild(lineStep);

        if (0 != i) {
            var text = document.createElementNS(_strNameSpace, "text");
            text.setAttribute("fill", "black");
            text.setAttribute("x", arrPoint[0][0] + (nStepLong * i) - 8);
            text.setAttribute("y", arrPoint[0][1] + 16);
            text.setAttribute("font-size", 10);
            text.innerHTML = String(i) + "月";
            bar.appendChild(text);
        }
    }
    // 绘制箭头
    var pathHead = document.createElementNS(_strNameSpace, "path");
    pathHead.setAttribute("d", "M" + String(arrPoint[1][0]) + " " + String(arrPoint[1][1] - 3) + 
                               "L" + String(arrPoint[1][0]) + " " + String(arrPoint[1][1] + 3) + 
                               "L" + String(arrPoint[1][0] + 8) + " " + String(arrPoint[1][1]) + 
                               "Z");
    bar.appendChild(pathHead);
}

function funDrawLineY(bar, arrPoint) {
    // 绘制Y轴
    var line = document.createElementNS(_strNameSpace, "line");
    line.setAttribute("style", "stroke:black; stroke-width:1;");
    line.setAttribute("x1", arrPoint[0][0]);
    line.setAttribute("y1", arrPoint[0][1]);
    line.setAttribute("x2", arrPoint[1][0]);
    line.setAttribute("y2", arrPoint[1][1]);
    bar.appendChild(line);

    // 绘制刻度
    var nStepLong = _nMaxHeight / 10;
    for (var i = 0; i <= 10; i++) {
        var lineStep = document.createElementNS(_strNameSpace, "line");
        lineStep.setAttribute("style", "stroke:black; stroke-width:1;");
        lineStep.setAttribute("x1", arrPoint[0][0]);
        lineStep.setAttribute("y1", arrPoint[0][1] - (nStepLong * i));
        lineStep.setAttribute("x2", arrPoint[0][0] - 5);
        lineStep.setAttribute("y2", arrPoint[0][1] - (nStepLong * i));
        bar.appendChild(lineStep);
    }

    // 绘制箭头
    var pathHead = document.createElementNS(_strNameSpace, "path");
    pathHead.setAttribute("d", "M" + String(arrPoint[1][0] - 3) + " " + String(arrPoint[1][1]) + 
                                "L" + String(arrPoint[1][0] + 3) + " " + String(arrPoint[1][1]) + 
                                "L" + String(arrPoint[1][0]) + " " + String(arrPoint[1][1] - 8) + 
                                "Z");
    bar.appendChild(pathHead);
}

function funGetMaxValue() {
    // 获取最大数据
    // console.log(_arrTableData);
    for (var i = 2; i < _arrTableData[1].length; i++) {
        if (_nMaxValue < _arrTableData[1][i]) {
            _nMaxValue = _arrTableData[1][i];
        }
    }
    // console.log(_nMaxValue);
}

function funDrawLineHelp(bar, arrXY) {
    // 绘制刻度
    var nStepHeight = _nMaxHeight / 10;
    // 绘制Y轴刻度
    var nStepValue = _nMaxValue / 10;
    
    for (var i = 1; i <= 10; i++) {
        if (0 == (i % 2)) {
            var line = document.createElementNS(_strNameSpace, "line");
            line.setAttribute("style", "stroke:RGB(200, 200, 200); stroke-width:1; stroke-dasharray: 5,5");
            line.setAttribute("x1", arrXY[0][0]);
            line.setAttribute("y1", arrXY[1][1] - (i * nStepHeight));
            line.setAttribute("x2", arrXY[0][1]);
            line.setAttribute("y2", arrXY[1][1] - (i * nStepHeight));
            bar.appendChild(line);
        }

        var text = document.createElementNS(_strNameSpace, "text");
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", 10);
        text.setAttribute("x", arrXY[0][0] - 25);
        text.setAttribute("y", arrXY[1][1] - (i * nStepHeight) + 4);
        text.innerHTML = String(Math.floor(i * nStepValue));
        bar.appendChild(text);
    }
}

function funDrawRect(bar, index, value) {
    // 绘制
    var nHeight = (value / _nMaxValue) * _nMaxHeight;
    var rect = document.createElementNS(_strNameSpace, "rect");
    rect.setAttribute("style", "fill:RGB(200,200,255); stroke:purple; stroke-width:1;");
    rect.setAttribute("width", 20);
    rect.setAttribute("height", nHeight);
    rect.setAttribute("x", 20 + Math.floor(_nMaxHeight / 10) * (index + 1));
    rect.setAttribute("y", 370 - nHeight);

    bar.appendChild(rect);
}

function funDrawBar() {
    var nDrawWidth = 500;
    var nDrawHeight = 380;
    var nDrawLineX = 450;
    var nDrawLineY = 360;

    _nMaxValue = 0;

    var bar = document.getElementById("bar");
    // 绘制标题
    funDrawCaption(bar);
    // 绘制X轴
    funDrawLineX(bar, [[30, 370],[480, 370]]);
    // 绘制Y轴
    funDrawLineY(bar, [[30, 370], [30, 10]]);
    // 获取最大值
    funGetMaxValue();
    // 绘制辅助线
    funDrawLineHelp(bar,[[30, 480], [10, 370]]);

    for (var i = 2; i < _arrTableData[1].length; i++) {
        funDrawRect(bar, i - 2, _arrTableData[1][i]);
    }

}