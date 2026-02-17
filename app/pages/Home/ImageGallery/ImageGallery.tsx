import { useState } from "react";
import "./ImageGallery.css";
import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
const ImageGallery = () => {
  let images = [
    {
      id: 1,
      imgSrc:
        "https://i.ibb.co.com/7xZM6b78/471311505-10227378204065496-7971507133744482136-n.jpg",
      title: "Griya Asri Tamansari",
    },
    {
      id: 2,
      imgSrc:
        "https://i.ibb.co.com/qL5Sm4kg/465786308-10226765957439713-8176847405436800613-n.jpg",
      title: "Permata Indah Residence",
    },
    {
      id: 3,
      imgSrc:
        "https://i.ibb.co.com/GQ0C4bgC/468713769-10227298280067446-6490587048174653812-n.jpg",
      title: "Griya Tamansari",
    },
    {
      id: 4,
      imgSrc:
        "https://i.ibb.co.com/RpRvQbnm/470800259-10227358296047808-6372762768870687431-n.jpg",
      title: "Griya Asri Tamansari",
    },
    {
      id: 40,
      imgSrc:
        "https://i.ibb.co.com/Rp1gsNpP/469984122-10227317563949531-813178449160652580-n.jpg",
      title: "Griya Asri Tamansari",
    },
    {
      id: 5,
      imgSrc:
        "https://i.ibb.co.com/fzyLq8pt/468698174-10227261960639483-8790892771645815375-n.jpg",
      title: "Permata Indah Residence",
    },
    {
      id: 6,
      imgSrc:
        "https://i.ibb.co.com/fzyLq8pt/468698174-10227261960639483-8790892771645815375-n.jpg",
      title: "Griya Tamansari",
    },
  ];

  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState("");

  const getImg = (imgSrc: string) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <div className="w-full  mx-auto  py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Our Moments</h1>
          <p className="text-gray-600 max-w-2xl">
            From breathtaking landscapes to unforgettable moments, our album
            captures the beauty of life’s most treasured memories.
          </p>
        </div>
        <Link to="/album">
          <Button
            variant="ghost"
            className="text-black hover:bg-gray-100 cursor-pointer"
          >
            View Album
          </Button>
        </Link>
      </div>

      <div className="gallery">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => getImg(image.imgSrc)}
            >
              <img
                src={image.imgSrc}
                alt={image.title}
                style={{ width: "100%" }}
              />
            </div>
          );
        })}
      </div>

      <div className={model ? "model open" : "model"}>
        <img src={tempImgSrc} alt="img" />
        <X onClick={() => setModel(false)} />
      </div>
    </div>
  );
};

export default ImageGallery;
