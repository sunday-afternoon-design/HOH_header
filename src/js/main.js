import '../scss/styles.scss'

// Create new img element const imgElement = document.createElement('img');  Set
// attributes for the img element imgElement.src = '../public/bgvideo.png';
// Replace with the actual image path  imgElement.alt = 'Description of the
// image'; imgElement.width = window.innerWidth;  Optional: set the width
// imgElement.height = 200;  Optional: set the height  Find the div where you
// want to append the img element const divElement =
// document.getElementById('content');  Replace 'myDiv' with the actual div's ID
// Append the img element to the div divElement.appendChild(imgElement);

document.addEventListener("DOMContentLoaded", function () {
    let circle = document.getElementById("maskSVG");
    let currentRadius = 160
    let maxRadius = window.innerWidth * 3;
    let increment = 120;
    let mousex = 0.5 * window.innerWidth;
    let mousey = 0.5 * window.innerHeight;

    function animateMaskExpansion() {
        if (currentRadius < maxRadius) {
            currentRadius += increment;
            circle.setAttribute("width", currentRadius);
            requestAnimationFrame(animateMaskExpansion);
        }
    }

    document.addEventListener("click", function () {
        animateMaskExpansion();
    });

    function tick() {

        let rect = circle.getBoundingClientRect();
        let maskX = rect.width
        let maskY = rect.height;
        if (currentRadius < maxRadius) {
            circle.setAttribute("x", mousex - 0.5 * maskX);
            circle.setAttribute("y", mousey - 0.5 * maskY);
        } else {
            circle.setAttribute("x", -0.5 * window.innerWidth);
            circle.setAttribute("y", -0.5 * window.innerHeight);
        }
        window.requestAnimationFrame(tick)
    }
    tick()

    document.addEventListener("mousemove", function (event) {
        mousex = event.clientX;
        mousey = event.clientY;

    });
});
