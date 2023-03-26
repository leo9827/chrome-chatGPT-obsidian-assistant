document.addEventListener('mouseup', function() {
  var selectedText = window.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({message: 'showPopup'}, function(response) {
      console.log(response.message);
    });
  }
});

