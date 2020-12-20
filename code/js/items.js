

/**
 * 所有图元对象
 */

/*
直线对象,带线宽
 */
function Line() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    
    this.weight= linenumber.value;//宽度
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if(this.weight==null){
            this.weight=0;
        }
        console.log(this.weight);
        var l=dy/dx;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        if(l>=-1&&l<=1){
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    var tp1 = new Point(parseInt(x + 0.5), parseInt(y + 0.5-(k/2)));
                    var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                    var tp3 = new Point(parseInt(x + 0.5), parseInt(y + 0.5+(k/2)));
                    tp1.draw();
                    tp2.draw();
                    tp3.draw();

                }//画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;

            }
        }
        else{
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    var tp1 = new Point(parseInt(x + 0.5-(k/2)), parseInt(y + 0.5));
                    var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                    var tp3 = new Point(parseInt(x + 0.5+(k/2)), parseInt(y + 0.5));
                    tp1.draw();
                    tp2.draw();
                    tp3.draw();

                }//画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;

            }
        }
    }
}

//
// /*
// 直线对象
//  */
// function Line() {
//     Drawable.apply(this);//继承父类
//     this.spoint = new Point();//起始点
//     this.epoint = new Point();//终止点
//     this.draw = function () {
//         var pax = this.spoint.px;
//         var pay = this.spoint.py;
//         var pbx = this.epoint.px;
//         var pby = this.epoint.py;
//         var dx = pbx - pax;
//         var dy = pby - pay;
//         var x = pax;
//         var y = pay;
//         var eps;
//         if (Math.abs(dx) > Math.abs(dy)) {
//             eps = Math.abs(dx);
//         } else {
//             eps = Math.abs(dy);
//         }
//         var xlincre = dx * 1.0 / eps;
//         var ylincre = dy * 1.0 / eps;
//         for (var i = 0; i <= eps; i++) {
//             var tp = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
//             tp.draw();//画点
//             // if (down_flag == false) {
//             //     this.edgepoints.push(tp);
//             // }
//             x += xlincre;
//             y += ylincre;
//
//         }
//     }
// }

/**
点横线对象
   */
function DianHeng() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.weight= linenumber.value;//宽度
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        var l=dy/dx;
        var linkmark = [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0];//粗线数组
        if(this.weight==null){
            this.weight=0;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        if(l>=-1&&l<=1){
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    if(linkmark[i%25]==1){

                        var tp1 = new Point(parseInt(x + 0.5), parseInt(y + 0.5-(k/2)));
                        var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                        var tp3 = new Point(parseInt(x + 0.5), parseInt(y + 0.5+(k/2)));
                        tp1.draw();
                        tp2.draw();
                        tp3.draw();
                    }
                }
                //画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;


            }
        }
        else{
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    if(linkmark[i%25]==1){

                        var tp1 = new Point(parseInt(x + 0.5-(k/2)), parseInt(y + 0.5));
                        var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                        var tp3 = new Point(parseInt(x + 0.5+(k/2)), parseInt(y + 0.5));
                        tp1.draw();
                        tp2.draw();
                        tp3.draw();
                    }
                }
                //画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;


            }
        }

    }

}




/**
两点横线对象
   */
function Doublepoint() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.weight= linenumber.value;//宽度
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        var l=dy/dx;
        var linkmark = [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0];//粗线数组
        if(this.weight==null){
            this.weight=0;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        if(l>=-1&&l<=1){
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    if(linkmark[i%33]==1){

                        var tp1 = new Point(parseInt(x + 0.5), parseInt(y + 0.5-(k/2)));
                        var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                        var tp3 = new Point(parseInt(x + 0.5), parseInt(y + 0.5+(k/2)));
                        tp1.draw();
                        tp2.draw();
                        tp3.draw();
                    }
                }
                //画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;


            }
        }
        else{
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    if(linkmark[i%33]==1){

                        var tp1 = new Point(parseInt(x + 0.5-(k/2)), parseInt(y + 0.5));
                        var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                        var tp3 = new Point(parseInt(x + 0.5+(k/2)), parseInt(y + 0.5));
                        tp1.draw();
                        tp2.draw();
                        tp3.draw();
                    }
                }
                //画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;


            }
        }

    }

}




/**
长虚线对象
   */
