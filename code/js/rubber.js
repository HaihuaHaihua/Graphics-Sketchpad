/**
 * 橡皮擦对象
 * @constructor
 */

$('#rubber').click(function () {
    type = 'rubber';
    console.log("zzzz");
});
//var rubberlength=10;
console.log(rubberlength);

function AddRubberlength() {
    rubberlength+=10;
}
function AddRubberlength() {
    rubberlength-=10;
}

function Rubber(color,len) {
//  rubberlength=10;
    Drawable.apply(this);//继承父类
    this.draw = function () {
        rubberlist(this.vertices,this.vertices.length-1,color,len);
     }
}

function rubberlist(pp,n,color,len)
{
    var p = [];
    for(var i = 0;i<=pp.length-1;i++){
        p.push(pp[i]);
    }
    if (n<= 1)
        return null;
    if((p[n-1]<p[0]+1)&&(p[n-1]>p[0]-1)&&(p[n]<p[1]+1)&&(p[n]>p[1]-1))
    {
        ctx.fillStyle=color;
        ctx.fillRect(parseInt(p[0]), parseInt(p[1]), len, len);
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
    rubberlist(p1,p1.length-1,color,len);
    rubberlist(p,p.length-1,color,len);
}


//function rubbercc(len){
//	console.log(len);
//	var rubberlength=len;
//	brush('rubber');
//}
