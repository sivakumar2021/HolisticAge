// Resizes/compresses the user-supplied hero + about images (assets/hero-src/)
// down to web-friendly sizes. Source files are 2+ MB each; output targets a
// max width of 1600px at JPEG quality 82, which is plenty for a full-bleed
// hero banner while cutting file size drastically.
//
// The hero source photos each have a solid/gradient fade baked into their
// left edge (left over from an earlier boxed-carousel design that overlaid
// text on that side). Now that the images render full-bleed, that fade shows
// as a dead panel, so each job crops it off (cropLeftPct, picked per image
// by sampling where the fade ends) before resizing.
import sharp from "sharp";
import path from "node:path";

const SRC = path.join(process.cwd(), "assets/hero-src");

const JOBS = [
  { in: "custom-mental.jpg", out: "public/hero/mental.jpg", width: 1600, cropLeftPct: 52 },
  { in: "custom-outdoors.jpg", out: "public/hero/outdoors.jpg", width: 1600, cropLeftPct: 32 },
  { in: "custom-financial.jpg", out: "public/hero/financial.jpg", width: 1600, cropLeftPct: 46 },
  { in: "custom-professional.jpg", out: "public/hero/professional.jpg", width: 1600, cropLeftPct: 42 },
  { in: "custom-relationships.jpg", out: "public/hero/relationships.jpg", width: 1600, cropLeftPct: 37 },
  { in: "custom-social.jpg", out: "public/hero/social.jpg", width: 1600, cropLeftPct: 41 },
  { in: "custom-habits.jpg", out: "public/hero/habits.jpg", width: 1600, cropLeftPct: 38 },
  { in: "custom-learning.jpg", out: "public/hero/learning.jpg", width: 1600, cropLeftPct: 42 },
  { in: "custom-purpose.jpg", out: "public/hero/purpose.jpg", width: 1600, cropLeftPct: 42 },
  {
    in: "interconnected-apps.jpg",
    out: "public/about/interconnected-apps.jpg",
    width: 1400,
    // The 3663 Lifestyle and 3663 Fitness spheres render dimmer/less saturated
    // than Holistic Age and Arc Score in the source graphic. Rather than
    // brightening the whole image (which would wash out the space background),
    // this brightens+saturates just those two circular regions and blends the
    // result back in with a feathered (blurred) alpha mask so there's no hard
    // edge where the boost starts/stops.
    brightenSpheres: [
      { cx: 0.238, cy: 0.674, r: 0.12 }, // 3663 Lifestyle
      { cx: 0.745, cy: 0.705, r: 0.12 }, // 3663 Fitness
    ],
  },
];

async function brightenRegions(inPath, spheres) {
  const { width: W, height: H } = await sharp(inPath).metadata();
  const maskSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <filter id="f"><feGaussianBlur stdDeviation="40"/></filter>
    <g filter="url(#f)">
      ${spheres.map((s) => `<circle cx="${s.cx * W}" cy="${s.cy * H}" r="${s.r * W}" fill="white"/>`).join("\n")}
    </g>
  </svg>`;

  const originalBuffer = await sharp(inPath).toBuffer();
  const boostedBuffer = await sharp(inPath)
    .modulate({ brightness: 1.4, saturation: 1.6 })
    .linear(1.15, -10)
    .toBuffer();
  const maskBuffer = await sharp(Buffer.from(maskSvg)).png().toBuffer();
  const maskedBoosted = await sharp(boostedBuffer)
    .ensureAlpha()
    .composite([{ input: maskBuffer, blend: "dest-in" }])
    .toBuffer();

  // Resolved to a buffer (not a lazy Sharp chain) so the caller's later
  // .resize() runs on this fully-composited image instead of racing sharp's
  // internal ordering, which applies resize before any queued .composite().
  return sharp(originalBuffer).composite([{ input: maskedBoosted }]).toBuffer();
}

for (const job of JOBS) {
  const outPath = path.join(process.cwd(), job.out);
  const inPath = path.join(SRC, job.in);
  let pipeline = job.brightenSpheres
    ? sharp(await brightenRegions(inPath, job.brightenSpheres))
    : sharp(inPath);

  if (job.cropLeftPct) {
    const meta = await sharp(inPath).metadata();
    const left = Math.round((meta.width * job.cropLeftPct) / 100);
    pipeline = pipeline.extract({ left, top: 0, width: meta.width - left, height: meta.height });
  }

  await pipeline
    .resize({ width: job.width, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(outPath);
  console.log(`Built ${job.out}`);
}
