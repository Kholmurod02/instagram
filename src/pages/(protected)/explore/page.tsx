import { useEffect, useState } from "react";

const mockImages = [
  { id: 1, url: "https://source.unsplash.com/random/300x300?sig=1" },
  { id: 2, url: "https://source.unsplash.com/random/300x300?sig=2" },
  { id: 3, url: "https://source.unsplash.com/random/300x300?sig=3" },
  { id: 4, url: "https://source.unsplash.com/random/300x300?sig=4" },
  { id: 5, url: "https://source.unsplash.com/random/300x300?sig=5" },
  { id: 6, url: "https://source.unsplash.com/random/300x300?sig=6" },
  { id: 7, url: "https://source.unsplash.com/random/300x300?sig=7" },
  { id: 8, url: "https://source.unsplash.com/random/300x300?sig=8" },
  { id: 9, url: "https://source.unsplash.com/random/300x300?sig=9" },
  { id: 10, url: "https://source.unsplash.com/random/300x300?sig=10" },
];

export default function ExplorePage() {
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);

  useEffect(() => {
    setImages(mockImages);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {images.map((image) => (
          <div key={image.id} className="w-full aspect-square overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={`Explore ${image.id}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
