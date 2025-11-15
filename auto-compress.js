import chokidar from "chokidar";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import fs from "fs";

const imagePath = "./assets/images"; // your image folder

// Function to compress a single image
async function compressImage(file) {
    try {
        await imagemin([file], {
            destination: imagePath,
            plugins: [
                imageminMozjpeg({ quality: 80 }),
                imageminPngquant({ quality: [0.7, 0.9] }),
                imageminWebp({ quality: 80 })
            ]
        });

        console.log(`✅ Auto-compressed: ${file}`);
    } catch (err) {
        console.log(`❌ Error compressing ${file}:`, err.message);
    }
}

// Compress all existing images once when starting
function compressExisting() {
    const files = fs.readdirSync(imagePath).filter(file =>
        /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log("🔄 Compressing existing images...");

    for (const file of files) {
        compressImage(`${imagePath}/${file}`);
    }
}

// Watcher for new images
function watchNewImages() {
    chokidar.watch(imagePath).on("add", (file) => {
        if (/\.(jpg|jpeg|png)$/i.test(file)) {
            console.log(`📥 New image detected: ${file}`);
            compressImage(file);
        }
    });
}

console.log("👀 Auto-compress system running...");
compressExisting();
watchNewImages();
