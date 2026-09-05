const camera = document.getElementById("camera");
const startButton = document.getElementById("startCamera");
const ratingEl = document.getElementById("rating");
const dialogueEl = document.getElementById("dialogue");

// Array of random comments
const comments = [
    "That smile could power a small city! 😁",
    "10/10 beam of sunshine! ✨",
    "Absolute joy detected! Keep it up.",
    "Your smile just made the algorithm happy.",
    "Cheesin' hard! Love to see it.",
    "Is that a smile or are you plotting something? 😉"
];

let isDetecting = false;

startButton.addEventListener("click", async function () {
    try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        camera.srcObject = stream;
        
        ratingEl.innerText = "Loading AI... ⏳";
        
        // Load Face-API models from CDN
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        
        ratingEl.innerText = "-- / 10";
        console.log("Models loaded successfully!");

        // Start the detection loop right here so it's guaranteed to run
        if (!isDetecting) {
            isDetecting = true;
            startSmileDetection();
        }

    } catch (error) {
        alert("Please allow camera access 📷");
        console.log(error);
    }
});

// Continuous loop to check for smiles
function startSmileDetection() {
    setInterval(async () => {
        // Make sure video is actually playing frames
        if (camera.paused || camera.ended) return;

        // Detect face and expressions
        const detections = await faceapi
            .detectSingleFace(camera, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (detections) {
            // Get happiness score (0.0 to 1.0) and convert to a 0-10 rating
            const happyScore = detections.expressions.happy || 0;
            const score = Math.round(happyScore * 10);
            
            ratingEl.innerText = `${score} / 10`;

            // If they give a big smile (7+), pick a random comment
            if (score >= 7) {
                const randomComment = comments[Math.floor(Math.random() * comments.length)];
                dialogueEl.innerText = randomComment;
            }
        } else {
            ratingEl.innerText = "No face 😕";
        }
    }, 600); // Check every 600 milliseconds
}

console.log("Smile detection is ready 😊");