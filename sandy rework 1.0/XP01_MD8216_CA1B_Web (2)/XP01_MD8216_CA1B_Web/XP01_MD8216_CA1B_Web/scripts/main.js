// Get the color buttons and the product image
const colorButtons = document.querySelectorAll('color-btn');
const productImage = document.getElementById('product-image');

// Add event listeners to the color buttons
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the color from the button's data-color attribute
        const color = button.getAttribute('data-color');

        // Change the product image based on the selected color
        switch (color) {
            case 'Black':
                productImage.src = 'Images/model_black.png';
                break;
            case 'Grey':
                productImage.src = 'Images/model_white.png';
                break;
            case 'Brown':
                productImage.src = 'Images/model_brown.png';
                break;
            default:
                console.error('Invalid color');
        }
    });
});