import { useEffect, useRef } from "react";

const GoogleAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Load script only if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("data-ad-client", "ca-pub-5336027825572218");
      document.head.appendChild(script);

      script.onload = () => {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
        }
      };
    } else {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5336027825572218"
      data-ad-slot="8281774410"
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    ></ins>
  );
};

export default GoogleAd;