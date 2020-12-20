//获取标有标尺和网格的画布
var ctx1 = getCTX("canvas1");
var ctx2 = getCTX("canvas2");
var ctx3 = getCTX("canvas3");


//设置标尺和网格的基本参数

//标准线
AXIS_MARGIN = 0,
//网格标尺的总宽度
AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas.height-AXIS_MARGIN },
//网格和画布对齐
AXIS_TOP   = AXIS_MARGIN,
//网格和画布右对齐
AXIS_RIGHT = canvas.width-AXIS_MARGIN,
//最小刻度
HORIZONTAL_TICK_SPACING = 20,
VERTICAL_TICK_SPACING = 20,
AXIS_WIDTH  = AXIS_RIGHT - AXIS_ORIGIN.x,
AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP,
NUM_VERTICAL_TICKS   = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
NUM_HORIZONTAL_TICKS = AXIS_WIDTH  / HORIZONTAL_TICK_SPACING,
//刻度线的长度
TICK_WIDTH = 10,
TICKS_LINEWIDTH = 2,
TICKS_COLOR = '#ccc',
AXIS_LINEWIDTH = 2,
//刻度线和网格颜色
AXIS_COLOR = '#ccc';


//xy轴
function baseLine1(){
    ctx3.moveTo(540,0);
    ctx3.lineTo(540,540);
    ctx3.moveTo(0,270);
    ctx3.lineTo(1080,270);
    ctx3.lineWidth = 2;
    ctx3.strokeStyle = "black";
    ctx3.stroke();
}

// 标准线

function baseLine(){
//  ctx2.moveTo(540,0);
//  ctx2.lineTo(540,540);
//  ctx2.moveTo(0,270);
//  ctx2.lineTo(1080,270);
//  ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#ccc";
//  ctx2.stroke();
    ctx2.save(); 
    ctx2.lineWidth = 2;
//横向
    drawVerticalAxisTicks1();
//纵向
    drawHorizontalAxisTicks1();
}




//刻度执行函数
function drawAxes() {
    ctx1.save(); 
    ctx1.strokeStyle = AXIS_COLOR;
    ctx1.lineWidth = AXIS_LINEWIDTH;
//横向边框
    drawHorizontalAxis();
//纵向边框
    drawVerticalAxis();
//线宽颜色的设置
    ctx1.lineWidth = 0.5;
    ctx1.lineWidth = TICKS_LINEWIDTH;
    ctx1.strokeStyle = AXIS_COLOR;
//横向
    drawVerticalAxisTicks();
//纵向
    drawHorizontalAxisTicks();
}



//横向边框
function drawHorizontalAxis() {
    ctx1.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
    ctx1.lineTo(AXIS_RIGHT, AXIS_MARGIN)
    ctx1.stroke();
}

//纵向边框
function drawVerticalAxis() {
    ctx1.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
    ctx1.lineTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
    ctx1.stroke();
}


//横向刻度
function drawVerticalAxisTicks() {
    var deltaY;
    for (var i = 1; i < NUM_VERTICAL_TICKS; ++i) {
          if (i % 5 === 0) {
            deltaX = TICK_WIDTH;
            ctx1.moveTo(0, 0 + HORIZONTAL_TICK_SPACING * i);
            ctx1.lineTo(10, 0 + HORIZONTAL_TICK_SPACING * i);
            ctx1.textAlign = 'left';
            ctx1.fillText(i * HORIZONTAL_TICK_SPACING, 10, 0 + HORIZONTAL_TICK_SPACING * i);
        }else {
            deltaX = TICK_WIDTH/2;
        }            
        ctx1.moveTo(AXIS_ORIGIN.x, i * VERTICAL_TICK_SPACING);
        ctx1.lineTo(AXIS_ORIGIN.x + deltaX, i * VERTICAL_TICK_SPACING);
        ctx1.stroke();
    }
}



//纵向刻度
function drawHorizontalAxisTicks() {
    var deltaY;
    for (var i=1; i < NUM_HORIZONTAL_TICKS; ++i) {
        if (i % 5 === 0) {
            deltaY = TICK_WIDTH;
            ctx1.moveTo(0 + VERTICAL_TICK_SPACING * i, 0);
            ctx1.lineTo(VERTICAL_TICK_SPACING * i, 10);
//          ctx1.textAlign = 'left';
            ctx1.fillText(i * VERTICAL_TICK_SPACING, 0 + VERTICAL_TICK_SPACING * i, 20);
         }else {
            deltaY = TICK_WIDTH/2;
         }           
        ctx1.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_MARGIN);
        ctx1.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_MARGIN + deltaY);
        ctx1.stroke();
    }
}


//横向网格
function drawVerticalAxisTicks1() {
    var deltaY;
    for (var i = 1; i < AXIS_HEIGHT/4; ++i) {
          if (i % 5 === 0) {
            deltaX = TICK_WIDTH;
            ctx2.moveTo(0, 4*i);
            ctx2.lineTo(1080, 4*i);
//            ctx1.textAlign = 'left';
//            ctx1.fillText(i * HORIZONTAL_TICK_SPACING, 10, 0 + HORIZONTAL_TICK_SPACING * i);
        }else {
            deltaX = TICK_WIDTH/2;
        }            
        ctx2.moveTo(AXIS_ORIGIN.x, i * VERTICAL_TICK_SPACING);
        ctx2.lineTo(AXIS_ORIGIN.x + deltaX, i * VERTICAL_TICK_SPACING);
        ctx2.stroke();
    }
}


//纵向网格
function drawHorizontalAxisTicks1() {
    var deltaY;
    for (var i=1; i < AXIS_WIDTH/4; ++i) {
        if (i % 5 === 0) {
            deltaY = TICK_WIDTH;

//设置网格宽度
//一条一条画网格
            ctx2.moveTo(4* i, 0);
            ctx2.lineTo(4 * i, 540);
//          ctx2.textAlign = 'left';
//          ctx2.fillText(i * VERTICAL_TICK_SPACING, 0 + VERTICAL_TICK_SPACING * i, 20);
         }else {
            deltaY = TICK_WIDTH/2;
         }           
        ctx2.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_MARGIN);
        ctx2.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_MARGIN + deltaY);
        ctx2.stroke();
    }
}

//清空选择刻度线
function canvasClear1() {
    var c = document.getElementById("canvas1");
    ctx1.clearRect(0, 0, c.width, c.height);
}


//清空选择网格
function canvasClear2() {
    var c = document.getElementById("canvas1");
    ctx2.clearRect(0, 0, c.width, c.height);
}

//清空选择网格
function canvasClear3() {
    var c = document.getElementById("canvas1");
    ctx3.clearRect(0, 0, c.width, c.height);
}