// Open/Close Side Navigation Bar
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    
    // For the smaller screens
    if (window.matchMedia('(max-width: 600px)').matches) {
        if (sidebar.style.width === '1500px') {
            sidebar.style.width = '0';
            sidebar.style.position = 'static';
        } else {
            sidebar.style.width = '150px';
            sidebar.style.position = 'fixed';
        }
    } 
    // For other larger screens
    else {
        if (sidebar.style.width === '250px') {
            sidebar.style.width = '0';
            sidebar.style.position = 'static'; 
        } 
        else {
            sidebar.style.width = '250px';
            sidebar.style.position = 'fixed'; 
        }
    }
}

// Check scroll position to toggle fixed positioning for the navbar
function handleScroll() {
    var headerContainer = document.querySelector('.header-container');
    var navbar = document.querySelector('.navbar-container');
    
    if (window.scrollY >= headerContainer.offsetHeight) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
    } else {
        navbar.style.position = 'relative';
        navbar.style.top = 'auto';
    }
}

// Attach the handleScroll function to the scroll event
window.addEventListener('scroll', handleScroll);

// Close Side Navigation Bar by clicking outside the container of Side Bar
document.addEventListener('click', function (event) {
    var sidebar = document.getElementById('sidebar');
    var menuButton = document.querySelector('.sidebarbtn');

    // Check if the clicked element is not inside the sidebar or menu button
    if (!sidebar.contains(event.target) && event.target !== menuButton) {
        sidebar.style.width = '0';
    }
});

// Image slider
function slide() {
    let slideValue = document.getElementById("slider").value;
    document.getElementById("origImg").style.clipPath = "polygon(0 0," + slideValue + "% 0," +
    slideValue + "% 100%, 0 100%)";
}

// Image Filtering
document.addEventListener('DOMContentLoaded', function () {
    const origImgInput = document.getElementById('origImgInput');
    const origImg = document.getElementById('origImg');
    const editImg = document.getElementById('editImg');
    const slider = document.getElementById('slider');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let originalImageData;

    origImgInput.addEventListener('change', handleImageUpload);

    function handleImageUpload(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    origImg.src = e.target.result;
                    editImg.src = e.target.result;

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    // Store the original image data for future use
                    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                };
                img.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    function applyFilter(filterNumber) {
        if (!originalImageData) return;

        // Create a new worker for the selected filter
        const worker = new Worker(`filterWorker${filterNumber}.js`);

        // Send the original image data to the worker
        worker.postMessage({ imageData: originalImageData });

        // Receive the filtered image data from the worker
        worker.onmessage = function (event) {
            const filteredImageData = event.data.imageData;

            // Display the filtered image in the editImg container
            editImg.src = getImageDataUrl(filteredImageData);
        };
    }

    // Function to convert ImageData to Data URL
    function getImageDataUrl(imageData) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    // Add event listeners for filter buttons
    filterButtons.forEach((button, index) => {
        button.addEventListener('click', () => applyFilter(index + 1));
    });

    // Function to handle the input range/slider
    function slide() {
        const value = slider.value;
        editImg.style.width = `${value}%`;
    }
});

// Image Container Resize
function resizeImageContainer() {
    var imgContainer = document.querySelector('.img-container');
    var imgWidthInput = document.getElementById('imgWidthInput');
    
    // Get the user-input width value
    var userInputWidth = parseInt(imgWidthInput.value, 10);

    // Calculate the maximum width in pixels based on 95vmin
    var maxVminWidth = Math.min(window.innerWidth, window.innerHeight) * 0.95;

    // Set a minimum and maximum width limit
    var minWidth = 100;
    var maxWidth = maxVminWidth;

    // Check if the user input is within the limits
    if (userInputWidth >= minWidth && userInputWidth <= maxWidth) {
        // Set the width of the img-container
        imgContainer.style.width = userInputWidth + 'px';
    } else if (userInputWidth < minWidth) {
        // If user input is below the minimum, set to minimum
        imgContainer.style.width = minWidth + 'px';
    } else {
        // If user input is above the maximum, set to maximum
        imgContainer.style.width = maxWidth + 'px';
    }
}

// Back To Top Functionality
document.addEventListener('DOMContentLoaded', function () {
    var backToTopBtn = document.getElementById('back-img');

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});

// Videophotography Grid
var videoPlayer = document.getElementById("videoPlayer");
var myVideo = document.getElementById("myVideo");

function stopVideo() {
    videoPlayer.style.display = "none";
}

function playVideo(file) {
    openPopupVideo(file);
}

function openPopupVideo(file) {
    var popupVideo = document.getElementById("popupVideo");
    popupVideo.muted = false;
    popupVideo.src = file;
    
    var videoPopup = document.getElementById("videoPopup");
    videoPopup.style.display = "block";
}

function closePopup() {
    var videoPopup = document.getElementById("videoPopup");
    var popupVideo = document.getElementById("popupVideo");

    popupVideo.pause();
    popupVideo.muted = true;

    videoPopup.style.display = "none";
}