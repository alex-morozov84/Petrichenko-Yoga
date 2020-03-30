window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';
   
    let calc = require('./parts/calc'),
        slider = require('./parts/slider'),
        form = require('./parts/form'),
        modal = require('./parts/modal'),
        timer = require('./parts/timer'),
        tabs = require('./parts/tabs');

    calc();
    slider();
    form();
    modal();
    timer();
    tabs();
});