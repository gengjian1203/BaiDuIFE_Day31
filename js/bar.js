var _strNameSpace = "http://www.w3.org/2000/svg";
var _nMaxHeight = 350;
var _nMaxValue = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function funDrawCaption(bar) {
    var text = document.createElementNS(_strNameSpace, "text");
    text.setAttribute("x", 180);
    text.setAttribute("y", 15);
    text.setAttribute("fill", "black");
    text.innerHTML = "柱形图";
    bar.appendChild(text);
}

function funDrawLineX(bar, arrPoint) {
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
    }
}

function funDrawLineY(bar, arrPoint) {
    var line = document.createElementNS(_strNameSpace, "line");
    line.setAttribute("style", "stroke:black; stroke-width:1;");
    line.setAttribute("x1", arrPoint[0][0]);
    line.setAttribute("y1", arrPoint[0][1]);
    line.setAttribute("x2", arrPoint[1][0]);
    line.setAttribute("y2", arrPoint[1][1]);
    bar.appendChild(line);

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
}

function funGetMaxValue() {
    // console.log(_arrTableData);
    for (var i = 2; i < _arrTableData[1].length; i++) {
        if (_nMaxValue < _arrTableData[1][i]) {
            _nMaxValue = _arrTableData[1][i];
        }
    }
    // console.log(_nMaxValue);
}

function funDrawRect(bar, index, value) {
    var nHeight = (value / _nMaxValue) * _nMaxHeight;
    var rect = document.createElementNS(_strNameSpace, "rect");
    rect.setAttribute("style", "fill:blue; stroke:purple; stroke-width:1;");
    rect.setAttribute("width", 20);
    rect.setAttribute("height", nHeight);
    rect.setAttribute("x", Math.floor(_nMaxHeight / 10) * (index + 1));
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
    funDrawLineX(bar, [[10, 370],[450, 370]]);
    // 绘制Y轴
    funDrawLineY(bar, [[10, 370], [10, 10]]);

    // 获取最大值
    funGetMaxValue();
    
    for (var i = 2; i < _arrTableData[1].length; i++) {
        funDrawRect(bar, i - 2, _arrTableData[1][i]);
    }

}