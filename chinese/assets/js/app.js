const cd = document.querySelector('.countdown').getAttribute('date')

Countdown(cd)



$(document).scroll(function () {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > $('nav').height())
});