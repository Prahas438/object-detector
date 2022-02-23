img="";
objects=[];
status="";
object_detector="";

function preload(){
    img=loadImage("bed.jpeg");
}

function setup(){
    canvas=createCanvas(490,380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    objectDetector.detect("img,gotResult");
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
    console.log(results);
    object=results;}
}
function draw(){
    image(img,0,0,490,380);
    if(status!=undefined){
        objectDetector.detect(img,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}