import { CLICK_EVENT } from '../const.js'
import emitter from '../emitter.js'

function click () {
  window.addEventListener('click', e => {
    const width = document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth
    console.log(width, e.pageX, e.pageY, e)
    emitter.emit(CLICK_EVENT, {x: e.pageX, y: e.pageY})
  })
}

export default click
