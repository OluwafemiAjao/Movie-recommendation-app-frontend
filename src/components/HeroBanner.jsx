import React, { useEffect, useState } from "react";
import backgroundBanner from "../assets/banners/background_banner.jpg";
import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";
import { fetchPopularMovies } from "../services/tmdbService";

const localBanners = [backgroundBanner, banner1, banner2];

const HeroBanner = () => {
  // 👇 Set initial mode here: "dynamic" or "static"
  const [mode, setMode] = useState("dynamic");
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const setDynamicBanner = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        if (popularMovies.length > 0 && popularMovies[0].backdrop_path) {
          const imageUrl = `https://image.tmdb.org/t/p/original${popularMovies[0].backdrop_path}`;
          setBanner(imageUrl);
        } else {
          // Fallback to local banner if TMDB data invalid
          const randomBanner = localBanners[Math.floor(Math.random() * localBanners.length)];
          setBanner(randomBanner);
        }
      } catch (error) {
        // Fallback to local banner on error
        const randomBanner = localBanners[Math.floor(Math.random() * localBanners.length)];
        setBanner(randomBanner);
      }
    };

    if (mode === "dynamic") {
      setDynamicBanner();
    } else {
      // Static fallback mode: pick one of the 3 local banners
      const randomBanner = localBanners[Math.floor(Math.random() * localBanners.length)];
      setBanner(randomBanner);
    }
  }, [mode]);

  return (
    <div
      className="w-full h-[450px] bg-cover bg-center flex items-center justify-center text-white text-3xl font-bold"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      Welcome to StarFlix
    </div>
  );
};

export default HeroBanner;
