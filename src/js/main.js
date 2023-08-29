import '../scss/styles.scss'

document.addEventListener("DOMContentLoaded", function() {

    const svgFiles = [
        "public/mask1.svg",
        "public/mask2.svg",
        "public/mask3.svg",
        "public/mask4.svg"
    ]; // svg masks file path
    let circle = document.getElementById("maskSVG"); // svg mask id
    let currentRadius = 160 //mask size
    let maxRadius = window.innerWidth * 3;
    let increment = 120; // expansion speed
    let mousex = 0.5 * window.innerWidth;
    let mousey = 0.5 * window.innerHeight;
    document.body.classList.add("no-scroll");



    // expansion
    function animateMaskExpansion() {
        if (currentRadius < maxRadius) {
            currentRadius += increment;
            circle.setAttribute("width", currentRadius);
            requestAnimationFrame(animateMaskExpansion);
        }
        document.body.classList.remove("no-scroll");
        console.log("start")
    }

    document.addEventListener("click", function() {
        random_mask_lock2 = false
        animateMaskExpansion();
    });

    setTimeout(function() {
        animateMaskExpansion()
    }, 4800);


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
            const newSvgFile = svgFiles[randomIndex];
            circle.setAttribute("href", newSvgFile);
            lastIndex = randomIndex; // Update the last index
            console.log(randomIndex)
        }
    }
    setInterval(changeSvgLinkRandomly, 600);



    function tick() {
        let rect = circle.getBoundingClientRect();
        let maskX = rect.width
        let maskY = rect.height;
        if (currentRadius < maxRadius) {
            circle.setAttribute("x", mousex - 0.5 * maskX);
            circle.setAttribute("y", mousey - 0.5 * maskY);
            random_mask_lock1 = true
        } else {
            circle.setAttribute("x", -0.5 * window.innerWidth);
            circle.setAttribute("y", -0.5 * window.innerHeight);
            random_mask_lock1 = false
        }
        window.requestAnimationFrame(tick)
    }
    tick()


    document.addEventListener("mousemove", function(event) {
        mousex = event.clientX;
        mousey = event.clientY;
    });
});