function LongDotted() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.weight= linenumber.value;//宽度
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        var l=dy/dx;
        var linkmark =  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,,0,0,0,0]//粗线数组
        if(this.weight==null){
            this.weight=0;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        if(l>=-1&&l<=1){
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    if(linkmark[i%25]==1){

                        var tp1 = new Point(parseInt(x + 0.5), parseInt(y + 0.5-(k/2)));
                        var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                        var tp3 = new Point(parseInt(x + 0.5), parseInt(y + 0.5+(k/2)));
                        tp1.draw();
                        tp2.draw();
                        tp3.draw();
                    }
                }
                //画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;


            }
        }
        else{
            for (var i = 0; i <= eps; i++) {
                for(var k = 0;k <= this.weight; k++){
                    if(linkmark[i%25]==1){

                        var tp1 = new Point(parseInt(x + 0.5-(k/2)), parseInt(y + 0.5));
                        var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                        var tp3 = new Point(parseInt(x + 0.5+(k/2)), parseInt(y + 0.5));
                        tp1.draw();
                        tp2.draw();
                        tp3.draw();
                    }
                }
                //画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;


            }
        }

    }

}


/*
短虚线对象
   */
function Dotted() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.weight= linenumber.value;//宽度
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        var l=dy/dx;
        var linkmark = [1,1,1,1,1,1,1,1,1,0,0,0];//粗线数组
        if(this.weight==null){
        	this.weight=0;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        if(l>=-1&&l<=1){
        for (var i = 0; i <= eps; i++) {
        	for(var k = 0;k <= this.weight; k++){
        	if(linkmark[i%12]==1){
        	
            var tp1 = new Point(parseInt(x + 0.5), parseInt(y + 0.5-(k/2)));
            var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
            var tp3 = new Point(parseInt(x + 0.5), parseInt(y + 0.5+(k/2)));
            tp1.draw();
            tp2.draw();
            tp3.draw();
           }
        	}//画点
            x += xlincre;
            y += ylincre;
			
        	
        }
        }
        else{
        	for (var i = 0; i <= eps; i++) {
        		for(var k = 0;k <= this.weight; k++){
        		if(linkmark[i%12]==1){
        		
            var tp1 = new Point(parseInt(x + 0.5-(k/2)), parseInt(y + 0.5));
            var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
            var tp3 = new Point(parseInt(x + 0.5+(k/2)), parseInt(y + 0.5));
            tp1.draw();
            tp2.draw();
            tp3.draw();
           }
        		}//画点
            x += xlincre;
            y += ylincre;
			
        	
        }
        }
        
    }

}





/*
点线对象
   */
function Pointline() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.weight= linenumber.value;//宽度
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        var l=dy/dx;
        var linkmark = [1,1,0,0];//粗线数组
        if(this.weight==null){
        	this.weight=0;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        if(l>=-1&&l<=1){
        for (var i = 0; i <= eps; i++) {
        	for(var k = 0;k <= this.weight; k++){
        	if(linkmark[i%4]==1){
        	
            var tp1 = new Point(parseInt(x + 0.5), parseInt(y + 0.5-(k/2)));
            var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
            var tp3 = new Point(parseInt(x + 0.5), parseInt(y + 0.5+(k/2)));
            tp1.draw();
            tp2.draw();
            tp3.draw();
           }
        	}//画点
            x += xlincre;
            y += ylincre;
			
        	
        }
        }
        else{
        	for (var i = 0; i <= eps; i++) {
        		for(var k = 0;k <= this.weight; k++){
        		if(linkmark[i%4]==1){
        		
            var tp1 = new Point(parseInt(x + 0.5-(k/2)), parseInt(y + 0.5));
            var tp2 = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
            var tp3 = new Point(parseInt(x + 0.5+(k/2)), parseInt(y + 0.5));
            tp1.draw();
            tp2.draw();
            tp3.draw();
           }
        		}
            //画点
            // if (down_flag == false) {
            //     this.edgepoints.push(tp);
            // }
            x += xlincre;
            y += ylincre;
			
        	
        }
        }
        
    }

}



/*
折线对象
*/

