let sound; // Audio object
let canvas;
let amp;   // Amplitude analyzer
let bgColor; // Background color variable
let gain;
let numSqaures = 10;
let mySqaures = [];
let colStr;

let volumeDisplay = document.getElementById("volumeDisplay"); 
let volumeSlider = document.getElementById("volumeSlider");

$(document).ready(function(){

    // jQuery methods go here...
  
});

function preload() {
    // Load the sound file
    sound = loadSound("assets/Irresistible_Frame_Nova_Charisma.mp3");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style("z-index","-1")
    bgColor = color("#1c2155"); // Initial background color

    // Create an amplitude analyzer
    amp = new p5.Amplitude();
    amp.setInput(sound);
    
    // Create a gain node for user volume control
    gain = new p5.Gain();
    gain.setInput(sound);
    gain.connect();
    
    volumeDisplay.textContent = `Volume: ${volumeSlider.value}`;

    for (let i=0;i<numSqaures;i++) {
        mySqaures.push(new Square());
    }
}

function draw() {
    volumeDisplay.textContent = `Volume: ${volumeSlider.value}`;
    outputVolume(volumeSlider.value / 100,0,0);

    // Update gain based on the slider
    gain.amp(volumeSlider.value / 100);

    // Get the amplitude of the raw signal (bypassing gain)
    let rawLevel = amp.getLevel();

    let size;
    let size2;
    let red;
    let green;
    let blue;
    let redBg;
    let greenBg;
    let blueBg;

    // Normalize visualization values
    if (sound.currentTime() > 109.4 && sound.currentTime() < 131) {
        size = map(rawLevel, 0, 0.5, 0, 250); // Map volume to shape size
        size2 = map(rawLevel, 0, 0.2, 0, 50); // Map volume to shape size
        redBg = map(rawLevel, 0, 0.3, 10, 95);
        greenBg = 0;
        blueBg = map(rawLevel, 0, 0.2, 10, 110);
        red = map(rawLevel, 0, 0.2, 10, 110);
        green = 76;
        blue = map(rawLevel, 0, 0.3, 10, 140);  // Map volume to red color intensity
    } else if (sound.currentTime() > 131) {
        size = map(rawLevel, 0, 0.1, 0, 250); // Map volume to shape size
        size2 = map(rawLevel, 0, 0.1, 0, 50); // Map volume to shape size
        redBg = map(rawLevel, 0, 0.4, 10, 255);
        greenBg = 0;
        blueBg = 100;
        red = 234;
        green = 76;
        blue = map(rawLevel, 0, 0.3, 10, 255);  // Map volume to red color intensity
    } else {
        size = map(rawLevel, 0, 0.3, 0, 250); // Map volume to shape size
        size2 = map(rawLevel, 0, 0.4, 0, 50); // Map volume to shape size
        redBg = map(rawLevel, 0, 0.4, 10, 255);
        greenBg = 0;
        blueBg = 100;
        red = 234;
        green = 76;
        blue = map(rawLevel, 0, 0.3, 10, 255);  // Map volume to red color intensity
        
    }
        
    fill(red, green, blue);
    background(redBg,greenBg,blueBg);
    // Draw visuals

    
    
    for (let i=0;i<numSqaures;i++) {
        push()
        fill(green,red,blue)
        mySqaures[i].move();
        mySqaures[i].show();
        mySqaures[i].setSize(size2);
        pop()
    }

  
    
    noStroke();
    circle(width / 2, height / 2, size);
    //animS.circle("c1", 14 ,width/2,height/2,size);
    pop();

    
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight)
}

function playSong() {
    sound.play();
}

function pauseSong() {
    sound.pause();
}

function mouseClicked() {
    sound.jump(109.4)
}