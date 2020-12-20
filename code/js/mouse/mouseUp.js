

//鼠标抬起事件
$('canvas').mouseup(function (e) {
    down_flag = false;
    //缩放
    scx = 0;
    scy = 0;
    basex = 0;
    basey = 0;

    //如果处于框选状态
    //判断选中图形
    //取消选中状态
    //重置框选点数据
    //重置框选框
    //重置对象数组
    // if(choice){
    //     //识别步骤
    //     image_pitch(cspoint,cepoint);
    //     //清空步骤
    //     choice = false;
    //     cspoint = [0,0];
    //     cepoint = [0,0];
    //     image_Rectangle = null;
    //     image_objs = [];
    //     // rePaint();
    //     paintChooseRec(option.obj);
    //     console.log("取消框选");
    // }

    // 抬起坐标更新
    upPoint = [];
    upPoint.push(e.clientX-of_left,e.clientY-of_top);

    // 当前操作为框选
    if(option.name == "boxChoose"){
        var resultItems = image_pitch(downPoint,upPoint);
        //黏贴
        option.objs = resultItems;
        rePaint();
        paintChooseRecs(resultItems);
        
    }

    
    if(option.name == 'Xmove' || option.name == 'Ymove'){
        option.name = 'pitch'
    }

    // 如果当前操作对象中有e_vertices，即多边形移动后的顶点值，赋值给当前多边形对象
    // 新的起点为当前多边形的新位置
    if(option.e_vertices){
        // 由于option.obj是图元对象列表中某一对象的引用，故修改option.obj会影响到objs[i]
        option.obj.vertices = option.e_vertices;
        option.s_vertices = option.obj.vertices.slice(0);
    }

    if(option.s_limit_4){
        option.s_limit_4 = option.obj.limit_4;
    }

    if (type != null && e.button == 0) {
        switch (type) {
            case "rubber":
                down_flag = false;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                parray[index] = ps;
                objs[objs.length - 1].vertices.push(ps.px, ps.py);
                index++;
                update();
                parray = [];//数组清空
                index = 0;//下标 清空
                break;
            case "brokenline":
            case "polygon":
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                // parray[index] = ps;
                // index++;
                // update();
                // parray = [];//数组清空
                // index = 0;//下标清空

                // obj = createNewItem();//
                // obj.level = objs.length;//图元层次为当前图元数组中的下标层次。
                // objs.push(obj);//放入objs
                // down_flag = true;
                // var ps = new Point();
                // ps.px = e.clientX;
                // ps.py = e.clientY - 130;
                // parray[index] = ps;
                // index++;
                // update();
                break;
            case "rectangle":
                // 裁剪按钮点击之后
                if (option.name == 'clip' || option.name == 'clipout') {
                    // 最后一个元素是裁剪用的矩形，记录矩形的两个关键点
                    var lastItem = objs[objs.length - 1];
                    option.rx = lastItem.spoint;
                    option.ry = lastItem.epoint;
                    objs.pop();
                }


                // 矩形刷新
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                parray[index] = ps;
                index++;
                update();
                parray = [];//数组清空
                index = 0;//下标清空
                // console.log("done");

                var lastItem = objs[objs.length - 1];
                // console.log(lastItem instanceof Line);
                // 判断待裁剪的对象
                if (lastItem instanceof Line) {
                    // 直线走这里
                    // 内裁剪
                    if(option.name == "clip"){
                        canvasClear();//画布清空
                        for (var i = 0; i < option.line.length; i += 2) {
                            Inner_cohenSutherland(option.line[i], option.line[i + 1], option.rx, option.ry);
                        }
                    }else if(option.name == "clipout"){
                        canvasClear();//画布清空
                        for (var i = 0; i < option.line.length; i += 2) {
                            Outer_cohenSutherland(option.line[i], option.line[i + 1], option.rx, option.ry);
                        }
                    }

                    // 多边形走这里
                }else if(lastItem instanceof Polygon){
                    var vertice = lastItem.vertices;
                    // console.log(vertice);
                    // 预处理多边形顶点数组，去头去尾，设计多边形时根据需要开头顶点push了两次
                    vertice.shift();
                    vertice.shift();
                    vertice.pop();
                    vertice.pop();

                    // 多边形裁剪参数：顶点列表
                    var list = [];
                    for(var i=0;i<vertice.length;i+=2){
                        var ps = new Point;
                        ps.px = vertice[i];
                        ps.py = vertice[i+1];
                        list.push(ps);
                    }
                    // console.log(list);
                    // 内外裁剪判断
                    if(option.name == "clip"){
                        objs.pop();
                        rePaint();
                        Mul_Inner_SutherlandHodgman(list,option.rx,option.ry);
                    }else if(option.name == "clipout"){
                        console.log("外裁剪");
                        objs.pop();
                        rePaint();
                        Mul_Outer_WeilerAtherton(list,option.rx,option.ry);
                    }
                }
                break;

            // case "brokenline":
            case "dianheng":
            case "doublepoint":
            case "longdotted":
            case "pointline":
            case "dotted":
            case "straightLine":
            case "rightangle":
            case "circle":
            case "Ellipse":
            case "elliparc":
            case "roundedrectangle":
            case "positivearc":
                down_flag = false;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                parray[index] = ps;
                index++;
                update();
                parray = [];//数组清空
                index = 0;//下标清空
                break;
        }
    }

});