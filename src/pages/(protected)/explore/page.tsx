import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

const mockImages = [
  { id: 1, url: "https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", likes: 120, comments: 45 },
  { id: 2, url: "https://media0.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif", likes: 95, comments: 18 },
  { id: 3, url: "https://media4.giphy.com/media/26BRrSvJUa0crqw4E/giphy.gif", likes: 150, comments: 22 },
  { id: 4, url: "https://media2.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif", likes: 87, comments: 12 },
  { id: 5, url: "https://media2.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif", likes: 200, comments: 55 },
  { id: 6, url: "https://media2.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif", likes: 111, comments: 30 },
  { id: 7, url: "https://media2.giphy.com/media/l41lVSYDBC0UVQJCE/giphy.gif", likes: 97, comments: 15 },
  { id: 8, url: "https://media2.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif", likes: 132, comments: 27 },
  { id: 9, url: "https://media2.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif", likes: 76, comments: 8 },
  { id: 10, url: "https://media1.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif", likes: 143, comments: 41 },
];

export default function ExplorePage() {
  const [images, setImages] = useState<
    { id: number; url: string; likes: number; comments: number }[]
  >([]);

  useEffect(() => {
    setImages(mockImages);
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>

      <div className="grid grid-cols-3 gap-2 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px]">
        {images.map((image, index) => {
          const isBig = (index + 1) % 4 === 0;

          return (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-md group cursor-pointer ${
                isBig ? "col-span-3 row-span-2 md:row-span-3" : ""
              }`}
            >
              {/* Image */}
              <img
                src={image.url}
                alt={`Explore ${image.id}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-4 text-white text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{image.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{image.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
