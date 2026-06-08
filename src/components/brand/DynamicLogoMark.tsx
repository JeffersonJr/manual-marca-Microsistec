/**
 * Criado e desenvolvido por Evolves Tecnologia (Jefferson Campos)
 */
import { LogoMark } from "./LogoMark";

type Variant = "original" | "deep" | "mono-dark" | "mono-light" | "reverse";

interface DynamicLogoMarkProps {
  logoUrl?: string; // Base64 data URL or standard image path
  symbolUrl?: string; // Base64 data URL or symbol image path
  logoReverseUrl?: string; // Base64 data URL for dark backgrounds
  symbolReverseUrl?: string; // Base64 data URL for dark symbols
  brandName?: string;
  variant?: Variant;
  withWordmark?: boolean;
  className?: string;
}

export function HousePinLogo({ className, variant = "original" }: { className?: string; variant?: Variant }) {
  // Let the symbol color adjust depending on the variant
  let mainColor = "currentColor";
  let cutoutColor = "var(--color-card, #ffffff)";
  
  if (variant === "mono-light" || variant === "reverse") {
    mainColor = "#ffffff";
    cutoutColor = "#111A1A";
  } else if (variant === "mono-dark") {
    mainColor = "#1A1A1A";
    cutoutColor = "#ffffff";
  } else if (variant === "deep") {
    mainColor = "#0A1F1E";
    cutoutColor = "#ffffff";
  }

  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chimney */}
      <rect x="68" y="10" width="8" height="18" fill={mainColor} />
      {/* House roof silhouette */}
      <path
        d="M50 2L10 32H26V58H74V32H90L50 2Z"
        fill={mainColor}
      />
      {/* Location pin tapers down from body */}
      <path
        d="M50 115C32 95 18 76 18 57C18 40 32 26 50 26C68 26 82 40 82 57C82 76 68 95 50 115Z"
        fill={mainColor}
      />
      {/* Inner Circle Cutout */}
      <circle cx="50" cy="57" r="18" fill={cutoutColor} />
      {/* Arched Window in Circle */}
      <path
        d="M42 63V54C42 49.58 45.58 46 50 46C54.42 46 58 49.58 58 54V63H42Z"
        fill={mainColor}
      />
      {/* Window Sill */}
      <rect x="38" y="64" width="24" height="2" fill={mainColor} />
      {/* Window divider lines */}
      <line x1="50" y1="46" x2="50" y2="63" stroke={cutoutColor} strokeWidth="1" />
      <line x1="42" y1="55" x2="58" y2="55" stroke={cutoutColor} strokeWidth="1" />
    </svg>
  );
}

export function DynamicLogoMark({
  logoUrl,
  symbolUrl,
  logoReverseUrl,
  symbolReverseUrl,
  brandName = "Microsistec",
  variant = "original",
  withWordmark = true,
  className = "h-8 w-8",
}: DynamicLogoMarkProps) {
  const nameLower = brandName.toLowerCase();
  const hasCustomLogo = !!(logoUrl || symbolUrl || logoReverseUrl || symbolReverseUrl);
  const isYellowImoveis = (nameLower.includes("yellow") || nameLower.includes("imoveis") || nameLower.includes("imóveis")) && !hasCustomLogo;

  if (isYellowImoveis) {
    // Render the custom HousePinLogo SVG and suppress the text to keep only the symbol
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <HousePinLogo variant={variant} className="h-full w-auto object-contain max-h-full" />
      </div>
    );
  }

  if ((!logoUrl && !symbolUrl && !logoReverseUrl && !symbolReverseUrl) || brandName.toLowerCase() === "microsistec") {
    return (
      <LogoMark
        variant={variant === "reverse" ? "mono-light" : variant}
        withWordmark={withWordmark}
        className={className}
      />
    );
  }

  // Choose the appropriate image based on layout context and availability
  let imgToRender = logoUrl;
  let useFilter = true;

  if (!withWordmark) {
    // Symbol-only requested
    if ((variant === "reverse" || variant === "mono-light") && symbolReverseUrl) {
      imgToRender = symbolReverseUrl;
      useFilter = false;
    } else if (symbolUrl) {
      imgToRender = symbolUrl;
    } else if ((variant === "reverse" || variant === "mono-light") && logoReverseUrl) {
      imgToRender = logoReverseUrl;
      useFilter = false;
    } else {
      imgToRender = logoUrl;
    }
  } else {
    // Full logo requested
    if ((variant === "reverse" || variant === "mono-light") && logoReverseUrl) {
      imgToRender = logoReverseUrl;
      useFilter = false;
    } else {
      imgToRender = logoUrl;
    }
  }

  // Fallback to whatever is available if the target image is missing
  if (!imgToRender) {
    imgToRender = logoUrl || symbolUrl || logoReverseUrl || symbolReverseUrl;
  }

  // We can apply CSS filters depending on the application context:
  let filterStyle = "";
  if (useFilter) {
    if (variant === "reverse") {
      filterStyle = "invert(1) brightness(2)";
    } else if (variant === "mono-dark") {
      filterStyle = "grayscale(1) contrast(1.2)";
    } else if (variant === "mono-light") {
      filterStyle = "grayscale(1) invert(1) brightness(2)";
    }
  } else {
    // Custom reverse assets don't need inversion, but might need grayscale in mono-light
    if (variant === "mono-light") {
      filterStyle = "grayscale(1)";
    }
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {imgToRender && (
        <img
          src={imgToRender}
          alt={`${brandName} Logo`}
          className="h-full w-auto object-contain max-h-full"
          style={{ filter: filterStyle || undefined }}
        />
      )}
    </div>
  );
}
