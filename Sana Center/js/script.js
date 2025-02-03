// Access Bar Behavior
const list = document.querySelectorAll('.list');

function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach((item) => item.addEventListener('click', activeLink));
const toggleButton = document.querySelector('.toggle-button');
const accessBar = document.querySelector('.access-bar');

toggleButton.addEventListener('click', () => {
    accessBar.classList.toggle('hidden');
    toggleButton.classList.toggle('rotate');
});

// CSS for animation
const style = document.createElement('style');
style.innerHTML = `
    .navigation {
        display: none;
    }
    .rotate {
        transform: rotate(180deg);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.navigation a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            // Add a class to the body to trigger the slide-out animation
            document.body.classList.add('slide-out');

            // Wait for the animation to complete before navigating
            setTimeout(() => {
                window.location.href = href;
            }, 500); // Match the duration of the slide-out animation
        });
    });
});

