/**
 * 固定重复功能
 * 重复最后一个图元
 * 向右下方固定移动10哥
 */



function repeat() {
    //获取对象数组中的最后一个对象
     var objnew = objs[objs.length - 1];
    //对象向右下方移动10个像素
    //获取数组中最后一个元素的类型
    var name = objnew.__proto__.constructor.name;
    switch(name){
        //矩形
        case "Rectangle":
        //圆角矩形
        case "Roundedrectangle":
        //直角矩形
        case "Rightangle":
        //直线
        case "Line":
            objnew.spoint.px = objnew.spoint.px + 10;
            objnew.spoint.py = objnew.spoint.py + 10;
            objnew.epoint.px = objnew.epoint.px + 10;
            objnew.epoint.py = objnew.epoint.py + 10;
            break;
        //虚线
        case "Brokenline":

            break;
        //多边形
        case "Polygon":
            for (var j = 0; j < objnew.vertices.length; j += 2) {
                objnew.vertices[j] = objnew.vertices[j] + 10;
                objnew.vertices[j+1] = objnew.vertices[j+1] + 10;
            }
            break;
        //曲线
        case "Curve":

            break;
        //椭圆
        case "Ellipse":
        //椭圆弧
        case "Elliparc":

            objnew.center.px = objnew.center.px + 10;
            objnew.center.py = objnew.center.py + 10;
            objnew.epoint.px = objnew.epoint.px + 10;
            objnew.epoint.py = objnew.epoint.py + 10;
            break;
        //圆
        case "Circle":
        //正圆弧
        case "Positivearc":
            objnew.center.px = objnew.center.px + 10;
            objnew.center.py = objnew.center.py + 10;
            break;
    }

    //在对象数组最后添加一个对象
    objs.push(objnew);
    rePaint();//画布重绘
}
