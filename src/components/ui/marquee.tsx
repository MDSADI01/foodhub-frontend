import { Marquee } from "@/components/shadcn-space/animations/marquee";

type BrandList = {
  image: string;
  lightimg: string;
  name: string;
};

export default function Marquees() {
  const brandList: BrandList[] = [
    {
      image: "https://i.postimg.cc/CxdVDT65/images.png",
      lightimg:
        "https://i.postimg.cc/CxdVDT65/images.png",
      name: "Brand 1",
    },
    {
      image: "https://i.postimg.cc/FzhMH2JB/images.jpg",
      lightimg:
        "https://i.postimg.cc/FzhMH2JB/images.jpg",
      name: "Brand 2",
    },
    {
      image: "https://i.postimg.cc/02ygR1vB/download.png",
      lightimg:
        "https://i.postimg.cc/02ygR1vB/download.png",
      name: "Brand 3",
    },
    {
      image: "https://i.postimg.cc/DwRRXWXC/download-(1).jpg",
      lightimg:
        "https://i.postimg.cc/DwRRXWXC/download-(1).jpg",
      name: "Brand 4",
    },
    {
      image: "https://i.postimg.cc/k4vHzfpm/download.jpg",
      lightimg:
        "https://i.postimg.cc/k4vHzfpm/download.jpg",
      name: "Brand 5",
    },
  ];

  return (
    <>
      <Marquee className="[--duration:20s] p-0" pauseOnHover>
        {brandList.map((brand, index) => (
          <div key={index}>
            <img
              src={brand.image}
              alt={brand.name}
              className="w-36 h-25 mr-6 lg:mr-20 dark:hidden object-cover" 
            />
            <img
              src={brand.lightimg}
              alt={brand.name}
              className="hidden dark:block w-36 h-25 mr-12 lg:mr-20"
            />
          </div>
        ))}
      </Marquee>
    </>
  );
}
