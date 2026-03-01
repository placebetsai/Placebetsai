// components/AdUnit.js
import { useEffect } from "react";

export default function AdUnit({ slot, format = "auto", style = {} }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90, ...style }}
        data-ad-client="ca-pub-7215975042937417"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
