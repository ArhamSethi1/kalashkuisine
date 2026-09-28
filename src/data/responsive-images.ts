// Responsive, CDN-hosted WebP assets. The browser selects the smallest suitable width.
import hero_desktop_640 from "@/assets/hero-desktop-640.webp.asset.json";
import hero_desktop_1280 from "@/assets/hero-desktop-1280.webp.asset.json";
import hero_desktop_1920 from "@/assets/hero-desktop-1920.webp.asset.json";
import hero_mobile_480 from "@/assets/hero-mobile-480.webp.asset.json";
import hero_mobile_960 from "@/assets/hero-mobile-960.webp.asset.json";
import gallery_facade_640 from "@/assets/gallery-facade-640.webp.asset.json";
import gallery_facade_1200 from "@/assets/gallery-facade-1200.webp.asset.json";
import gallery_mural_640 from "@/assets/gallery-mural-640.webp.asset.json";
import gallery_mural_1200 from "@/assets/gallery-mural-1200.webp.asset.json";
import gallery_window_640 from "@/assets/gallery-window-640.webp.asset.json";
import gallery_window_1200 from "@/assets/gallery-window-1200.webp.asset.json";
import gallery_signage2_640 from "@/assets/gallery-signage2-640.webp.asset.json";
import gallery_signage2_1200 from "@/assets/gallery-signage2-1200.webp.asset.json";
import gallery_booth_640 from "@/assets/gallery-booth-640.webp.asset.json";
import gallery_corridor_640 from "@/assets/gallery-corridor-640.webp.asset.json";
import dish_thali_640 from "@/assets/dish-thali-640.webp.asset.json";
import dish_thali_1200 from "@/assets/dish-thali-1200.webp.asset.json";
import dish_paneer_640 from "@/assets/dish-paneer-640.webp.asset.json";
import dish_paneer_1200 from "@/assets/dish-paneer-1200.webp.asset.json";
import moments_shake_480 from "@/assets/moments-shake-480.webp.asset.json";
import moments_shake_960 from "@/assets/moments-shake-960.webp.asset.json";
import moments_signage_480 from "@/assets/moments-signage-480.webp.asset.json";
import moments_signage_960 from "@/assets/moments-signage-960.webp.asset.json";
import moments_decor_480 from "@/assets/moments-decor-480.webp.asset.json";
import moments_decor_960 from "@/assets/moments-decor-960.webp.asset.json";
import moment_jan27_480 from "@/assets/moment-jan27-480.webp.asset.json";
import moment_jan27_960 from "@/assets/moment-jan27-960.webp.asset.json";
import moment_2398_480 from "@/assets/moment-2398-480.webp.asset.json";
import moment_2398_960 from "@/assets/moment-2398-960.webp.asset.json";
import moment_5135_480 from "@/assets/moment-5135-480.webp.asset.json";
import moment_5135_960 from "@/assets/moment-5135-960.webp.asset.json";
import moment_5195_480 from "@/assets/moment-5195-480.webp.asset.json";
import moment_5195_960 from "@/assets/moment-5195-960.webp.asset.json";
import moment_5249_480 from "@/assets/moment-5249-480.webp.asset.json";
import moment_5249_960 from "@/assets/moment-5249-960.webp.asset.json";
import moment_5303_480 from "@/assets/moment-5303-480.webp.asset.json";
import moment_5303_960 from "@/assets/moment-5303-960.webp.asset.json";
import moment_jan03_480 from "@/assets/moment-jan03-480.webp.asset.json";
import moment_jan03_960 from "@/assets/moment-jan03-960.webp.asset.json";

export const responsiveImages = {
  "hero-desktop": { src: hero_desktop_640.url, srcSet: `${hero_desktop_640.url} 640w`, `${hero_desktop_1280.url} 1280w`, `${hero_desktop_1920.url} 1920w`, full: hero_desktop_1920.url },
  "hero-mobile": { src: hero_mobile_480.url, srcSet: `${hero_mobile_480.url} 480w`, `${hero_mobile_960.url} 960w`, full: hero_mobile_960.url },
  "gallery-facade": { src: gallery_facade_640.url, srcSet: `${gallery_facade_640.url} 640w`, `${gallery_facade_1200.url} 1200w`, full: gallery_facade_1200.url },
  "gallery-mural": { src: gallery_mural_640.url, srcSet: `${gallery_mural_640.url} 640w`, `${gallery_mural_1200.url} 1200w`, full: gallery_mural_1200.url },
  "gallery-window": { src: gallery_window_640.url, srcSet: `${gallery_window_640.url} 640w`, `${gallery_window_1200.url} 1200w`, full: gallery_window_1200.url },
  "gallery-signage2": { src: gallery_signage2_640.url, srcSet: `${gallery_signage2_640.url} 640w`, `${gallery_signage2_1200.url} 1200w`, full: gallery_signage2_1200.url },
  "gallery-booth": { src: gallery_booth_640.url, srcSet: `${gallery_booth_640.url} 640w`, full: gallery_booth_640.url },
  "gallery-corridor": { src: gallery_corridor_640.url, srcSet: `${gallery_corridor_640.url} 640w`, full: gallery_corridor_640.url },
  "dish-thali": { src: dish_thali_640.url, srcSet: `${dish_thali_640.url} 640w`, `${dish_thali_1200.url} 1200w`, full: dish_thali_1200.url },
  "dish-paneer": { src: dish_paneer_640.url, srcSet: `${dish_paneer_640.url} 640w`, `${dish_paneer_1200.url} 1200w`, full: dish_paneer_1200.url },
  "moments-shake": { src: moments_shake_480.url, srcSet: `${moments_shake_480.url} 480w`, `${moments_shake_960.url} 960w`, full: moments_shake_960.url },
  "moments-signage": { src: moments_signage_480.url, srcSet: `${moments_signage_480.url} 480w`, `${moments_signage_960.url} 960w`, full: moments_signage_960.url },
  "moments-decor": { src: moments_decor_480.url, srcSet: `${moments_decor_480.url} 480w`, `${moments_decor_960.url} 960w`, full: moments_decor_960.url },
  "moment-jan27": { src: moment_jan27_480.url, srcSet: `${moment_jan27_480.url} 480w`, `${moment_jan27_960.url} 960w`, full: moment_jan27_960.url },
  "moment-2398": { src: moment_2398_480.url, srcSet: `${moment_2398_480.url} 480w`, `${moment_2398_960.url} 960w`, full: moment_2398_960.url },
  "moment-5135": { src: moment_5135_480.url, srcSet: `${moment_5135_480.url} 480w`, `${moment_5135_960.url} 960w`, full: moment_5135_960.url },
  "moment-5195": { src: moment_5195_480.url, srcSet: `${moment_5195_480.url} 480w`, `${moment_5195_960.url} 960w`, full: moment_5195_960.url },
  "moment-5249": { src: moment_5249_480.url, srcSet: `${moment_5249_480.url} 480w`, `${moment_5249_960.url} 960w`, full: moment_5249_960.url },
  "moment-5303": { src: moment_5303_480.url, srcSet: `${moment_5303_480.url} 480w`, `${moment_5303_960.url} 960w`, full: moment_5303_960.url },
  "moment-jan03": { src: moment_jan03_480.url, srcSet: `${moment_jan03_480.url} 480w`, `${moment_jan03_960.url} 960w`, full: moment_jan03_960.url },
} as const;
