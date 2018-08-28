'use strict'

// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = jQuery.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

// var csrftoken = getCookie('csrftoken');
// $.ajaxSetup({
//     beforeSend: function(xhr, settings) {
//         if (csrftoken) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         }
//     }
// });

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
    //console.log('logged the click');
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

function findTotal() {
    var arr = document.getElementsByClassName('school-class');
    var tot=0;
    var tot_amount=0;
    for(var i=0;i<arr.length;i++){
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
    }

    tot_amount = tot * 146.5;

    document.getElementById('sch-total').value = tot;
    document.getElementById('sch-total-amount').value = tot_amount;
}
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function disableBtn (button) {
    button.disabled = true;
    button.classList.add("wait-btn");
}

function enableBtn (button) {
    button.disabled = false;
    button.classList.remove("wait-btn");
}

// on form submit
document.getElementsByClassName('student-submit')[0].onsubmit = function (e) {
    var name = document.getElementById('stu-name').value;
    var school_name = document.getElementById('stu-school-name').value;
    var city = document.getElementById('stu-city').value;
    var stu_class = document.getElementById('stu-class').value;
    var phone = document.getElementById('stu-phone').value;
    var email = document.getElementById('stu-email').value;

    var inputArray = [name, school_name, city, stu_class, phone, email];

    var submitBtn = document.querySelectorAll(".student-submit .big-btn-wrapper .big-btn")[0];

    if (!areFieldBlank(trimInput(inputArray))) {
        if (validateEmail(email)) {
            if (validatePhoneNumber(phone)) {
                if(name!="" && school_name!="" && city!="" && stu_class!="") {

                    disableBtn(submitBtn);

                    URL = "https://www.bits-apogee.org/2019/aarohan/studentreg";
                    $.ajax({
                        method:'POST',
                        url: URL,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                        data:{
                            name: name,
                            school: school_name,
                            city: city,
                            studying_in_class: stu_class,
                            mobile_no: phone,
                            email_id: email
                        },
                        error:function(xhr,textstatus,err){
                            document.getElementById("register-overlay").style.display = "flex";
                            document.getElementById("register-message").style.display = "flex";
                            document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.";

                            enableBtn(submitBtn);
                        }

                    }).done(function(response){
                        if (response.message) {
                            document.getElementById("register-overlay").style.display = "flex";
                            document.getElementById("register-message-span").innerHTML = response.message;
                            document.getElementById("register-message").style.display = "flex";
                        }
                        else {
                            window.location = response.url;
                        }
                        enableBtn(submitBtn);
                    });
                } else {
                    document.getElementById("register-overlay").style.display = "flex";
                    document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
                    document.getElementById("register-message").style.display = "flex";

                    enableBtn(submitBtn);
                }
            } else {
                document.getElementById("register-overlay").style.display = "flex";
                document.getElementById("register-message-span").innerHTML = "Please fill a correct phone number.";
                document.getElementById("register-message").style.display = "flex";

                enableBtn(submitBtn);
            }
        } else {
            document.getElementById("register-overlay").style.display = "flex";
            document.getElementById("register-message-span").innerHTML = "Please fill a correct email.";
            document.getElementById("register-message").style.display = "flex";

            enableBtn(submitBtn);
        }
    } else {
        document.getElementById("register-overlay").style.display = "flex";
        document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
        document.getElementById("register-message").style.display = "flex";

        enableBtn(submitBtn);
    }
    e.preventDefault();
}

