import '../scss/styles.scss'

document.addEventListener("DOMContentLoaded", function() {

    const svgFiles = [
        "mask1.svg",
        "mask2.svg",
        "mask3.svg",
        "mask4.svg"
    ]; // svg masks file path
    let circle = document.getElementById("maskSVG"); // svg mask id
    let currentRadius = 160 //mask size
    let maxRadius = window.innerWidth * 3;
    let increment = 120; // expansion speed
    let mousex = 0.5 * window.innerWidth;
    let mousey = 0.5 * window.innerHeight;



    // expansion
    function animateMaskExpansion() {
        if (currentRadius < maxRadius) {
            currentRadius += increment;
            circle.setAttribute("width", currentRadius);
            requestAnimationFrame(animateMaskExpansion);
        }
    }

    document.addEventListener("click", function() {
        random_mask_lock2 = false
        animateMaskExpansion();
    });

    window.addEventListener("scroll", function() {
        if (hasRun) return; // If the function has already run, exit

        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / documentHeight) * 100;

        if (scrollPercentage >= 10) {
            animateMaskExpansion()
                //   console.log("You've scrolled to 10% of the page!");
            hasRun = true; // Update the flag so the function doesn't run again
        }

    });

    setTimeout(function() {
        animateMaskExpansion()
    }, 6000);




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