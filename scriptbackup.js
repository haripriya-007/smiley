const camera = document.getElementById("camera");
const startButton = document.getElementById("startCamera");

startButton.addEventListener("click", async function () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        camera.srcObject = stream;
    } catch (error) {
        alert("Please allow camera access 📷");
        console.log(error);
    }
});

console.log("Smile detection is ready 😊");