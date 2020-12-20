//设置一个框选状态
//处于选中时
//按下鼠标左键，会记录当前点位置，并激活框选状态
//然后移动鼠标，会记录移动到点的位置，并根据已经记录的两个点绘制出框选线（通过绘制一个矩形框对象）
//最后松开鼠标，会通过记录的俩个点判断选中图形，并取消框选状态，而且删除框选线（删除矩形框对象）
//完成整个框选事件
// var cspoint = [0,0];//在按下改变，松开清空
// var cepoint = [0,0];//在移动改变，松开清空
// var image_Rectangle = null;//在移动改变或新建，松开清空
// var image_objs = [];//在松开获取，但会马上清空，如果需要获取要在清空前获取（mouseUp.js）




//鼠标按下时的事件
$('canvas').mousedown(function (e) {
    /** 
     * event.button 属性判断鼠标按键类型 
     * 0:左键
     * 1:中键
     * 2:右键
    */
    down_flag = true;
    if (paste){
        paste_position_x = e.clientX - of_left;
        paste_position_y = e.clientY - of_top;
        paste_items(paste_position_x , paste_position_y);
    }
    // down_flag = true;

    // 移动起点
    downPoint = [];
    downPoint.push(e.clientX - of_left, e.clientY - of_top);
    // 是否选中热键
    is_hot_dot = isHotDot(e);
    console.log(is_hot_dot);
    //获得缩放点
    if(is_hot_dot){
        //画框取消掉
        scaling = true;
        if(is_hot_dot == 1){
            scx = option.obj.limit_4[0];
            scy = option.obj.limit_4[2];
        }
        else if(is_hot_dot == 2){
            scx = option.obj.limit_4[1];
            scy = option.obj.limit_4[2];
        }
        else if(is_hot_dot == 3){
            scx = option.obj.limit_4[1];
            scy = option.obj.limit_4[3];
        }
        else if(is_hot_dot == 4){
            scx = option.obj.limit_4[0];
            scy = option.obj.limit_4[3];
        }

    }
    // 鼠标左键按下走这里
    if (type != null && e.button == 0 && option.name != 'pitch') {
        var last = objs[objs.length - 1];
        switch (type) {
            case "rubber":
                console.log('zxsrubber');
                obj = createNewItem();//新建一个橡皮擦对象
                obj.level = objs.length;//图元层次为当前图元数组中的下标层次。
                down_flag = true;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                objs.push(obj);//放入objs
                //if(parray_ini.length==0){
                //	parray_ini[0]=ps;
                //}
                parray[index] = ps;
                index++;
                objs[objs.length - 1].vertices.push(ps.px, ps.py);
                update();
                break;
            case "brokenline":
            case "polygon":
                // 判断上一个多边形是否绘制结束
                if (last.doneFlag) {
                    var obj = createNewItem();
                    objs.push(obj);
                }
                var ps = new Point();
                ps.px = e.clientX - of_left;
                console.log(ps);
                ps.py = e.clientY - of_top;
                if (objs[objs.length - 1].vertices.length < 3) {
                    objs[objs.length - 1].vertices.push(e.clientX - of_left, e.clientY - of_top);
                }
                objs[objs.length - 1].vertices.push(e.clientX - of_left, e.clientY - of_top);
                // console.log(objs[objs.length - 1].vertices);
                parray[index] = ps;
                index++;
                update();
                break;
            case "curve":
                if (last.doneFlag) {
                    var obj = createNewItem();
                    objs.push(obj);
                }
                //与建立多边形有点类似需要记录多个点
                down_flag = true;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                //                更新当前对象的顶点集合
                parray[index] = ps;
                index++;
                objs[objs.length - 1].vertices.push(ps.px, ps.py);
                //                更新对象里的参数
                update();
                break;
            case "dianheng":
            case "doublepoint":
            case "longdotted":
            case "dotted":
            case "pointline":
            case "straightLine":
            case "rightangle":
            case "circle":
            case "Ellipse":
            case "elliparc":
            case "rectangle":
            case "roundedrectangle":
            case "positivearc":
                console.log('zxs1111111');
                // console.log('pppppzxs');
                // console.log(e.clientX - of_left);
                // console.log(e.clientY - of_top);
                obj = createNewItem();//
                obj.level = objs.length;//图元层次为当前图元数组中的下标层次。
                down_flag = true;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                objs.push(obj);//放入objs
                //if(parray_ini.length==0){
                //	parray_ini[0]=ps;
                //}
                parray[index] = ps;
                index++;
                update();
                break;
        }
    }
    // 鼠标右键按下走这里
    if (type != null && e.button == 2) {
        switch (type) {
            // 多边形，鼠标右键按下结束
            case "polygon":
                var ex = objs[objs.length - 1].vertices[0];
                var ey = objs[objs.length - 1].vertices[1];
                objs[objs.length - 1].vertices.push(ex, ey);

                // var ps = new Point();
                // ps.px = e.clientX;
                // ps.py = e.clientY - 130;
                // //parray_init[0] = parray_ini[0];
                // parray[index] = ps;
                // index++;
                update();
                objs[objs.length - 1].doneFlag = true;
                parray = [];//数组清空
                index = 0;//下标清空
                // parray = [];//数组清空
                // //parray_ini = [];//数组清空
                // //parray_init = [];//数组清空
                // index = 0;//下标清空
                break;
            case "curve"://曲线
                update();
                objs[objs.length - 1].doneFlag = true;
                down_flag = false;
                parray = [];//数组清空
                index = 0;//下标清空
                break;
            case "brokenline":
                objs[objs.length - 1].vertices.push(e.clientX-of_left,e.clientY-of_top);
                update();
                objs[objs.length - 1].doneFlag = true;
                parray = [];//数组清空
                index = 0;//下标清空
                break;
        }
    }


    //未选中绘制类型，按左键走这里 || option.name == "boxChoose"
    if (option.name == "pitch" && e.button == 0 && !scaling) {
        //进行图形选中判断
        //满足选中条件的图形
        var selectobj = [];
        //获取当前鼠标的坐标
        var sx = e.clientX - of_left;
        var sy = e.clientY - of_top;
        //写入状态点
        // cspoint[0] = sx;
        // cspoint[1] = sy;
        //进入框选状态
        // choice = true;
        // console.log("当前坐标："+sx+"_"+sy);
        //遍历同一图层所有已绘制图形对象
        var i = 0;
        while (i < objs.length) {
            var typeOfObj = objs[i].__proto__.constructor.name;
            switch (typeOfObj) {
                case "Polygon":
                    if (Polygonpitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Polygonpitch(sx, sy, objs[i]));
                    }
                    break;
                case "Line":
                    if (StraightLinepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(StraightLinepitch(sx, sy, objs[i]));
                    }
                    break;
                case "Brokenline":
                    if (Brokenlinepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Brokenlinepitch(sx, sy, objs[i]));
                    }
                    break;
                case "Rightangle":
                    if (Rightanglepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Rightanglepitch(sx, sy, objs[i]));
                    }
                    break;
                case "Circle":
                    if (Circlepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Circlepitch(sx, sy, objs[i]));
                    }
                    break;
                case "Curve":
                    if (Curvepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Curvepitch(sx, sy, objs[i]));
                    }
                    break;
                case "Ellipse":
                    if (Ellipsepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Ellipsepitch(sx, sy, objs[i]));
                    }
                    break;
                case "Elliparc":
                    if (Elliparcpitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Elliparcpitch(sx, sy, objs[i]));
                    }
                    break;
                case "Rectangle":
                    if (Rectanglepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Rectanglepitch(sx, sy, objs[i]));
                    }
                    break;
                case "Roundedrectangle":
                    if (Roundedrectanglepitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Roundedrectanglepitch(sx, sy, objs[i]));
                    }
                    break
                case "Positivearc":
                    if (Positivearcpitch(sx, sy, objs[i]) != null) {
                        selectobj.push(Positivearcpitch(sx, sy, objs[i]));
                    }
                    break;
            }
            i++;
        }
        //比较获取对象的图层
        var maxlevel = 0;
        var maxobj = null;
        if (selectobj.length != 0) {
            for (var i = 0; i < selectobj.length; i++) {
                //遭到最大图层
                if (maxlevel <= selectobj[i].level) {
                    maxlevel = selectobj[i].level;
                    maxobj = selectobj[i];
                }
            }
        }
        if (!maxobj) {
            // option.name = '';
            alert("未选中任何对象");
        } else {
            // 置当前操作对象option.obj 为maxobj
            option.obj = maxobj;

            // 将找到的图元id与objs中的对比，找出objs中的元素，给其limit_4赋值
            for (let n = 0; n < objs.length; n++) {
                if (maxobj && objs[n].id === maxobj.id) {

                    const limit_4 = getLimit_4(maxobj);
                    objs[n].limit_4 = limit_4;
                    option.s_limit_4 = limit_4;
                    // 定义选中框
                    objs[n].chooseRectangle = getChooseRec(limit_4);
                    // 绘制选中框
                    paintChooseRec(objs[n]);
                    // console.log(objs[n]);
                    // abc = maxobj.vertices.slice(0);
                }
            }
        }
    }

});

