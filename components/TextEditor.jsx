// /*
//  * Custom toolbar component including the custom heart button and dropdowns
//  */

// // Add sizes to whitelist and register them
// // Quill.apply

// // const Size = Quill.('formats/size')
// // Size.whitelist = ['extra-small', 'small', 'medium', 'large']
// // Quill.register(Size, true)

// // // Add fonts to whitelist and register them
// // const Font = Quill.import('formats/font')
// // Font.whitelist = [
// //   'arial',
// //   'comic-sans',
// //   'courier-new',
// //   'georgia',
// //   'helvetica',
// //   'lucida',
// // ]
// // Quill.register(Font, true)

// // const modules = {
// //   toolbar: [
// //     {
// //       container: '#toolbar',
// //       // handlers: {
// //       //   insertHeart: insertHeart,
// //       // },
// //     }[{ header: [1, 2, 3, 4, 5, 6, false] }],
// //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// //     [
// //       { list: 'ordered' },
// //       { list: 'bullet' },
// //       { indent: '-1' },
// //       { indent: '+1' },
// //     ],
// //     ['link', 'image'],
// //     ['clean'],
// //   ],
// // }

import tw from 'twin.macro'
import React from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const Quill = dynamic(
  () => import('react-quill').then(module => module.Quill),
  { ssr: false },
)

const modules = {
  toolbar: {
    container: '#toolbar',
    // handlers: {
    //   insertHeart: insertHeart,
    // },
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
        // theme=''
      />

      <FlexPannel>
        {/* CustomToolbar */}
        <Toolbar id="toolbar">
          <select className="ql-font">
            <option value="arial" selected>
              Arial
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
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
          <button className="ql-clean" />
        </Toolbar>

        <MUIButton>Send</MUIButton>
      </FlexPannel>
    </div>
  )
}

// Tailwind styles
const FlexPannel = tw.div`mt-5 space-y-2 lg:(flex items-center space-y-0 space-x-4)`
const Toolbar = tw.div`bg-blue-light`
const MUIButton = tw(
  Button,
)`text-white bg-paysure-100 text-sm py-2.5 normal-case px-11 lg:(py-4)`

export default TextEditor