function Brokenline() {
    Drawable.apply(this);       //继承父类
    this.edges = new Array();
    this.doneFlag = false;

    this.draw = function () {
        for (var j = 0; j < this.vertices.length; j += 2) {
            var pax = this.vertices[j];
            var pay = this.vertices[j + 1];
            var pbx = this.vertices[j + 2];
            var pby = this.vertices[j + 3];
            var dx = pbx - pax;
            var dy = pby - pay;
            var x = pax;
            var y = pay;
            var eps;

            if (Math.abs(dx) > Math.abs(dy)) {
                eps = Math.abs(dx);
            } else {
                eps = Math.abs(dy);
            }
            var xlincre = dx * 1.0 / eps;
            var ylincre = dy * 1.0 / eps;
            for (var i = 0; i <= eps; i++) {
                var tp = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                tp.draw();//画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;
            }
        }
    }
}

/*
多边形对象
*/
function Polygon() {
    Drawable.apply(this);       //继承父类
    this.edges = new Array();
    this.doneFlag = false;

    this.draw = function () {
        for (var j = 0; j < this.vertices.length; j += 2) {
            var pax = this.vertices[j];
            var pay = this.vertices[j + 1];
            var pbx = this.vertices[j + 2];
            var pby = this.vertices[j + 3];
            var dx = pbx - pax;
            var dy = pby - pay;
            var x = pax;
            var y = pay;
            var eps;

            if (Math.abs(dx) > Math.abs(dy)) {
                eps = Math.abs(dx);
            } else {
                eps = Math.abs(dy);
            }
            var xlincre = dx * 1.0 / eps;
            var ylincre = dy * 1.0 / eps;
            for (var i = 0; i <= eps; i++) {
                var tp = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                tp.draw();//画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;
            }
        };
        // console.log(this.vertices);
    }
}

/*曲线*/
function Curve(){
    //基于贝尔塞曲线画法
    //初步实现:根据点来绘制
    Drawable.apply(this);//继承父类
    this.plist = [];//顶点分部集合
    this.doneFlag = false; //结束标志
    //需要限定更新范围10个点为一段
    this.draw = function () {
        var t = this.plist;
        for(var i = 0;i<t.length;i++){
            Curvelist(t[i],t[i].length-1);
        }
//		Curvelist(t,t.length-1);
//	 	var stest = [];
//	 	for(var j = 0;j<this.plist.length;j++){
//	 		stest.push(parseInt(this.plist[j][0]),parseInt(this.plist[j][1]));
//	 	}
//	 	Curvelist(stest,stest.length-1);
//	 	for(var j = 0;j<this.plist.length;j++){
//	 		Curvelist(this.plist[j],this.plist[j].length-1);
//	 	}
//		console.log(this.vertices);
//		Curvelist(this.hlist,this.hlist.length-1);
//		Curvelist(i,j);
    }
}

//n为数组长度-1
//p为2倍点数
function Curvelist(pp,n)
{
    var p = [];
    for(var i = 0;i<=pp.length-1;i++){
        p.push(pp[i]);
    }
    if (n<= 1)
        return null;
    if((p[n-1]<p[0]+1)&&(p[n-1]>p[0]-1)&&(p[n]<p[1]+1)&&(p[n]>p[1]-1))
    {
//		new Point(parseInt(p[0]), parseInt(p[1])).draw();
        ctx.fillRect(parseInt(p[0]), parseInt(p[1]), 1, 1);
        return null;
    }
    p1 = [];
    var i, j;
    p1.push(p[0],p[1]);
    for(i=2; i<=n; i+=2)
    {
        for(j=0; j<=n-i;j+=2)
        {
            p[j] = (p[j] + p[j+2])/2;
            p[j+1] = (p[j+1] + p[j+3])/2;
        }
        p1.push(p[0],p[1]);
    }
    Curvelist(p1,p1.length-1);
    Curvelist(p,p.length-1);
}

/*直角*/
function Rightangle() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        for (var i = 0; i <= eps; i++) {
            new Point(pax, y).draw();//画点
            new Point(x, pby).draw();//画点
            x += xlincre;
            y += ylincre;
        }
    }
}

/*圆角矩形*/
function Roundedrectangle() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        var kx = 10 * (Math.abs(pbx - pax)) / (pbx - pax);
        var ky = 10 * (Math.abs(pby - pay)) / (pby - pay);
        pax -= kx; pbx += kx; pay -= ky; pby += ky;
        Rounde(pax, pay, pbx, pby);
        for (var i = 0; i <= eps; i++) {
            new Point(pax, y).draw();//画点
            new Point(x, pby).draw();//画点
            new Point(pbx, y).draw();//画点
            new Point(x, pay).draw();//画点
            x += xlincre;
            y += ylincre;
        }
    }
}