/**
 * @desc 获取选中图形的四个边界点
 * @param obj
 * @author kf
 * @date 2019.5.23
 * @return 边界点数组
 */
function getLimit_4(obj) {
    // 获取当前对象的类名
    const itemName = obj.__proto__.constructor.name;
    switch (itemName) {
        // 多边形
        case "Polygon":
            var x_list = [];
            var y_list = [];
            if (obj.vertices) {
                option.vertices = [];
                for (let j = 0; j < obj.vertices.length; j += 2) {
                    x_list.push(obj.vertices[j]);
                    y_list.push(obj.vertices[j + 1]);
                    option.vertices.push(obj.vertices[j]);
                    option.vertices.push(obj.vertices[j + 1]);
                }
                var x_max = Math.max.apply(null, x_list);
                var x_min = Math.min.apply(null, x_list);
                var y_max = Math.max.apply(null, y_list);
                var y_min = Math.min.apply(null, y_list);
                return [x_min, x_max, y_min, y_max];
            }
            break;
        case "Circle":
            var center = obj.center;
            option.center_x = obj.center.px;
            option.center_y = obj.center.py;
            return [center.px-obj.radius, center.px+obj.radius, center.py-obj.radius, center.py+obj.radius];
        case "Line":
            return [obj.spoint.px, obj.epoint.px, obj.spoint.py, obj.epoint.py];
        case "Brokenline":
            break;
        // 曲线
        case "Curve" :
            break;
        case "Ellipse":
            return [obj.center.px-obj.Rmax, obj.center.px+obj.Rmax, obj.center.py-obj.Rmin, obj.center.py+obj.Rmin];
        default:
            console.log(" ");
    }
}


/**
 * @desc getChooseRec 获取选中矩形框
 * @param limit_4
 * @return rec 返回一个矩形框
 */
function getChooseRec(l){
    var s = new Point(l[0], l[2]);
    var e = new Point(l[1], l[3]);
    var rec = new Rectangle(s, e);
    rec.color = 'green';
    return rec;
}