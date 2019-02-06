let i = 0

export const getTip = () => {
  const tips = [
    '>: Here the server finds your approximate location and gives the server a hint as to find who is closeby, it may take a moment, so be patient!',
    '>: I support Giphy! wrap a keyword with ":" like :react: or :firebase:! ',
    '>: Windows 95, when released, only needed 50 MB of space, Windows 10 weighs 400 times that!',
    '>: Chicago was the internal codename for Windows 95 used during development!',
    '>: Not finding anyone? try setting a wider radius!'
  ]
  const result = tips[i]
  ++i
  if (i > tips.length) {
    i = 1
  }
  return result
}
