song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if (results.lenght > 0) {

        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = " + scoreleftWrist + "scorerightWrist = " + scorerightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("lefttWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song2_status = song2.isPlaying();
    song1_status = song1.isPlaying();
    fill("#FF0000");
    stroke("red");

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        }
    }
    if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }
}

function play() {
    song1.play();
    song.setVolume(1);
    song.rate(1);
}