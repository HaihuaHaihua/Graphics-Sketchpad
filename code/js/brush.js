
$(document).contextmenu(function (e) {
    e.preventDefault();
});
var ctx = getCTX("canvas");     //获取画布
var type = null;                 //按钮类型
var parray = [];                //存放当前绘制对象的所有点
var index = 0;                  //数组下标
var objs = [];                  //画布所有对象的集合
// 当前操作元素
var option = {
    vertices: []
};
var downPoint = [];           //鼠标按下时的点坐标    
var upPoint = [];             //鼠标松开时的点坐标
var is_hot_dot = false;         // 热键

// 画布左上角相对于client的坐标
var of_p = $("#canvas").offset();
var of_left = of_p.left;
var of_top = of_p.top;
// console.log(of_left, of_top);

//鼠标是否按下标识
var down_flag = false;
// 鼠标是否移动标识
var move_flag = false;

/*
元素属性更新
 */
function update() {
    // console.log(type);
    //每次更新采用对当前图元对象的属性更新
    switch (type) {

        case "rubber":
            // objs[objs.length - 1].spoint = parray[0];
            // objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "dianheng":
        case "doublepoint":
        case "longdotted":
        case "pointline"://更新点直线
        case "dotted"://更新虚线
        case "straightLine"://更新直线
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "brokenline"://更新折线
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "polygon":/*多边形*/
            // console.log(objs.length);
            //if(parray_init.length!=0){
            //	objs[objs.length-1].init = parray_init[0];}
            // 更新多边形最后一条边 具体未实现
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "rightangle"://更新直角
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "circle"://更新圆
            // console.log(objs.length);
            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].radius = odistance(parray[0], parray[parray.length - 1]);
            break;
        case "Ellipse"://更新椭圆
            // console.log(objs.length);
            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "elliparc"://更新椭圆弧
            // console.log(objs.length);
            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "curve"://更新曲线
            //更新点集合
//         objs[objs.length - 1].plist = objs[objs.length - 1].vertices;
            var keyList = objs[objs.length - 1].vertices;
//		   objs[objs.length - 1].vertices = [];
//		   for(var i=0;i<parray.length;i++){
//		   		objs[objs.length - 1].vertices.push(parray[i].px,parray[i].py);
//		   }
//		   console.log(objs[objs.length - 1].vertices);
//		   objs[objs.length - 1].hlist = objs[objs.length - 1].vertices;
            //分组放入
            objs[objs.length - 1].plist=[];
            for(var i=0; i<keyList.length; i+=20){
                objs[objs.length - 1].plist.push(keyList.slice(i,i+22));
            }
//		   objs[objs.length - 1].plist=[];
//         for(var i=0; i<keyList.length; i++){
//         		objs[objs.length - 1].plist.push(keyList[i]);
//         }
            break;
        case "rectangle"://更新矩形
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "roundedrectangle"://更新圆角矩形
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "positivearc"://更新正圆弧
            // console.log(objs.length);

            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].spoint = parray[parray.length - 1];
            objs[objs.length - 1].radius = odistance(parray[0], parray[parray.length - 1]);

            break;
    }
    //更新之后画布重绘
    rePaint();
}

// // 标准线
// function baseLine(color){
//     ctx.moveTo(540,0);
//     ctx.lineTo(540,540);
//     ctx.moveTo(0,270);
//     ctx.lineTo(1080,270);
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = color;
//     ctx.stroke();
// }
// baseLine('#ccc');

// 画空心圆,描绘选中框
function cornerCircle(x,y,r){
    ctx.beginPath();
    ctx.lineWidth=1;	//重新设置画笔
    ctx.strokeStyle="green";
    ctx.arc(x,y,r,0,360,false);
    ctx.stroke();
    ctx.closePath();
}


/*
画布重绘
 */
function rePaint() {
    canvasClear();//画布清空
    // baseLine('#ccc');
    // 鼠标松开时才打印，绘图中不打印，打印画布最后一个对象，方便调试
    if (!down_flag) {
        console.log(objs);
    }

    for (var i = 0; i < objs.length; i++) {
        if (objs[i].fillSign) {
            var fillNode = objs[i].vertices.slice(2);
            var vertices = new Float64Array(fillNode);
            polygonFilling(vertices);
        }
        objs[i].draw();
    }
    
    var optionObj = option;
    if(optionObj && optionObj.limit_4){
        var optionObj = option.obj;
	    var limit_4 = optionObj.limit_4;
        console.log(limit_4);
        // obj.chooseRectangle.draw();
        // 描绘矩形四个热点
        cornerCircle(limit_4[0],limit_4[2]);
        cornerCircle(limit_4[1],limit_4[2]);
        cornerCircle(limit_4[0],limit_4[3]);
        cornerCircle(limit_4[1],limit_4[3]);
    }
}


