// One-off build script: composites paired "older + younger" source photos
// (assets/hero-src/*.jpg, downloaded from Pexels — free license, no
// attribution required) into a single side-by-side banner per scene, sized
// to match the hero carousel's 2:1 aspect ratio. Re-run manually if the
// source photos change; output is committed to public/hero/*.jpg.
import sharp from "sharp";
import path from "node:path";

const SRC = path.join(process.cwd(), "assets/hero-src");
const OUT = path.join(process.cwd(), "public/hero");

const HALF_W = 600;
const H = 600;

const SCENES = [
  { name: "outdoors", left: "outdoors-older.jpg", right: "outdoors-younger.jpg" },
  { name: "professional", left: "professional-older.jpg", right: "professional-younger.jpg" },
  { name: "social", left: "social-older.jpg", right: "social-younger.jpg" },
];

async function buildScene({ name, left, right }) {
  const [leftBuf, rightBuf] = await Promise.all([
    sharp(path.join(SRC, left))
      .resize({ width: HALF_W, height: H, fit: "cover", position: sharp.strategy.attention })
      .toBuffer(),
    sharp(path.join(SRC, right))
      .resize({ width: HALF_W, height: H, fit: "cover", position: sharp.strategy.attention })
      .toBuffer(),
  ]);

  const divider = await sharp({
    create: { width: 6, height: H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0.9 } },
  })
    .png()
    .toBuffer();

  await sharp({
    create: { width: HALF_W * 2, height: H, channels: 3, background: "#ffffff" },
  })
    .composite([
      { input: leftBuf, left: 0, top: 0 },
      { input: rightBuf, left: HALF_W, top: 0 },
      { input: divider, left: HALF_W - 3, top: 0 },
    ])
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT, `${name}.jpg`));

  console.log(`Built ${name}.jpg`);
}

for (const scene of SCENES) {
  await buildScene(scene);
}
