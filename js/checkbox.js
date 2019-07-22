function funSetLocationStatue() {
    var arrProductCheckbox = [];
    var arrRegionCheckbox = [];
    _arrCheckbox.length = 0;

    var objWrapper = document.getElementById("product-radio-wrapper");
    var objInput = objWrapper.getElementsByTagName("input");
    for (var i = 0; i < objInput.length; i++) {
        arrProductCheckbox[i] = objInput[i].checked;
    }
    var strProduct = arrProductCheckbox.join("|")
    _arrCheckbox.push(strProduct);

    var objWrapper = document.getElementById("region-radio-wrapper");
    var objInput = objWrapper.getElementsByTagName("input");
    for (var i = 0; i < objInput.length; i++) {
        arrRegionCheckbox[i] = objInput[i].checked;
    }

    var strRegion = arrRegionCheckbox.join("|");
    _arrCheckbox.push(strRegion);

    // location.hash = _arrCheckbox.join("-");
    history.pushState(null, "title", location.href.split("?")[0] + "?"  + _arrCheckbox.join("-"));
}

function funShowLocationStatue() {
    if (String(location.href).includes("?")) {
        // var str = String(location.hash).replace(/(?)/, "");
        var str = String(location.href).split("?");
        console.log(str[1]);
        var arr = str[1].split("-");
        var arrProduct = arr[0].split("|");
        var objWrapper = document.getElementById("product-radio-wrapper");
        var objInput = objWrapper.getElementsByTagName("input");
        console.log(arrProduct);
        for (var i = 0; i < objInput.length; i++) {
            objInput[i].checked = (arrProduct[i] !== "false");
        }
    
        var arrRegion = arr[1].split("|");
        var objWrapper = document.getElementById("region-radio-wrapper");
        var objInput = objWrapper.getElementsByTagName("input");
        console.log(arrRegion);
        for (var i = 0; i < objInput.length; i++) {
            objInput[i].checked = (arrRegion[i] !== "false");
        }
    }
}

function funEventCheckBox(objDiv, nIndex) {
    var objAll = objDiv.getElementsByTagName("input");
    // console.log("all:" + objAll[0].checked);
    if (0 == nIndex) {
        // click All
        for (var i = 0; i < objAll.length; i++) {
            objAll[i].checked = true;
        }
    } else {
        // click member
        var bChecked = [];
        for (var i = 1; i < objAll.length; i++) {
            bChecked[i - 1] = objAll[i].checked;
        }
        objAll[0].checked = !bChecked.includes(false);
        if (!bChecked.includes(true)) {
            objAll[nIndex].checked = true;
        }
    }
}

function funEventChange(objDiv) {
    objDiv.onchange = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        if ("input" == target.nodeName.toLowerCase()) {
            switch (target.id) {
                case "cb_all":
                    funEventCheckBox(objDiv, 0);
                    break;
                case "cb_1":
                    funEventCheckBox(objDiv, 1);
                    break;
                case "cb_2":
                    funEventCheckBox(objDiv, 2);
                    break;
                case "cb_3":
                    funEventCheckBox(objDiv, 3);
                    break;
                default:
                    break;
            }
            funSelectChange();
            funSetLocationStatue();
        }
    }
}