class Bar {
    constructor(arrSource) {
        this.nMaxHeight = 350;
        this.nMaxValue = 0;
        this.nStepLong = Math.floor(this.nMaxHeight / 10);
        this.strNameSpace = "http://www.w3.org/2000/svg";

        this.arrData = [];
        for (var i = 0; i < 12; i++) {
            this.arrData[i] = arrSource[i];
        }
        // console.log(this.arrData);
    }

    // 绘制标题
    funBarCaption(bar) {
        var text = document.createElementNS(this.strNameSpace, "text");
        text.setAttribute("x", 220);
        text.setAttribute("y", 15);
        text.setAttribute("fill", "black");
        text.innerHTML = "柱形图";
        bar.appendChild(text);
    }

    // 绘制X轴
    funBarX(bar, arrPoint) {
        // 绘制X轴
        var line = document.createElementNS(this.strNameSpace, "line");
        line.setAttribute("style", "stroke:black; stroke-width:1;");
        line.setAttribute("x1", arrPoint[0][0]);
        line.setAttribute("y1", arrPoint[0][1]);
        line.setAttribute("x2", arrPoint[1][0]);
        line.setAttribute("y2", arrPoint[1][1]);
        bar.appendChild(line);
        // 绘制刻度
        for (var i = 0; i <= 12; i++) {
            var lineStep = document.createElementNS(this.strNameSpace, "line");
            lineStep.setAttribute("style", "stroke:black; stroke-width:1;");
            lineStep.setAttribute("x1", arrPoint[0][0] + (this.nStepLong * i));
            lineStep.setAttribute("y1", arrPoint[0][1]);
            lineStep.setAttribute("x2", arrPoint[0][0] + (this.nStepLong * i));
            lineStep.setAttribute("y2", arrPoint[0][1] + 5);
            bar.appendChild(lineStep);
    
            // 绘制月份
            if (0 != i) {
                var text = document.createElementNS(this.strNameSpace, "text");
                text.setAttribute("fill", "black");
                text.setAttribute("x", arrPoint[0][0] + (this.nStepLong * i) - 8);
                text.setAttribute("y", arrPoint[0][1] + 16);
                text.setAttribute("font-size", 10);
                text.innerHTML = String(i) + "月";
                bar.appendChild(text);
            }
        }
        // 绘制箭头
        var pathHead = document.createElementNS(this.strNameSpace, "path");
        pathHead.setAttribute("d", "M" + String(arrPoint[1][0]) + " " + String(arrPoint[1][1] - 3) + 
                                   "L" + String(arrPoint[1][0]) + " " + String(arrPoint[1][1] + 3) + 
                                   "L" + String(arrPoint[1][0] + 8) + " " + String(arrPoint[1][1]) + 
                                   "Z");
        bar.appendChild(pathHead);
    }

    // 绘制Y轴
    funBarY(bar, arrPoint) {
        // 绘制Y轴
        var line = document.createElementNS(this.strNameSpace, "line");
        line.setAttribute("style", "stroke:black; stroke-width:1;");
        line.setAttribute("x1", arrPoint[0][0]);
        line.setAttribute("y1", arrPoint[0][1]);
        line.setAttribute("x2", arrPoint[1][0]);
        line.setAttribute("y2", arrPoint[1][1]);
        bar.appendChild(line);
    
        // 绘制刻度
        for (var i = 0; i <= 10; i++) {
            var lineStep = document.createElementNS(this.strNameSpace, "line");
            lineStep.setAttribute("style", "stroke:black; stroke-width:1;");
            lineStep.setAttribute("x1", arrPoint[0][0]);
            lineStep.setAttribute("y1", arrPoint[0][1] - (this.nStepLong * i));
            lineStep.setAttribute("x2", arrPoint[0][0] - 5);
            lineStep.setAttribute("y2", arrPoint[0][1] - (this.nStepLong * i));
            bar.appendChild(lineStep);
        }
    
        // 绘制箭头
        var pathHead = document.createElementNS(this.strNameSpace, "path");
        pathHead.setAttribute("d", "M" + String(arrPoint[1][0] - 3) + " " + String(arrPoint[1][1]) + 
                                    "L" + String(arrPoint[1][0] + 3) + " " + String(arrPoint[1][1]) + 
                                    "L" + String(arrPoint[1][0]) + " " + String(arrPoint[1][1] - 8) + 
                                    "Z");
        bar.appendChild(pathHead);
    }

    // 获取最大值
    funBarGetMaxValue() {
        // 获取最大数据
        // console.log(this.arrData);
        for (var i = 0; i < this.arrData.length; i++) {
            // console.log("a:" + this.nMaxValue + "b:" + this.arrData[i]);
            if (parseInt(this.nMaxValue) < parseInt(this.arrData[i])) {
                // console.log("ssss?");
                this.nMaxValue = this.arrData[i];
            }
        }
    }

    // 绘制辅助线
    funBarHelp(bar, arrXY) {
        // 绘制Y轴刻度
        var nStepValue = this.nMaxValue / 10;
        
        for (var i = 1; i <= 10; i++) {
            if (0 == (i % 2)) {
                var line = document.createElementNS(this.strNameSpace, "line");
                line.setAttribute("style", "stroke:RGB(200, 200, 200); stroke-width:1; stroke-dasharray: 5,5");
                line.setAttribute("x1", arrXY[0][0]);
                line.setAttribute("y1", arrXY[1][1] - (i * this.nStepLong));
                line.setAttribute("x2", arrXY[0][1]);
                line.setAttribute("y2", arrXY[1][1] - (i * this.nStepLong));
                bar.appendChild(line);
            }
    
            var text = document.createElementNS(this.strNameSpace, "text");
            text.setAttribute("fill", "black");
            text.setAttribute("font-size", 10);
            text.setAttribute("x", arrXY[0][0] - 25);
            text.setAttribute("y", arrXY[1][1] - (i * this.nStepLong) + 4);
            text.innerHTML = String(Math.floor(i * nStepValue));
            bar.appendChild(text);
        }
    }

    // 绘制数据
    funShowBarData(bar) {
        for (var i = 0; i < this.arrData.length; i++) {
            var nHeight = (this.arrData[i] / this.nMaxValue) * this.nMaxHeight;
            var rect = document.createElementNS(this.strNameSpace, "rect");
            rect.setAttribute("style", "fill:RGB(200,200,255); stroke:purple; stroke-width:1;");
            rect.setAttribute("width", 20);
            rect.setAttribute("height", nHeight);
            rect.setAttribute("x", 20 + this.nStepLong * (i + 1));
            rect.setAttribute("y", 370 - nHeight);
            bar.appendChild(rect);
        }
    }

    // 绘制柱形图主函数
    funBarDraw() {
        this.bar = document.getElementById("bar");
        // 绘制标题
        this.funBarCaption(this.bar);
        // 绘制X轴
        this.funBarX(this.bar, [[30, 370],[480, 370]]);
        // 绘制Y轴
        this.funBarY(this.bar, [[30, 370], [30, 10]]);
        // 获取最大值
        this.funBarGetMaxValue();
        // 绘制辅助线
        this.funBarHelp(this.bar,[[30, 480], [10, 370]]);
        // 绘制数据
        this.funShowBarData(this.bar);
    }

}
