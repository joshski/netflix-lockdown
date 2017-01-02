var myListUrl = 'https://www.netflix.com/browse/my-list'
var lockdownMode = false

chrome.storage.sync.get('lockdownMode', function(storage) {
  lockdownMode = !!storage.lockdownMode
})

function setLockdownMode(enabled) {
  lockdownMode = enabled
  chrome.storage.sync.set({ lockdownMode: lockdownMode }, function() {
    loadUrl(myListUrl)
  })
}

function loadUrl(url) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.update(tabs[0].id, { url: url })
  })
}

chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
  if (lockdownMode &&
      e.url.indexOf('https://www.netflix.com') == 0 &&
      e.url != myListUrl) {
    chrome.tabs.update(e.tabId, { url: myListUrl })
  }
})

chrome.webNavigation.onHistoryStateUpdated.addListener(function(e) {
  if (lockdownMode &&
      e.url.indexOf('https://www.netflix.com') == 0 &&
      e.url.indexOf('https://www.netflix.com/title/') == -1 &&
      e.url.indexOf('https://www.netflix.com/watch/') == -1 &&
      e.url.indexOf(myListUrl) == -1 ) {
    chrome.tabs.update(e.tabId, { url: myListUrl })
  }
})

chrome.webNavigation.onDOMContentLoaded.addListener(function(e) {
  if (e.url.indexOf('https://www.netflix.com') == 0) {
    chrome.tabs.executeScript(e.tabId, { code: 'document.body.setAttribute("data-lockdown-mode", "' + lockdownMode + '")' })
  }
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type == 'getLockdownMode') {
    sendResponse({ lockdownMode: lockdownMode })
  }
  if (message.type == 'lockdownModeChanged') {
    setLockdownMode(message.lockdownMode)
  }
})
