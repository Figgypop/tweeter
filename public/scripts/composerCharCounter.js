$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const length = $(this).val().length
    const counter = $(this).siblings('.button-text').children('.counter')
    counter.text(140 - length)
    if (length > 140) {
      counter.addClass('red-counter')
    } else {
      counter.removeClass('red-counter')
    }
  });
  
});