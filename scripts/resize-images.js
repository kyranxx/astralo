/**
 * Image Resizing Script for PageSpeed Optimization
 * Creates properly sized images for their actual display dimensions
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

// Images to resize based on actual display dimensions found in PageSpeed report
const imagesToResize = [
    // Logo: displayed at max h-14 (56px), so max width = 56 * 3.41 = 191px
    // But we keep original for high-DPI displays (2x), so target 382px width
    {
        input: 'logo.webp',
        output: 'logo.webp',
        width: 382,  // 2x of max display width (191px)
        quality: 90
    },
    // PDF preview: displayed at max 384px width per the CSS
    // For 2x displays, we need 768px
    {
        input: 'pdf-sample-preview.webp',
        output: 'pdf-sample-preview.webp',
        width: 768,
        quality: 85
    },
    // Stripe logo: displayed at max h-5 (20px), aspect ratio seems around 2.5
    // So width ~50px, for 2x = 100px
    {
        input: 'stripe-logo.webp',
        output: 'stripe-logo.webp',
        width: 100,
        quality: 90
    },
];

async function resizeImages() {
    console.log('📐 Starting image resizing for PageSpeed optimization...\n');

    for (const img of imagesToResize) {
        const inputPath = join(publicDir, img.input);
        const outputPath = join(publicDir, img.output);

        if (!existsSync(inputPath)) {
            console.log(`⚠️  Skipping ${img.input} - file not found`);
            continue;
        }

        try {
            const inputInfo = await sharp(inputPath).metadata();

            // Only resize if current size is larger than target
            if (inputInfo.width > img.width) {
                await sharp(inputPath)
                    .resize(img.width)
                    .webp({ quality: img.quality })
                    .toFile(outputPath + '.tmp');

                // Get new file info
                const tempInfo = await sharp(outputPath + '.tmp').metadata();

                // Replace original
                const fs = await import('fs/promises');
                await fs.rename(outputPath + '.tmp', outputPath);

                console.log(`✅ ${img.input}: ${inputInfo.width}px → ${img.width}px`);

                // Get file sizes
                const inputStats = await fs.stat(inputPath);
                console.log(`   File size after resize: ${(inputStats.size / 1024).toFixed(1)}KB\n`);
            } else {
                console.log(`⏭️  ${img.input}: Already optimal (${inputInfo.width}px ≤ ${img.width}px)\n`);
            }
        } catch (error) {
            console.error(`❌ Error resizing ${img.input}:`, error.message);
        }
    }

    console.log('🎉 Image resizing complete!');
}

resizeImages();
