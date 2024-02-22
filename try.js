function linkify(inputText) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return inputText.replace(urlRegex, function(url) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });
  }

const inputText = "Check out this video: https://www.youtube.com/shorts/mzC88lKRv60 and visit our website https://example.com.";
const linkedText = linkify(inputText);

console.log(linkedText)