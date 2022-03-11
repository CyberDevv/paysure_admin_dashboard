export const Yo = () => {
  return (
    <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
      <h4 style="padding-left: 4px;">Transaction Ref. </h4>
      <h4 style="font-weight: 300">${thisRow.col7}</h4>
    </div>
  )
}

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