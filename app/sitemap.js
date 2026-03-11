import fs from "fs";
import path from "path";

export default function sitemap() {

  const dir = path.join(process.cwd(), "content/guies");
  const files = fs.readdirSync(dir);

  const urls = files.map((file) => {

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    const slug = file.replace(".md", "");

    return {
      url: `https://topcerdanya.com/guies/${slug}`,
      lastModified: stats.mtime,
    };
  });

  urls.push({
    url: "https://topcerdanya.com",
    lastModified: new Date(),
  });

  return urls;
}