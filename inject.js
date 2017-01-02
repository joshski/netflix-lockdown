window.addEventListener('load', function() {
  var profileNameElement = document.querySelector('.profile-name')
  var lockdownHeader = document.createElement('div')
  lockdownHeader.className = 'lockdownHeader'
  lockdownHeader.innerHTML = "<h1>" + profileNameElement.innerHTML + "'s Netflix List</h1>"
  document.body.insertBefore(lockdownHeader, document.body.childNodes[0]);
})
