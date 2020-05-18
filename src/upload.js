import { CLICK_EVENT, SCROLL_EVENT } from './const.js'
import emitter from './emitter.js'

function upload () {
  emitter.on(CLICK_EVENT, (event) => {
    console.log('upload click', event)
  })
  emitter.on(SCROLL_EVENT, (event) => {
    // console.log('upload scroll', event)
  })
}

export default upload
