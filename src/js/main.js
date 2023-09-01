import '../scss/styles.scss'

document.addEventListener("DOMContentLoaded", function () {
   
    const svgFiles = ["./mask1.svg", "./mask2.svg", "./mask3.svg", "./mask4.svg"]; // svg masks file path
    let circle = document.getElementById("maskSVG"); // svg mask id
    let currentWidth = 160 //mask size
    let maxRadius = window.innerWidth * 3;
    let increment = 110; // expansion speed
    let mousex = 0.5 * window.innerWidth;
    let mousey = 0.5 * window.innerHeight;
    let random_mask_lock = true;
    document
        .body
        .classList
        .add("no-scroll");

        function initializeCirclePosition() {
            circle.setAttribute("x", window.innerWidth / 2 - currentWidth / 2);
            circle.setAttribute("y", window.innerHeight / 2 - currentWidth / 2);
          }
        
          // Call the function to initialize the circle position
          initializeCirclePosition();

    // random shape
    let lastIndex = -1;
    function changeSvgLinkRandomly() {
        if (random_mask_lock) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * svgFiles.length);
            } while (randomIndex === lastIndex); // Keep generating until different from the last index
            currentWidth = randomIndex * 30 + 150;
            const newSvgFile = svgFiles[randomIndex];
            circle.setAttribute("href", newSvgFile);
            circle.setAttribute("width", currentWidth);
            lastIndex = randomIndex; // Update the last index
            console.log("randomShape")
        }
    }
    setInterval(changeSvgLinkRandomly, 500);


    // cursor following
    function tick() {
        if(random_mask_lock){
            console.log(random_mask_lock)
        // Calculate SVG coordinates based on mouse position
        let maskTargetX = mousex - currentWidth / 2;
        let maskTargetY = mousey - currentWidth / 2;
      
        // Interpolate to target position
        let currentX = parseFloat(circle.getAttribute("x"));
        let currentY = parseFloat(circle.getAttribute("y"));
      
        let circleX = lerp(currentX, maskTargetX, 0.2);
        let circleY = lerp(currentY, maskTargetY, 0.2);
      
        // Update the x, y position
        circle.setAttribute("x", circleX);
        circle.setAttribute("y", circleY);
    }
        // Continue the animation
        window.requestAnimationFrame(tick);
      }
    tick()

    document.addEventListener("mousemove", function (event) {
        mousex = event.clientX;
        mousey = event.clientY;
    });



    // expansion
    document.addEventListener("click", function () {
        animateMaskExpansion();
    });

    setTimeout(function () {
        animateMaskExpansion()
    }, 3000);

    function animateMaskExpansion() {

        if (currentWidth < maxRadius) {
       
            // let newX = centerX - 0.3 * currentWidth;
            // let newY = centerY - 0.1 * currentWidth;9            // circle.setAttribute("x", centerX);
            // circle.setAttribute("y", centerY);
            increment+=10
            const newX = parseFloat(circle.getAttribute("x")) - 0.5 * increment;
            const newY = parseFloat(circle.getAttribute("y")) - 0.5 * increment;
        
            circle.setAttribute("x", newX);
            circle.setAttribute("y", newY);
      
            currentWidth += increment;
            circle.setAttribute("width", currentWidth);
            
            requestAnimationFrame(animateMaskExpansion);
            console.log("expand")
        } else {
            let rect = circle.getBoundingClientRect();
            currentWidth = maxRadius; // Reset to maxRadius
            circle.setAttribute("x", -0.2 * rect.width);
            circle.setAttribute("y", -0.2 * rect.height);
            circle.setAttribute("href", svgFiles[2]);
            console.log("noexpand")
        }
        random_mask_lock = false;
        document
            .body
            .classList
            .remove("no-scroll");
       
    }

    function lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }
});