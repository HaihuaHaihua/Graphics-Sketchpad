var count1 = 0;
var count2 = 0;
var state = 'allClosed';
var currentOpened = null;
var rubberlength = 10;
var menuList = document.querySelectorAll("#option div > button");
// console.log(menuList);
for(var i = 0;i<menuList.length;i++){
	this.menuList[i].addEventListener('click',function(e){
		var chooseEl = document.getElementById(e.currentTarget.id);
		console.log(chooseEl.id);
		//标尺操作
		if(chooseEl.id == 'ruler1'){
			console.log("这是标尺按钮");
			count1++;
			console.log(count1);
			if(count1%2 == 1){
					drawAxes();
					ruler1.style.backgroundColor="#ddd";
					var c = document.getElementById("canvas2");
					console.log(c.style.backgroundColor);
			}
			if(count1%2 == 0){
					ruler1.style.backgroundColor="#fff";
					canvasClear1();
			}
		}
		
		//网格操作
		if(chooseEl.id == 'ruler2'){
			console.log("这是网格按钮");
			count2++;
			console.log(count2);
			if(count2%2 == 1){
				baseLine();
				baseLine1();
   				ruler2.style.backgroundColor="#ddd";
			}
			if(count2%2 == 0){
				ruler2.style.backgroundColor="#fff";
				canvasClear2();
				canvasClear3();
			}
		}
		
		
		//清空操作
		if(chooseEl.id == 'cleanall'){
			console.log("清空整个画布");
			 var c = document.getElementById("canvas");
    		 ctx.clearRect(0, 0, c.width, c.height);
             objs=[];
		}
		
		//新建操作
		if(chooseEl.id == 'newone'){
			console.log("新建操作");
		}
		
		//复制操作
		if(chooseEl.id == 'copy'){
			console.log("复制操作");
		}
		
		//粘贴操作
		if(chooseEl.id == 'stitch'){
			console.log("粘贴操作");
		}
		
		//选择 裁剪  填充 橡皮 文字 线型 判断是否选择
		if(chooseEl.id == "clipchose" ||chooseEl.id == "linewidth" || chooseEl.id == "pitch" || chooseEl.id == "fillchose" || chooseEl.id == "rubber" || chooseEl.id == "textname" || chooseEl.id == "linetype")
		{
			console.log("判断");
			//裁剪
			var clipdetail = document.getElementById("clipdetail");
			//填充
			var filldetail = document.getElementById("filldetail");
			//名字
			var textnametail = document.getElementById("textnametail");
			//线型
			var linedetail = document.getElementById("linedetail");
			//线宽
			var widthnumber = document.getElementById("widthnumber");
			//选择
			var pitchdetail = document.getElementById("pitchdetail");

			if(state == "allClosed"){
				console.log("未选择");
				console.log("我要使用"+chooseEl.id);
                chooseEl.style.backgroundColor="#ddd";
                state = 'hasOpened';
                currentOpened = chooseEl;          
                if(chooseEl.id =="clipchose"){
                	console.log("开始选择"+chooseEl.id);
                	clipdetail.style.display="block";
                }
                if(chooseEl.id =="pitch"){
									console.log("开始选择"+chooseEl.id);
									pitchdetail.style.display="block";
                	//选择的函数
                }
                if(chooseEl.id =="fillchose"){
                	console.log("开始选择"+chooseEl.id);
                	filldetail.style.display="block";
                }
                if(chooseEl.id =="textname"){
                	console.log("开始选择"+chooseEl.id);
                	textnametail.style.display="block";
                }
                if(chooseEl.id =="rubber"){
                	console.log("开始选择"+chooseEl.id);
                	//橡皮擦的函数
//                	var widthnumber = document.getElementById("widthnumber");
					localStorage.setItem("width",linenumber.value);
                    console.log(linenumber.value);
                    console.log("第一次橡皮擦选择"+rubberlength);
                    brush('rubber');
                	
                }
                if(chooseEl.id =="linetype"){
                	console.log("开始选择"+chooseEl.id);
                	linedetail.style.display="block";
                }
                if(chooseEl.id =="linewidth"){
                	console.log("设置线宽"+chooseEl.id);
                	widthnumber.style.display="block";
                }
			}else{
				console.log("我要关闭"+currentOpened.id);
				currentOpened.style.backgroundColor="#fff";
				chooseEl.style.backgroundColor="#ddd";
				state = 'hasOpened';
                
                if(chooseEl.id =="clipchose" && currentOpened.id != "clipchose"){
                	console.log("开始选择"+chooseEl.id);
                	clipdetail.style.display="block";
                	filldetail.style.display="none";
                	pitchdetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
                if(chooseEl.id =="clipchose" && currentOpened.id == "clipchose"){
                	console.log("开始选择"+chooseEl.id);
                	chooseEl.style.backgroundColor="#fff";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	pitchdetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
                 if(chooseEl.id =="pitch" && currentOpened.id != "pitch"){
					console.log("开始选择"+chooseEl.id);
					pitchdetail.style.display="block";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                	//选择的函数
                }
                  if(chooseEl.id =="pitch" && currentOpened.id == "pitch"){
					console.log("开始选择"+chooseEl.id);
					chooseEl.style.backgroundColor="#fff";
					pitchdetail.style.display="none";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                	//选择的函数
                }
                  if(chooseEl.id =="fillchose" && currentOpened.id != "fillchose"){
                	console.log("开始选择"+chooseEl.id);
                	filldetail.style.display="block";
                	clipdetail.style.display="none";
                	pitchdetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
                  if(chooseEl.id =="fillchose" && currentOpened.id == "fillchose"){
                	console.log("开始选择"+chooseEl.id);
                	chooseEl.style.backgroundColor="#fff";
					pitchdetail.style.display="none";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
                  
                  if(chooseEl.id =="textname" && currentOpened.id != "textname"){
                	console.log("开始选择"+chooseEl.id);
                	textnametail.style.display="block";
                	filldetail.style.display="none";
                	pitchdetail.style.display="none";
                	clipdetail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
                  if(chooseEl.id =="textname" && currentOpened.id == "textname"){
                	console.log("开始选择"+chooseEl.id);
                	chooseEl.style.backgroundColor="#fff";
					pitchdetail.style.display="none";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
                  
                  if(chooseEl.id =="rubber"){
                	console.log("开始选择"+chooseEl.id);
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	pitchdetail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                	//橡皮擦的函数
                	console.log("已经更改了线宽"+linenumber.value);
                	rubberlength = linenumber.value;
                	brush('rubber');
                }
                  
                  if(chooseEl.id =="linetype" && currentOpened.id != "linetype"){
                	console.log("开始选择"+chooseEl.id);
                	linedetail.style.display="block";
                	clipdetail.style.display="none";
                	pitchdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	widthnumber.style.display="none";
                }
                  if(chooseEl.id =="linetype" && currentOpened.id == "linetype"){
                	console.log("开始选择"+chooseEl.id);
                	chooseEl.style.backgroundColor="#fff";
					pitchdetail.style.display="none";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
                  
                  if(chooseEl.id =="linewidth" && currentOpened.id != "linewidth"){
                	console.log("设置线宽"+chooseEl.id);
                	widthnumber.style.display="block";
                	linedetail.style.display="none";
                	pitchdetail.style.display="none";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                }
                  if(chooseEl.id =="linewidth" && currentOpened.id == "linewidth"){
                	console.log("设置线宽"+chooseEl.id);
                	chooseEl.style.backgroundColor="#fff";
					pitchdetail.style.display="none";
                	clipdetail.style.display="none";
                	filldetail.style.display="none";
                	textnametail.style.display="none";
                	linedetail.style.display="none";
                	widthnumber.style.display="none";
                }
			currentOpened = chooseEl;
			}
		}
		
	});
}