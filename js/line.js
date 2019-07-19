class Line {
    constructor(arrSourcs) {
        this.nMaxHeight = 350;
        this.nMaxValue = 0;
        this.nStepLong = Math.floor(this.nMaxHeight / 10);

        this.arrData = [];
        for (var i = 0; i < 12; i++) {
            this.arrData[i] = arrSourcs[i];
        }
        // console.log(this.arrData);
    }

    // 绘制标题
    funLineCaption(ctx) {
        ctx.font = "16px Arial";
        ctx.fillText("折线图", 220, 15);
    }

    // 绘制X轴
    funLineX(ctx, arrPoint) {
        // 绘制X轴
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(arrPoint[0][0], arrPoint[0][1]);
        ctx.lineTo(arrPoint[1][0], arrPoint[1][1]);
        // ctx.closePath();
        ctx.stroke();
    
        // 绘制刻度
        for (var i = 0; i <= 12; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(arrPoint[0][0] + (this.nStepLong * i), arrPoint[0][1]);
            ctx.lineTo(arrPoint[0][0] + (this.nStepLong * i), arrPoint[1][1] + 5);
            // ctx.closePath();
            ctx.stroke();
            // 显示月份
            if (0 != i) {
                ctx.font = "10px Arial";
                ctx.fillText(String(i) + "月", arrPoint[0][0] + (this.nStepLong * i) - 8, arrPoint[1][1] + 16);
            }
    
        }
        // 绘制箭头
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(arrPoint[1][0], arrPoint[1][1] - 3);
        ctx.lineTo(arrPoint[1][0] + 8, arrPoint[1][1]);
        ctx.lineTo(arrPoint[1][0], arrPoint[1][1] + 3);
        // ctx.closePath();
        ctx.fill();
    }

    // 绘制Y轴
    funLineY(ctx, arrPoint) {
        // 绘制Y轴
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(arrPoint[0][0], arrPoint[0][1]);
        ctx.lineTo(arrPoint[1][0], arrPoint[1][1]);
        // ctx.closePath();
        ctx.stroke();
    
        // 绘制刻度
        for (var i = 0; i <= 10; i++ ) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(arrPoint[0][0], arrPoint[0][1] - (this.nStepLong * i));
            ctx.lineTo(arrPoint[0][0] - 5, arrPoint[0][1] - (this.nStepLong * i));
            // ctx.closePath();
            ctx.stroke();
        }
        // 绘制箭头
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(arrPoint[1][0] - 3, arrPoint[1][1]);
        ctx.lineTo(arrPoint[1][0], arrPoint[1][1] - 8);
        ctx.lineTo(arrPoint[1][0] + 3, arrPoint[1][1]);
        // ctx.closePath();
        ctx.fill();
    }

    // 获取最大值
    funLineGetMaxValue() {
        // 获取最大数据
        // console.log(this.arrData);
        for (var i = 0; i < this.arrData.length; i++) {
            if (parseInt(this.nMaxValue) < parseInt(this.arrData[i])) {
                this.nMaxValue = this.arrData[i];
            }
        }
        // console.log(this.nMaxValue);
    }

    // 绘制辅助线
    funLineHelp(ctx, arrXY) {
        // 绘制Y轴刻度
        var nStepValue = this.nMaxValue / 10;
    
        for (var i = 1; i <= 10; i++) {
            // 绘制辅助线
            if (0 == (i % 2)) {
                ctx.beginPath();
                ctx.setLineDash([5, 5]);
                ctx.strokeStyle = "RGB(200, 200, 200)";
                ctx.moveTo(arrXY[0][0], arrXY[1][1] - (i * this.nStepLong));
                ctx.lineTo(arrXY[0][1], arrXY[1][1] - (i * this.nStepLong));
                // ctx.closePath();
                ctx.stroke();
            }
            // 显示量程
            ctx.font = "10px Arial";
            ctx.fillText(String(Math.floor(i * nStepValue)), arrXY[0][0] - 25, arrXY[1][1] - (i * this.nStepLong) + 4);
        }
    }

    funShowLineData(ctx) {
        // reset
        ctx.setLineDash([5, 0]);
        ctx.strokeStyle = "blue";
    
        // 绘制折线
        ctx.beginPath();
        ctx.moveTo(30 + (this.nStepLong * 1), 370 - (this.arrData[0] / this.nMaxValue) * this.nMaxHeight);
        for (var i = 1; i < 12; i++) {
            ctx.lineTo(30 + (this.nStepLong * (i + 1)), 370 - (this.arrData[i] / this.nMaxValue) * this.nMaxHeight);
        }
        ctx.stroke();
        // 绘制圆点
        for (var i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.arc(30 + (this.nStepLong * (i + 1)), 370 - (this.arrData[i] / this.nMaxValue) * this.nMaxHeight, 5, 0, Math.PI * 2, true);
            ctx.fill();
        }

        ctx.strokeStyle = "black";
    }

    // 绘制折线图主函数
    funLineDraw() {
        this.canvas = document.getElementById("line");
        if (this.canvas.getContext) {
            var ctx = this.canvas.getContext("2d");
            // 绘制标题
            this.funLineCaption(ctx);
            // 绘制X轴
            this.funLineX(ctx, [[30, 370],[480, 370]]);
            // 绘制Y轴
            this.funLineY(ctx, [[30, 370], [30, 10]]);
            // 获取最大值
            this.funLineGetMaxValue();
            // 绘制辅助线
            this.funLineHelp(ctx,[[30, 480], [10, 370]]);
    
            // 绘制数据
            this.funShowLineData(ctx);
        } else {
            console.error("Can't use canvas!");
        }
    }

}
