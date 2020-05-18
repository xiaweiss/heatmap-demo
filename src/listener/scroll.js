/* 页面触达率，取最大滚动距离 */
import { SCROLL_EVENT } from '../const.js'
import emitter from '../emitter.js'

function scroll () {
  let timer = null
  let maxScrollTop = 0
  document.addEventListener('scroll', e => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      // TODO 处理 SPA 多页面的情况
      if (scrollTop > maxScrollTop) {
        maxScrollTop = scrollTop
      }
      emitter.emit(SCROLL_EVENT, maxScrollTop)
      timer = null
    }, 200)
  }, {
    passive: true,
    capture: true
  })
}

export default scroll
