/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
      console.log('Success:', renderTweets);
    });
};


const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    const newTweet = createTweetElement(tweet)
    $(`.tweets-container`).prepend(newTweet);
  });
}

const createTweetElement = function (tweetObject) {
  const $tweet = $(`<article class="tweet-container">
  <header>
    <div>
      <img class="avatar" src=${tweetObject.user.avatars}>
      ${tweetObject.user.name}
    </div>
    <div class="tweet-email">
      ${tweetObject.user.handle}
    </div>
  </header>
  <section>
    ${escape(tweetObject.content.text)}
  </section>
  <footer>
  ${timeago.format(tweetObject.created_at)}
  <div>
  <i class="fa fa-flag" aria-hidden="true"></i>
  <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
      </footer>
      </article>`)
  return $tweet;
};



$(document).ready(function () {
  $("#tweet-form").on("submit", (event) => {
    event.preventDefault()
    const formInput = $("#tweet-text").val();
    console.log("formInput:", formInput)
    $('#tweet-text').val('')
    const reqBody = {
      text: formInput
    }
    $("#error-message").html("")
    const error = $("#error-message")
    if (formInput.length > 140) {
      error.append("❌Your tweet is too long❌").hide().slideDown()
      return
    }
    if (formInput.length === 0) {
      error.prepend("❌Your tweet is empty❌").hide().slideDown()
    }

  
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: reqBody,
      success: function (data) {
        console.log("Submission successful:", data);
        loadTweets();
      }
      
    })

  })
  loadTweets()

});





