/**
 * The 12 Houses of Astrology - English (Complete Guide)
 */
import type { BlogPostTranslation } from '../../types';

export const en: BlogPostTranslation = {
    title: '🏠 The 12 Houses of Astrology: A Complete Guide to Your Life Map',
    excerpt: 'Discover the hidden map of your life. A deep dive into the 12 Houses of Astrology, explaining where your planetary energy plays out and how to master your destiny.',
    category: 'Astrology Basics',
    metaDescription: 'Complete guide to the 12 astrological houses. Learn what each house means, how they affect life areas like career and love, and how to interpret houses in your birth chart like an expert.',
    keywords: 'astrological houses, 12 houses, zodiac houses, birth chart interpretation, first house, seventh house, midheaven, angular houses, succedent houses, cadent houses, house rulers, stellium, intercepted houses',
    quickSummary: [
        'The 12 Houses represent the "WHERE" in your life—specific arenas like career, home, and relationships.',
        'Houses are divided into Angular, Succedent, and Cadent, each with different power levels.',
        'The Ascendant marks the start of the 1st House and sets the structure for the entire chart.',
        'Empty houses do not mean that area of life is "missing"—they are ruled by a specific planet.'
    ],
    keyTakeaways: [
        'Angular Houses (1, 4, 7, 10) are the most active and visible in your life.',
        'The Ruler of a house (the planet ruling the sign on the cusp) gives the secret key to that life area.',
        'The four main angles (AC, IC, DC, MC) define the cross of your life purpose.',
        'Understanding houses is essential for timing and prediction in astrology.'
    ],
    tableOfContents: [
        { id: 'introduction', title: 'The Stage: Why Houses Matter' },
        { id: 'house-systems', title: 'Understanding House Systems: Placidus vs. Whole Sign' },
        { id: 'angular-succedent-cadent', title: 'The Three Modalities: Power and Time' },
        { id: 'the-first-house', title: '1st House: The House of Self (Identity)' },
        { id: 'the-second-house', title: '2nd House: The House of Value (Wealth)' },
        { id: 'the-third-house', title: '3rd House: The House of Communication' },
        { id: 'the-fourth-house', title: '4th House: The House of Home (Roots)' },
        { id: 'the-fifth-house', title: '5th House: The House of Joy' },
        { id: 'the-sixth-house', title: '6th House: The House of Service' },
        { id: 'the-seventh-house', title: '7th House: The House of Partnership' },
        { id: 'the-eighth-house', title: '8th House: The House of Transformation' },
        { id: 'the-ninth-house', title: '9th House: The House of Wisdom' },
        { id: 'the-tenth-house', title: '10th House: The House of Purpose' },
        { id: 'the-eleventh-house', title: '11th House: The House of Community' },
        { id: 'the-twelfth-house', title: '12th House: The House of the Unconscious' },
        { id: 'planetary-placements', title: 'Major Planets in the Houses' },
        { id: 'stelliums', title: 'What is a Stellium?' },
        { id: 'empty-houses', title: 'What if a House is Empty? The Power of Rulers' },
        { id: 'retrograde', title: 'Retrograde Planets in Houses' },
        { id: 'derived-houses', title: 'Advanced Technique: Derived Houses' },
        { id: 'progressions', title: 'Progressed Houses: How Life Cycles Evolve' },
        { id: 'conclusion', title: 'Integrating Your Chart' }
    ],
    content: `
      <h2 id="introduction">The Stage: Why Houses Matter</h2>
      <p>If you have ever looked at your birth chart and felt overwhelmed by the lines, symbols, and geometric shapes, you are not alone. Astrology is a language of three main components: signs, planets, and houses. While <strong>planets</strong> represent the "actors" (what is happening) and <strong>signs</strong> represent the "costumes" (how it is happening), the <strong>12 Houses of Astrology</strong> represent the "stage" (where it is happening).</p>
      
      <p>Imagine your life is a play. Mars might be the actor—full of drive and aggression. If he is wearing the "costume" of Aries, he is fast, impulsive, and bold. But where does he perform? If he is in the 10th House of Career, he is a driven entrepreneur. If he is in the 4th House of Home, he might be someone who pours energy into home renovations or perhaps experiences conflict in the family unit. Without the houses, astrology is purely psychological; with the houses, it becomes practical and predictive.</p>

      <p>In this comprehensive guide, we will explore every corner of these twelve life arenas, helping you understand how to read your own chart like a professional astrologer.</p>

      <h2 id="house-systems">Understanding House Systems: Placidus vs. Whole Sign</h2>
      <p>Before we dive into the specific meanings, we must address the "elephant in the room": House Systems. There are dozens of ways to divide the sky, and the choice you make can shift your chart significantly.</p>
      
      <h3>Placidus System</h3>
      <p>This is the most popular system in modern Western astrology. It calculates houses based on the time it takes for a planet to travel from the horizon to the meridian. Because the Earth is tilted, this often results in "intercepted houses" (houses that engulf more than one sign) and houses of varying sizes. Proponents argue it is more psychologically nuanced.</p>

      <h3>Whole Sign System</h3>
      <p>The oldest system, recently making a huge comeback. In this system, the entire sign of your Ascendant becomes your 1st House. If you are 29 degrees Aries Rising, the *entire* sign of Aries is your 1st House. This system creates equal 30-degree houses and many find it more accurate for predicting concrete life events.</p>

      <h3>Which should you use?</h3>
      <p>At Astralo, we recommend starting with **Whole Sign** for clarity, but exploring **Placidus** for psychological depth. If you have "intercepted" signs in Placidus, it often indicates a part of your personality that was "repressed" or hard to access in early life.</p>

      <h2 id="angular-succedent-cadent">The Three Modalities: Power and Time</h2>
      <p>The houses are divided into three groups of four, which dictate their "dynamic" energy and how they manifest in time.</p>
      
      <h3>1. Angular Houses (1, 4, 7, 10)</h3>
      <p>These are the "Power Houses." They correspond to the Cardinal signs. Planets here are highly active and visible in the world. They define the four major points of your chart: Ascendant, IC, Descendant, and Midheaven. Events here are public and life-changing.</p>

      <h3>2. Succedent Houses (2, 5, 8, 11)</h3>
      <p>These houses "succeed" or follow the angles. They provide stability and resources (money, children, shared wealth, long-term goals). They represent the "middle" phase where we consolidate our gains.</p>

      <h3>3. Cadent Houses (3, 6, 9, 12)</h3>
      <p>These are the houses of transition and mental processing. They are "retreat" houses. Planets here are often more internal, intellectual, or involve service and learning. They prepare us for the next cycle.</p>

      <h2 id="the-first-house">1st House: The House of Self (Identity)</h2>
      <p>Starts at the <strong>Ascendant</strong>. The filter through which you see the world and the world sees you. Rules your appearance, temperament, and vitality.
      <br><strong>Keywords:</strong> Identity, appearance, health, first impressions, survival instinct.</p>
      <p><strong>Sun in 1st:</strong> Strong presence, high energy, independent.
      <br><strong>Saturn in 1st:</strong> Serious demeanor, late bloomer, incredible resilience.</p>

      <h2 id="the-second-house">2nd House: The House of Value (Wealth)</h2>
      <p>Your bank account, but also your self-worth. Rules personal possessions and earning capacity.
      <br><strong>Keywords:</strong> Money, values, self-esteem, possessions, sensory pleasure.</p>
      <p><strong>Jupiter in 2nd:</strong> Luck with money, big appetite for life.
      <br><strong>Pluto in 2nd:</strong> Intense cycles of financial death and rebirth.</p>

      <h2 id="the-third-house">3rd House: The House of Communication</h2>
      <p>Your immediate environment. How you think, speak, and relate to siblings/neighbors.
      <br><strong>Keywords:</strong> Logic, writing, siblings, short trips, curiosity.</p>
      <p><strong>Mercury in 3rd:</strong> Quick mind, "eternal student," born storyteller.</p>

      <h2 id="the-fourth-house">4th House: The House of Home (Roots)</h2>
      <p>The bottom of the chart (IC). Family, ancestors, private life.
      <br><strong>Keywords:</strong> Home, roots, mother/father, real estate, inner sanctuary.</p>
      <p><strong>Moon in 4th:</strong> deeply private and emotional about home; needs a "nest."</p>

      <h2 id="the-fifth-house">5th House: The House of Joy</h2>
      <p>Self-expression and fun. Creativity, romance, children, and risk.
      <br><strong>Keywords:</strong> Creativity, play, romance, children, gambling, drama.</p>
      <p><strong>Venus in 5th:</strong> In love with love, artistic, charming.</p>

      <h2 id="the-sixth-house">6th House: The House of Service</h2>
      <p>Daily routines and physical health. Not your career, but your day job.
      <br><strong>Keywords:</strong> Routine, health, work, service, pets, efficiency.</p>
      <p><strong>Mars in 6th:</strong> Hard worker, energetic daily routine, prone to inflammation.</p>

      <h2 id="the-seventh-house">7th House: The House of Partnership</h2>
      <p>The Descendant. Committed relationships—marriage, business partners, and open enemies.
      <br><strong>Keywords:</strong> Marriage, contracts, harmony, "The Other," law.</p>
      <p><strong>Saturn in 7th:</strong> Seeks stability, may marry later in life, takes commitment seriously.</p>

      <h2 id="the-eighth-house">8th House: The House of Transformation</h2>
      <p>Deep waters. Sex, death, taxes, secrets, and "other people's money."
      <br><strong>Keywords:</strong> Intimacy, inheritance, taxes, psychology, occult, power.</p>
      <p><strong>Pluto in 8th:</strong> Powerful, resilient, drawn to the hidden depths of the psyche.</p>

      <h2 id="the-ninth-house">9th House: The House of Wisdom</h2>
      <p>Expansion of the mind and horizon. Long travel, higher ed, philosophy.
      <br><strong>Keywords:</strong> Travel, philosophy, higher education, publishing, adventure.</p>
      <p><strong>Jupiter in 9th:</strong> The "Globetrotter," lucky in travel and learning.</p>

      <h2 id="the-tenth-house">10th House: The House of Purpose</h2>
      <p>The Midheaven (MC). Public reputation and calling. Your legacy.
      <br><strong>Keywords:</strong> Career, reputation, status, legacy, authority.</p>
      <p><strong>Sun in 10th:</strong> Destined for the spotlight, ambitious, success-driven.</p>

      <h2 id="the-eleventh-house">11th House: The House of Community</h2>
      <p>Social networks and groups. Hopes, wishes, and humanitarian goals.
      <br><strong>Keywords:</strong> Friends, networks, groups, hopes, future goals.</p>
      <p><strong>Uranus in 11th:</strong> Eccentric friends, leader in social movements.</p>

      <h2 id="the-twelfth-house">12th House: The House of the Unconscious</h2>
      <p>The "closet" of the zodiac. Hidden things, spirituality, dreams, karma.
      <br><strong>Keywords:</strong> Solitude, spirituality, hidden enemies, hospitals, release.</p>
      <p><strong>Neptune in 12th:</strong> Highly intuitive, needs alone time, spiritual connection.</p>

      <h2 id="planetary-placements">Major Planets in the Houses: A Summary</h2>
      <p>Remember: Planets are the "drivers," Houses are the "territory."
      <br><strong>Sun:</strong> Where you shine.
      <br><strong>Moon:</strong> Where you find safety.
      <br><strong>Saturn:</strong> Where you work hard and find mastery.</p>

      <h2 id="stelliums">What is a Stellium?</h2>
      <p>A **stellium** is when 3 or more planets gather in one house. This creates a massive focus of energy. If you have a 10th House stellium, your life is almost entirely about career. It shows where your soul has concentrated its energy for this lifetime.</p>

      <h2 id="empty-houses">What if a House is Empty? The Power of Rulers</h2>
      <p>One of the most common questions: "My 7th house is empty! Will I never marry?" NO. Everyone has empty houses. To read an empty house, look at the **House Ruler** (the planet ruling the sign on the cusp).
      <br>Example: Empty 7th House in Taurus? Look at Venus. If Venus is in the 10th, you might meet your partner at work.</p>

      <h2 id="retrograde">Retrograde Planets in Houses</h2>
      <p>When a planet is retrograde in a house, its energy is turned inward. You may struggle to express that energy outwardly until later in life, but you develop deep internal mastery of the subject.</p>

      <h2 id="derived-houses">Advanced Technique: Derived Houses</h2>
      <p>You can "spin" the chart to see others.
      <br><strong>8th House:</strong> 2nd from the 7th (Partner's Money).
      <br><strong>11th House:</strong> 2nd from the 10th (Money from Career).</p>

      <h2 id="progressions">Progressed Houses: How Life Cycles Evolve</h2>
      <p>Through **Secondary Progressions**, your house cusps move. Your Progressed Sun will move through the houses, marking 30-year chapters of focus (e.g., a "4th House Phase" of building a family).</p>

      <h2 id="conclusion">Integrating Your Chart</h2>
      <p>Understanding the 12 houses transforms astrology from a parlor game into a life map. By seeing where your planets live, you accept your unique path. At Astralo, our **Personalized Reports** do this synthesis for you, explaining not just *who* you are, but *where* you are going.</p>
    `
};
