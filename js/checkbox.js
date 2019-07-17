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
        }
    }
}