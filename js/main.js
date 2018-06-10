'use strict'

var mainSiteNav = document.getElementById('main-site-nav');
var toggleNav = document.getElementById('toggle-nav');

var isNavOpen = false;
var isNavAnimating = false;
var navOpenDuration = 1000;

$(document).ready(function(){
    $('#fullpage').fullpage({
        anchors: ['first', 'second', 'third', 'fourth', 'fifth'],
        scrollOverflow: true , 
    });
});

toggleNav.addEventListener('click', function(){
    console.log('logged the click');
    if(isNavAnimating) return; 
    
    isNavAnimating = true;
    setTimeout(function(){
        isNavAnimating = false;
    },navOpenDuration);
    
    if(isNavOpen) mainSiteNav.style.width = '0'; 
    else mainSiteNav.style.width = '30%'; 

    isNavOpen = !isNavOpen;
});