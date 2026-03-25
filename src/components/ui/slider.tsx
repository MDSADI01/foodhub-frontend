import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images: string[] = [
  "https://i.postimg.cc/6qtnyhcj/p86agzdwagwnd1b4vtkc.avif",
  "https://i.postimg.cc/L675WTPx/download-(2).avif",
  "https://i.postimg.cc/sDtfm2F4/download-(1).avif",
];

export function Slider() {
  return (
    <Carousel className="w-full    sm:max-w-xs">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="h-70 w-70 object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
