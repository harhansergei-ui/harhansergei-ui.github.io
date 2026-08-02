import type { ProductScreen } from "../_data/productScreens";

type ProductScreenshotProps = {
  screen: ProductScreen;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
};

export function ProductScreenshot({
  screen,
  priority = false,
  className,
  showCaption = true,
}: ProductScreenshotProps) {
  const baseSrc = screen.src.replace(/\.png$/, "");

  return (
    <figure
      className={["product-screenshot", className].filter(Boolean).join(" ")}
      data-screen={screen.id}
    >
      <div className="product-screen-frame">
        <picture>
          <source srcSet={`${baseSrc}.avif`} type="image/avif" />
          <source srcSet={`${baseSrc}.webp`} type="image/webp" />
          <img
            src={screen.src}
            alt={screen.alt}
            width={1920}
            height={1200}
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 86vw, 60vw"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
        </picture>
      </div>
      {showCaption ? (
        <figcaption>
          <span>{screen.stage}</span>
          {screen.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
