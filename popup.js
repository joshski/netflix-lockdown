var checkbox = document.getElementById("lockdownMode")

checkbox.addEventListener("change", function(e) {
  chrome.runtime.sendMessage(
    { type: 'lockdownModeChanged', lockdownMode: e.target.checked },
    function() {
      setTimeout(function() {
        window.close()
      }, 200)
    }
  )
})

window.onload = function() {
  chrome.runtime.sendMessage(
    { type: 'getLockdownMode' },
    function (response) {
      checkbox.checked = response.lockdownMode
    }
  )
}
