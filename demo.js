document.addEventListener("DOMContentLoaded", function (event) {
    new TimerProgress({
        'container': document.getElementById('container1')
    }).run('inf');

    new TimerProgress({
        'container'        : document.getElementById('container2'),
        'width-container'  : 200,
        'height-container' : 200,
        'font-family'      : 'GothamRounded-Bold'
    }, 1).run(5000, 2000);

    new TimerProgress({
        'container'        : document.getElementById('container3'),
        'width-container'  : 250,
        'height-container' : 350,
        'stroke-width'     : 25,
        'color-container'  : '#2c2c2c',
        'color-circle'     : '#c4c3c3',
        'color-path'       : '#5e5e5e'
    }, 0, false).run(8000);

    new TimerProgress({
        'container'        : document.getElementById('container4'),
        'width-container'  : 150,
        'height-container' : 150,
        'color-container'  : '#c0c0c0',
        'color-alert'      : '#dc143c',
        'font-size'        : 50,
        'font-family'      : 'GothamRounded-Book'
    }, 1, true, false).run(6000, 2500);

    new TimerProgress({
        'container'        : document.getElementById('container5'),
        'width-container'  : 300,
        'height-container' : 200,
        'stroke-width'     : 20,
        'color-container'  : '#5e5e5e',
        'color-circle'     : '#c4c3c3',
        'color-path'       : '#2c2c2c',
        'color-text'       : '#2c2c2c',
        'font-family'      : 'GothamRounded-Light'
    }, 2).run(7000);
});
