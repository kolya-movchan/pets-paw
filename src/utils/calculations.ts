export const getCurrentTime = (time: string) => {
  return new Date(time).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}