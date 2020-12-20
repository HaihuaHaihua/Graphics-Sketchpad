//上对齐操作
$("#align1").click(function(event) {
console.log("上对齐");
align("top");


//上对齐函数执行



});

//下对齐操作
$("#align2").click(function(event) {
console.log("下对齐");


//下对齐函数执行

align('bottom');

});




//左对齐操作
$("#align3").click(function(event) {
console.log("左对齐");

align('left');
//左对齐函数执行



});




//右对齐操作
$("#align4").click(function(event) {
console.log("右对齐");
//wenzi('zxs');
//更改背景颜色


//右对齐函数执行

align('right');

});


//左右分散对齐
$("#align5").click(function(event) {
console.log("左右分散对齐");



//左右分散对齐函数执行

align('center');

});




//上下分散对齐
$("#align6").click(function(event) {
console.log("上下分散对齐");


//上下分散对齐函数执行
align('pingfen');


});



function align(direction) {
    var xuayaoyidongzuo=option.objs[0].limit_4[0]>option.objs[1].limit_4[0]?option.objs[0]:option.objs[1];
    var xuayaoyidongyou=option.objs[0].limit_4[1]>option.objs[1].limit_4[1]?option.objs[1]:option.objs[0];
    var xuayaoyidongshang=option.objs[0].limit_4[2]>option.objs[1].limit_4[2]?option.objs[0]:option.objs[1];
    var xuayaoyidongxia=option.objs[0].limit_4[3]>option.objs[1].limit_4[3]?option.objs[1]:option.objs[0];
    var zuizuo=option.objs[0].limit_4[0]>option.objs[1].limit_4[0]?option.objs[1].limit_4[0]:option.objs[0].limit_4[0];
    var zuiyou=option.objs[0].limit_4[1]>option.objs[1].limit_4[1]?option.objs[0].limit_4[1]:option.objs[1].limit_4[1];
    var zuishang=option.objs[0].limit_4[2]>option.objs[1].limit_4[2]?option.objs[1].limit_4[2]:option.objs[0].limit_4[2];
    var zuixia=option.objs[0].limit_4[3]>option.objs[1].limit_4[3]?option.objs[0].limit_4[3]:option.objs[1].limit_4[3];
    var zuocha=Math.abs(option.objs[0].limit_4[0]-option.objs[1].limit_4[0]);
    var youcha=Math.abs(option.objs[0].limit_4[1]-option.objs[1].limit_4[1]);
    var shangcha=Math.abs(option.objs[0].limit_4[2]-option.objs[1].limit_4[2]);
    var xiacha=Math.abs(option.objs[0].limit_4[3]-option.objs[1].limit_4[3]);
    switch (direction) {
        case 'top':
            if(option.objs[0] instanceof Circle)
                xuayaoyidongshang.center.py=xuayaoyidongshang.center.py-shangcha;
            rePaint();
            break;
        case 'bottom':
            if(option.objs[0] instanceof Circle)
                xuayaoyidongxia.center.py=xuayaoyidongxia.center.py+xiacha;
            rePaint();
            break;
        case 'left':
            if(option.objs[0] instanceof Circle)

                xuayaoyidongzuo.center.px=xuayaoyidongzuo.center.px-zuocha;
            rePaint();
            break;
        case 'right':
            if(option.objs[0] instanceof Circle)
                xuayaoyidongyou.center.px=xuayaoyidongyou.center.px+youcha;
            rePaint();
            break;
        case 'center':
            if(option.objs[0] instanceof Circle)
                var zhongdiancc=Math.abs(zuishang+zuixia)/2.0;
                option.objs[0].center.py=zhongdiancc;
                option.objs[1].center.py=zhongdiancc;
            rePaint();
            break;
        case 'pingfen':
            if(option.objs[0] instanceof Circle)
                var chuzhongdiancc=Math.abs(zuizuo+zuiyou)/2.0;
                option.objs[0].center.px=chuzhongdiancc;
                option.objs[1].center.px=chuzhongdiancc;
            rePaint();
            break;
    }
    
}