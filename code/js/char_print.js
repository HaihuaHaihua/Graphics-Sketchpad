// var of_left = of_p.left;------X
// var of_top = of_p.top;------Y
// const point_zxs = new Point(of_left);
//每个字的边界大小
const edgepixel = 10;

/**
 * 字符打印函数
 */
function char_print(name , sx, sy) {
    var sx = arguments[1] || of_left + 200;
    var sy = arguments[1] || of_top + 200;
    switch (name) {
        //张兴盛
        case "zxs":
            zxs_print(sx , sy);
            break;
         //沈昕
        case "sx":

            break;
         //蔡聪
        case "cc":

            break;
         //刘子恒
        case "lzh":

            break;
         //王海华
        case "whh":

            break;
         //柯峰
        case "kf":

            break;

         //张名扬
        case "zmy":

            break;
        //潘晓盟
        case "pxm":

            break;
    }
}

/**
 * 绘制”张兴盛“
 * @param sx 起始点x坐标
 * @param sy 起始点y坐标
 */
function zxs_print(sx ,sy) {

    //绘制"张"字
    //  1---2    9   15
    //      |    |  /
    //  4---3    |/
    //  |    12--14--------13
    //  5---6    |  \
    //    8 |    | 11 \
    //      7   10     \ 16
    //绘制"弓"
    console.log('sx'+sx);
    console.log('sy'+sy);
    var edgelength = 50;
    var p1 = new Point(sx + edgepixel,sy + edgepixel);
    var p2 = new Point(p1.px + edgelength , p1.py);
    var p3 = new Point(p2.px , p2.py + edgelength);
    var p4 = new Point(p3.px - edgelength , p3.py);
    var p5 = new Point(p4.px , p4.py + edgelength);
    var p6 = new Point(p5.px + edgelength , p5.py);
    var p7 = new Point(p6.px, p6.py + edgelength);
    var p8 = new Point(p7.px - edgelength / 2 , p7.py );
    // console.log('p3x:'+p3.px);
    // console.log('p3y:'+p3.py);
    // console.log('p2x:'+p2.px);
    // console.log('p2y:'+p2.py);
    var L1 = new Line(); L1.spoint = p1 ; L1.epoint = p2 ;//L1.draw();
    var L2 = new Line(); L2.spoint = p2 ; L2.epoint = p3 ;//L2.draw();
    var L3 = new Line(); L3.spoint = p3 ; L3.epoint = p4 ;//L3.draw();
    var L4 = new Line(); L4.spoint = p4 ; L4.epoint = p5 ;//L4.draw();
    var L5 = new Line(); L5.spoint = p5 ; L5.epoint = p6 ;//L5.draw();
    var L6 = new Line(); L6.spoint = p6 ; L6.epoint = p7 ;//L6.draw();
    var L7 = new Line(); L7.spoint = p7 ; L7.epoint = p8 ;//L7.draw();

    //绘制"长"
    //绘制"张"字
    //  1---2    9   15
    //      |    |  /
    //  4---3    |/
    //  |    12--14--------13
    //  5---6    |  \
    //    8 |    | 11 \
    //      7   10     \ 16
    //
    var internel = 10;
    var extra = 10;
    var p9 = new Point(p2.px + internel , p2.py);
    var p10 = new Point(p9.px , p7.py);
    var p11 = new Point(p10.px + edgelength / 2, p10.py - edgelength / 2);
    var p12 = new Point(p2.px  - extra, p4.py + edgelength / 2);
    var p14 = new Point(p9.px  , p12.py);
    var p13 = new Point(p14.px+edgelength+extra , p14.py);
    var p15 = new Point(p13.px , p9.py);
    var p16 = new Point(p15.px , p10.py);
    var L8 = new Line();L8.spoint = p12;L8.epoint = p13;//L8.draw();//12 -----13
    var L9 = new Line();L9.spoint = p9 ; L9.epoint = p10;// 9-------10
    var L10 = new Line();L10.spoint = p10;L10.epoint = p11;//10------11
    var L11 = new Line();L11.spoint = p14;L11.epoint = p15;
    var L12 = new Line();L12.spoint = p14;L12.epoint = p16;
    console.log('p12x:'+p12.px);
    console.log('p12y:'+p12.py);
    console.log('p13x:'+p13.px);
    console.log('p13y:'+p13.py);
    //绘制
    L1.draw();L2.draw();L3.draw();
    L4.draw();L5.draw();L6.draw();
    L7.draw();
    L8.draw();L9.draw();
    L10.draw();L11.draw();L12.draw();


}