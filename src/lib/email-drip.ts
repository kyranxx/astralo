import { getProductName, type ProductKey } from './products.ts';

const siteUrl = 'https://astralo.online';
const supportedLocales = [
    'en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro',
    'bg', 'hr', 'sl', 'sr', 'uk', 'ru', 'el', 'tr', 'ar', 'he', 'hi', 'ja',
    'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn',
] as const;
type SupportedLocale = (typeof supportedLocales)[number];

const supportedLocaleSet = new Set<string>(supportedLocales);

function normalizeFollowupLang(lang: string): SupportedLocale {
    const normalized = lang.toLowerCase().trim();
    return supportedLocaleSet.has(normalized) ? normalized as SupportedLocale : 'en';
}

function getFollowupProductLandingPath(lang: SupportedLocale, productKey: ProductKey): string {
    return lang === 'en' ? `/horoscope/${productKey}` : `/${lang}/horoscope/${productKey}`;
}

function getDeliveryCopy(lang: SupportedLocale): string {
    if (lang === 'pt') return 'Entrega instantânea por email';
    if (lang === 'cs') return 'Okamžité doručení e-mailem';
    return 'Instant email delivery';
}

export interface EmailFollowupRow {
    id?: string;
    email: string;
    lang: string;
    step_key: string;
    step_number: number;
    product_key: ProductKey;
    scheduled_for: string;
    sent_at?: string | null;
    last_error?: string | null;
    created_at?: string;
    updated_at?: string;
}

type FollowupDefinition = {
    stepKey: string;
    stepNumber: number;
    delayDays: number;
    productKey: ProductKey;
    subject: string;
    headline: string;
    body: string;
    bullets: string[];
    ctaLabel: string;
};

type FollowupCopy = Pick<FollowupDefinition, 'subject' | 'headline' | 'body' | 'bullets' | 'ctaLabel'>;

const followupDefinitions: FollowupDefinition[] = [
    {
        stepKey: 'day_1_weekly',
        stepNumber: 1,
        delayDays: 1,
        productKey: 'weekly',
        subject: 'Day 1: Read the next 7 days more clearly',
        headline: 'Your next week is easier to read with a weekly forecast',
        body: 'Your free starter gives broad direction. A weekly reading adds sharper timing for work, money, and relationships.',
        bullets: [
            'See the strongest day of the week',
            'Spot the best moment to act',
            'Get a faster paid reading before the week shifts again',
        ],
        ctaLabel: 'Open weekly reading',
    },
    {
        stepKey: 'day_2_monthly',
        stepNumber: 2,
        delayDays: 2,
        productKey: 'monthly',
        subject: 'Day 2: Go deeper than a general horoscope',
        headline: 'A monthly reading gives more context and stronger timing',
        body: 'General horoscope content is useful for direction, but monthly readings are better when you want bigger-picture timing and decision support.',
        bullets: [
            'See where your energy is strongest this month',
            'Plan around key shifts instead of reacting late',
            'Use your birth data for a more personal reading',
        ],
        ctaLabel: 'Open monthly reading',
    },
    {
        stepKey: 'day_3_partner',
        stepNumber: 3,
        delayDays: 3,
        productKey: 'partner',
        subject: 'Day 3: Love and compatibility look different when personalized',
        headline: 'Relationship timing gets clearer with a partner reading',
        body: 'If love or relationship questions matter right now, a partner reading is usually more useful than a general forecast.',
        bullets: [
            'Compare relationship strengths and weak spots',
            'Understand emotional timing more clearly',
            'See where compatibility feels easy or blocked',
        ],
        ctaLabel: 'Open partner reading',
    },
    {
        stepKey: 'day_4_monthly',
        stepNumber: 4,
        delayDays: 4,
        productKey: 'monthly',
        subject: 'Day 4: What your free horoscope cannot fully show',
        headline: 'Personal timing gets stronger when we use your birth data',
        body: 'Free content helps with broad trends. Paid readings go deeper because they use your birth details and focus on your specific chart.',
        bullets: [
            'More personal than a broad zodiac article',
            'Better timing for bigger choices',
            'Useful when you want real detail, not just inspiration',
        ],
        ctaLabel: 'See your monthly reading',
    },
    {
        stepKey: 'day_5_weekly',
        stepNumber: 5,
        delayDays: 5,
        productKey: 'weekly',
        subject: 'Day 5: Birth time is optional',
        headline: 'You can still order even if you do not know your birth time',
        body: 'A missing birth time does not block the reading. If you know it, great. If not, you can still move forward and get useful insight.',
        bullets: [
            'Birth time is optional in the order form',
            'Weekly readings are the fastest next step',
            'Good if you want clarity without waiting',
        ],
        ctaLabel: 'Start weekly reading',
    },
    {
        stepKey: 'day_6_final',
        stepNumber: 6,
        delayDays: 6,
        productKey: 'monthly',
        subject: 'Day 6: Final reminder for a deeper personal reading',
        headline: 'Your free week is almost complete',
        body: 'If the free starter helped, the next best step is a personal reading that goes deeper into timing, focus, and what matters most right now.',
        bullets: [
            'Move from general guidance to personal timing',
            'Choose the reading that fits your next decision',
            'Keep the momentum while your interest is fresh',
        ],
        ctaLabel: 'Open your next reading',
    },
];