/*矩形*/
function Rectangle(s , e) {
    Drawable.apply(this);//继承父类
    this.spoint = s || new Point();//起始点
    this.epoint = e || new Point();//终止点
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        for (var i = 0; i <= eps; i++) {
            new Point(pax, y).draw(this.color);//画点
            new Point(x, pby).draw(this.color);//画点
            new Point(pbx, y).draw(this.color);//画点
            new Point(x, pay).draw(this.color);//画点
            x += xlincre;
            y += ylincre;

        }
    }
}
/*正圆弧*/
function Positivearc() {
    this.center = new Point();//圆心
    this.spoint = new Point();//起始点
    this.radius = 0;//半径
    this.draw = function () {
        var cx = this.center.px;//圆心x坐标
        var cy = this.center.py;//圆心y坐标
        var sx = this.spoint.px;
        var sy = this.spoint.py;

        //添加虚线
        xp =new Point()
        xp.px=cx+this.radius;
        xp.py=cy;
        dotted_Line(this.center,xp);
        dotted_Line(this.center,this.spoint);

        var dx =sx-cx;
        var dy =sy-cy;

        console.log(objs.length);
        var da = 1.0 / (this.radius + 1);
        var radin = Math.PI / 4;//1/8弧即1/4pi
        var steps = parseInt(radin / da);
        var x = this.radius * Math.cos(0);
        var y = this.radius * Math.sin(0);
        for (i = 0; i <= steps; i++) {
            if(1/*1234象限*/) {
                if((x>dx)||(!(dx>0&&dy<0))/*或非1象限*/){
                    new Point(x + cx, -y + cy).draw();/*画点1*/}
                if((y>dx)||(!(dx>0&&dy<0))/*或非1象限*/){
                    new Point(y + cx, -x + cy).draw();/*画点2*/}
            }
            if(!(dy<0&&dx>0)/*234象限*/){
                if((-y>dx)||(dy>0)/*或34象限*/){
                    new Point(-y + cx, -x + cy).draw();/*画点3*/}
                if((-x>dx)||(dy>0)/*或34象限*/){
                    new Point(-x + cx, -y + cy).draw();/*画点4*/}
            }
            if(dy>0/*34象限*/){
                if((-x<dx)||(dy>0&&dx>0)/*或4象限*/){
                    new Point(-x + cx, y + cy).draw();/*画点5*/}
                if((-y<dx)||(dy>0&&dx>0)/*或4象限*/) {
                    new Point(-y + cx, x + cy).draw();/*画点6*/}
            }
            if(dy>=0&&dx>=0){
                if(y<dx) {
                    new Point(y + cx, x + cy).draw();/*画点7*/}
                if(x<dx) {
                    new Point(x + cx, y + cy).draw();/*画点8*/}
            }

            x -= y * da;
            y += x * da;
        }
    }
}
/*
椭圆弧
*/
function Elliparc() {
    this.center = new Point();//椭圆心
    this.epoint = new Point();//鼠标点
    this.draw = function () {
        var cx = this.center.px;//椭圆心x坐标
        var cy = this.center.py;//椭圆心y坐标
        var px = this.epoint.px;
        var py = this.epoint.py;

        var X = Math.pow(Math.abs(px - cx), 2);
        var Y = Math.pow(Math.abs(py - cy), 2);

        //直接令x=c
        var B = (Y + Math.sqrt(Math.pow(Y, 2) + 4 * Y * X)) / 2;
        var A = B + X;
        var a = Math.sqrt(A);
        var b = Math.sqrt(B);

        //spoint相对于圆心的坐标
        var dx,dy;
        dx=px - cx;
        dy=py - cy;

        //添加虚线
        var xp =new Point();
        xp.px=cx+a;xp.py=cy;
        dotted_Line(this.center,xp);
        dotted_Line(this.center,this.epoint);

        var x = 0;
        var y = b;
        var d1 = b * b + a * a * (-b + 0.25);
        new Point(cx + x, cy + y).draw();//画点1
        while (b * b * (x + 1) < a * a * (y - 0.25)) {
            if (d1 < 0) {
                d1 += b * b * (2 * x + 3);
                x++;
            }
            else {
                d1 += b * b * (2 * x + 3) + a * a * (-2 * y + 2);
                x++;
                y--;
            }
            Arc(x,y,dx,dy,cx,cy);
        }
        var d2 = Math.sqrt(b * (x + 0.5)) + Math.sqrt(a * (y - 1)) - Math.sqrt(b * a);

        while (y > 0) {
            if (d2 < 0) {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3);
                x++ , y--;
            }
            else {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3) - b * b * (2 * a + 2);
                y--;
            }
            Arc(x,y,dx,dy,cx,cy);
        }
    }
}
/*
任意圆弧
*/
function Arc(x,y,dx,dy,cx,cy){
    if(1/*1234象限*/) {
        if((x>dx)||(!(dx>0&&dy<0))/*或非1象限*/){
            new Point(x + cx, -y + cy).draw();/*画点2*/}
    }
    if(!(dy<0&&dx>0)/*234象限*/){
        if((-x>dx)||(dy>0)/*或34象限*/){
            new Point(-x + cx, -y + cy).draw();/*画点3*/}
    }
    if(dy>0/*34象限*/){
        if((-x<dx)||(dy>0&&dx>0)/*或4象限*/) {
            new Point(-x + cx, y + cy).draw();/*画点6*/}
    }
    if(dy>0&&dx>0){
        if(x<dx) {
            new Point(x + cx, y + cy).draw();/*画点7*/}
    }
}
/*
两点之间画虚线
*/
function dotted_Line(a,b){
    var ax = a.px;
    var bx = b.px;
    var ay = a.py;
    var by = b.py;
    var dx = bx - ax;
    var dy = by - ay;
    var x = ax;
    var y = ay;
    var eps;
    if (Math.abs(dx) > Math.abs(dy)) {
        eps = Math.abs(dx);
    } else {
        eps = Math.abs(dy);
    }
    var xlincre = dx * 1.0 / eps;
    var ylincre = dy * 1.0 / eps;
    for (var i = 0; i <= eps; i++) {
        if(i%5==0){
            new Point(x , y).draw();
        }
        x += xlincre;
        y += ylincre;
    }

}

