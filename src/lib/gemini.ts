import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY || '');

export interface BirthData {
    name: string;
    date: string;
    time: string;
    place: string;
    unknownTime?: boolean;
}

export interface HoroscopeRequest {
    type: 'daily' | 'weekly' | 'monthly' | 'partner';
    person1: BirthData;
    person2?: BirthData; // For partner horoscope
}

export async function generateHoroscope(request: HoroscopeRequest): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    let prompt = "";

    if (request.type === 'partner' && request.person2) {
        prompt = `
Role: You are an expert astrologer with 20+ years of experience in synastry and relationship astrology.
Your tone is empathetic, insightful, and constructive.

Person 1:
Name: ${request.person1.name}
Birth: ${request.person1.date} at ${request.person1.unknownTime ? 'Unknown Time (Noon used)' : request.person1.time}
Place: ${request.person1.place}

Person 2:
Name: ${request.person2.name}
Birth: ${request.person2.date} at ${request.person2.unknownTime ? 'Unknown Time (Noon used)' : request.person2.time}
Place: ${request.person2.place}

Task: Generate a detailed Partner Compatibility Horoscope.
Include:
1. **Synastry Overview**: The core dynamic between these two souls.
2. **Emotional Connection**: Moon sign interaction.
3. **Communication Style**: Mercury sign interaction.
4. **Love & Desire**: Venus and Mars interplay.
5. **Challenges & Growth**: Saturn and Pluto aspects.
6. **Final Verdict**: A summary of the relationship potential.

Format: Markdown with clear headings.
`;
    } else {
        prompt = `
Role: You are an expert astrologer with 20+ years of experience in psychological and evolutionary astrology.
Your tone is empowering, mystical, yet grounded and practical.

User:
Name: ${request.person1.name}
Birth: ${request.person1.date} at ${request.person1.unknownTime ? 'Unknown Time (Noon used)' : request.person1.time}
Place: ${request.person1.place}
Horoscope Type: ${request.type.charAt(0).toUpperCase() + request.type.slice(1)}

Task: Generate a comprehensive ${request.type} horoscope report.
Include:
1. **Executive Summary**: A theme for this ${request.type}.
2. **The Big Three**: Brief analysis of Sun, Moon, and Rising (if time is known).
3. **Current Cosmic Weather**: How current planetary transits affect the user.
4. **Love & Relationships**: Specific advice.
5. **Career & Purpose**: Specific advice.
6. **Power Affirmation**: A mantra for the ${request.type}.

Format: Markdown with clear headings.
`;
    }

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating horoscope:", error);
        throw new Error("Failed to generate horoscope");
    }
}