const localizedFollowupCopy: Partial<Record<SupportedLocale, Record<string, FollowupCopy>>> = {
    pt: {
        day_1_weekly: {
            subject: 'Dia 1: veja os próximos 7 dias com mais clareza',
            headline: 'A sua próxima semana fica mais clara com uma previsão semanal',
            body: 'O guia gratuito dá uma direção geral. A leitura semanal acrescenta melhor timing para trabalho, dinheiro e relações.',
            bullets: [
                'Veja o dia mais forte da semana',
                'Identifique o melhor momento para agir',
                'Receba uma leitura paga rápida antes de a semana mudar',
            ],
            ctaLabel: 'Abrir leitura semanal',
        },
        day_2_monthly: {
            subject: 'Dia 2: aprofunde mais do que um horóscopo geral',
            headline: 'Uma leitura mensal dá mais contexto e melhor timing',
            body: 'Conteúdo geral ajuda na direção. A leitura mensal é melhor quando quer timing mais amplo e apoio para decisões.',
            bullets: [
                'Veja onde a sua energia está mais forte este mês',
                'Planeie mudanças importantes antes de reagir tarde',
                'Use os seus dados de nascimento para uma leitura mais pessoal',
            ],
            ctaLabel: 'Abrir leitura mensal',
        },
        day_3_partner: {
            subject: 'Dia 3: amor e compatibilidade ficam mais claros',
            headline: 'O timing da relação melhora com uma leitura de casal',
            body: 'Se amor ou relação são temas importantes agora, uma leitura de casal costuma ser mais útil do que uma previsão geral.',
            bullets: [
                'Compare pontos fortes e desafios da relação',
                'Entenda melhor o timing emocional',
                'Veja onde a compatibilidade flui ou bloqueia',
            ],
            ctaLabel: 'Abrir leitura de casal',
        },
        day_4_monthly: {
            subject: 'Dia 4: o que o horóscopo gratuito não mostra totalmente',
            headline: 'O timing pessoal melhora quando usamos os seus dados de nascimento',
            body: 'Conteúdo gratuito ajuda com tendências amplas. Leituras pagas aprofundam porque usam os seus detalhes de nascimento e o seu mapa.',
            bullets: [
                'Mais pessoal do que um artigo geral sobre signos',
                'Melhor timing para escolhas maiores',
                'Útil quando quer detalhe, não só inspiração',
            ],
            ctaLabel: 'Ver leitura mensal',
        },
        day_5_weekly: {
            subject: 'Dia 5: a hora de nascimento é opcional',
            headline: 'Pode encomendar mesmo sem saber a hora de nascimento',
            body: 'Não saber a hora exata não bloqueia a leitura. Se souber, ótimo. Se não souber, ainda pode avançar e receber orientação útil.',
            bullets: [
                'A hora de nascimento é opcional no formulário',
                'A leitura semanal é o próximo passo mais rápido',
                'Boa escolha quando quer clareza sem esperar',
            ],
            ctaLabel: 'Começar leitura semanal',
        },
        day_6_final: {
            subject: 'Dia 6: último lembrete para uma leitura pessoal mais profunda',
            headline: 'A sua semana gratuita está quase completa',
            body: 'Se o guia gratuito ajudou, o próximo passo é uma leitura pessoal com mais detalhe sobre timing, foco e o que importa agora.',
            bullets: [
                'Passe de orientação geral para timing pessoal',
                'Escolha a leitura que combina com a sua próxima decisão',
                'Aproveite enquanto o interesse está fresco',
            ],
            ctaLabel: 'Abrir próxima leitura',
        },
    },
};

