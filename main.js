status = "";
objects = [];
video = "";
var synth = window.SpeechSynthesis;

function preload()
{

}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function draw()
{
    image(video, 0, 0, 380, 380);

        if (status != "")
        {   
            for (i = 0; i < objects.length; i++)
            {   
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                /*
                document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
                */

                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
                if (objects[i].label == object_name) {
                    variable_name_holds_webcamLiveView.stop();
                    objectDetector.detect(gotResult);
                    document.getElementById("status").innerHTML = object_name + " Found";
                    SpeechSynthesisUtterance("object mentioned found!");
                    speech.utterThis("object mentioned found");
                } else {
                    document.getElementById("status").innerHTML = object_name + " Not Found";
                }
            }
        }
    }

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

