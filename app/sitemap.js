import fs from "fs";
import path from "path";

export default function sitemap() {

  const dir = path.join(process.cwd(), "content/guies");
  const files = fs.readdirSync(dir);

  const pages = files.map((file) =>
    file.replace(".md", "")
  );

  const urls = pages.map((slug) => ({
    url: `https://topcerdanya.com/guies/${slug}`,
    lastModified: new Date(),
  }));

  urls.push({
    url: "https://topcerdanya.com",
    lastModified: new Date(),
  });

  return urls;
}