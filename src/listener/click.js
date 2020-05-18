/* 页面点击, 记 body 点击坐标 */
import { CLICK_EVENT } from '../const.js'
import emitter from '../emitter.js'

function click () {
  document.addEventListener('click', e => {
    const width = document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth
    emitter.emit(CLICK_EVENT, {x: e.pageX, y: e.pageY})
  }, {
    passive: true,
    capture: true
  })
}

export default click
