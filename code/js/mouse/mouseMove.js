/**
 * @desc 鼠标移动事件
 */
//设置一个缩放状态来限制缩放
var scaling = false;
var scx = 0;
var scy = 0;

// 鼠标移动事件
$('canvas').mousemove(function (e) {
    // //如果处于框选状态
    // //记录当前位置
    // if(choice){
    //     var sx = e.clientX - of_left;
    //     var sy = e.clientY - of_top;
    //     cepoint[0] = sx;
    //     cepoint[1] = sy;
    //     //绘制一个虚线矩形框
    //     if(image_Rectangle == null){
    //         image_Rectangle = new Imag_draw();
    //     }
    //     // rePaint();
    //     image_Rectangle.draw();
    //     // console.log("当前坐标："+sx+"_"+sy);
    // }

    /**
     * @desc 跟踪鼠标位置
     */
    var px = parseInt(e.clientX - of_left);
    var py = parseInt(e.clientY - of_top);
    $('#position').text(px + ',' + py);

    if (type != null && e.button == 0 && option.name!='pitch') {
        switch (type) {
            // case条件顺序不能改变，改变会出错
            case "polygon":
                break;
            case "curve":

                if (down_flag == true) {
                    var ps = new Point();
                    ps.px = e.clientX - of_left;
                    ps.py = e.clientY - of_top;
                    parray[index] = ps;
                    index++;
                    objs[objs.length - 1].vertices.push(ps.px, ps.py);
                    update();
                }
                break;
                //橡皮擦
            case "rubber":
                if (down_flag == true) {
                    var ps = new Point();
                    ps.px = e.clientX - of_left;
                    ps.py = e.clientY - of_top;
                    parray[index] = ps;
                    index++;
                    objs[objs.length - 1].vertices.push(ps.px, ps.py);
                    update();
                }
                console.log('zzxs');
                console.log(objs[objs.length - 1]);
                break;
            case "brokenline":
                if(objs[objs.length-1].doneFlag==false) {
                    var ps = new Point();
                    ps.px = e.clientX - of_left;
                    ps.py = e.clientY - of_top;
                    objs[objs.length - 1].vertices.push(e.clientX - of_left, e.clientY - of_top);
                    update();
                    objs[objs.length - 1].vertices.pop();
                    objs[objs.length - 1].vertices.pop();
                }
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
                if (down_flag == true) {
                    var ps = new Point();
                    ps.px = e.clientX - of_left;
                    ps.py = e.clientY - of_top;
                    parray[index] = ps;
                    index++;
                    update();
                }
                break;
        }
    }


    /**
     * @desc 选中并自由移动
     * @author kf
     * @date 2019.5.23
     */
    if (option.name == "pitch" && down_flag) {
        // console.log("移动");
        // 计算移动距离
        // console.log(downPoint);
        var px = e.clientX - of_left;
        var py = e.clientY - of_top;
        var dx = px - downPoint[0];
        var dy = py - downPoint[1];

        // 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
        if (option.obj instanceof Polygon) {
            // 起始位置
            option.s_vertices = option.obj.vertices.slice(0);
        }
        // 当前操作为选中 
        if (option.name == "pitch" && option.obj) {
            // 将多边形数组的值加上移动的距离
            for (var i = 0; i < option.obj.vertices.length; i += 2) {
                option.obj.vertices[i] += dx;
                option.obj.vertices[i + 1] += dy;
                // 更新边界点
                option.obj.limit_4 = getLimit_4(option.obj);
                // 根据边界点更新选中框
                option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
            }

            rePaint();
            paintChooseRec(option.obj);
            // 将移动后的终点位置深拷贝给e_vertices
            option.e_vertices = option.obj.vertices.slice(0);
            option.obj.vertices = option.s_vertices;
            // console.log(option);
        }
    }

    /**
     * @desc 选中并以x轴为标准平移
     * @author kf
     * @date 2019.5.23
     */
    if (option.name == "Xmove" && down_flag) {
        // 计算移动距离
        var px = e.clientX - of_left;
        var dx = px - downPoint[0];

        // 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
        if (option.obj instanceof Polygon) {
            // 起始位置
            option.s_vertices = option.obj.vertices.slice(0);
        }
        // 当前操作为选中 
        if (option.obj) {
            // 将多边形数组的值加上移动的x距离
            for (var i = 0; i < option.obj.vertices.length; i += 2) {
                option.obj.vertices[i] += dx;
            }
            rePaint();
            paintChooseRec(option.obj);
            // 将移动后的终点位置深拷贝给e_vertices
            option.e_vertices = option.obj.vertices.slice(0);
            option.obj.vertices = option.s_vertices;
        }
    }

    /**
	 * @desc 选中并缩放
	 * @author kf
	 * @date 2019.5.24
	 */
	if(is_hot_dot && down_flag) {
		
		var px = e.clientX - of_left;
		var py = e.clientY - of_top;

		switch(is_hot_dot) {
			case 1:
				// 参考点x & y
				var basex = option.s_limit_4[1];
                var basey = option.s_limit_4[3];
                console.log(basex,basey);
				// 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
				if(option.obj instanceof Polygon) {
					// 起始位置
					option.s_vertices = option.obj.vertices.slice(0);
				}
				// 当前操作为选中 
				if(option.obj) {
					// 将多边形数组的值加上移动的距离
					for(var i = 0; i < option.obj.vertices.length; i += 2) {

						var xy = polygon_scaling_ratio(scx, scy, px+1, py+1, basex, basey, option.s_vertices[i], option.s_vertices[i + 1]);
						option.obj.vertices[i] = xy[0];
						option.obj.vertices[i + 1] = xy[1];	
					}
					
					// 更新边界点
					option.obj.limit_4 = getLimit_4(option.obj);
					// 根据边界点更新选中框
					option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
					
					rePaint();
					paintChooseRec(option.obj);
					// 将移动后的终点位置深拷贝给e_vertices
					option.e_vertices = option.obj.vertices.slice(0);
					
					option.obj.vertices = option.s_vertices;
				}
				break;

			case 2:
				// 参考点x & y
				var basex = option.s_limit_4[0];
				var basey = option.s_limit_4[3];
				
				// 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
				if(option.obj instanceof Polygon) {
					// 起始位置
					option.s_vertices = option.obj.vertices.slice(0);
				}
				// 当前操作为选中 
				if(option.obj) {
					// 将多边形数组的值加上移动的距离
					for(var i = 0; i < option.obj.vertices.length; i += 2) {

						var xy = polygon_scaling_ratio(scx, scy, px+1, py+1, basex, basey, option.s_vertices[i], option.s_vertices[i + 1]);
						
						option.obj.vertices[i] = xy[0];
						option.obj.vertices[i + 1] = xy[1];
						
						
					}
					
					// 更新边界点
					option.obj.limit_4 = getLimit_4(option.obj);
					// 根据边界点更新选中框
					option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
					
					rePaint();
					paintChooseRec(option.obj);
					// 将移动后的终点位置深拷贝给e_vertices
					option.e_vertices = option.obj.vertices.slice(0);
					
					option.obj.vertices = option.s_vertices;
				}
				break;
			case 3:
				// 参考点x & y
				var basex = option.s_limit_4[0];
				var basey = option.s_limit_4[2];
				
				// 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
				if(option.obj instanceof Polygon) {
					// 起始位置
					option.s_vertices = option.obj.vertices.slice(0);
				}
				// 当前操作为选中 
				if(option.obj) {
					// 将多边形数组的值加上移动的距离
					for(var i = 0; i < option.obj.vertices.length; i += 2) {

						var xy = polygon_scaling_ratio(scx, scy, px+1, py+1, basex, basey, option.s_vertices[i], option.s_vertices[i + 1]);
						
						option.obj.vertices[i] = xy[0];
						option.obj.vertices[i + 1] = xy[1];
					}
					
					// 更新边界点
					option.obj.limit_4 = getLimit_4(option.obj);
					// 根据边界点更新选中框
					option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
					
					rePaint();
					paintChooseRec(option.obj);
					// 将移动后的终点位置深拷贝给e_vertices
					option.e_vertices = option.obj.vertices.slice(0);
					
					option.obj.vertices = option.s_vertices;
				}
				break;
			case 4:
				// 参考点x & y
				var basex = option.s_limit_4[1];
				var basey = option.s_limit_4[2];
				
				// 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
				if(option.obj instanceof Polygon) {
					// 起始位置
					option.s_vertices = option.obj.vertices.slice(0);
				}
				// 当前操作为选中 
				if(option.obj) {
					// 将多边形数组的值加上移动的距离
					for(var i = 0; i < option.obj.vertices.length; i += 2) {

						var xy = polygon_scaling_ratio(scx, scy, px+1, py+1, basex, basey, option.s_vertices[i], option.s_vertices[i + 1]);
						
						option.obj.vertices[i] = xy[0];
						option.obj.vertices[i + 1] = xy[1];
						
						
					}
					
					// 更新边界点
					option.obj.limit_4 = getLimit_4(option.obj);
					// 根据边界点更新选中框
					option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
					
					rePaint();
					paintChooseRec(option.obj);
					// 将移动后的终点位置深拷贝给e_vertices
					option.e_vertices = option.obj.vertices.slice(0);
					
					option.obj.vertices = option.s_vertices;
				}
				break;
			case 5:
				console.log("xuanzahuan");
				// 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
				if(option.obj instanceof Polygon) {
					// 起始位置
					option.s_vertices = option.obj.vertices.slice(0);
				}

				// 参考点x & y
				var basex = (option.s_limit_4[0]+option.s_limit_4[1])/2;
				var basey = (option.s_limit_4[2]+option.s_limit_4[3])/2;
				console.log(option.s_limit_4);

				var mosFx = (option.obj.limit_4[0]+option.obj.limit_4[1])/2;
				var mosFy = option.obj.limit_4[2]-20;

				// 当前操作为选中 
				if(option.obj) {
					console.log(option.obj.s_vertices);
					// 将多边形数组的值加上移动的距离
					for(var i = 0; i < option.obj.vertices.length; i += 2) {
						var tangle = getRotateTangle(basex,basey,mosFx,mosFy,px,py);
						var tarPoint = getRotatePoint(basex,basey,option.s_vertices[i],option.s_vertices[i + 1],tangle);	
						option.obj.vertices[i] = tarPoint[0];
						option.obj.vertices[i + 1] = tarPoint[1];
					}
					console.log(option.obj.vertices)	
					
					// 更新边界点
					option.obj.limit_4 = getLimit_4(option.obj);
					// 根据边界点更新选中框
					option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
					
					rePaint();
					paintChooseRec(option.obj);
					// 将移动后的终点位置深拷贝给e_vertices
					option.e_vertices = option.obj.vertices.slice(0);
					
					option.obj.vertices = option.s_vertices;
				}
				break;	
			default:
				console.log("未选中热点。");
		}
	}

    /**
     * @desc 选中并以y轴为标准平移
     * @author kf
     * @date 2019.5.23
     */
    if (option.name == "Ymove" && down_flag) {
        // 计算移动距离
        var py = e.clientY - of_top;
        var dy = py - downPoint[1];

        // 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
        if (option.obj instanceof Polygon) {
            // 起始位置
            option.s_vertices = option.obj.vertices.slice(0);
        }
        // 当前操作为选中 
        if (option.obj) {
            // 将多边形数组的值加上移动的距离
            for (var i = 0; i < option.obj.vertices.length; i += 2) {
                option.obj.vertices[i + 1] += dy;
            }
            rePaint();
            paintChooseRec(option.obj);
            // 将移动后的终点位置深拷贝给e_vertices
            option.e_vertices = option.obj.vertices.slice(0);
            option.obj.vertices = option.s_vertices;
        }
    }

    /**
     * @desc 框选
     * @author kf
     * @date 2019.5.29
     */
    if(option.name == "boxChoose" && down_flag){
        var rec = new Imag_draw(downPoint,[px,py]);
        rePaint();
        rec.draw();
    }

});

