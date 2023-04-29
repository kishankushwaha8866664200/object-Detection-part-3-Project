var objectData = [];
img = "";
var status;
function preload() {
    img = loadImage('laptop.jpeg');
}
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    object_Detector.detect(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }  
      objectData = results;
    console.log(results);

    
    document.getElementById("status").innerHTML = "There are 1 big object in image from which cocossd model has detected " + results.length + " objects";
    document.getElementById("status").className = "btn btn-success";
}


function draw() {
    image(img, 0, 0, 500, 500);

    if (status != "") {
        for (var i = 0; i < objectData.length; i++) {
            objPercentage = floor(objectData[i].confidence * 100);

            objlabel = objectData[i].label;
            objX =objectData[i].x;
            objY =objectData[i].y;
            objHeight = objectData[i].height;
            objWidth = objectData[i].width;

            stroke('#ff0000');
            fill('#ff0000');// to set text color to red
            text(objlabel + " " + objPercentage +"%", objX+15, objY+15);// to display text in canvas
            noFill();// to make fill transparant
            rect(objX, objY, objWidth, objHeight);
        }
    }

}
