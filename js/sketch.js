var canvas;
//--- matter.js
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;
var engine, world;
var canvasMouse, mConstraint;
var boundaries = [];
var boxes = [];



//获取封面图片
var imagesPath = []; //全局变量src；类型：路径
var postTittle = [];
var postTimes = [];
var postLinks = [];
var imgP = []; //类型：图片

var dragPlaceY;
// var mouseIsPressed = false;
var released = true;


$(function() {
    //遍历对象-获得作品名称，图片，链接
    $(".portfolio-img").each(function() {
        imagesPath.push(this.src);
        postTittle.push(this.alt);
    })

    $(".portfolio-link").each(function(key, object) {
        postLinks.push($(object).attr("href"));
    })

    $(".page-time").each(function() {
        postTimes.push(this.alt);
    })
});


function preload() {
    for (let i = 0; i < imagesPath.length; i++) {
        let t = loadImage(imagesPath[i]); //把封面图片加载到p5里

        imgP.push(t);
    }
}


var nowWidth, nowHeight;
var windowIsResized = false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    nowWidth = windowWidth;
    hideImage();
    loadMatterJs();

    canvas.mouseReleased(
        function() {
            released = true;
            if (tittleChars != []) {
                for (var i = 0; i < targetTittle.length; i++) {
                    tittleChars[i].changeToOut();
                

                }
            }
            if (timeChars != []) {
                for (var i = 0; i < targetTime.length; i++) {
                    timeChars[i].changeToOut();
                }
            }

            if (mouseReady) {
                openUrl();
            }
        });



    ;

    waveSetup();

}


function draw() {


    getNowId();

    if (windowIsResized) {
        resetBoxes();
        windowIsResized = false;
    }




    background(240);
    
    // pressedWorkImgShow();

    showAllBoundaries();
    isPressed_placeShow();
    showAllBoxes();
    isPressed_infoShow();


}











function windowResized() {
    canvas = createCanvas(windowWidth, windowHeight);

    wavePx.splice(0, wavePx.length);
    let total = 50;
    for (let i = 0; i < total + 1; i++) {
        angle[i] = map(i, 0, total, 0, TWO_PI);
        wavePx[i] = (windowWidth + 10) / total * i;
    }

    windowIsResized = true;

}

function resetBoxes() {

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].removeBody();
    }
    boxes.splice(0, boxes.length);


    for (let i = 0; i < imgP.length; i++) {
        var imgScale = imgScaleNum(imgP[i].width);
        boxes.push(
            new Box(random(50, width - 50), random(height, height / 2),
                imgP[i].width * imgScale, imgP[i].height * imgScale,
                imgP[i],
                postTittle[i],
                postTimes[i],
                postLinks[i]
            ));
    }


}