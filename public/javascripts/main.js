let copy = document.querySelector("#copyClick")
if (copy) {
  copy.addEventListener('click', () => {

    let newUrl = document.querySelector('#newUrl')
    newUrl.setAttribute('type', 'text') // 不是 hidden 才能複製
    newUrl.select()

    try {
      var successful = document.execCommand('copy');

    } catch (err) {
      alert('Oops, unable to copy');
    }

    /* unselect the range */
    newUrl.setAttribute('type', 'hidden')
    window.getSelection().removeAllRanges()
  })
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})