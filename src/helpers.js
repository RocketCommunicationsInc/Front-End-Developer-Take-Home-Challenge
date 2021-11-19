export function calculateTime(beginTime, endTime) {
  // Check for undefined if data is still being set
  if (!(beginTime === undefined && endTime === undefined)) {
    return Math.abs(beginTime - endTime) / 60;
  }
}
