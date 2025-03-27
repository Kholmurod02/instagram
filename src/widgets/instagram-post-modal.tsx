import type React from 'react'
import { useState, useRef, type ChangeEvent, useEffect } from 'react'
import {
	ChevronLeft,
	ChevronRight,
	MapPin,
	Users,
	Settings,
	Info,
	X,
	Plus,
	Play,
} from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/ui/tooltip'
import { cn } from '../shared/lib/utils'
import Normal from '../assets/Normal.jpg'
import Clarendon from '../assets/Clarendon.jpg'
import Gingham from '../assets/Gingham.jpg'
import Moon from '../assets/Moon.jpg'
import Lark from '../assets/Lark.jpg'
import Juno from '../assets/Juno.jpg'
import Aden from '../assets/Aden.jpg'
import Crema from '../assets/Crema.jpg'
import Ludwig from '../assets/Ludwig.jpg'
import Perpetua from '../assets/Perpetua.jpg'
import Reyes from '../assets/Reyes.jpg'
import Slumber from '../assets/Slumber.jpg'
import { useAddPostMutation } from '@/entities/post/postApi'

type Step = 'upload' | 'crop' | 'edit' | 'details'
type Filter =
	| 'Original'
	| 'Clarendon'
	| 'Gingham'
	| 'Moon'
	| 'Lark'
	| 'Juno'
	| 'Aden'
	| 'Crema'
	| 'Ludwig'
	| 'Perpetua'
	| 'Reyes'
	| 'Slumber'

type TabType = 'filters' | 'adjustments'

