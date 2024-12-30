document.addEventListener('DOMContentLoaded', () => {
    // Create a circle that follows the cursor
    const circle = document.createElement('div');
    circle.className = 'circle';
    document.body.appendChild(circle);

    // Update the circle's position based on the cursor
    document.addEventListener('mousemove', (event) => {
        const { clientX: x, clientY: y } = event;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
    });

    // Create the glitter effect on click
    document.addEventListener('click', (event) => {
        const { clientX: x, clientY: y } = event;

        // Create a shine element and position it where the user clicks
        const shine = document.createElement('div');
        shine.className = 'shine';
        shine.style.left = `${x - 25}px`;
        shine.style.top = `${y - 25}px`;

        // Append the shine element to the body
        document.body.appendChild(shine);

        // Remove the shine element after the animation ends
        shine.addEventListener('animationend', () => {
            document.body.removeChild(shine);
        });
    });
});
