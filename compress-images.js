import fs from "fs";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";

const inputPath = "./image"; // your image folder
const outputPath = "./image"; // overwrite same folder (same names)

// Function to compress all images
(async () => {
    const files = fs.readdirSync(inputPath).filter(file =>
        /\.(jpg|jpeg|png)$/i.test(file)
    );

    for (const file of files) {
        const inputFile = `${inputPath}/${file}`;
        const outputFile = `${outputPath}/${file}`;

        const result = await imagemin([inputFile], {
            destination: outputPath,
            plugins: [
                imageminMozjpeg({ quality: 80 }), // 80–85 = near-lossless
                imageminPngquant({ quality: [0.75, 0.9] }),
                imageminWebp({ quality: 80 })
            ]
        });

        console.log(`✅ Compressed: ${file}`);
    }

    console.log("🎉 All images compressed and replaced successfully!");
})();
