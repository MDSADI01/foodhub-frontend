"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SocialMedia = {
  name: string;
  imageUrl: string;
  link: string;
};

export default function SocialMediaCards() {
  // ✅ Array of 4 social media platforms
  const socialMedias: SocialMedia[] = [
    {
      name: "Facebook",
      imageUrl:
        "https://i.postimg.cc/L4zfdGDp/facebook-vector-social-media-icon-1073073-2139.avif",
      link: "https://facebook.com",
    },
    {
      name: "Whatsapp",
      imageUrl: "https://i.postimg.cc/wjP3RkFg/whatsapp-app-round-icon-popular-messenger-social-media-logo-277909-873.avif",
      link: "https://twitter.com",
    },
    {
      name: "Instagram",
      imageUrl: "https://i.postimg.cc/x80dVpjN/sm-5b37de3263964.jpg",
      link: "https://instagram.com",
    },
    {
      name: "Telegram",
      imageUrl: "https://i.postimg.cc/445dQGwS/Telegram-logo-svg.webp",
      link: "https://linkedin.com",
    },
  ];

  return (
    <section className="my-20">
      <h2 className="text-2xl font-bold mb-8 text-center">Follow Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {socialMedias.map((social) => (
          <Card
            key={social.name}
            className="shadow-md w-70 h-70 text-center hover:scale-105 transition-transform duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg">{social.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <img
                  className="w-40  mx-auto rounded-full object-cover"
                  src={social.imageUrl}
                  alt={social.name}
                />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
