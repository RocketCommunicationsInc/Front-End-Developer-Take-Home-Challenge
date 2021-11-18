export function timeFormat(seconds) {
  seconds = Number(seconds)
  var h = ~~(seconds / 3600)
  var m = ~~(seconds % 3600 / 60)
  var s = ~~(seconds % 3600 % 60)

  var hDisplay = h > 0 ? h + 'h' : ''
  var mDisplay = m > 0 ? m + 'm' : ''
  var sDisplay = s > 0 ? s + 's' : ''

  return `${hDisplay}${mDisplay}${sDisplay}`
}
