/**
 * Image Optimization Script
 * Converts PNG images to WebP format for better performance
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

const imagesToConvert = [
    { input: 'background5.png', output: 'background5.webp', quality: 80 },
    { input: 'pdf-sample-preview.png', output: 'pdf-sample-preview.webp', quality: 85 },
    { input: 'logo.png', output: 'logo.webp', quality: 90 },
    { input: 'Stripe wordmark - Blurple - Large.png', output: 'stripe-logo.webp', quality: 85 },
];

async function convertImages() {
    console.log('🖼️  Starting image optimization...\n');

    for (const img of imagesToConvert) {
        const inputPath = join(publicDir, img.input);
        const outputPath = join(publicDir, img.output);

        if (!existsSync(inputPath)) {
            console.log(`⚠️  Skipping ${img.input} - file not found`);
            continue;
        }

        try {
            const inputInfo = await sharp(inputPath).metadata();

            await sharp(inputPath)
                .webp({ quality: img.quality })
                .toFile(outputPath);

            const outputInfo = await sharp(outputPath).metadata();

            const inputSize = (inputInfo.size / 1024).toFixed(1);
            const outputSize = (outputInfo.size / 1024).toFixed(1);
            const savings = ((1 - outputInfo.size / inputInfo.size) * 100).toFixed(1);

            console.log(`✅ ${img.input} → ${img.output}`);
            console.log(`   ${inputSize}KB → ${outputSize}KB (${savings}% smaller)\n`);
        } catch (error) {
            console.error(`❌ Error converting ${img.input}:`, error.message);
        }
    }

    console.log('🎉 Image optimization complete!');
}

convertImages();
