'use strict'

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (csrftoken) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var mainSiteNav = document.getElementById('main-site-nav');
var toggleNav = document.getElementById('toggle-nav');
var fullpage = document.getElementById('fullpage');
var titleWrap = document.getElementsByClassName('title-wrapper')[0];
var circleLeft = document.getElementsByClassName('circle-left')[0];
var circleRight = document.getElementsByClassName('circle-right')[0];
var homebgFade = document.getElementsByClassName('home-bg-fade')[0];
var bitsTagline = document.getElementById('bits-tagline');
var bitsTaglineMobile = document.getElementById('bits-tagline-mobile');

var navMediaQuery = 600;

var isNavOpen = false;
var isNavAnimating = false;
var navOpenDuration = 400;
var headerHalfDuration = 300;

var beforeTimeout = 1; // for circles animation purpose

// var anchors = ['homeanchor', 'first', 'patternanchor', 'second', 'third', 'fourth', 'fifth'];
// var anchors = ['homeanchor', 'first', 'patternanchor', 'fourth','registeranchor', 'faqsanchor', 'ysanchor', 'fifth'];
var anchors = ['homeanchor', 'first', 'patternanchor', 'fourth','registeranchor', 'faqsanchor', 'fifth'];
$(document).ready(function(){
    $('#fullpage').fullpage({
        anchors: anchors,
        scrollOverflow: true ,
        onLeave: function (index, nextIndex, direction) {
            if (index == '1' && direction == 'down' && beforeTimeout) {
                location.href = location.pathname + '#homeanchor';
                openCircles();
                desktopHeaderContentToggle(1);
                // homebgFade.style.opacity = 0;

                setTimeout(function () {
                    beforeTimeout = 0;
                    location.href = location.pathname + '#' + anchors[nextIndex - 1];
                }, 700);
                return false;
            }

            else if (nextIndex == '1' && direction == 'up' && !beforeTimeout) {
                setTimeout(function () {
                    // homebgFade.style.opacity = 1;
                    if (!isNavOpen) closeCircles();
                    desktopHeaderContentToggle(0);
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

        // if(parseInt(document.documentElement.clientWidth) > navMediaQuery) { 
            // bitsTagline.style.paddingLeft =  '100px';
        // }
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
        // bitsTagline.style.paddingLeft = "24%";
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

function desktopHeaderContentToggle (isAtHome) {
  if (parseInt(document.documentElement.clientWidth) >= navMediaQuery) {
    if (isAtHome) {
      bitsTagline.style.opacity = 0;
      setTimeout(function () {
        bitsTaglineMobile.style.opacity = 1;
      }, headerHalfDuration);
    }
    else {
      bitsTaglineMobile.style.opacity = 0;
      setTimeout(function () {
        bitsTagline.style.opacity = 1;
      }, headerHalfDuration);
    }
  }
}

function findTotal(){
    var arr = document.getElementsByClassName('school-class');
    var tot=0;
    for(var i=0;i<arr.length;i++){
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
    }
    document.getElementById('total').value = tot;
}

// on form submit
document.getElementsByClassName('student-submit')[0].onsubmit = function registerForm(e)
{
    name: document.getElementById('stu-name').value;
    school_name: document.getElementById('stu-school').value;
    city: document.getElementById('stu-city').value;
    stu_class: document.getElementById('stu-class').value;
    phone: document.getElementById('stu-phone').value;
    email: document.getElementById('stu-email').value;

    if(name!="" && school_name!="" && city!="" && stu_class!="" && phone!="" && email!="")
    {
        URL = "";
        $.ajax({
            type:'POST',
            contentType: 'application/json',
            url: URL,
            data:JSON.stringify({
                name: name,
                school_name: school_name,
                city: city,
                stu_class: stu_class,
                phone: phone,
                email: email
            }),
            dataType: "json",
            error:function(xhr,textstatus,err){
                document.getElementById("register-overlay").style.display = "flex";
                document.getElementById("register-message").style.display = "flex";
                document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
            }
        }).done(function(response){
            document.getElementById("register-overlay").style.display = "flex";
            document.getElementById("register-message").style.display = "flex";
            document.getElementById("register-message-span").innerHTML = response.message;
        });
    }
    else
    {
        document.getElementById("register-overlay").style.display = "flex";
        document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
        document.getElementById("register-message").style.display = "flex";     
    }
    e.preventDefault();
}

document.getElementsByClassName('school-submit')[0].onsubmit = function registerForm(f)
{
    school_name: document.getElementById('sch-school-name').value;
    city: document.getElementById('sch-city').value;
    poc: document.getElementById('sch-poc').value;
    phone: document.getElementById('sch-phone').value;
    class_9: document.getElementById('sch-class-9').value;
    class_10: document.getElementById('sch-class-10').value;
    class_11: document.getElementById('sch-class-11').value;
    class_12: document.getElementById('sch-class-12').value;
    total_amount: document.getElementById('sch-total-amount').value;

    if(school_name!="" && city!="" && poc!="" && phone!="" && total_amount!="" && class_9!="" && class_10!="" && class_11!="" && class_12!="")
    {
        URL = "";
        $.ajax({
            type:'POST',
            contentType: 'application/json',
            url: URL,
            data:JSON.stringify({
                school_name: school_name,
                city: city,
                poc: poc,
                phone: phone,
                class_9: class_9,
                class_10: class_10,
                class_11: class_11,
                class_12: class_12,
                total_amount: total_amount
            }),
            dataType: "json",
            error:function(xhr,textstatus,err){
                document.getElementById("register-overlay").style.display = "flex";
                document.getElementById("register-message-sch").style.display = "flex";
                document.getElementById("register-message-span-sch").innerHTML = "ERROR! Please try again.";
            }
        }).done(function(response){
            document.getElementById("register-overlay").style.display = "flex";
            document.getElementById("register-message-sch").style.display = "flex";
            document.getElementById("register-message-span-sch").innerHTML = response.message;
        });
    }
    else
    {
        document.getElementById("register-overlay").style.display = "flex";
        document.getElementById("register-message-span-sch").innerHTML = "Please fill all the required fields.";
        document.getElementById("register-message-sch").style.display = "flex";     
    }
    f.preventDefault();
}

// close register
document.getElementById("register-close").addEventListener("click", closeRegister);
function closeRegister(e) {
    if (!document.getElementById('register-message-sch')) {
        document.getElementById("register-overlay").style.display = "none";
    }
    document.getElementById("register-message").style.display = "none";
    e.preventDefault();
}

document.getElementById("register-close-sch").addEventListener("click", closeRegisterSch);
function closeRegisterSch(f) {
    document.getElementById("register-overlay").style.display = "none";
    document.getElementById("register-message-sch").style.display = "none";
    f.preventDefault();
}
