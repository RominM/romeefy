export const useFormatTime = (time: number, pretty = false) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60).toString().padStart(2, "0")
  return pretty ? `${minutes} m ${seconds} s` : `${minutes}:${seconds}`
}