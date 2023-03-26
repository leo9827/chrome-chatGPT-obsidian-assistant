document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
  }, function(selection) {
    var selectedText = document.getElementById('selectedText');
    selectedText.innerText = selection[0];
  });

  var sendToObsidian = document.getElementById('sendToObsidian');
  sendToObsidian.addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: "navigator.clipboard.writeText('" + selectedText.innerText + "');"
    }, function() {
      chrome.runtime.sendMessage({message: 'sendToObsidian'}, function(response) {
        console.log(response.message);
      });
    });
  });
});

