/**
 * Created by lihanying on 2018/7/31.
 */
//画圆角
CanvasRenderingContext2D.prototype.roundRect = function (x, y,start_angle,end_angle) {
    // 开始绘制
    this.beginPath();
    this.arc(x,y,30,start_angle,end_angle);
    this.strokeStyle = '#EFEAE6';
    this.lineWidth = 10;
    this.stroke();
    this.closePath();
};
//使用canvas合成图片
handleCanvas = (data,imgList) => {
    let img = document.createElement("img");
    img.setAttribute("crossOrigin", 'anonymous');

    //canvas必须设定确定的宽高
    let canvas = document.getElementById("myCanvas");
    canvas.style.display = "none"; //不让其显示
    const in_h = +window.innerHeight;
    const in_w = +window.innerWidth;
    let width = (in_h*989 / 1920) * 2;
    let height = in_h * 2;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.fill();


    let imageURL, that = this;
    //图像载入完毕再进行操作，Safari不支持onload
    img.addEventListener("load", function () {
        ctx.drawImage(img, 0, 0, width, height);
        let w = width / img.width, //w = 背景图 / 原图片
            h = height / img.height; // h = 背景图 / 原图片

        //文字
        data.map(item => {
            let club_name = item.name;
            ctx.font = `${item.font}em Arial`;
            ctx.fillStyle = '#551a1a';
            let ch = (width - +ctx.measureText(club_name).width) / 2;  //居中
            ctx.fillText(item.name, ch, item.y * h);
        });
        //图片
        imgList.map((item,idx)=>{
            //必须用document.createElement("img")方式创建图片,否则在ios手机上不显示
            let img1 = document.createElement("img");
            img1.crossOrigin = '';
            //img1.setAttribute("crossOrigin", 'anonymous'); //由于图片是base64,所以需要注释img1.setAttribute("crossOrigin", 'anonymous'),否是ios手机上不显示
            let ch = item.type==='qr'? (width - (290 * w)) / 2: (width - (item.width * w)) / 2;
            img1.src = item.url;
            img1.addEventListener("load",function(){
                ctx.drawImage(img1, ch ,item.y * h, item.width * w ,item.height * h);
                if(+idx===1){ //最后一张
                    imageURL = canvas.toDataURL("image/png");
                    that.setState({imageURL: imageURL, loading: true,hide:false})
                }else{//头像画圆角
                    for(let i=0; i<4; i++){
                        let rectW,rectH,rX,rY,imgW=item.width * w,imgH=item.height * h;
                        switch (i){
                            case 0: rectW=ch+25;rectH=item.y * h+25;rX=Math.PI;rY=Math.PI*1.5;break;
                            case 1: rectW=ch+imgW-25;rectH=item.y * h+25;rX=Math.PI*1.5;rY=Math.PI*2;break;
                            case 2: rectW=ch+25;rectH=item.y * h+imgH-25;rX=Math.PI*0.5;rY=Math.PI;break;
                            default: rectW=ch+imgW-25;rectH=item.y * h+imgH-25;rX=0;rY=Math.PI*0.5;
                        }
                        ctx.roundRect(rectW,rectH,rX, rY)
                    }
                }
            },false);
        });
    }, false);
    img.src = '//images.sport147.cn/20180716155918_bg.png';
};


const h = +window.innerHeight;
const w = +window.innerWidth;
const width = (h - 40)*989 / 1920;

//标签使用 [宽,高]乘以*2解决高清问题
<canvas id="myCanvas" width={(h*989 / 1920) * 2} height={h * 2}></canvas>
