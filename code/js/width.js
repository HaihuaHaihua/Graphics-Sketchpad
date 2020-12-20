//线宽
function width(){
//	window.prompt("请输入直线宽度：","");
    var width = prompt("请输入直线宽度：","");
    if (width == null || width == "") {
        width=0;
        localStorage.setItem("width",width);
    }
    else {
        localStorage.setItem("width",width);
    }
}