window.onload = function() {
    // Init table
    funSelectChange();
    // Init Bar    
    funDrawBar();

    // Event
    // product event
    var objDiv = document.getElementById("product-radio-wrapper");
    funEventChange(objDiv);
    // region event
    var objDiv = document.getElementById("region-radio-wrapper");
    funEventChange(objDiv); 

}