let _strTitle1 = ["地区", "商品", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
let _strTitle2 = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
// 商品种类
let _arrSelectProduct = [];
// 地区种类
let _arrSelectRegion = [];
// 数据源 *
let _arrSourceData = []; 
// table数据
let _arrTableData = [];
// checkbox选择情况
let _arrCheckbox = [];

// localStorage 读取
function funLoadLocalStorage() {
    var items = localStorage.getItem("AData");
    if (null == items){
        // console.log("empty data.");
        _arrSourceData = sourceData;
    } else {
        // console.log("load data.");
        _arrSourceData = JSON.parse(items);
    }
    // console.log(_arrSourceData);
}

// localStorage 存储
function funSaveLocalStorage() {
    localStorage.clear();
    var strLoacalStorage = JSON.stringify(_arrSourceData);
    localStorage.setItem("AData", strLoacalStorage);

}