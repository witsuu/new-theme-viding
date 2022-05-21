"use strict";

$(document).ready(() => {
  $('body').css('overflowY', 'hidden');
  $('.main-app').css("visibility", 'hidden');

  $("#btn-envelope").on('click', function () {
    $("#envelope-wrap").css('transform', 'translateY(-100%)')
    $("#envelope-wrap").css('opacity', 0)

    $('body').css('overflowY', 'auto');
    $('.main-app').css('visibility', 'visible');
  })

  $(".zoom-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    mainClass: "mfp-with-zoom mfp-img-mobile",
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      easing: "ease-in-out",
    },
  });
});