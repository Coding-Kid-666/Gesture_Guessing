
console.log("ml5 version:" + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zZfYteB5z/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model has succesfully loaded!")
}

Webcam.set({
    height: 300,
    width: 350,
    image_format:'png',
    png_quality: 90
});
 webcam = document.getElementById("camera");

 Webcam.attach(webcam);

 function takeSnapshot(){
    document.getElementById("song_lol").play();
    document.getElementById("ok_lol").style.visibility = "visible";
     Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML = '<img id="outputImg" src="' + data_uri + '">';
         console.log("Snapshot succesfully taken.");
     });
 }

 function speak(){
    var synth = window.speechSynthesis;
    var speak_data1 = "The prediction is..." + prediction_1;
    utterThis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("outputImg");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
    }
}
