/* 页面注意力, 记分区的停留时长 */
import { ATTENTION_EVENT, attentionUnit } from '../const.js'
import emitter from '../emitter.js'

function attention () {
  const attentionDistance = 100
  const attentionTime = 1000
  const dataList = []
  let timer = null
  let timeCur = Date.now()
  let timePrev = timeCur

  document.addEventListener('scroll', e => {

    timer = requestAnimationFrame(() => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      dataList.push(scrollTop)

      // emitter.emit(ATTENTION_EVENT, maxScrollTop)
      timer = null
    })

    console.log(dataList)
    // emitter.emit(ATTENTION_EVENT, {x: e.pageX, y: e.pageY})
  }, {
    passive: true,
    capture: true
  })
}

export default attention

// https://juejin.im/post/5ced34d5f265da1b94212a6f
