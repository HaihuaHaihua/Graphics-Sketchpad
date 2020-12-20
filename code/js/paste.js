/**
 * 黏贴功能
 */
//是否剪贴标识
var paste = false;
var paste_position_x = 0;
var paste_position_y = 0;

//点击黏贴按键，此时mousedown监听点击获取点击坐标黏贴功能
function paste_function() {
    paste = !paste;
}

/**
 *
 * @param paste_sx 黏贴左上角的x坐标
 * @param paste_sy 黏贴左上角的x坐标
 */
function paste_items( paste_sx , paste_sy){
    //判断是单个图元选中或多个图元选中
    //如果是多个图元选中

    if (selected_item instanceof Array){
        for ( var i = 0; i <selected_item.length; i++){
            //取得当前数组中的对象
            var tempitem = selected_item[i];
            item_repeat_by_position(tempitem , paste_sx , paste_sy);
        }
    }else {
        //选中单个图元
        item_repeat_by_position(selected_item , paste_sx , paste_sy);
    }

    // if(!obj_copy.empty()) {
    //     for (var i = 0; i < objs.length; i++) {
    //         obj_copy = objs[i];
    //         repeat(obj_copy, p);
    //     }
    // }
    // if(!objs_cut.empty()){
    //     for (var i = 0; i < objs.length; i++) {
    //         obj_copy = objs[i];
    //         repeat(obj_copy, p);
    //     }
    // }
    //
    // obj_copy.length=0;  //选择复制的对象数组清空
    // objs_cut.length=0;  //剪切板清空

    console.log("paste");
}

/**
 * 根据指定位置复制单个图元
 */
function item_repeat_by_position(item , position_x , position_y) {
    var objnew = null;
    var name = item.__proto__.constructor.name;
    var distans_x = 0;
    var distans_y = 0;

    switch(name) {
        //矩形
        case "Rectangle":
            objnew = new Rectangle();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        //圆角矩形
        case "Roundedrectangle":
            objnew = new Roundedrectangle();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        //直角矩形
        case "Rightangle":
            objnew = new Rightangle();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        //直线
        case "DianHeng":
            objnew = new DianHeng();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        case "Doublepoint":
            objnew = new Doublepoint();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        case "LongDotted":
            objnew = new LongDotted();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        case "Dotted":
            objnew = new Dotted();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        case "Pointline":
            objnew = new Pointline();
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        case "Line":
            objnew = new Line();
            distans_x = position_x - item.spoint.px;
            distans_y = position_y - item.spoint.py;

            objnew.spoint.px = position_x;
            objnew.spoint.py = position_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        //虚线
        case "Brokenline":
            objnew = new Brokenline();
            break;
        //多边形
        case "Polygon":
            objnew = new Polygon();
            distans_x = position_x - item.vertices[0];
            distans_y = position_y - item.vertices[1];
            for (var j = 0; j < item.vertices.length; j += 2) {
                objnew.vertices[j] = item.vertices[j] + distans_x;
                objnew.vertices[j + 1] = item.vertices[j + 1] + distans_y;
            }
            break;
        //曲线
        case "Curve":
            objnew = new Curve();
            distans_x = position_x - item.center.px;
            distans_y = position_y - item.center.py;

            objnew.center.px = item.center.px + distans_x;
            objnew.center.py = item.center.py + distans_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
            break;
        //椭圆
        case "Ellipse":
            objnew = new Ellipse();
            distans_x = position_x - item.center.px;
            distans_y = position_y - item.center.py;

            objnew.center.px = item.center.px + distans_x;
            objnew.center.py = item.center.py + distans_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        //椭圆弧
        case "Elliparc":
            objnew = new Elliparc();
            distans_x = position_x - item.center.px;
            distans_y = position_y - item.center.py;

            objnew.center.px = item.center.px + distans_x;
            objnew.center.py = item.center.py + distans_y;
            objnew.epoint.px = item.epoint.px + distans_x;
            objnew.epoint.py = item.epoint.py + distans_y;
            break;
        //圆
        case "Circle":
            objnew = new Circle();
            distans_x = position_x - item.center.px;
            distans_y = position_y - item.center.py;
            objnew.center.px = item.center.px + distans_x;
            objnew.center.py = item.center.py + distans_y;
            objnew.radius = item.radius;
            break;
        //正圆弧
        case "Positivearc":
            objnew = new Positivearc();
            distans_x = position_x - item.center.px;
            distans_y = position_y - item.center.py;
            objnew.center.px = item.center.px + distans_x;
            objnew.center.py = item.center.py + distans_y;
            objnew.radius = item.radius;
            break;
    }
    console.log("zxs111111111111111");
    //在对象数组最后添加一个对象
    objs.push(objnew);
    rePaint();//画布重绘
}