 song="";

 rightWristX=0;
 rightWristY=0;
 rightWristScore=0;

 leftWristX=0;
 leftWristY=0;
 leftWristScore=0;

 difference=0;
 
 function preload()
 {
     song=loadSound("Music.mp3");
 }

 function setup()
 {
     canvas=createCanvas(491, 310);
     canvas.position(459,201);

     video=createCapture(VIDEO);
     video.hide();

     poseNet=ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);
 }

 function draw()
 {
     image(video, 1, 1, 491, 310);

     fill("#e3fff3");
     stroke("#fee8ff");
     circle(rightWristX, rightWristY, 20);
     
    if(rightWristScore > 0.2)
     {
        circle(rightWristX, rightWristY, 20);

     if(rightWristY > 0 && rightWristY < 100)
     {
         song.rate(0.5);
         document.getElementById("Speed").innerHTML="Speed is 0.5x";
     }

     if(rightWristY > 100 && rightWristY < 200)
     {
         song.rate(1);
         document.getElementById("Speed").innerHTML="Speed is 1x";
     }

     if(rightWristY > 200 && rightWristY < 300)
     {
         song.rate(2);
         document.getElementById("Speed").innerHTML="Speed is 2x";
     }
    }
     
     if(leftWristScore > 0.2)
     {
        circle(leftWristX, leftWristY, 20);
        leftWristYNumberFormat=Number(leftWristY);
        leftWristYNoDecimalPoints=floor(leftWristYNumberFormat);
   
        volume=leftWristYNoDecimalPoints/310;
        document.getElementById("Volume").innerHTML="Volume: " + volume;
   
        song.setVolume(volume);
    }
   } 

 function playMusic()
 {
     song.play();
     song.setVolume(1);
     song.rate(1);
 }

 function modelLoaded()
 {
     console.log("Model loaded");
 }

 function gotPoses(results)
 {
     if(results.length > 0)
     {
         console.log(results);
         leftWristScore=results[0].pose.keypoints[9].score;
         rightWristX=results[0].pose.rightWrist.x;
         rightWristY=results[0].pose.rightWrist.y;
         console.log("Right wrist X= " + rightWristX + "and right wrist Y= " + rightWristY);

         rightWristScore=result[0],pose.keypoints[10].score;
         leftWristX=results[0].pose.leftWrist.x;
         leftWristY=results[0].pose.leftWrist.y;
         console.log("Left wrist X= " + leftWristX + "and left wrist Y= " + leftWristY);
     }
 }
