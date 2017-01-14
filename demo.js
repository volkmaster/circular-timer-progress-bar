document.addEventListener("DOMContentLoaded", function (event) { 
    new TimerProgress({
        'container': document.getElementById('container1')
    }).run('inf');

    new TimerProgress({
        'container': document.getElementById('container2')
    }).run(5000, true, 1);

    new TimerProgress({
        'container': document.getElementById('container3'),
        'stroke-width': 35,
        'color-container': '#2c2c2c',
        'color-circle': '#c4c3c3',
        'color-path': '#5e5e5e',
        'color-text': '#c4c3c3'
    }).run(10000);

    new TimerProgress({
        'container': document.getElementById('container4'),
        'stroke-width': 35,
        'color-container': '#5e5e5e',
        'color-circle': '#c4c3c3',
        'color-path': '#2c2c2c',
        'color-text': '#2c2c2c'
    }).run(6000);
});