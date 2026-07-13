export interface Testimonial {
    name: string;
    location: string;
    text: string;
    rating: number;
}

/**
 * Testimonials stay hidden until they are backed by real, attributable customer proof.
 */
export function getTestimonials(_locale: string): Testimonial[] {
    return [];
}

export function getAvailableTestimonialLocales(): string[] {
    return [];
}
