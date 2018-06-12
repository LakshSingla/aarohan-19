'use strict'

var mainSiteNav = document.getElementById('main-site-nav');
var toggleNav = document.getElementById('toggle-nav');
var fullpage = document.getElementById('fullpage');
var titleWrap = document.getElementsByClassName('title-wrapper')[0];
var circleLeft = document.getElementsByClassName('circle-left')[0];
var circleRight = document.getElementsByClassName('circle-right')[0];
var homebgFade = document.getElementsByClassName('home-bg-fade')[0];
var bitsTagline = document.getElementById('bits-tagline');

var navMediaQuery = 600;

var isNavOpen = false;
var isNavAnimating = false;
var navOpenDuration = 400;

var beforeTimeout = 1; // for circles animation purpose

var anchors = ['homeanchor', 'first', 'second', 'third', 'fourth', 'fifth'];
$(document).ready(function(){
    $('#fullpage').fullpage({
        anchors: anchors,
        scrollOverflow: true ,
        onLeave: function (index, nextIndex, direction) {
            if (index == '1' && direction == 'down' && beforeTimeout) {
                location.href = location.pathname + '#homeanchor';
                openCircles();
                homebgFade.style.opacity = 0;

                setTimeout(function () {
                    beforeTimeout = 0;
                    location.href = location.pathname + '#' + anchors[nextIndex - 1];
                }, 700);
                return false;
            }

            else if (nextIndex == '1' && direction == 'up' && !beforeTimeout) {
                setTimeout(function () {
                    homebgFade.style.opacity = 1;
                    if (!isNavOpen) closeCircles();
                }, 700);
                beforeTimeout = 1;
            }
        }
    });
});

toggleNav.addEventListener('click', function(){
    console.log('logged the click');
    if(isNavAnimating) return; 
    
    isNavAnimating = true;
    setTimeout(function(){
        isNavAnimating = false;
    },navOpenDuration);
    
    if(isNavOpen) {
        Array.from(document.querySelectorAll('.visible-on-mobile')).forEach(function(elem){
            elem.style.display = 'none';
        });
        mainSiteNav.style.width = '0'; 
        fullpage.style.width = "100%";

        if(parseInt(document.documentElement.clientWidth) > navMediaQuery) { 
            bitsTagline.style.paddingLeft =  '100px';
        }
        //home page title style changes
        // titleWrap.style.left = '31%';

        closeCircles();
    }
    else {
        navResponsiveness();
        
        //home page title style changes
        // titleWrap.style.left = '14%';

        openCircles();
    }

    isNavOpen = !isNavOpen;
});

function openCircles () {
    circleLeft.style.transform = 'rotate(200deg)';
    circleRight.style.transform = 'rotate(200deg)';
}

function closeCircles () {
    circleLeft.style.transform = 'rotate(0deg)';
    circleRight.style.transform = 'rotate(0deg)';
}

function navResponsiveness(){
    if(parseInt(document.documentElement.clientWidth) < navMediaQuery) {
        Array.from(document.querySelectorAll('nav li')).forEach(function(elem){
            elem.style.display = 'flex'; 
            elem.style.justifyContent = 'center';
            elem.style.padding = '10px 0';
        });
        mainSiteNav.style.width = "100%";
        // fullpage.style.width = "0";

    }
    else{
        Array.from(document.querySelectorAll('nav li')).forEach(function(elem){
            elem.style.display = ''; 
            elem.style.justifyContent = '';
            elem.style.padding = '10px 0 10px 10%';
        });
        mainSiteNav.style.width = "100%";
        mainSiteNav.style.width = '23%'; 
        fullpage.style.width = "77%";
        bitsTagline.style.paddingLeft = "24%";
    }
}

window.addEventListener('resize', function(){
    isNavOpen && navResponsiveness();
});

Array.from(document.querySelectorAll('#main-site-nav a')).forEach(function(elem){
    elem.addEventListener('click', function(){
        var event = new Event('click');
        toggleNav.dispatchEvent(event);
    });
});