//画笔选择
// var isSelect_flag = false;//是否已经选择标识;
//每一次按钮选择新建一个对象元素
function brush(item) {
    console.log(item);
    var items = document.getElementById(item);//查找元素
    // if (item == "rubber"){
    //     type = "dianheng";
    // }
    //如果是当前一选中类型，颜色变浅，取消选中
    if (item == type) {
        // console.log("1-----");
        items.style.backgroundColor = '#fff';
        type = null;
    } else {
        if (type != null) {//已有选中但换选别的类型
            var temp = document.getElementById(type);
            temp.style.backgroundColor = '#fff'//原本类型的颜色变浅
        }
        console.log("zxszxs");
        items.style.backgroundColor = '#ddd'//颜色加深

        // 选择不同画笔，全局变量type类型进行改变
        switch (item) {
            case "dianheng":
                type = "dianheng";
                break;
            case "doublepoint":
                type = "doublepoint";
                break;
            case "longdotted":
                type = "longdotted";
                break;
            case "pointline":
                type = "pointline";
                break;
            case "dotted":
                type = "dotted";
                break;
            case "straightLine":
                type = "straightLine";
                break;
            case "brokenline"://折线
                type = "brokenline";
                var obj = createNewItem();//
                obj.doneFlag=true;
                objs.push(obj);
                break;
            case "rightangle":/*直角*/
                type = "rightangle";
                break;
            case "polygon":/*多边形*/
                type = "polygon";
                var obj = createNewItem();//
                objs.push(obj);
                break;
            case "circle":
                type = "circle";
                break;
            case "Ellipse":
                type = "Ellipse";
                break;
            case "elliparc"://更新椭圆弧	
                type = "elliparc";
                break;
            case "arc":/*圆弧*/
                type = "arc";
                break;
            case "elliparc":/*椭圆弧*/
                type = "elliparc";
                break;
            case "curve"://更新曲线
                type = "curve";
                //这里建了一个对象
                var obj = createNewItem();
                objs.push(obj);
                break;
            case "roundedrectangle":/*圆角矩形*/
                type = "roundedrectangle";
                break;
            case "rectangle":
                type = "rectangle";
                break;
            case "positivearc":/*正圆弧*/
                type = "positivearc";
                break;
            
        }
    }
}


/*
获取画布
 */
function getCTX(id) {
    var canvas_dom = document.getElementById(id);
    var ctx = canvas_dom.getContext("2d");
    return ctx;
}

/*
画布清空
 */
function canvasClear() {
    var c = document.getElementById("canvas");
    ctx.clearRect(0, 0, c.width, c.height);
}


/*
新建对象
 */
function createNewItem() {
    //根据全部变量type进行对象的新建
    switch (type) {
        // case "rubber":
        //     return new Rubber();
        //     break;
        case "rubber":
            var c = document.getElementById("canvas2");
            console.log("woyaoyong1xiaopica");
            console.log(c);
            console.log(c.style.backgroundColor);
            return new Rubber(c.style.backgroundColor,rubberlength);
            break;
        case "dianheng":
            return new DianHeng();
            break;
        case "doublepoint":
            return new Doublepoint();
            break;
        case "longdotted":
            return new LongDotted();
            break;
        case "pointline":
            return new Pointline();
            break;
        case "dotted":
            return new Dotted();
            break;
        case "straightLine":
            return new Line();
            break;
        case "brokenline":
            return new Brokenline();
            break;
        case "circle":
            return new Circle();

            break;
        case "Ellipse":
            return new Ellipse();
            break;
        case "elliparc":
            return new Elliparc();
            break;
        case "rightangle":
            return new Rightangle();
            break;
        case "polygon":
            return new Polygon();
            break;
        case "arc":
            return new Arc();
            break;
        case "elliparc":
            return new Elliparc();
            break;
        case "curve":
            return new Curve();
            break;
        case "roundedrectangle":
            return new Roundedrectangle();
            break;
        case "rectangle":
            return new Rectangle();
            break;
        case "positivearc":
            return new Positivearc();
            break;

    }
}

/*
父类（所有画布上的元素对象）
所有图元对象都继承该对象
 */
function Drawable() {
    this.level = 0;         //元素层次，用于后续，带不同颜色的图元的刷新
    // id 自动生成 当前时间戳
    this.id = parseInt(Date.now());
    this.color = "#000"; //元素颜色，默认颜色黑色
    this.weight = 1;        //元素宽度，默认图元线条宽度
    this.vertices = [];     // 数组对象，存放图形顶点
    this.edgepoints = new Array();
    this.limit_4 = [];      // 边界点，存放元素上下左右4个边界值
}

/*
点对象
 */
function Point(px, py, type) {
    //继承父类
    // Drawable.apply(this);

    // arguments 属性获取当前方法的参数
    this.px = arguments[0] ? arguments[0] : 0;
    this.py = arguments[1] ? arguments[1] : 0;
    this.type = arguments[2] ? arguments[2] : null;
    /*
    点亮一个点
     */
    this.draw = function (color) {
        //绘制成矩形
        ctx.fillStyle = color || "#000";
        ctx.fillRect(this.px, this.py, 1, 1);
    }
}
