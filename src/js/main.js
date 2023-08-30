import '../scss/styles.scss'

document.addEventListener("DOMContentLoaded", function () {

    const svgFiles = ["./mask1.svg", "./mask2.svg", "./mask3.svg", "./mask4.svg"]; // svg masks file path
    let circle = document.getElementById("maskSVG"); // svg mask id
    let currentRadius = 160 //mask size
    let maxRadius = window.innerWidth * 3;
    let increment = 110; // expansion speed
    let mousex = 0.5 * window.innerWidth;
    let mousey = 0.5 * window.innerHeight;
    document
        .body
        .classList
        .add("no-scroll");

    // expansion
    function animateMaskExpansion() {
        if (currentRadius < maxRadius) {
            currentRadius += increment;
            circle.setAttribute("width", currentRadius);
            requestAnimationFrame(animateMaskExpansion);
        }
        document
            .body
            .classList
            .remove("no-scroll");
        console.log("start")
        random_mask_lock2 = false
    }

    document.addEventListener("click", function () {
        animateMaskExpansion();
    });

    setTimeout(function () {
        animateMaskExpansion()
    }, 3000);

    // random shape
    let random_mask_lock1 = true;
    let random_mask_lock2 = true;
    let lastIndex = -1;

    function changeSvgLinkRandomly() {
        if (random_mask_lock1 && random_mask_lock2) {
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * svgFiles.length);
            } while (randomIndex === lastIndex); // Keep generating until different from the last index
            currentRadius = randomIndex * 30 + 150;

            const newSvgFile = svgFiles[randomIndex];
            circle.setAttribute("href", newSvgFile);
            circle.setAttribute("width", currentRadius);
            lastIndex = randomIndex; // Update the last index
            // console.log(random_mask_lock1 && random_mask_lock2)
            // console.log("random change")
        }
    }

    setInterval(changeSvgLinkRandomly, 500);

    function tick() {
        let rect = circle.getBoundingClientRect();
        let maskX = rect.width;
        let maskY = rect.height;
        if (currentRadius < maxRadius) {
            circle.setAttribute("x", mousex - 0.5 * maskX);
            circle.setAttribute("y", mousey - 0.5 * maskY);
            random_mask_lock1 = true
        } else {
            circle.setAttribute("x", -0.5 * window.innerWidth);
            circle.setAttribute("y", -0.5 * window.innerHeight);
            circle.setAttribute("href", svgFiles[2]);
            random_mask_lock1 = false
        }
        console.log(random_mask_lock1 && random_mask_lock2)
        window.requestAnimationFrame(tick)
    }
    tick()

    document.addEventListener("mousemove", function (event) {
        mousex = event.clientX;
        mousey = event.clientY;
    });
});