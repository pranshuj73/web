import satori from "satori";
import path from "path";
import fs from "fs";
import type { CollectionEntry } from "astro:content";

function safeText(text: string) {
  const emojiPattern = /[^\x00-\x7F]+/gu;
  return text.replace(emojiPattern, "").trim();
}

type PostProps = (CollectionEntry<"blog">["data"] | CollectionEntry<"notes">["data"]);

export default async (post: PostProps) => {
  const atkinsonFontPath = path.resolve("./public/fonts/atkinson-bold.ttf");
  const atkinsonFontBuffer = fs.readFileSync(atkinsonFontPath);

  // Get the background image as base64
  const bgImagePath = path.resolve("./public/images/og.png");
  const bgImageBuffer = fs.readFileSync(bgImagePath);

  // Create the structure using vanilla JS objects instead of JSX
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `url('data:image/png;base64,${bgImageBuffer.toString("base64")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        },
        children: [
          {
            type: "p",
            props: {
              style: {
                fontSize: 82,
                fontWeight: "bold",
                color: "#222222",
                textAlign: "center",
                maxWidth: "85%",
                maxHeight: "100%",
                overflow: "hidden",
                fontFamily: "atkinson",
                textShadow: "1px 3px 6px rgba(0,0,0,0.2)",
              },
              children: safeText(post.data.title),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        {
          name: "atkinson",
          data: atkinsonFontBuffer,
          style: "normal",
        },
      ],
    }
  );

  return svg;
};
