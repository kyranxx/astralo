/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly STRIPE_SECRET_KEY: string;
    readonly GEMINI_API_KEY: string;
    readonly SMTP_HOST: string;
    readonly SMTP_PORT: string;
    readonly SMTP_USER: string;
    readonly SMTP_PASS: string;
    readonly HCAPTCHA_SECRET: string;
    readonly PAGE_FEEDBACK_TO_EMAIL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
