const videoElement = document.getElementById('webcamFeed');
const canvasElement = document.getElementById('outputCanvas'); 
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawHandLandmarks(canvasCtx, landmarks); // Implement drawHandLandmarks below
        }
    }
}

function drawHandLandmarks(ctx, handLandmarks) {
    // Implement drawing hand landmarks (lines, circles, etc.) using ctx
    // Example:
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    for (let i = 0; i < handLandmarks.length; i++) {
        const x = handLandmarks[i].x * canvasElement.width;
        const y = handLandmarks[i].y * canvasElement.height;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle at each landmark
        ctx.stroke();
    }
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});
  hands.setOptions({
    maxNumHands: 1, // Adjust if you want to detect multiple hands
    modelComplexity: 0, // Use 0 for faster but potentially less accurate model, 1 for a slower but more accurate model
  });
  hands.onResults(onResults);
  
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({image: videoElement});
    },
    width: 640, // Adjust video resolution if needed
    height: 480 // Adjust video resolution if needed
  });
  camera.start();
  
  
