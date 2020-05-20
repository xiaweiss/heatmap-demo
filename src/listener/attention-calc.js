/* 页面注意力, 记分区的停留时长 */
import { ATTENTION_EVENT, attentionUnit } from '../const.js'
import emitter from '../emitter.js'

function attention () {
  let timer = null
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  let screenHeight = document.documentElement.clientHeight // TODO 动态元素增加页面高度问题

  const scrollHeight = document.documentElement.scrollHeight // TODO 动态元素增加页面高度问题
  const screenShotTime = 300
  const blockHeight = 100
  const blockList = new Array(Math.ceil(scrollHeight/blockHeight)).fill('').map((v,k) => ({no: k, inScreen: false, exposeTime: 0, enterTime: 0}))

  updateBlockList({blockList, blockHeight, scrollTop, screenHeight})

  document.addEventListener('resize', e => {
    requestAnimationFrame(() => {
      screenHeight = document.documentElement.clientHeight
    })
  }, { passive: true })

  document.addEventListener('scroll', e => {
    if (Date.now() - timer < screenShotTime) {
      return
    }
    timer = Date.now()
    requestAnimationFrame(() => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      updateBlockList({blockList, blockHeight, scrollTop, screenHeight})
      emitter.emit(ATTENTION_EVENT, blockList)
      timer = null
    })
    emitter.emit(ATTENTION_EVENT, blockList)
  }, {
    passive: true,
    capture: true
  })

  // 离开页面前发送数据
  window.addEventListener('beforeunload', () => {
    updateBlockList({blockList, blockHeight, scrollTop, screenHeight})
    emitter.emit(ATTENTION_EVENT, blockList)
  })
}

/**
 * 计算并更新页面分块的数据
 * @param {array}  blockList    页面分块数据
 * @param {number} blockHeight  页面分块每块高度
 * @param {number} scrollTop    页面滚动高度
 * @param {number} screenHeight 窗口高度
 */
function updateBlockList({blockList, blockHeight, scrollTop, screenHeight}) {
  const startNo = Math.floor(scrollTop / blockHeight)
  const endNo = Math.floor((scrollTop + screenHeight) / blockHeight)

  // console.log('startNo', startNo, scrollTop)
  // console.log('endNo', endNo, scrollTop + screenHeight)

  blockList.forEach((item) => {
    if (item.no >= startNo && item.no <= endNo) {
      // 从外部进入屏幕的，先设定进入时间，等下次滚动再计算时间
      if(!item.inScreen) {
        item.inScreen = true
        item.enterTime = Date.now()
        // 原先在屏幕内的
      } else {
        // 处理来回滚动的情况，取单次停留的最大值
        const newTime = Date.now() - item.enterTime
        if (newTime > item.exposeTime) {
          item.exposeTime = newTime
        }
      }
    } else {
      // 离开屏幕的
      item.inScreen = false
      item.enterTime = 0
    }
  })
}

export default attention

// https://juejin.im/post/5ced34d5f265da1b94212a6f
