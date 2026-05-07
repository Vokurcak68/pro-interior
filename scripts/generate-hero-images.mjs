import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("public/realizace");
fs.mkdirSync(outDir, { recursive: true });

const apiKey =
  process.env.OPENAI_API_KEY ||
  (() => {
    try {
      const p = path.resolve(process.cwd(), "../.secrets/openai.key");
      const v = fs.readFileSync(p, "utf8").trim();
      return v || null;
    } catch {
      return null;
    }
  })();

if (!apiKey) {
  console.error("Missing OPENAI_API_KEY env var (or ../.secrets/openai.key)");
  process.exit(1);
}

const prompts = [
  {
    file: "hero-1.jpg",
    prompt:
      "Photorealistic modern custom-made kitchen interior, warm oak wood fronts, matte finish, minimal design, soft daylight from side window, Central European apartment vibe, ultra realistic, high detail, 35mm lens, f/2.8, natural colors, no people, no text, no logo, no watermark",
  },
  {
    file: "hero-2.jpg",
    prompt:
      "Photorealistic macro shot of oak wood countertop edge detail, visible wood grain and pores, precision joinery, matte oil finish, warm lighting, ultra realistic, shallow depth of field, no text, no logo, no watermark",
  },
  {
    file: "hero-3.jpg",
    prompt:
      "Photorealistic built-in wardrobe in hallway, warm wood veneer panels, black metal handles, indirect warm LED lighting, clean craftsmanship, Scandinavian/Central European interior, ultra realistic, no people, no text, no logo, no watermark",
  },
  {
    file: "hero-4.jpg",
    prompt:
      "Photorealistic custom bathroom vanity cabinet, warm wood + light stone countertop, brushed black fixtures, soft diffused light, premium craftsmanship, ultra realistic, no people, no text, no logo, no watermark",
  },
  {
    file: "hero-5.jpg",
    prompt:
      "Photorealistic modern custom-made kitchen interior, LIGHTER Scandinavian style, light ash / light oak wood texture, bright white quartz countertop, soft natural daylight, airy minimal design, very clean lines, ultra realistic, high detail, 35mm lens, f/2.8, no people, no text, no logo, no watermark",
  },
  {
    file: "hero-6.jpg",
    prompt:
      "Photorealistic modern custom-made kitchen interior with SOLID COLOR cabinet fronts (single-color), matte off-white / warm beige lacquer doors, no visible wood grain, integrated handle or slim black handle, light neutral backsplash, soft daylight, premium craftsmanship, ultra realistic, high detail, no people, no text, no logo, no watermark",
  },
];

async function genOne({ file, prompt }) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
      output_format: "jpeg",
      quality: "high",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image generation failed (${res.status}): ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("No b64_json in response");

  const buf = Buffer.from(b64, "base64");
  const outPath = path.join(outDir, file);
  fs.writeFileSync(outPath, buf);
  return outPath;
}

for (const p of prompts) {
  process.stderr.write(`Generating ${p.file}...\n`);
  const out = await genOne(p);
  process.stderr.write(`Wrote ${out}\n`);
}
