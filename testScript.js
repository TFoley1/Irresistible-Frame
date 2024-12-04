let sound; // Audio object
let amp;   // Amplitude analyzer
let volumeSlider; // Volume slider
let gain;  // Gain node for volume control
let canvas;

function preload() {
  // Load the sound file
  sound = loadSound("assets/Irresistible_Frame_Nova_Charisma.mp3");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index","-1");

  // Create amplitude analyzer
  amp = new p5.Amplitude();

  // Create a gain node for user volume control
  gain = new p5.Gain();
  gain.setInput(sound);
  gain.connect();

  // Create a volume slider
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(10, 10);
  
  // Start audio playback
  sound.loop();
}

function draw() {
  // Update gain based on the slider
  gain.amp(volumeSlider.value());

  // Get the amplitude of the raw signal (bypassing gain)
  let rawLevel = amp.getLevel();

  // Normalize visualization values
  let size = map(rawLevel, 0, 0.3, 50, 300); // Map volume to shape size
  let red = map(rawLevel, 0, 0.3, 0, 255);  // Map volume to red color intensity

  // Draw visuals
  background(0);
  fill(255, red, 150);
  noStroke();
  ellipse(width / 2, height / 2, size, size);
}

function playSong() {
    sound.play();
}

function pauseSong() {
    sound.pause();
}