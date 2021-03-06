//这里面时判断点是不是在该图形里面，包含边框

//有一个问题（基于柯峰的做法）
//判别子对象的选中


//设置一个全局变量：用来判断点是不是在曲线上
var inlink = false;

//判断多边形
//求角度公式(这种方法是判断不了凹多边形的）
//射线方法（计算焦点个数）
function Polygonpitch(sx, sy, obj) {
	//初始化焦点个数
	var xp = 0;
	//取y=sy的射线,向x轴增大的方向发出
	//遍历所有的连线
	for (var i = 2; i < obj.vertices.length - 2; i = i + 2) {
		//两个相邻的点
		var x1 = obj.vertices[i];
		var y1 = obj.vertices[i + 1];
		var x2 = obj.vertices[i + 2];
		var y2 = obj.vertices[i + 3];
		//首先判断这两点在不在y=sy的范围内
		if (y1 <= sy && sy <= y2 || y2 <= sy && sy <= y1) {
			//再由两点式判断是否在直线上
			var tx = (sy - y2) / (y1 - y2) * (x1 - x2) + x2;
			//如果tx>=sx,证明焦点有效
			if (tx >= sx) {
				xp++;
			}
		}
	}
	if (xp % 2 == 1) {
		console.log("找到多边形");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}

//判断直线
//求直线方程表达式
function StraightLinepitch(sx, sy, obj) {
	//开始点
	var x1 = obj.spoint.px;
	var y1 = obj.spoint.py;
	//结束点
	var x2 = obj.epoint.px;
	var y2 = obj.epoint.py;
	//根据直线方程求解
	var stest = (y2 - y1) / (x2 - x1) * (sx - x1) - (sy - y1);

	if (Math.abs(stest) < 5) {
		console.log("找到直线");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}


//判别直角
function Rightanglepitch(sx, sy, obj) {
	//开始点
	var x1 = obj.spoint.px;
	var y1 = obj.spoint.py;
	//结束点
	var x2 = obj.epoint.px;
	var y2 = obj.epoint.py;
	//判断是否找到
	var stest = false;
	//根据直线范围判断
	if (sx <= (x1 + 3) && (x1 - 3) <= sx && y1 <= sy && sy <= y2) {
		stest = true;
	}
	else if (sx <= (x1 + 3) && (x1 - 3) <= sx && y2 <= sy && sy <= y1) {
		stest = true;
	}
	else if (sy <= (y2 + 3) && (y2 - 3) <= sy && x1 <= sx && sx <= x2) {
		stest = true;
	}
	else if (sy <= (y2 + 3) && (y2 - 3) <= sy && x2 <= sx && sx <= x1) {
		stest = true;
	}

	if (stest) {
		console.log("找到直角");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}


//判断圆形
//求圆心距离
function Circlepitch(sx, sy, obj) {
	//圆心
	var rx = obj.center.px;
	var ry = obj.center.py;
	//半径
	var r = obj.radius;
	//根据圆心的距离求解
	var stest = Math.sqrt((rx - sx) * (rx - sx) + (ry - sy) * (ry - sy));

	if (Math.abs(stest) < r + 1) {
		console.log("找到圆形");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}


//判断椭圆（要考虑旋转）
//求判别式
function Ellipsepitch(sx, sy, obj) {
	//椭圆圆心
	var rx = obj.center.px;
	var ry = obj.center.py;
	//鼠标点
	var x = obj.epoint.px;
	var y = obj.epoint.py;

	var X = Math.pow(Math.abs(x - rx), 2);
	var Y = Math.pow(Math.abs(y - ry), 2);


	var B = (Y + Math.sqrt(Math.pow(Y, 2) + 4 * Y * X)) / 2;
	var A = B + X;


	//椭圆长轴
	var a = Math.sqrt(A);
	//椭圆短轴
	var b = Math.sqrt(B);

	//	console.log(a);
	//  console.log(b);

	//根据椭圆判别式
	var stest = (sx - rx) * (sx - rx) / (a * a) + (sy - ry) * (sy - ry) / (b * b);

	if (stest < 1) {
		console.log("找到椭圆");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}


//判别矩形（要考虑旋转）
//射线法（与多边形类似）
function Rectanglepitch(sx, sy, obj) {
	//初始化焦点个数
	var xp = 0;
	//建立个数组，按顺序放入点
	var rlist = [];
	//起始点
	var x1 = obj.spoint.px;
	var y1 = obj.spoint.py;
	//终止点
	var x2 = obj.epoint.px;
	var y2 = obj.epoint.py;
	//其他两个点
	var x3 = x1;
	var y3 = y2;

	var x4 = x2;
	var y4 = y1;
	rlist.push(x1, y1, x3, y3, x2, y2, x4, y4, x1, y1);

	//遍历所有的连线
	for (var i = 0; i < rlist.length; i = i + 2) {
		//两个相邻的点
		var x1 = rlist[i];
		var y1 = rlist[i + 1];
		var x2 = rlist[i + 2];
		var y2 = rlist[i + 3];
		//首先判断这两点在不在y=sy的范围内
		if (y1 <= sy && sy <= y2 || y2 <= sy && sy <= y1) {
			//再由两点式判断是否在直线上
			var tx = (sy - y2) / (y1 - y2) * (x1 - x2) + x2;
			//如果tx>=sx,证明焦点有效
			if (tx >= sx) {
				xp++;
			}
		}
	}
	if (xp % 2 == 1) {
		console.log("找到矩形");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}


//判别圆角矩形
//射线法(与矩形一样)
function Roundedrectanglepitch(sx, sy, obj) {
	//初始化焦点个数
	var xp = 0;
	//建立个数组，按顺序放入点
	var rlist = [];
	//起始点
	var x1 = obj.spoint.px;
	var y1 = obj.spoint.py;
	//终止点
	var x2 = obj.epoint.px;
	var y2 = obj.epoint.py;
	//其他两个点
	var x3 = x1;
	var y3 = y2;

	var x4 = x2;
	var y4 = y1;
	//这里增加一个判断是否加10
	if (x1 < x2) {
		x1 = x1 - 10;
		x3 = x3 - 10;
		x2 = x2 + 10;
		x4 = x4 + 10;
	}
	else {
		x2 = x2 - 10;
		x4 = x4 - 10;
		x1 = x1 + 10;
		x3 = x3 + 10;
	}
	if (y1 < y2) {
		y1 = y1 - 10;
		y4 = y4 - 10;
		y2 = y2 + 10;
		y3 = y3 + 10;
	}
	else {
		y2 = y2 - 10;
		y3 = y3 - 10;
		y1 = y1 + 10;
		y4 = y4 + 10;
	}

	rlist.push(x1, y1, x3, y3, x2, y2, x4, y4, x1, y1);

	//遍历所有的连线
	for (var i = 0; i < rlist.length; i = i + 2) {
		//两个相邻的点
		var x1 = rlist[i];
		var y1 = rlist[i + 1];
		var x2 = rlist[i + 2];
		var y2 = rlist[i + 3];
		//首先判断这两点在不在y=sy的范围内
		if (y1 <= sy && sy <= y2 || y2 <= sy && sy <= y1) {
			//再由两点式判断是否在直线上
			var tx = (sy - y2) / (y1 - y2) * (x1 - x2) + x2;
			//如果tx>=sx,证明焦点有效
			if (tx >= sx) {
				xp++;
			}
		}
	}
	if (xp % 2 == 1) {
		console.log("找到矩形");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}


//判别曲线
function Curvepitch(sx, sy, obj) {
	//初始全局变量
	inlink = false;
	//思路是将这个点带入
	//在求点的过程中有一个点与这个点的距离小于一就认为选中了
	var pointlist = obj.plist;
	//进行画点模拟
	var t = pointlist;
	for (var i = 0; i < t.length; i++) {
		testCurvelist(t[i], t[i].length - 1, sx, sy);
	}
	if (inlink) {
		console.log("找到曲线");
		//对象obj
		return (obj);
	}
	else {
		return null;
	}
}


//判别椭圆弧
function Elliparcpitch(sx, sy, obj) {
	return null;
}


//判别折线
function Brokenlinepitch(sx, sy, obj) {

	return null;
}


//判别圆弧
function Positivearcpitch(sx, sy, obj) {
	return null;
}


//曲线的判别函数
function testCurvelist(pp, n, sx, sy) {
	var p = [];
	for (var i = 0; i <= pp.length - 1; i++) {
		p.push(pp[i]);
	}
	if (n <= 1)
		return null;
	if ((p[n - 1] < p[0] + 1) && (p[n - 1] > p[0] - 1) && (p[n] < p[1] + 1) && (p[n] > p[1] - 1)) {
		//      ctx.fillRect(parseInt(p[0]), parseInt(p[1]), 1, 1);
		//这里测试是否相对距离距离差一
		if (Math.abs(p[0] - sx) <= 2 && Math.abs(p[1] - sy) <= 2) {
			inlink = true;
		}
		return null;
	}
	p1 = [];
	var i, j;
	p1.push(p[0], p[1]);
	for (i = 2; i <= n; i += 2) {
		for (j = 0; j <= n - i; j += 2) {
			p[j] = (p[j] + p[j + 2]) / 2;
			p[j + 1] = (p[j + 1] + p[j + 3]) / 2;
		}
		p1.push(p[0], p[1]);
	}
	testCurvelist(p1, p1.length - 1, sx, sy);
	testCurvelist(p, p.length - 1, sx, sy);
}

function image_pitch(cspoint, cepoint) {
	console.log(cspoint,cepoint);
	var image_objs = [];
	//确定框选的范围
	if (cspoint[0] <= cepoint[0]) {
		var xmin = cspoint[0];
		var xmax = cepoint[0];
	}
	else {
		var xmin = cepoint[0];
		var xmax = cspoint[0]
	}
	if (cspoint[1] <= cepoint[1]) {
		var ymin = cspoint[1];
		var ymax = cepoint[1];
	}
	else {
		var ymin = cepoint[1];
		var ymax = cspoint[1];
	}
	//进行遍历判断
	var i = 0;
	while (i < objs.length) {
		//判断是否有子对象

		var typeOfObj = objs[i].__proto__.constructor.name;
		switch (typeOfObj) {
			case "Polygon":
				//遍历多边形所有的点
				var stest = true;
				for (var j = 0; j < objs[i].vertices.length - 2; j = j + 2) {
					var x = objs[i].vertices[j];
					var y = objs[i].vertices[j + 1];
					if (x < xmin || x > xmax || y < ymin || y > ymax) {
						stest = false;
					}
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中了多边形");
				}
				break;
			case "Line":
				//直线比较两个点
				var stest = true;
				var x1 = objs[i].spoint.px;
				var y1 = objs[i].spoint.py;
				var x2 = objs[i].epoint.px;
				var y2 = objs[i].epoint.py;
				if (x1 < xmin || x1 > xmax || y1 < ymin || y1 > ymax ||
					x2 < xmin || x2 > xmax || y2 < ymin || y2 > ymax) {
					stest = false;
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中了直线");
				}
				break;
			case "Brokenline":
				break;
			case "Rightangle":
				//直角判断三个点
				var stest = true;
				var x1 = objs[i].spoint.px;
				var y1 = objs[i].spoint.py;
				var x2 = objs[i].epoint.px;
				var y2 = objs[i].epoint.py;
				var x3 = objs[i].spoint.px;
				var y3 = objs[i].epoint.py;
				if (x1 < xmin || x1 > xmax || y1 < ymin || y1 > ymax ||
					x2 < xmin || x2 > xmax || y2 < ymin || y2 > ymax ||
					x3 < xmin || x3 > xmax || y3 < ymin || y3 > ymax) {
					stest = false;
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中了直角");
				}
				break;
			case "Circle":
				//判断圆心到四条边的距离
				var stest = false;
				var x = objs[i].center.px;
				var y = objs[i].center.py;
				var r = objs[i].radius;
				var dup = odistance_4(x, y, x, ymin);
				var ddown = odistance_4(x, y, x, ymax);
				var dleft = odistance_4(x, y, xmin, y);
				var dright = odistance_4(x, y, xmax, y);
				if (dup >= r && ddown >= r && dleft >= r && dright >= r &&
					x > xmin && x < xmax && y > ymin && y < ymax) {
					stest = true;
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中了圆形");
				}
				break;
			case "Curve":
				//曲线遍历所有点
				var stest = true;
				var pointlist = objs[i].plist;
				console.log(pointlist);
				for (var k = 0; k < pointlist.length; k++) {
					for (var j = 0; j < pointlist[k].length; j = j + 2) {
						var x = pointlist[k][j];
						var y = pointlist[k][j + 1];
						if (x < xmin || x > xmax || y < ymin || y > ymax) {
							stest = false;
						}
					}
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中了曲线");
				}
				break;
			case "Ellipse":
				//只判断四个点
				var stest = true;
				var x = objs[i].center.px;
				var y = objs[i].center.py;
				var rx = objs[i].epoint.px;
				var ry = objs[i].epoint.py;
				var X = Math.pow(Math.abs(x - rx), 2);
				var Y = Math.pow(Math.abs(y - ry), 2);


				var B = (Y + Math.sqrt(Math.pow(Y, 2) + 4 * Y * X)) / 2;
				var A = B + X;
				var a = Math.sqrt(A);
				var b = Math.sqrt(B);
				var x1 = x + a;
				var y1 = y;
				var x2 = x - a;
				var y2 = y;
				var x3 = x;
				var y3 = y + b;
				var x4 = x;
				var y4 = y - b;
				if (x1 < xmin || x1 > xmax || y1 < ymin || y1 > ymax ||
					x2 < xmin || x2 > xmax || y2 < ymin || y2 > ymax ||
					x3 < xmin || x3 > xmax || y3 < ymin || y3 > ymax ||
					x4 < xmin || x4 > xmax || y4 < ymin || y4 > ymax) {
					stest = false;
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中了椭圆");
				}
				break;
			case "Elliparc":
				break;
			case "Rectangle":
				//矩形判断四个点
				var stest = true;
				var x1 = objs[i].spoint.px;
				var y1 = objs[i].spoint.py;
				var x2 = objs[i].epoint.px;
				var y2 = objs[i].epoint.py;
				var x3 = objs[i].spoint.px;
				var y3 = objs[i].epoint.py;
				var x4 = objs[i].epoint.px;
				var y4 = objs[i].spoint.py;
				if (x1 < xmin || x1 > xmax || y1 < ymin || y1 > ymax ||
					x2 < xmin || x2 > xmax || y2 < ymin || y2 > ymax ||
					x3 < xmin || x3 > xmax || y3 < ymin || y3 > ymax ||
					x4 < xmin || x4 > xmax || y4 < ymin || y4 > ymax) {
					stest = false;
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中了矩形");
				}
				break;
			case "Roundedrectangle":
				//矩形判断四个点
				var stest = true;
				var x1 = objs[i].spoint.px;
				var y1 = objs[i].spoint.py;
				var x2 = objs[i].epoint.px;
				var y2 = objs[i].epoint.py;
				var x3 = objs[i].spoint.px;
				var y3 = objs[i].epoint.py;
				var x4 = objs[i].epoint.px;
				var y4 = objs[i].spoint.py;
				if (x1 < x2) {
					x1 = x1 - 10;
					x2 = x2 + 10;
				}
				else {
					x1 = x1 + 10;
					x2 = x2 - 10;
				}
				if (y1 < y2) {
					y1 = y1 - 10;
					y2 = y2 + 10;
				}
				else {
					y1 = y1 + 10;
					y2 = y1 - 10;
				}
				if (x1 < xmin || x1 > xmax || y1 < ymin || y1 > ymax ||
					x2 < xmin || x2 > xmax || y2 < ymin || y2 > ymax ||
					x3 < xmin || x3 > xmax || y3 < ymin || y3 > ymax ||
					x4 < xmin || x4 > xmax || y4 < ymin || y4 > ymax) {
					stest = false;
				}
				if (stest) {
					objs[i].limit_4 = getLimit_4(objs[i]);
					objs[i].chooseRectangle = getChooseRec(objs[i].limit_4);
					image_objs.push(objs[i]);
					console.log("选中圆角了矩形");
				}
				break;
			case "Positivearc":
				break;
		}
		i++;
	}
	console.log(image_objs);
	return image_objs || 123;
}

//计算两点距离
function odistance_4(x1, y1, x2, y2) {
	var dx = Math.pow(Math.abs(x1 - x2), 2);
	var dy = Math.pow(Math.abs(y1 - y2), 2);
	return Math.sqrt(dx + dy);
}

//保留方法
////椭圆需要确定两焦点
////计算四条边到这两焦点的距离之合
//var stest = true;
//var xy = "x";
//var x = objs[i].center.px;
//var y = objs[i].center.py;
//var rx = objs[i].epoint.px;
//var ry = objs[i].epoint.py;
//var a = odistance_4(x,y,rx,y);
//var b = odistance_4(x,y,x,ry);
//if(a<b){
//	var temp = a;
//	a = b;
//	b = temp;
//	xy = "y";
//}
////求焦点
//var c = Math.sqrt(Math.pow(a,2)-Math.pow(b,2));
//if(xy == "x"){
//	var rcx1 = x - c;
//	var rcy1 = y;
//	var rcx2 = x + c;
//	var rcy2 = y;
//}
//else if(xy = "y"){
//	var rcx1 = x;
//	var rcy1 = y - c;
//	var rcx2 = x;
//	var rcy2 = y + c;
//}
////计算距离


//保留方法，夹角判断（无法判断凹多边形）
////遍历所有的坐标
////两个两个计算，要记得加起始点
////计算和
//var stest = 0;
//for(var i =0;i<obj.vertices.length-2;i+=2){
//	//两个相邻的点
//	var x1 = obj.vertices[i];
//	var y1 = obj.vertices[i+1];
//	var x2 = obj.vertices[i+2];
//	var y2 = obj.vertices[i+3];
//	//计算第一个点距离
//	var d1 = Math.sqrt((x1-sx)*(x1-sx)+(y1-sy)*(y1-sy));
//	//计算第二个点距离
//	var d2 = Math.sqrt((x2-sx)*(x2-sx)+(y2-sy)*(y2-sy));
//	//计算两个点的距离
//	var d3 = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
//	//求夹角cos
//	var cos = (d1*d1+d2*d2-d3*d3)/(2*d1*d2);
//	//求角度
//	var jc = Math.acos(cos);
//	console.log(jc);
//	stest += jc;
//}
//console.log("和为:"+stest);
//if(Math.abs(stest-3.14159*2) < 0.5 ){
//	console.log("找到多边形");
//	//对象obj
//	return(obj);
//}




/**
 * @desc 对选中的图元描绘选中框
 * @param {obj: 选中图元对象}
 * @return null
 * @author kf
 */
function paintChooseRec(obj) {


	obj.chooseRectangle.draw();
	var optionObj = option.obj;
	var limit_4 = optionObj.limit_4;
	if (optionObj && optionObj.limit_4.length >= 4) {
		// obj.chooseRectangle.draw();
		// 描绘矩形四个热点
		cornerCircle(limit_4[0], limit_4[2], 5);
		cornerCircle(limit_4[1], limit_4[2], 5);
		cornerCircle(limit_4[0], limit_4[3], 5);
		cornerCircle(limit_4[1], limit_4[3], 5);
		cornerCircle((limit_4[0] + limit_4[1]) / 2, limit_4[2] - 20, 5);
	}
}

/**
 * @desc 对框选选的图元描绘选中框
 * @param {objs: 选中图元对象列表}
 * @return null
 * @author kf
 */

function paintChooseRecs(objs){
	for (var i = 0; i < objs.length; i++) {
		// console.log(objs[i]);
		objs[i].chooseRectangle.draw();
		var limit_4 = objs[i].limit_4;
		cornerCircle(limit_4[0], limit_4[2], 5);
		cornerCircle(limit_4[1], limit_4[2], 5);
		cornerCircle(limit_4[0], limit_4[3], 5);
		cornerCircle(limit_4[1], limit_4[3], 5);
		cornerCircle((limit_4[0] + limit_4[1]) / 2, limit_4[2] - 20, 5);
	}
} 


/**
 * @desc 判断鼠标当前位置是否位于热点内
 * @param e
 * @return boolean
 * @author kf
 * @date 2019.5.23
 */
function isHotDot(e) {
	//当前操作对象
	// console.log(option.obj.limit_4);
	// 鼠标相对位置
	var cx = e.clientX - of_left;
	var cy = e.clientY - of_top;
	if (option.obj && option.obj.limit_4) {
		const limit_4 = option.obj.limit_4;

		// 返回热点位置，顺时针方向1234
		if (hotdot(limit_4[0], limit_4[2])) {
			return 1;
		} else if (hotdot(limit_4[1], limit_4[2])) {
			return 2;
		} else if (hotdot(limit_4[1], limit_4[3])) {
			return 3;
		} else if (hotdot(limit_4[0], limit_4[3])) {
			return 4;
		} else if (hotdot((limit_4[0] + limit_4[1]) / 2, limit_4[2] - 20)) {
			return 5;
		} else {
			return false;
		}
	}

	function hotdot(x, y) {
		if (Math.abs(x - cx) < 5 && Math.abs(y - cy) < 5) {
			return true;
		}
	}
}

/**
 * @desc 设置热点选中鼠标样式
 * @param style
 * @return none
 * @author kf
 * @date 2019.5.24
 */
function setCursorStyle(style) {
	document.getElementById('cavans').style.cursor = style;
}
