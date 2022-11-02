export function printPartOfPage(elementId, uniqueIframeId) {
  const content = document.getElementById(elementId)
  let pri
  if (document.getElementById(uniqueIframeId)) {
    pri = document.getElementById(uniqueIframeId).contentWindow
  } else {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('title', uniqueIframeId)
    iframe.setAttribute('id', uniqueIframeId)
    iframe.setAttribute('style', 'height: 0px; width: 0px; position: absolute;')
    document.body.appendChild(iframe)
    pri = iframe.contentWindow
  }
  pri.document.open()
  pri.document.write(content.innerHTML)
  pri.document.close()
  pri.focus()
  pri.print()
}
