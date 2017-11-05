(() => {
  let canvas = null;
  let context = null;
  let bufferCanvas = null;
  let bufferCanvasCtx = null;
  const flakeArray = [];
  let flakeTimer = null;
  const maxFlakes = 200;

  function Flake() {
    this.x = Math.round(Math.random() * context.canvas.width);
    this.y = -10;
    this.drift = Math.random();
    this.speed = Math.round(Math.random() * 5) + 1;
    this.width = (Math.random() * 3) + 2;
    this.height = this.width;
  }

  const addFlake = () => {
    flakeArray[flakeArray.length] = new Flake();
    if (flakeArray.length === maxFlakes.Flakes) { clearInterval(flakeTimer); }
  };

  const blank = () => {
    bufferCanvasCtx.fillStyle = '#330033';
    bufferCanvasCtx.fillRect(0, 0, bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
  };

  const Draw = () => {
    context.save();
    blank();

    for (let i = 0; i < flakeArray.length; i += 1) {
      bufferCanvasCtx.fillStyle = 'white';
      bufferCanvasCtx.fillRect(
        flakeArray[i].x,
        flakeArray[i].y,
        flakeArray[i].width,
        flakeArray[i].height,
      );
    }
    context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
    context.restore();
  };

  const Update = () => {
    for (let i = 0; i < flakeArray.length; i += 1) {
      if (flakeArray[i].y < context.canvas.height) {
        flakeArray[i].y += flakeArray[i].speed;
        if (flakeArray[i].y > context.canvas.height) { flakeArray[i].y = -5; }
        flakeArray[i].x += flakeArray[i].drift;
        if (flakeArray[i].x > context.canvas.width) { flakeArray[i].x = 0; }
      }
    }
  };

  const animate = () => {
    Update();
    Draw();
  };

  const init = () => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    bufferCanvas = document.createElement('canvas');
    bufferCanvasCtx = bufferCanvas.getContext('2d');
    bufferCanvasCtx.canvas.width = context.canvas.width;
    bufferCanvasCtx.canvas.height = context.canvas.height;

    flakeTimer = setInterval(addFlake, 200);

    Draw();

    setInterval(animate, 30);
  };

  init();
})();

