import tw from 'twin.macro'
import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Button } from '@mui/material'

import { ImageSVG, ClearSVG } from './SVGIcons'

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
  const [wow, setwow] = React.useState('')

  const handleChange = event => {
    setwow(event.target.value)
  }

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
          <button class="ql-align" value="" />
          <button class="ql-align" value="justify" />
          <button class="ql-align" value="right" />
          <button class="ql-image" />
          <select class="ql-font"></select>
          <select class="ql-size"></select>
          <button class="ql-clean">
            <ClearSVG />
          </button>

          {/* <div className="select">
            <select className="ql-size">
              <option value="extra-small">Size 1</option>
              <option value="small">Size 2</option>
          <option value="medium">Size 3</option>
              <option value="large">Size 4</option>
              <option value="extra-large">Size 4</option>
            </select>
          </div> */}
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
