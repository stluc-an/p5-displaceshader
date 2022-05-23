precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture and image coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

// how much to displace by (controlled by mouse)
uniform float amt;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the displacement map as a vec4 using texture2D
  vec4 dispmap = texture2D(tex0, uv);
  
  // get red & green & spread it between -1 and 1
  float distX = dispmap.r * 2.0 - 1.0;
  float distY = dispmap.g * 2.0 - 1.0;

// displace by red & green, multiplied by the amount received by the shader
  vec2 disto = vec2(distX * amt,distY * amt);

  // displacement works by moving the texture coordinates of one image with the colors of another image
  // add the displacement to the texture coordinages
  vec4 pup = texture2D(tex1, uv + disto);

  // output the image
  gl_FragColor = pup;
}