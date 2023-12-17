function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

document.addEventListener('click', function (event) {
    var sidebar = document.getElementById('sidebar');
    var menuButton = document.querySelector('.menu-btn');

    // Check if the clicked element is not inside the sidebar or menu button
    if (!sidebar.contains(event.target) && event.target !== menuButton) {
        sidebar.style.width = '0';
    }
});

function slide() {
    let slideValue = document.getElementById("slider").value;
    document.getElementById("trans-img").style.clipPath = "polygon(0 0," + slideValue + "% 0," +
    slideValue + "% 100%, 0 100%)";
}