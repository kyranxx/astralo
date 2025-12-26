import fs from 'fs';
import path from 'path';

// 1. Load Env
const loadEnv = (filename) => {
    const p = path.resolve(process.cwd(), filename);
    if (fs.existsSync(p)) {
        console.log(`Loading ${filename}...`);
        const content = fs.readFileSync(p, 'utf-8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
            }
        });
        return true;
    }
    return false;
};

let env = {};
if (!loadEnv('.env')) loadEnv('.env.local');

const SUPABASE_URL = env.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_URL = 'https://astralo.online';

console.log("🔍 Starting Infrastructure Scan...");

// 2. Check Supabase
if (SUPABASE_URL && SUPABASE_KEY) {
    console.log(`\nChecking Supabase connection to: ${SUPABASE_URL}`);
    try {
        // Try to fetch one order to verify DB access
        const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=count`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        if (response.ok) {
            console.log("✅ Supabase REST API is accessible.");
            const text = await response.text();
            console.log(`ℹ️  Response: ${text.substring(0, 100)}...`);
        } else {
            console.error(`❌ Supabase Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(`   Details: ${text}`);
        }
    } catch (e) {
        console.error(`❌ Supabase Connection Failed: ${e.message}`);
    }
} else {
    console.warn("⚠️  Skipping Supabase check: Missing SUPABASE_URL or SUPABASE_KEY in .env");
}

// 3. Check Vercel Deployment
console.log(`\nChecking Vercel Deployment at: ${SITE_URL}`);
try {
    const vRes = await fetch(SITE_URL, { method: 'HEAD' });
    console.log(`Status: ${vRes.status}`);
    const headers = vRes.headers;
    console.log("Headers:");
    let verificationFound = false;
    headers.forEach((val, key) => {
        if (key.toLowerCase().includes('vercel') || key.toLowerCase().includes('x-vercel-id')) {
            console.log(`  ${key}: ${val}`);
            verificationFound = true;
        }
    });

    if (verificationFound) {
        console.log("✅ Vercel headers confirmed.");
    } else {
        console.warn("⚠️  No Vercel-specific headers found. Is the domain pointing to Vercel?");
    }
} catch (e) {
    console.error(`❌ Vercel Check Failed: ${e.message}`);
}
