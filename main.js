status = "";
video = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}


function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){

        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Stataus : Objects Detected";
            document.getElementById("no_objects_detected").innerHTML = "Number of Objects Detected Are : "+ objects;
    
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        }
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }

    console.log(results);
    objects = results;
}