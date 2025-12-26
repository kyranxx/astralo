
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function optimizeBackground() {
    console.log('🖼️  Optimizing background5.webp for LCP...');
    const inputPath = join(publicDir, 'background5.png'); // Source is PNG
    const outputPath = join(publicDir, 'background5.webp');

    try {
        await sharp(inputPath)
            .webp({
                quality: 40, // Super aggressive compression
                effort: 6,   // Max effort
                smartSubsample: true
            })
            .toFile(outputPath);

        console.log('✅ background5.webp optimized!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

optimizeBackground();
