// Open/Close Side Navigation Bar
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '200px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '200px';
    }
}

// Close Side Navigation Bar by clicking outside the container of Side Bar
document.addEventListener('click', function (event) {
    var sidebar = document.getElementById('sidebar');
    var menuButton = document.querySelector('.sidebarbtn');

    // Check if the clicked element is not inside the sidebar or menu button
    if (!sidebar.contains(event.target) && event.target !== menuButton) {
        sidebar.style.width = '0';
    }
});

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