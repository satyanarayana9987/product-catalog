import { useState, useEffect } from "react";
import "./Banner.css";

const ADS = ["ads/ad1.png", "ads/ad2.png", "ads/ad3.png"];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ADS.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ADS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      <img
        src={`${import.meta.env.BASE_URL}${ADS[index]}`}
        alt="Ad Banner"
        className="hero-ad"
      />
    </div>
  );
}