function getLocalizedFollowupDefinition(definition: FollowupDefinition, lang: SupportedLocale): FollowupDefinition {
    const copy = localizedFollowupCopy[lang]?.[definition.stepKey];
    return copy ? { ...definition, ...copy } : definition;
}

export function getFollowupDefinitions(): FollowupDefinition[] {
    return followupDefinitions;
}

export function buildFollowupRows(email: string, lang: string, subscribedAt = new Date()): EmailFollowupRow[] {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedLang = normalizeFollowupLang(lang);
    return followupDefinitions.map((definition) => {
        const scheduledFor = new Date(subscribedAt);
        scheduledFor.setUTCDate(scheduledFor.getUTCDate() + definition.delayDays);

        return {
            email: normalizedEmail,
            lang: normalizedLang,
            step_key: definition.stepKey,
            step_number: definition.stepNumber,
            product_key: definition.productKey,
            scheduled_for: scheduledFor.toISOString(),
        };
    });
}

export function getFollowupDefinition(stepKey: string): FollowupDefinition | undefined {
    return followupDefinitions.find((definition) => definition.stepKey === stepKey);
}

export function buildFollowupEmailHtml(email: string, lang: string, stepKey: string): { subject: string; html: string } | null {
    const baseDefinition = getFollowupDefinition(stepKey);
    if (!baseDefinition) return null;

    const normalizedLang = normalizeFollowupLang(lang);
    const definition = getLocalizedFollowupDefinition(baseDefinition, normalizedLang);
    const productName = getProductName(definition.productKey, normalizedLang);
    const path = getFollowupProductLandingPath(normalizedLang, definition.productKey);
    const trackedUrl = `${siteUrl}${path}?utm_source=email&utm_medium=drip&utm_campaign=${definition.stepKey}`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #111827; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); }
            .header { background: linear-gradient(135deg, #1a0f2e 0%, #0f1729 100%); padding: 36px 24px; text-align: center; color: white; }
            .content { padding: 28px 24px; }
            .label { display: inline-block; margin-bottom: 10px; padding: 6px 12px; border-radius: 999px; background: #fef3c7; color: #92400e; font-size: 12px; font-weight: bold; letter-spacing: 0.08em; text-transform: uppercase; }
            .card { border: 1px solid #e5e7eb; border-radius: 14px; padding: 20px; margin: 24px 0; background: #f8fafc; }
            .bullet-list { margin: 16px 0 0; padding-left: 20px; }
            .bullet-list li { margin-bottom: 10px; }
            .btn { display: inline-block; padding: 14px 28px; background-color: #fbbf24; color: #111827; text-decoration: none; font-weight: bold; border-radius: 999px; margin-top: 18px; }
            .muted { color: #6b7280; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://astralo.online/logo.webp" alt="Astralo" style="max-width: 150px; margin: 0 auto 16px;" />
                <div class="label">Astralo Follow-Up</div>
                <h1 style="margin: 0;">${definition.headline}</h1>
            </div>
            <div class="content">
                <p>${definition.body}</p>

                <div class="card">
                    <strong>${productName}</strong>
                    <ul class="bullet-list">
                        ${definition.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
                    </ul>
                    <a href="${trackedUrl}" class="btn">${definition.ctaLabel}</a>
                </div>

                <p class="muted">${getDeliveryCopy(normalizedLang)}</p>
                <p class="muted">Sent to ${email} by the Astralo team.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    return {
        subject: definition.subject,
        html,
    };
}
