function funUpdateTable() {
    var objWrap = document.getElementById("table-wrapper");
    var objTable = document.createElement("table");
    objTable.className += "box ";
    // add caption
    var objCap = document.createElement("caption");
    objCap.innerHTML = "数据标题";
    objTable.append(objCap);
    
    // add title
    var objTrTitle = document.createElement("tr");
    for (var i = 0; i < _arrTableData[0].length; i++) {
        var objTdTitle = document.createElement("td");
        objTdTitle.className += "box ";
        objTdTitle.className += "boxcell ";
        objTdTitle.innerHTML = _arrTableData[0][i];
        objTrTitle.append(objTdTitle);
    }
    objTable.append(objTrTitle);

    // add data
    var nFirstTd = 0;
    var strFirstTd = _arrTableData[1][0];
    for (var i = 1; i < _arrTableData.length; i++) {
        var objTrData = document.createElement("tr");
        for (var j = 0; j < _arrTableData[i].length; j++) {
            var objTdData = document.createElement("td");
            // 合并同类项
            if (0 == j) {
                // 第一列合并
                if (0 == nFirstTd) {
                    for (var k = i; k < _arrTableData.length; k++) {
                        if (strFirstTd == _arrTableData[k][0]) {
                            nFirstTd++;
                        } else {
                            strFirstTd = _arrTableData[k][0];

                            objTdData.rowSpan = nFirstTd;
                            objTdData.className += "box ";
                            objTdData.className += "boxcell ";
                            objTdData.innerHTML = _arrTableData[i][j];
                            objTrData.append(objTdData);
                            break;
                        }

                        if (k == _arrTableData.length - 1) {
                            objTdData.rowSpan = nFirstTd;
                            objTdData.className += "box ";
                            objTdData.className += "boxcell ";
                            objTdData.innerHTML = _arrTableData[i][j];
                            objTrData.append(objTdData);
                        }
                    }
                    nFirstTd--;
                } else {
                    nFirstTd--;
                }
            } else {
                // 正常数据
                objTdData.className += "box ";
                objTdData.className += "boxcell ";
                // if ( j >= 2) {
                //     objTdData.innerHTML = "<input type='text' style='width:70px' value="  + _arrTableData[i][j] +  "></input>"
                // } else {
                    objTdData.setAttribute("x", j);
                    objTdData.setAttribute("y", i);
                    
                    objTdData.innerHTML = _arrTableData[i][j];
                // }
                
                objTrData.append(objTdData);
            }
        }
        objTable.append(objTrData);
    }
    objWrap.append(objTable);
}

function funGetTableData() {
    if ((1 == _arrSelectRegion.length) && (1 < _arrSelectProduct.length)) {
        // 地区1个，商品大于1 => 地区region放在第一位
        // add title 放在第一行
        var arrTableDataRow = [];
        for (var i = 0; i < _strTitle1.length; i++) {
            arrTableDataRow[i] = _strTitle1[i];
        }
        _arrTableData.push(arrTableDataRow);
        // 第二行
        for (var i = 0; i < _arrSourceData.length; i++) {
            if (!_arrSelectProduct.includes(_arrSourceData[i].product)) {
                continue;
            }
            if (!_arrSelectRegion.includes(_arrSourceData[i].region)) {
                continue;
            }
            var arrTableDataRow = [];
            // region
            arrTableDataRow[0] = _arrSourceData[i].region;
            // product
            arrTableDataRow[1] = _arrSourceData[i].product;
            // sale
            for (var j = 0; j < _arrSourceData[i].sale.length; j++) {
                arrTableDataRow[j + 2] = _arrSourceData[i].sale[j];
            }
            _arrTableData.push(arrTableDataRow);
        }

    } else {
        // 其余情况 => 商品product放在第一位
        // add title
        var arrTableDataRow = [];
        for (var i = 0; i < _strTitle2.length; i++) {
            arrTableDataRow[i] = _strTitle2[i];
        }
        _arrTableData.push(arrTableDataRow);

        for (var i = 0; i < _arrSourceData.length; i++) {
            if (!_arrSelectProduct.includes(_arrSourceData[i].product)) {
                continue;
            }
            if (!_arrSelectRegion.includes(_arrSourceData[i].region)) {
                continue;
            }
            var arrTableDataRow = [];
            // product
            arrTableDataRow[0] = _arrSourceData[i].product;
            // region
            arrTableDataRow[1] = _arrSourceData[i].region;
            // sale
            for (var j = 0; j < _arrSourceData[i].sale.length; j++) {
                arrTableDataRow[j + 2] = _arrSourceData[i].sale[j];
            }
            _arrTableData.push(arrTableDataRow);
        }
    }
}

function funPushInput() {
    var objDiv = document.getElementById("product-radio-wrapper");
    var objInput = objDiv.getElementsByTagName("input");
    for (var i = 1; i < objInput.length; i++) {
        if (objInput[i].checked) {
            // console.log(objInput[i].value)
            _arrSelectProduct.push(objInput[i].value);
        }
    }
    var objDiv = document.getElementById("region-radio-wrapper");
    var objInput = objDiv.getElementsByTagName("input");
    for (var i = 1; i < objInput.length; i++) {
        if (objInput[i].checked) {
            _arrSelectRegion.push(objInput[i].value);
        }
    }
}

function funReset() {
    _arrSelectProduct.length = 0;
    _arrSelectRegion.length = 0;
    _arrTableData.length = 0;
    document.getElementById("table-wrapper").innerHTML = "";
}

function funSelectChange() {
    // 重置table
    funReset();
    // 获取选择的checkbox
    funPushInput();
    // 获取table展示的数据
    funGetTableData();
    // console.log(_arrTableData);
    // console.log(_arrSourceData);
    funUpdateTable();
}