document.getElementsByClassName('school-submit')[0].onsubmit = function (f) {
    var school_name = document.getElementById('sch-school-name').value;
    var city = document.getElementById('sch-city').value;
    var poc = document.getElementById('sch-poc').value;
    var phone = document.getElementById('sch-phone').value;
    var class_9 = document.getElementById('sch-class-9').value || "0";
    var class_10 = document.getElementById('sch-class-10').value || "0";
    var class_11 = document.getElementById('sch-class-11').value || "0";
    var class_12 = document.getElementById('sch-class-12').value || "0";
    var total = document.getElementById('sch-total').value || "0";
    var total_amount = document.getElementById('sch-total-amount').value || "0";
    var email = document.getElementById('sch-email').value;

    var inputArray = [school_name, city, poc, phone, class_9, class_10, class_11, class_12, total, email];

    var submitBtn = document.querySelectorAll(".school-submit .big-btn-wrapper .big-btn")[0];

    if (!areFieldBlank(trimInput(inputArray))) {
        if (validateEmail(email)) {
            if (validatePhoneNumber(phone)) {
                if(school_name!="" && city!="" && poc!="" && phone!="" && email!="") {
                    if (total_amount !== "0") {
                        disableBtn(submitBtn);

                        URL = "https://www.bits-apogee.org/2019/aarohan/schoolreg";
                        $.ajax({
                            type:'POST',
                            contentType: 'application/json',
                            url: URL,
                            data:JSON.stringify({
                                school: school_name,
                                city: city,
                                school_person_of_contact_name: poc,
                                school_person_of_contact_number: phone,
                                ninth_class_students: class_9,
                                tenth_class_students: class_10,
                                eleventh_class_students: class_11,
                                twelfth_class_students: class_12,
                                total: total,
                                total_amount: total_amount,
                                email_id: email
                            }),
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                            },
                            dataType: "json",
                            error:function(xhr,textstatus,err) {
                                document.getElementById("register-overlay").style.display = "flex";
                                document.getElementById("register-message-sch").style.display = "flex";
                                document.getElementById("register-message-span-sch").innerHTML = "ERROR! Please try again.";

                                enableBtn(submitBtn);
                            }
                        }).done(function(response) {
                            //console.log(response);
                            if (response.message) {
                                document.getElementById("register-overlay").style.display = "flex";
                                document.getElementById("register-message-span").innerHTML = response.message;
                                document.getElementById("register-message").style.display = "flex";
                            }
                            else {
                                window.location = response.url;
                            }
                            enableBtn(submitBtn);
                        });
                    } else {
                        document.getElementById("register-overlay").style.display = "flex";
                        document.getElementById("register-message-span-sch").innerHTML = "Please enter some amount!";
                        document.getElementById("register-message-sch").style.display = "flex";

                        enableBtn(submitBtn);
                    }
                } else {
                    document.getElementById("register-overlay").style.display = "flex";
                    document.getElementById("register-message-span-sch").innerHTML = "Please fill all the required fields.";
                    document.getElementById("register-message-sch").style.display = "flex";

                    enableBtn(submitBtn);
                }
            } else {
                document.getElementById("register-overlay").style.display = "flex";
                document.getElementById("register-message-span-sch").innerHTML = "Please fill a correct phone number.";
                document.getElementById("register-message-sch").style.display = "flex";

                enableBtn(submitBtn);
            }
        } else {
            document.getElementById("register-overlay").style.display = "flex";
            document.getElementById("register-message-span-sch").innerHTML = "Please fill a correct email.";
            document.getElementById("register-message-sch").style.display = "flex";

            enableBtn(submitBtn);
        }
    } else {
        document.getElementById("register-overlay").style.display = "flex";
        document.getElementById("register-message-span-sch").innerHTML = "Please fill all the required fields.";
        document.getElementById("register-message-sch").style.display = "flex";

        enableBtn(submitBtn);
    }
    f.preventDefault();
}

// close register
document.getElementById("register-close").addEventListener("click", closeRegister);
function closeRegister(e) {
    document.getElementById("register-overlay").style.display = "none";
    document.getElementById("register-message").style.display = "none";
    e.preventDefault();
}

document.getElementById("register-close-sch").addEventListener("click", closeRegisterSch);
function closeRegisterSch(f) {
    document.getElementById("register-overlay").style.display = "none";
    document.getElementById("register-message-sch").style.display = "none";
    f.preventDefault();
}

// validation functions
function validatePhoneNumber(num) {
    let phoneNumRegex = /^[0-9]{10}$/;
    let match = phoneNumRegex.test(num);

    return match;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function areFieldBlank(vals) {
    let re = /^(\s)*$/;
    var isAnyFieldBlank = false;
    vals.forEach(field => {
        if (re.test(field)) isAnyFieldBlank = true;
    });
    return isAnyFieldBlank;
}

function trimInput(vals) {
    vals.forEach((field, index) => {
        vals[index] = field.replace(/^\s+|\s+$/gm, "");
    });

    return vals;
}
