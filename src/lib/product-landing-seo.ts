import type { SupportedLocale, Translations } from '../locales/types';
import { getProductCopy, type ProductKey } from './products';

const maxMetaDescriptionLength = 160;
const sentenceEnding = /[.!?。！？]$/u;

export interface ProductLandingSeoContent {
    eyebrow: string;
    title: string;
    intro: string;
    points: Array<{ title: string; body: string }>;
    faqs: Array<{ question: string; answer: string }>;
}

function asSentence(fragment: string): string {
    const trimmed = fragment.trim();
    return sentenceEnding.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function buildProductLandingDescription(
    translations: Pick<Translations, 'products' | 'promo'>,
    productKey: ProductKey,
    lang: SupportedLocale = 'en',
): string {
    const product = getProductCopy(productKey, lang, translations);
    const sentences = [
        product.name,
        product.description,
        translations.promo.delivery,
        translations.promo.secure,
    ].map(asSentence);

    return sentences.reduce((description, sentence) => {
        const candidate = description ? `${description} ${sentence}` : sentence;
        return [...candidate].length <= maxMetaDescriptionLength ? candidate : description;
    }, '');
}

export function getProductLandingSeoContent(
    lang: SupportedLocale,
    productKey: ProductKey,
): ProductLandingSeoContent | null {
    if (lang === 'pt' && productKey === 'weekly') {
        return {
            eyebrow: 'Horóscopo semanal em português',
            title: 'Horóscopo semanal personalizado para planear a semana',
            intro: 'Se procura um horóscopo semanal mais útil do que uma previsão genérica, a Astralo cria um relatório digital com base nos seus dados de nascimento e nas tendências dos próximos 7 dias.',
            points: [
                {
                    title: 'Foco nos próximos 7 dias',
                    body: 'A leitura organiza temas da semana, datas importantes, energia geral e recomendações práticas para amor, trabalho e decisões pessoais.',
                },
                {
                    title: 'Mais pessoal que um texto geral',
                    body: 'O relatório usa data, hora e local de nascimento quando disponíveis, para criar uma leitura mais ligada ao seu contexto do que um horóscopo igual para todos.',
                },
                {
                    title: 'Entrega digital em Portugal',
                    body: 'Pode encomendar online em euros e receber o PDF por email em Portugal ou noutro país de língua portuguesa.',
                },
            ],
            faqs: [
                {
                    question: 'O que inclui um horóscopo semanal?',
                    answer: 'Um horóscopo semanal resume os principais temas dos próximos 7 dias, incluindo energia geral, amor, carreira, dinheiro, datas úteis e recomendações práticas.',
                },
                {
                    question: 'O horóscopo semanal da Astralo é personalizado?',
                    answer: 'Sim. A leitura usa os dados de nascimento enviados no pedido para criar um relatório mais pessoal do que uma previsão semanal genérica por signo.',
                },
                {
                    question: 'Posso encomendar o horóscopo semanal em Portugal?',
                    answer: 'Sim. A encomenda é online, o pagamento é em euros e o relatório PDF é enviado por email, por isso funciona para Portugal e outros países.',
                },
            ],
        };
    }

    return null;
}
