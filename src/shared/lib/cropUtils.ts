export const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
	  const image = new Image()
	  image.addEventListener('load', () => resolve(image))
	  image.addEventListener('error', (error) => reject(error))
	  image.setAttribute('crossOrigin', 'anonymous')
	  image.src = url
	})
 
 export async function getCroppedImg(
	imageSrc: string,
	pixelCrop: { width: number; height: number; x: number; y: number },
	rotation = 0
 ): Promise<string> {
	const image = await createImage(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
 
	if (!ctx) {
	  return ''
	}
 
	const maxSize = Math.max(image.width, image.height)
	const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))
 
	canvas.width = safeArea
	canvas.height = safeArea
 
	ctx.translate(safeArea / 2, safeArea / 2)
	ctx.rotate((rotation * Math.PI) / 180)
	ctx.translate(-safeArea / 2, -safeArea / 2)
 
	ctx.drawImage(
	  image,
	  safeArea / 2 - image.width * 0.5,
	  safeArea / 2 - image.height * 0.5
	)
 
	const data = ctx.getImageData(0, 0, safeArea, safeArea)
 
	canvas.width = pixelCrop.width
	canvas.height = pixelCrop.height
 
	ctx.putImageData(
	  data,
	  0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
	  0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
	)
 
	return canvas.toDataURL('image/jpeg')
 }