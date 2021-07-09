Webcam.set({
    width:350,
    height:350,
    image_format:'jpg',
    jpg_quality:2000
});

camera=document.getElementById("camera");

Webcam.attach("camera");

function take_snapshot(){
   Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_uri+'"/>';
   }) ;
}

console.log("ml5.version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tNVvb0EYH/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model loaded!");
}

function check(){
    img=document.getElementById("capture_img");
    classifier.classify(img,gotresult);
}

function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object").innerHTML=results[0].label;
        document.getElementById("result_accuracy").innerHTML=results[0].confidence.toFixed(3)*100+"%";
    }
}

