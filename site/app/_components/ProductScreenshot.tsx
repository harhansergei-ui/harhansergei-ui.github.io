import Image from "next/image";
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
  return (
    <figure
      className={["product-screenshot", className].filter(Boolean).join(" ")}
      data-screen={screen.id}
    >
      <div className="product-screen-frame">
        <Image
          src={screen.src}
          alt={screen.alt}
          width={1920}
          height={1200}
          priority={priority}
          unoptimized
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 86vw, 60vw"
        />
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
