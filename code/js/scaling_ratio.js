//用于多边形缩放的各点比例求解
//参数：缩放点的初始坐标，缩放点的结束坐标，缩放的基本点坐标，缩放对象的某个关键点
//返回：缩放对象的某个关键点缩放后的新坐标

function polygon_scaling_ratio(sx,sy,ex,ey,bx,by,kx,ky){
	
//	console.log(sx,sy,ex,ey,bx,by,kx,ky);
	//缩放后的坐标
	var x = 0;
	var y = 0;
	
	//得到缩放前对象的包裹矩形框的一些基本值
	//长宽
	var sweith = (Math.abs(sx - bx));
	var sheight = (Math.abs(sy - by));
	
	//得到缩放后对象的包裹矩形框的一些基本值
	//长宽
	var eweith = (Math.abs(ex - bx));
	var eheight = (Math.abs(ey - by));
	
	//得到缩放前对象的某个关键点与缩放的基本点构成的矩形框的一些基本值
	//长宽
	var bweith = (Math.abs(bx - kx));
	var bheight = (Math.abs(by - ky));
	
	//得到缩放后对象的某个关键点与缩放的基本点构成的矩形框的一些基本值
	var kweith = (eweith*bweith/sweith);
	var kheight = (eheight*bheight/sheight);
//	console.log(kweith,kheight)
	
	//计算变化量
	//要考虑缩放点的初始坐标与缩放的基本点坐标
	//要考虑缩放方向
	//左上到右下
	if(sx < bx && sy < by){
		if(sx != ex){
			if(ex < bx){
				x = bx - kweith;
			}
			else{
				x = bx;
			}
		}
		else{
			x = kx;
		}
		if(sy != ey){
			if(ey < by){
				y = by - kheight;
			}
			else{
				y = by;
			}
		}
		else{
			y = ky;
		}
	}
	//右上到左下
	else if(bx < sx && sy < by){
		if(ex != sx){
			if(bx < ex){
				x = bx + kweith;
			}
			else{
				x = bx;
			}
		}
		else{
			x = ky;
		}
		if(sy != ey){
			if(ey < by){
				y = by - kheight;
			}
			else{
				y = by;
			}
		}
		else{
			y = ky;
		}
	}
	//右下到左上
	else if(bx < sx && by < sy){
		if(ex != sx){
			if(bx < ex){
				x = bx + kweith;
			}
			else{
				x = bx;
			}
		}
		else{
			x = kx;
		}
		if(ey != sy){
			if(by < ey){
				y = by + kheight;
			}
			else{
				y = by;
			}
		}
		else{
			y = ky;
		}
	}
	//左下到右上
	else if(sx < bx && by < sy){
		if(sx != ex){
			if(ex < bx){
				x = bx - kweith;
			}
			else{
				x = bx;
			}
		}
		else{
			x = kx;
		}
		if(ey != sy){
			if(by < ey){
				y = by + kheight;
			}
			else{
				y = by;
			}
		}
		else{
			y = ky;
		}
	}
	return [x,y];
}
