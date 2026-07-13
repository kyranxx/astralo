import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const brandedOutputs = [
  'src/pages/api/contact.ts',
  'src/pages/api/send-email.ts',
  'src/lib/png-generator.ts',
  'src/lib/pdf-generator.ts',
];

test('branded emails and generated documents never use the Mastercard asset as the Astralo logo', async () => {
  for (const file of brandedOutputs) {
    const source = await readFile(new URL(`../../${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /ma_symbol_opt_73_3x\.(?:png|webp)/, file);
  }
});