export default function InstagramPostModal({
	setOpen,
	open,
 }: {
	open: boolean
	setOpen: (open: boolean) => void
 }) {
	const [AddPost, { isLoading }] = useAddPostMutation()
	const [selectedImages, setSelectedImages] = useState<
	  Array<{
		 originalFile: File
		 previewUrl: string
		 type?: "image" | "video" // Make type optional with a default
	  }>
	>([])
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [filter, setFilter] = useState<Filter>("Original")
	const [filterStrength, setFilterStrength] = useState(100)
	const [activeTab, setActiveTab] = useState<TabType>("filters")
	const [adjustments, setAdjustments] = useState({
	  brightness: 0,
	  contrast: 0,
	  fade: 0,
	  saturation: 0,
	  temperature: 0,
	  vignette: 0,
	})
	const [caption, setCaption] = useState("")
	const [location, setLocation] = useState("")
	const [showLocationInput, setShowLocationInput] = useState(false)
	const [collaborators, setCollaborators] = useState<string[]>([])
	const [showCollaboratorInput, setShowCollaboratorInput] = useState(false)
	const [collaboratorInput, setCollaboratorInput] = useState("")
	const [balloonImageLoaded, setBalloonImageLoaded] = useState(false)
	const [step, setStep] = useState<Step>("upload")
	const fileInputRef = useRef<HTMLInputElement>(null)
 
	const fileToBase64 = (file: File): Promise<string> => {
	  return new Promise((resolve, reject) => {
		 const reader = new FileReader()
		 reader.readAsDataURL(file)
		 reader.onload = () => resolve(reader.result as string)
		 reader.onerror = (error) => reject(error)
	  })
	}
 
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
	  const files = e.target.files
	  if (files && files.length > 0) {
		 const fileArray = Array.from(files)
		 const base64Urls = await Promise.all(
			fileArray.map(async (file) => ({
			  originalFile: file,
			  previewUrl: await fileToBase64(file),
			  type: file.type.startsWith("video/") ? "video" : "image",
			})),
		 )
		 setSelectedImages(base64Urls)
		 setCurrentImageIndex(0)
		 setStep("crop")
	  }
	}
 
	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
	  e.preventDefault()
	  const files = e.dataTransfer.files
	  if (files && files.length > 0) {
		 const mediaFiles = Array.from(files).filter(
			(file) => file.type.startsWith("image/") || file.type.startsWith("video/"),
		 )
		 if (mediaFiles.length > 0) {
			const base64Urls = await Promise.all(
			  mediaFiles.map(async (file) => ({
				 originalFile: file,
				 previewUrl: await fileToBase64(file),
				 type: file.type.startsWith("video/") ? "video" : "image",
			  })),
			)
			setSelectedImages(base64Urls)
			setCurrentImageIndex(0)
			setStep("crop")
		 }
	  }
	}
 
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
	  e.preventDefault()
	}
 
	const handlePost = async () => {
	  const formData = new FormData()
	  for (const image of selectedImages) {
		 formData.append("Images", image.originalFile)
	  }
	  formData.append("Content", caption)
	  try {
		 await AddPost(formData)
		 resetModal()
	  } catch (error) {
		 console.error(error)
	  }
	}
 
	const handleNext = () => {
	  if (step === "crop") setStep("edit")
	  else if (step === "edit") setStep("details")
	}
 
	const handleBack = () => {
	  if (step === "crop") {
		 setStep("upload")
		 setSelectedImages([])
	  } else if (step === "edit") setStep("crop")
	  else if (step === "details") setStep("edit")
	}
 
	const resetModal = () => {
	  setOpen(false)
	  setStep("upload")
	  setSelectedImages([])
	  setCurrentImageIndex(0)
	  setFilter("Original")
	  setFilterStrength(100)
	  setActiveTab("filters")
	  setAdjustments({
		 brightness: 0,
		 contrast: 0,
		 fade: 0,
		 saturation: 0,
		 temperature: 0,
		 vignette: 0,
	  })
	  setCaption("")
	  setLocation("")
	  setCollaborators([])
	}
 
	const handleAdjustmentChange = (type: keyof typeof adjustments, value: number) => {
	  setAdjustments((prev) => ({
		 ...prev,
		 [type]: value,
	  }))
	}
 
	const nextImage = () => {
	  if (currentImageIndex < selectedImages.length - 1) {
		 setCurrentImageIndex((prev) => prev + 1)
	  }
	}
 
	const prevImage = () => {
	  if (currentImageIndex > 0) {
		 setCurrentImageIndex((prev) => prev - 1)
	  }
	}
 
	const addCollaborator = () => {
	  if (collaboratorInput.trim() && !collaborators.includes(collaboratorInput.trim())) {
		 setCollaborators((prev) => [...prev, collaboratorInput.trim()])
		 setCollaboratorInput("")
	  }
	  setShowCollaboratorInput(false)
	}
 
	const removeCollaborator = (collaborator: string) => {
	  setCollaborators((prev) => prev.filter((c) => c !== collaborator))
	}
 
	const filterPreviews: Record<Filter, string> = {
	  Original: Normal,
	  Clarendon: Clarendon,
	  Gingham: Gingham,
	  Moon: Moon,
	  Lark: Lark,
	  Juno: Juno,
	  Aden: Aden,
	  Crema: Crema,
	  Ludwig: Ludwig,
	  Perpetua: Perpetua,
	  Reyes: Reyes,
	  Slumber: Slumber,
	}
 
	useEffect(() => {
	  const img = new Image()
	  img.src = Normal
	  img.onload = () => setBalloonImageLoaded(true)
	}, [])
 
	const getFilterStyle = (filterName: Filter) => {
	  switch (filterName) {
		 case "Clarendon":
			return "brightness(1.1) contrast(1.2) saturate(1.3)"
		 case "Gingham":
			return "brightness(1.05) sepia(0.15) contrast(0.9) hue-rotate(5deg)"
		 case "Moon":
			return "grayscale(1) brightness(1.1) contrast(1.1)"
		 case "Lark":
			return "brightness(1.08) contrast(0.95) saturate(1.15) sepia(0.1)"
		 case "Juno":
			return "brightness(1.05) contrast(1.1) saturate(1.25) hue-rotate(355deg)"
		 case "Aden":
			return "brightness(1.05) sepia(0.2) contrast(0.9) saturate(1.1) hue-rotate(5deg)"
		 case "Crema":
			return "brightness(1.05) sepia(0.15) contrast(0.9) saturate(0.9) hue-rotate(5deg)"
		 case "Ludwig":
			return "brightness(1.05) contrast(1.05) saturate(1.05) sepia(0.1)"
		 case "Perpetua":
			return "brightness(1.05) contrast(1.1) saturate(0.75) hue-rotate(5deg)"
		 case "Reyes":
			return "brightness(1) contrast(0.85) saturate(0.75) sepia(0.22)"
		 case "Slumber":
			return "brightness(1) contrast(0.9) saturate(0.85) sepia(0.1)"
		 default:
			return "none"
	  }
	}
 
	const getAdjustmentStyle = () => {
	  return {
		 filter: `
			brightness(${1 + adjustments.brightness / 100})
			contrast(${1 + adjustments.contrast / 100})
			opacity(${1 - adjustments.fade / 100})
			saturate(${1 + adjustments.saturation / 100})
			${
			  adjustments.temperature > 0
				 ? `sepia(${adjustments.temperature / 100})`
				 : `hue-rotate(${adjustments.temperature}deg)`
			}
		 `,
		 boxShadow:
			adjustments.vignette > 0
			  ? `inset 0 0 ${adjustments.vignette * 5}px rgba(0,0,0,${adjustments.vignette / 50})`
			  : "none",
	  }
	}
 
	const renderStepContent = () => {
	  switch (step) {
		 case "upload":
			return (
			  <div
				 className="flex flex-col items-center justify-center h-[400px] w-full"
				 onDrop={handleDrop}
				 onDragOver={handleDragOver}
			  >
				 <svg
					aria-label="Значок, соответствующий медиафайлам, например изображениям или видео"
					className="x1lliihq x1n2onr6 x5n08af"
					fill="currentColor"
					height="77"
					role="img"
					viewBox="0 0 97.6 77.3"
					width="96"
				 >
					<title>Значок, соответствующий медиафайлам, например изображениям или видео</title>
					<path
					  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
					  fill="currentColor"
					></path>
					<path
					  d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
					  fill="currentColor"
					></path>
					<path
					  d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
					  fill="currentColor"
					></path>
				 </svg>
 
				 <p className="text-lg mb-4">Drag photos and videos here</p>
				 <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-500 hover:bg-blue-600 text-white">
					Select from computer
				 </Button>
				 <input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept="image/*,video/*"
					multiple
					className="hidden"
				 />
			  </div>
			)
 
		 case "crop":
			return (
			  <div className="flex flex-col h-[500px]">
				 <div className="flex-1 relative overflow-hidden">
					{selectedImages.length > 0 && (
					  <div className="relative w-full h-full">
						 {selectedImages[currentImageIndex].type === "video" ? (
							<video
							  src={selectedImages[currentImageIndex].previewUrl}
							  className="object-contain w-full h-full"
							  controls
							  autoPlay
							  muted
							  loop
							/>
						 ) : (
							<img
							  src={selectedImages[currentImageIndex].previewUrl || "/placeholder.svg"}
							  alt="Selected image"
							  className="object-contain w-full h-full"
							/>
						 )}
 
						 {selectedImages.length > 1 && (
							<>
							  <Button
								 variant="ghost"
								 size="icon"
								 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full h-8 w-8 p-0"
								 onClick={prevImage}
								 disabled={currentImageIndex === 0}
							  >
								 <ChevronLeft className="h-5 w-5" />
							  </Button>
							  <Button
								 variant="ghost"
								 size="icon"
								 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full h-8 w-8 p-0"
								 onClick={nextImage}
								 disabled={currentImageIndex === selectedImages.length - 1}
							  >
								 <ChevronRight className="h-5 w-5" />
							  </Button>
							</>
						 )}
					  </div>
					)}
				 </div>
 
				 {selectedImages.length > 1 && (
					<div className="flex justify-center gap-2 p-2 bg-[#1a1a1a]">
					  {selectedImages.map((img, index) => (
						 <div
							key={index}
							className={cn(
							  "w-10 h-10 relative rounded overflow-hidden cursor-pointer border-2",
							  index === currentImageIndex ? "border-blue-500" : "border-transparent",
							)}
							onClick={() => setCurrentImageIndex(index)}
						 >
							{img.type === "video" && (
							  <div className="absolute top-0 right-0 bg-black/50 p-0.5 rounded-bl">
								 <Play className="h-2 w-2 text-white" />
							  </div>
							)}
							<img
							  src={img.previewUrl || "/placeholder.svg"}
							  alt={`Thumbnail ${index + 1}`}
							  className="object-cover w-full h-full"
							/>
						 </div>
					  ))}
					</div>
				 )}
			  </div>
			)
 
		 case "edit":
			return (
			  <div className="flex h-auto">
				 <div className="flex-1 relative overflow-hidden">
					{selectedImages.length > 0 && (
					  <div className="relative w-full h-full">
						 {selectedImages[currentImageIndex].type === "video" ? (
							<div className="w-full h-full">
							  <video
								 src={selectedImages[currentImageIndex].previewUrl}
								 className="object-contain w-full h-full"
								 controls
								 autoPlay
								 muted
								 loop
								 style={{
									filter: filter !== "Original" ? getFilterStyle(filter) : "none",
								 }}
							  />
							</div>
						 ) : (
							<img
							  src={selectedImages[currentImageIndex].previewUrl || "/placeholder.svg"}
							  className="object-contain w-full h-full"
							  style={{
								 ...getAdjustmentStyle(),
								 filter: `${getAdjustmentStyle().filter} ${filter !== "Original" ? getFilterStyle(filter) : ""}`,
							  }}
							/>
						 )}
 
						 {selectedImages.length > 1 && (
							<>
							  <Button
								 variant="ghost"
								 size="icon"
								 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full h-8 w-8 p-0"
								 onClick={prevImage}
								 disabled={currentImageIndex === 0}
							  >
								 <ChevronLeft className="h-5 w-5" />
							  </Button>
							  <Button
								 variant="ghost"
								 size="icon"
								 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full h-8 w-8 p-0"
								 onClick={nextImage}
								 disabled={currentImageIndex === selectedImages.length - 1}
							  >
								 <ChevronRight className="h-5 w-5" />
							  </Button>
							</>
						 )}
					  </div>
					)}
				 </div>
				 <div className="w-[250px] bg-[#262626] p-4">
					<div className="flex gap-2 mb-4">
					  <button
						 onClick={() => setActiveTab("filters")}
						 className={cn(
							"flex-1 py-2 text-sm",
							activeTab === "filters" ? "text-blue-500 border-b border-blue-500" : "text-gray-400",
						 )}
					  >
						 Filters
					  </button>
					  <button
						 onClick={() => setActiveTab("adjustments")}
						 className={cn(
							"flex-1 py-2 text-sm",
							activeTab === "adjustments" ? "text-blue-500 border-b border-blue-500" : "text-gray-400",
						 )}
					  >
						 Adjustments
					  </button>
					</div>
 
					{activeTab === "filters" && (
					  <div className="grid grid-cols-3 gap-2">
						 {[
							"Original",
							"Clarendon",
							"Gingham",
							"Moon",
							"Lark",
							"Juno",
							"Aden",
							"Crema",
							"Ludwig",
							"Perpetua",
							"Reyes",
							"Slumber",
						 ].map((filterName) => (
							<div
							  key={filterName}
							  className={cn(
								 "cursor-pointer flex flex-col items-center",
								 filter === filterName && "text-blue-500",
							  )}
							  onClick={() => setFilter(filterName as Filter)}
							>
							  <div className="w-16 h-16 rounded overflow-hidden mb-1">
								 {balloonImageLoaded ? (
									<img
									  // eslint-disable-next-line no-constant-binary-expression
									  src={filterPreviews[filterName as Filter] || "/placeholder.svg" || "/placeholder.svg"}
									  alt={filterName}
									  className="object-cover w-full h-full"
									  style={{
										 filter: filterName !== "Original" ? getFilterStyle(filterName as Filter) : "none",
									  }}
									/>
								 ) : (
									<div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-xs">
									  Loading...
									</div>
								 )}
							  </div>
							  <span className="text-xs">{filterName}</span>
							</div>
						 ))}
					  </div>
					)}
 
					{activeTab === "adjustments" && (
					  <div className="space-y-6">
						 {Object.entries(adjustments).map(([key, value]) => (
							<div key={key} className="space-y-2">
							  <div className="flex justify-between">
								 <span className="text-sm capitalize">{key}</span>
								 <span className="text-sm">{value}</span>
							  </div>
							  <input
								 type="range"
								 min={-50}
								 max={50}
								 value={value}
								 onChange={(e) =>
									handleAdjustmentChange(key as keyof typeof adjustments, Number(e.target.value))
								 }
								 className="
									w-full
									h-[2px]
									bg-black
									rounded-full
									appearance-none
									cursor-pointer
									[&::-webkit-slider-thumb]:h-4
									[&::-webkit-slider-thumb]:w-4
									[&::-webkit-slider-thumb]:bg-white
									[&::-webkit-slider-thumb]:rounded-full
									[&::-webkit-slider-thumb]:border-2
									[&::-webkit-slider-thumb]:appearance-none
									[&::-moz-range-thumb]:h-4
									[&::-moz-range-thumb]:w-4
									[&::-moz-range-thumb]:bg-white
									[&::-moz-range-thumb]:rounded-full
									[&::-moz-range-thumb]:border-2
								 "
							  />
							</div>
						 ))}
					  </div>
					)}
 
					{filter !== "Original" && activeTab === "filters" && (
					  <div className="mt-4">
						 <div className="flex justify-between mb-1">
							<span className="text-sm">Filter Strength</span>
							<span className="text-sm">{filterStrength}</span>
						 </div>
						 <input
							type="range"
							min={0}
							max={100}
							value={filterStrength}
							onChange={(e) => setFilterStrength(Number(e.target.value))}
							className="w-full"
						 />
					  </div>
					)}
				 </div>
			  </div>
			)
 
		 case "details":
			return (
			  <div className="flex h-[500px]">
				 <div className="flex-1 relative overflow-hidden">
					{selectedImages.length > 0 && (
					  <div className="relative w-full h-full">
						 {selectedImages[currentImageIndex].type === "video" ? (
							<div className="w-full h-full">
							  <video
								 src={selectedImages[currentImageIndex].previewUrl}
								 className="object-contain w-full h-full"
								 controls
								 autoPlay
								 muted
								 loop
								 style={{
									filter: filter !== "Original" ? getFilterStyle(filter) : "none",
								 }}
							  />
							</div>
						 ) : (
							<img
							  src={selectedImages[currentImageIndex].previewUrl || "/placeholder.svg"}
							  className="object-contain w-full h-full"
							  style={{
								 ...getAdjustmentStyle(),
								 filter: `${getAdjustmentStyle().filter} ${filter !== "Original" ? getFilterStyle(filter) : ""}`,
							  }}
							/>
						 )}
 
						 {selectedImages.length > 1 && (
							<>
							  <Button
								 variant="ghost"
								 size="icon"
								 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full h-8 w-8 p-0"
								 onClick={prevImage}
								 disabled={currentImageIndex === 0}
							  >
								 <ChevronLeft className="h-5 w-5" />
							  </Button>
							  <Button
								 variant="ghost"
								 size="icon"
								 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full h-8 w-8 p-0"
								 onClick={nextImage}
								 disabled={currentImageIndex === selectedImages.length - 1}
							  >
								 <ChevronRight className="h-5 w-5" />
							  </Button>
							</>
						 )}
					  </div>
					)}
				 </div>
				 <div className="w-[250px] bg-[#222121] p-4 space-y-4 overflow-y-auto">
					<div className="flex items-center gap-2">
					  <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden">
						 <img
							src={Normal || "/placeholder.svg"}
							width={32}
							height={32}
							alt="Profile"
							className="object-cover"
						 />
					  </div>
					  <span className="text-sm text-white">User</span>
					</div>
 
					<div className="relative">
					  <textarea
						 className="w-full h-20 bg-transparent text-white text-sm resize-none border-none focus:outline-none focus:ring-0 p-0"
						 placeholder="Write a caption..."
						 value={caption}
						 onChange={(e) => setCaption(e.target.value)}
						 maxLength={2200}
					  />
					  <div className="absolute bottom-1 right-1 text-xs text-gray-400">{caption.length}/2,200</div>
					</div>
 
					<div className="flex items-center justify-between py-1">
					  {showLocationInput ? (
						 <div className="flex items-center w-full">
							<Input
							  className="flex-1 h-8 border-none outline-none text-white text-sm"
							  placeholder="Add location..."
							  value={location}
							  onChange={(e) => setLocation(e.target.value)}
							/>
							<Button
							  variant="ghost"
							  size="icon"
							  className="ml-2 text-white h-8 w-8"
							  onClick={() => setShowLocationInput(false)}
							>
							  <X className="h-4 w-4" />
							</Button>
						 </div>
					  ) : (
						 <>
							<span className="text-sm text-white">{location ? location : "Add location"}</span>
							<Button
							  variant="ghost"
							  size="icon"
							  className="text-white h-8 w-8"
							  onClick={() => setShowLocationInput(true)}
							>
							  <MapPin className="w-5 h-5" />
							</Button>
						 </>
					  )}
					</div>
 
					<div className="flex flex-col py-1">
					  <div className="flex items-center justify-between">
						 <span className="text-sm text-white">Add collaborators</span>
						 <Button
							variant="ghost"
							size="icon"
							className="text-white h-8 w-8"
							onClick={() => setShowCollaboratorInput(true)}
						 >
							<Users className="w-5 h-5" />
						 </Button>
					  </div>
 
					  {showCollaboratorInput && (
						 <div className="flex items-center mt-2">
							<Input
							  className="flex-1 h-8 bg-[#363636] border-none text-white text-sm"
							  placeholder="Username"
							  value={collaboratorInput}
							  onChange={(e) => setCollaboratorInput(e.target.value)}
							/>
							<Button variant="ghost" size="icon" className="ml-2 text-white h-8 w-8" onClick={addCollaborator}>
							  <Plus className="h-4 w-4" />
							</Button>
						 </div>
					  )}
 
					  {collaborators.length > 0 && (
						 <div className="mt-2 space-y-2">
							{collaborators.map((collaborator) => (
							  <div
								 key={collaborator}
								 className="flex items-center justify-between bg-[#363636] rounded px-2 py-1"
							  >
								 <span className="text-sm text-white">{collaborator}</span>
								 <Button
									variant="ghost"
									size="icon"
									className="text-white h-6 w-6"
									onClick={() => removeCollaborator(collaborator)}
								 >
									<X className="h-3 w-3" />
								 </Button>
							  </div>
							))}
						 </div>
					  )}
					</div>
 
					<TooltipProvider>
					  <div className="flex items-center justify-between py-1">
						 <span className="text-sm text-white">Accessibility</span>
						 <Tooltip>
							<TooltipTrigger asChild>
							  <Button variant="ghost" size="icon" className="text-white h-8 w-8">
								 <Info className="w-5 h-5" />
							  </Button>
							</TooltipTrigger>
							<TooltipContent>
							  <p>Add alt text to your images</p>
							</TooltipContent>
						 </Tooltip>
					  </div>
					</TooltipProvider>
 
					<TooltipProvider>
					  <div className="flex items-center justify-between py-1">
						 <span className="text-sm text-white">Advanced settings</span>
						 <Tooltip>
							<TooltipTrigger asChild>
							  <Button variant="ghost" size="icon" className="text-white h-8 w-8">
								 <Settings className="w-5 h-5" />
							  </Button>
							</TooltipTrigger>
							<TooltipContent>
							  <p>Configure additional post settings</p>
							</TooltipContent>
						 </Tooltip>
					  </div>
					</TooltipProvider>
				 </div>
			  </div>
			)
 
		 default:
			return null
	  }
	}
 
	const getDialogTitle = () => {
	  switch (step) {
		 case "upload":
			return "Create new post"
		 case "crop":
			return "Crop"
		 case "edit":
			return "Edit"
		 case "details":
			return "Create new post"
		 default:
			return "Create new post"
	  }
	}
 
	const getActionButton = () => {
	  switch (step) {
		 case "crop":
		 case "edit":
			return (
			  <Button variant="link" className="text-blue-500 hover:text-blue-600 font-semibold" onClick={handleNext}>
				 Next
			  </Button>
			)
		 case "details":
			return (
			  <Button
				 variant="link"
				 className="text-blue-500 hover:text-blue-600 font-semibold"
				 onClick={handlePost}
				 disabled={isLoading}
			  >
				 {isLoading ? "Uploading..." : "Share"}
			  </Button>
			)
		 default:
			return null
	  }
	}
 
	return (
	  <Dialog open={open} onOpenChange={setOpen}>
		 <DialogContent
			aria-describedby={undefined}
			className="sm:max-w-[500px] p-0 bg-[#272525] text-white border-gray-800 outline-none"
		 >
			<DialogHeader className="gap-0 bg-black rounded-t-md border-b border-gray-800 p-4 flex flex-row items-center justify-between">
			  {step !== "upload" && (
				 <Button variant="ghost" size="icon" className="text-white mr-auto" onClick={handleBack}>
					<ChevronLeft className="h-5 w-5" />
				 </Button>
			  )}
			  <DialogTitle className="text-center flex-1">{getDialogTitle()}</DialogTitle>
			  {getActionButton()}
			</DialogHeader>
			{renderStepContent()}
		 </DialogContent>
	  </Dialog>
	)
 }
