img="";
status="";
object= [];
function preload(){
    //img=loadImage("elefante.jpg");
    img=loadImage("dog_cat.jpg");
    //img=loadImage("umbrella.jpg");
    //img=loadImage("erizo.jpg")
}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector= ml5.objectDetector("cocossd",modelLoad);
document.getElementById("status").innerHTML="Estado : analizando video";
}
function modelLoad(){
    console.log("El modelo ya esta listo");
status="true";
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
    object=results;
        
    }
}
function draw(){
image(video,0,0,380,380);
if(status!=""){
r=random(255);
g=random(255);
b=random(255);


    objectDetector.detect(video, gotResults);
    for(i=0;i<object.length;i++) {
        document.getElementById("status").innerHTML="estado : objetos detectados "+object.length;
        document.getElementById("numero_de_objects").innerHTML="numero de apariencias o de objetos detectados como: "
        +object.length;
        fill(r,g,b);
        porcentaje=floor(object[i].confidence*100);
    text(object[i].label+" "+porcentaje+" %",object[i].x+15,object[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);   
    }
}



}