/**
 * Renders the image with the given CSS filter string onto a canvas and
 * triggers a PNG download. Uses the same filter grammar as the preview
 * (CanvasRenderingContext2D.filter).
 */
export function downloadFilteredImage(
  imageSrc: string,
  filterCss: string,
  filename = 'edited-image.png'
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('2D canvas context is not available'))
        return
      }

      ctx.filter = filterCss
      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Could not encode image'))
            return
          }
          const url = URL.createObjectURL(blob)
          const anchor = document.createElement('a')
          anchor.href = url
          anchor.download = filename
          anchor.rel = 'noopener'
          anchor.click()
          URL.revokeObjectURL(url)
          resolve()
        },
        'image/png',
        1
      )
    }

    img.onerror = () => reject(new Error('Failed to load image for export'))
    img.src = imageSrc
  })
}