/*
椭圆
*/
function Ellipse() {
    this.center = new Point();//椭圆心
    this.epoint = new Point();//鼠标点
    this.draw = function () {
        var cx = this.center.px;//椭圆心x坐标
        var cy = this.center.py;//椭圆心y坐标
        var px = this.epoint.px;
        var py = this.epoint.py;

        var X = Math.pow(Math.abs(px - cx), 2);
        var Y = Math.pow(Math.abs(py - cy), 2);


        var B = (Y + Math.sqrt(Math.pow(Y, 2) + 4 * Y * X)) / 2;
        var A = B + X;
        var a = Math.sqrt(A);
        var b = Math.sqrt(B);
        this.Rmin = b;
        this.Rmax = a;


        var x = 0;
        var y = b;
        var d1 = b * b + a * a * (-b + 0.25);
        new Point(cx + x, cy + y).draw();//画点1
        while (b * b * (x + 1) < a * a * (y - 0.25)) {
            if (d1 < 0) {
                d1 += b * b * (2 * x + 3);
                x++;
            }
            else {
                d1 += b * b * (2 * x + 3) + a * a * (-2 * y + 2);
                x++;
                y--;
            }
            new Point(x + cx, y + cy).draw();//画点1
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, y + cy).draw();//画点3
            new Point(-x + cx, -y + cy).draw();//画点4
        }
        var d2 = Math.sqrt(b * (x + 0.5)) + Math.sqrt(a * (y - 1)) - Math.sqrt(b * a);

        while (y > 0) {
            if (d2 < 0) {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3);
                x++ , y--;
            }
            else {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3) - b * b * (2 * a + 2);
                y--;
            }
            new Point(x + cx, y + cy).draw();//画点1
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, y + cy).draw();//画点3
            new Point(-x + cx, -y + cy).draw();//画点4
        }
    }
}

/*
圆对象
 */
function Circle() {
    this.center = new Point();//圆心
    this.radius = 0;//半径
    this.draw = function () {
        var cx = this.center.px;//圆心x坐标
        var cy = this.center.py;//圆心y坐标

        var da = 1.0 / (this.radius + 1);
        var radin = Math.PI / 4;//1/8弧即1/4pi
        var steps = parseInt(radin / da);
        var x = this.radius * Math.cos(0);
        var y = this.radius * Math.sin(0);
        for (var i = 0; i <= steps; i++) {
            new Point(x + cx, y + cy).draw();//画点1
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, y + cy).draw();//画点3
            new Point(-x + cx, -y + cy).draw();//画点4
            new Point(y + cx, x + cy).draw();//画点5
            new Point(-y + cx, x + cy).draw();//画点6
            new Point(y + cx, -x + cy).draw();//画点7
            new Point(-y + cx, -x + cy).draw();//画点8
            x -= y * da;
            y += x * da;
        }
    }
}

