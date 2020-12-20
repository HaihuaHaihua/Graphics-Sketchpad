//裁剪选择
var inclip = document.getElementById("inclip");
var clipdetail = document.getElementById("clipdetail");
$("#inclip").click(function (event) {
    console.log("内裁剪");
    type = "rectangle";
    option.name = "clip";
    clipdetail.style.display = "none";
});
$("#outclip").click(function (event) {
    console.log("外裁剪");
    type = "rectangle";
    option.name = "clipout";
    clipdetail.style.display = "none";
});


//填充选择
var filldetail = document.getElementById("filldetail");
$("#fill1").click(function (event) {
    console.log("多边形填充");
    var fillNode = option.obj.vertices.slice(2);
    var vertices = new Float64Array(fillNode);
    polygonFilling(vertices);
    option.obj.fillSign = true;

    filldetail.style.display = "none";
});
$("#fill2").click(function (event) {
    console.log("边填充");
    var fillNode = option.obj.vertices.slice(2);
    var vertices = new Float64Array(fillNode);
    polygonFilling(vertices);
    option.obj.fillSign = true;

    filldetail.style.display = "none";
});
$("#fill3").click(function (event) {
    console.log("种子填充");
    var fillNode = option.obj.vertices.slice(2);
    var vertices = new Float64Array(fillNode);
    polygonFilling(vertices);
    option.obj.fillSign = true;

    filldetail.style.display = "none";
});
$("#fill4").click(function (event) {
    console.log("图形填充");
    filldetail.style.display = "none";
});
$("#fill5").click(function (event) {
    console.log("背景填充");
    var c = document.getElementById("canvas2");
    c.style.backgroundColor = choose_color,
    console.log(c.style.backgroundColor);
    filldetail.style.display="none";
});

var textnametail = document.getElementById("textnametail");
$("#name1").click(function(event) {
console.log("张兴盛");
wenzi('zxs');
});
$("#name2").click(function(event) {
console.log("王海华");
    wenzi('whh');
});
$("#name3").click(function(event) {
console.log("沈昕");
    wenzi('sx');
});
$("#name4").click(function(event) {
console.log("蔡聪");
    wenzi('cc');
});
$("#name5").click(function(event) {
console.log("刘子恒");
    wenzi('lzh');
});
$("#name6").click(function(event) {
console.log("潘筱萌");
    wenzi('pxm');
});
$("#name7").click(function(event) {
console.log("柯锋");
    wenzi('kf');
});
$("#name8").click(function(event) {
console.log("章铭洋");
    wenzi('zmy');
});

var linedetail = document.getElementById("linedetail");
$("#line1").click(function (event) {
    console.log("线1");
    linedetail.style.display = "none";
});
$("#line2").click(function (event) {
    console.log("线2");
    linedetail.style.display = "none";
});
$("#line3").click(function (event) {
    console.log("线3");
    linedetail.style.display = "none";
});

var pitchdetail = document.getElementById("pitchdetail");
$("#pitch").click(function (event) {
    console.log("单选");
    option.name = "pitch";
    pitchdetail.style.display = "none";
});
$("#boxChoose").click(function (event) {
    console.log("框选");
    option.name = "boxChoose";
    pitchdetail.style.display = "none";
});