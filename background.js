chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "showPopup") {
    var popupDiv = document.createElement("div");
    popupDiv.innerHTML = request.selectedText;
    popupDiv.style.position = "fixed";
    popupDiv.style.top = "50%";
    popupDiv.style.left = "50%";
    popupDiv.style.transform = "translate(-50%, -50%)";
    popupDiv.style.background = "#fff";
    popupDiv.style.padding = "10px";
    popupDiv.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    popupDiv.style.zIndex = 999999;
    popupDiv.addEventListener("click", function() {
      // 点击弹窗时发送消息到后台脚本，调用 API 发送所选文本
      chrome.runtime.sendMessage({ message: "sendToObsidian", selectedText: request.selectedText });
      // 隐藏弹窗
      popupDiv.style.display = "none";
    });
    document.body.appendChild(popupDiv);
  }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'sendToObsidian') {
    // TODO: Replace the following URL with your Obsidian API endpoint
    var obsidianAPIUrl = 'http://localhost:41184/api/notes/create';

    fetch(obsidianAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: window.getSelection().toString()
      })
    }).then(function(response) {
      sendResponse({message: 'Text sent to Obsidian'});
    });
    return true;
  }
});

