// in this sketch we're going to send the webcam to the shader, and then invert it's colors

// the shader variable
let distoShader;

// la texture de bruit (ça pourrait aussi être une vidéo, pour un bruit qui bouge)
let noiseTexture;

// la zone de dessin (on va pas dessiner dans le canvas directement)
let zone;

function preload(){
  // load the shader
  distoShader = loadShader('effect.vert', 'effect.frag');
  noiseTexture = loadImage('normalrnd.jpg');
}

function setup() {
    // shaders require WEBGL mode to work
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    
    // la zone de dessin. Toutes les mêmes fonctions que d'hab
    // mais on précède du nom de la zone de dessin
    zone = createGraphics(windowWidth, windowHeight);
    zone.noStroke();
}

function draw() { 
    zone.background(0);
    zone.fill(255,0,0);
    zone.ellipse(width/2+noise(frameCount*0.01)*300.0,height/2+noise(99+frameCount*0.01)*300.0,300,300);

    // shader() sets the active shader with our shader
    shader(distoShader);

    // lets just send the cam to our shader as a uniform
    distoShader.setUniform('tex0', noiseTexture);
    distoShader.setUniform('tex1', zone);

    distoShader.setUniform('amt', map(mouseX, 0, width, 0, 0.2));
    // rect gives us some geometry on the screen
    rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}