/*
求两个点直接的欧式距离
 */
function odistance(p1, p2) {
    var dx = Math.pow(Math.abs(p1.px - p2.px), 2);
    var dy = Math.pow(Math.abs(p1.py - p2.py), 2);
    return Math.sqrt(dx + dy);
}

/*
求椭圆的长短轴
*/
function Ellipse_ab(p1, p2) {
    var X = Math.pow(Math.abs(p1.px - p2.px), 2);
    var Y = Math.pow(Math.abs(p1.py - p2.py), 2);
    //a>b
    var B = (Y + Math.sqrt(Math.pow(Y) + 4 * Y * X)) / 2;
    var A = B + X;
    var a0 = Math.sqrt(A);
    var b0 = Math.sqrt(B);
    return a0, b0;
}

/*圆角*/
function Rounde(ax, ay, bx, by) {
    this.radius = 10;//半径   ----》此处可更改圆角大小
    var cx = (ax + bx) / 2;//圆心x坐标
    var cy = (ay + by) / 2;//圆心y坐标

    var da = 1.0 / (10);
    var radin = Math.PI / 4;//1/8弧即1/4pi
    var steps = parseInt(radin / da);
    var x = this.radius * Math.cos(0);
    var y = this.radius * Math.sin(0);
    var dx = Math.abs(bx - ax) / 2 - 10;
    var dy = Math.abs(by - ay) / 2 - 10;

    cx += dx; cy += dy;
    for (var i = 0; i <= 10; i++) {
        new Point(x + cx, y + cy).draw();//画点1
        new Point(y + cx, x + cy).draw();//画点5
        x -= y * da;
        y += x * da;
    }

    cx = (ax + bx) / 2; cy = (ay + by) / 2;
    x = this.radius * Math.cos(0); y = this.radius * Math.sin(0);
    cx += dx; cy -= dy;
    for (var i = 0; i <= 10; i++) {
        new Point(x + cx, -y + cy).draw();//画点2
        new Point(y + cx, -x + cy).draw();//画点7
        x -= y * da;
        y += x * da;
    }

    cx = (ax + bx) / 2; cy = (ay + by) / 2;
    x = this.radius * Math.cos(0); y = this.radius * Math.sin(0);
    cx -= dx; cy += dy;
    for (var i = 0; i <= 10; i++) {
        new Point(-x + cx, y + cy).draw();//画点3
        new Point(-y + cx, x + cy).draw();//画点6
        x -= y * da;
        y += x * da;
    }

    cx = (ax + bx) / 2; cy = (ay + by) / 2;
    x = this.radius * Math.cos(0); y = this.radius * Math.sin(0);
    cx -= dx; cy -= dy;
    for (var i = 0; i <= 10; i++) {
        new Point(-x + cx, -y + cy).draw();//画点4
        new Point(-y + cx, -x + cy).draw();//画点8
        x -= y * da;
        y += x * da;
    }

}
//虚线矩形
function Imag_draw(s,e){
    Drawable.apply(this);//继承父类
    this.spoint = s;//起始点
    this.epoint = e;//终止点
    this.draw = function () {
        var pax = this.spoint[0];
        var pay = this.spoint[1];
        var pbx = this.epoint[0];
        var pby = this.epoint[1];
//      console.log(pax,pay);
        var dx = parseInt(Math.abs(pax-pbx));
        var dy = parseInt(Math.abs(pay-pby));
        if(pax<=pbx){
            var x = pax;
        }
        else{
            var x = pbx;
        }
        if(pay<=pby){
            var y = pay;
        }
        else{
            var y =pby;
        }
        for(var i = 0;i<=dx;i++){
            if(i%4 == 1||i%4 == 2||i%4 == 3){
                new Point(x+i,pay).draw();
                new Point(x+i,pby).draw();
            }
        }
        for(var j = 0;j<=dy;j++ ){
            if(j%4 == 1||j%4 == 2||j%4 == 3){
                new Point(pax,y+j).draw();
                new Point(pbx,y+j).draw();
            }
        }
    }
}