import click from './src/listener/click.js'

void function () {
  document.addEventListener('DOMContentLoaded', () => {
    click()
  })
}()

// function pageReady (callback) {
//   if (document.addEventListener) {
//     document.addEventListener('DOMContentLoaded', () => {
//       callback()
//     })
//   } else if (document.attachEvent) {
//     document.attachEvent('onreadystatechange', () => {
//       if (document.readyState == "complete") {
//           document.detachEvent("onreadystatechange", arguments.callee);
//           callback();
//        }
//     })
//   }
// }
