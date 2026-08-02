export type ProductStage = "Setup" | "Measure" | "Correction" | "Live";

export type ProductScreen = {
  id: string;
  stage: ProductStage;
  src: string;
  alt: string;
  caption: string;
};

export const productScreens: ProductScreen[] = [
  {
    id: "01",
    stage: "Setup",
    src: "/product/kuula-google-play-01.png",
    alt: "Assign Measurement Mic dialog with WING and physical input routing",
    caption:
      "Assign the measurement microphone to the correct WING and physical input channels.",
  },
  {
    id: "02",
    stage: "Setup",
    src: "/product/kuula-google-play-02.png",
    alt: "Kuula routing overview for microphone, reference playback, PA outputs, and matrix correction",
    caption: "See the full routing chain before measurement starts.",
  },
  {
    id: "03",
    stage: "Measure",
    src: "/product/kuula-google-play-03.png",
    alt: "Measurement preparation screen for setting PA volume and microphone placement",
    caption: "Prepare SPL and microphone placement in a guided sequence.",
  },
  {
    id: "04",
    stage: "Measure",
    src: "/product/kuula-google-play-04.png",
    alt: "Six-position microphone point plan in front of the PA",
    caption: "Choose a practical measurement plan for the room.",
  },
  {
    id: "05",
    stage: "Measure",
    src: "/product/kuula-google-play-05.png",
    alt: "Active capture plan showing completed and current microphone positions",
    caption: "Track every capture position while measurement is in progress.",
  },
  {
    id: "06",
    stage: "Measure",
    src: "/product/kuula-google-play-06.png",
    alt: "Review captures graph with six room response traces",
    caption: "Review and compare captures before analysis.",
  },
  {
    id: "07-balanced",
    stage: "Correction",
    src: "/product/kuula-google-play-07-balanced.png",
    alt: "Correction graph comparing target, left, and right response curves",
    caption:
      "Compare the target and channel responses before applying correction.",
  },
  {
    id: "08",
    stage: "Live",
    src: "/product/kuula-google-play-08.png",
    alt: "Live analyzer waterfall with SPL and microphone health panels",
    caption: "Watch SPL, analyzer health, and the live waterfall.",
  },
  {
    id: "09",
    stage: "Live",
    src: "/product/kuula-google-play-09.png",
    alt: "Live RTA and transfer-function overlay with SPL readout",
    caption:
      "Switch to the RTA and transfer-function overlay for live decisions.",
  },
];

export function screenById(id: string): ProductScreen {
  const screen = productScreens.find((candidate) => candidate.id === id);

  if (!screen) {
    throw new Error(`Unknown Kuula product screen: ${id}`);
  }

  return screen;
}
