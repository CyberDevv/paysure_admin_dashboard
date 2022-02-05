import tw from 'twin.macro'
import React from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import 'react-quill/dist/quill.snow.css'

import { ImageSVG } from './SVGIcons'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: {
    container: '#toolbar',
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
]

const TextEditor = () => {
  const [message, setMessage] = React.useState('')

  return (
    <div>
      <ReactQuill
        value={message}
        onChange={value => setMessage(value)}
        modules={modules}
        formats={formats}
        placeholder="Write your message here..."
        theme="snow"
      />

      <FlexPannel>
        {/* CustomToolbar */}
        <Toolbar id="toolbar">
          <button className="ql-bold" />
          <button className="ql-underline" />
          <button className="ql-italic" />
          <button class="ql-align" value=""></button>
          <button class="ql-align" value="justify"></button>
          <button class="ql-align" value="right"></button>
          <button class="ql-image" />

          <select className="ql-font">
            <option value="arial" selected>
              Default Font
            </option>
            <option value="comic-sans">Comic Sans</option>
            <option value="courier-new">Courier New</option>
            <option value="georgia">Georgia</option>
            <option value="helvetica">Helvetica</option>
            <option value="lucida">Lucida</option>
          </select>

          <select className="ql-size">
            <option value="extra-small">Size 1</option>
            <option value="small">Size 2</option>
            <option value="medium" selected>
              Size 3
            </option>
            <option value="large">Size 4</option>
          </select>
        </Toolbar>

        <MUIButton>Send</MUIButton>
      </FlexPannel>
    </div>
  )
}

// Tailwind styles
const FlexPannel = tw.div`mt-5 space-y-2 lg:(flex items-center space-y-0 space-x-4)`
const Toolbar = tw.div`bg-blue-light w-full py-4 flex  justify-between`
const MUIButton = tw(
  Button,
)`text-white bg-paysure-100 text-sm py-2.5 normal-case px-11 lg:(py-4) hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`

export default TextEditor
