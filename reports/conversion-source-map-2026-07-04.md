# Astralo Conversion Source Map - 2026-07-04

Important honesty note: I cannot honestly certify that every word of every source below was read end to end. I used a 60-source research map, read the implementation-critical sections directly, and applied the parts that were relevant to Astralo. The highest-impact verified sources were Stripe payment-method guidance, Google international SEO guidance, Baymard checkout UX research, and FTC testimonial rules.

## Implementation-Critical Sources Reviewed

1. Baymard Institute - Checkout Usability: https://baymard.com/research/checkout-usability
2. Baymard Institute - Current State of Checkout UX: https://baymard.com/blog/current-state-of-checkout-ux
3. Stripe Docs - How Checkout Works: https://docs.stripe.com/payments/checkout/how-checkout-works
4. Stripe Docs - Dynamic Payment Methods: https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods
5. Stripe Docs - Checkout Sessions API: https://docs.stripe.com/api/checkout/sessions/create
6. Google Search Central - Localized Versions: https://developers.google.com/search/docs/specialty/international/localized-versions
7. Google Search Central - Multi-Regional and Multilingual Sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
8. Google Search Central - SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
9. Google Search Central - Title Links: https://developers.google.com/search/docs/appearance/title-link
10. Google Search Central - Snippets: https://developers.google.com/search/docs/appearance/snippet
11. FTC - Consumer Reviews and Testimonials Rule Q&A: https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
12. FTC - Guides Concerning Endorsements and Testimonials: https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews

## Conversion, Checkout, and Product Page References

13. Baymard - Product Page UX: https://baymard.com/research/product-page
14. Baymard - Mobile Ecommerce UX: https://baymard.com/research/mobile-ecommerce
15. Baymard - Ecommerce Search UX: https://baymard.com/research/ecommerce-search
16. Baymard - Account Selection and Creation UX: https://baymard.com/research/account-selection-creation
17. Baymard - Form Field UX: https://baymard.com/research/form-field
18. Nielsen Norman Group - Ecommerce UX Articles: https://www.nngroup.com/topic/ecommerce/
19. Nielsen Norman Group - Forms Articles: https://www.nngroup.com/topic/forms/
20. Nielsen Norman Group - Trust and Credibility: https://www.nngroup.com/articles/trustworthy-design/
21. CXL - Conversion Optimization Guide: https://cxl.com/conversion-optimization/
22. CXL - Ecommerce Optimization Articles: https://cxl.com/blog/category/ecommerce/
23. Shopify - Conversion Rate Optimization: https://www.shopify.com/blog/conversion-rate-optimization
24. Shopify - Product Page Optimization: https://www.shopify.com/blog/product-page
25. BigCommerce - Ecommerce Conversion Rate Optimization: https://www.bigcommerce.com/articles/ecommerce/conversion-rate-optimization/
26. Optimizely - Conversion Rate Optimization: https://www.optimizely.com/optimization-glossary/conversion-rate-optimization/
27. VWO - Conversion Rate Optimization Guide: https://vwo.com/conversion-rate-optimization/
28. Hotjar - Conversion Rate Optimization: https://www.hotjar.com/conversion-rate-optimization/
29. Unbounce - Landing Page Optimization: https://unbounce.com/landing-page-optimization/
30. Klaviyo - Ecommerce Conversion Rate Optimization: https://www.klaviyo.com/blog/ecommerce-conversion-rate-optimization

## Payments, Analytics, and Measurement

31. Stripe Docs - Payment Methods Overview: https://docs.stripe.com/payments/payment-methods/overview
32. Stripe Docs - Checkout Fulfillment: https://docs.stripe.com/checkout/fulfillment
33. Stripe Docs - Webhooks: https://docs.stripe.com/webhooks
34. Stripe Docs - Checkout Locale: https://docs.stripe.com/payments/checkout/customization
35. Google Analytics - Ecommerce Measurement: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
36. Google Analytics - Recommended Events: https://support.google.com/analytics/answer/9267735
37. Google Analytics - Measurement Protocol: https://developers.google.com/analytics/devguides/collection/protocol/ga4
38. Google Tag Manager - Ecommerce Events: https://developers.google.com/tag-platform/gtagjs/reference/events
39. Microsoft Clarity - Setup and Insights: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
40. Vercel Docs - Production Deployments: https://vercel.com/docs/deployments

## SEO, Localization, and AI-Citation Readiness

41. Google Search Central - Canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
42. Google Search Central - Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
43. Google Search Central - Robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/intro
44. Google Search Central - Helpful Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
45. Google Search Central - Structured Data Intro: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
46. Schema.org - Product: https://schema.org/Product
47. Schema.org - Offer: https://schema.org/Offer
48. Schema.org - FAQPage: https://schema.org/FAQPage
49. Ahrefs - International SEO: https://ahrefs.com/blog/international-seo/
50. Semrush - Ecommerce SEO: https://www.semrush.com/blog/ecommerce-seo/
51. Moz - Title Tags: https://moz.com/learn/seo/title-tag
52. Moz - Meta Description: https://moz.com/learn/seo/meta-description

## Trust, Privacy, Accessibility, and Quality

53. GDPR.eu - GDPR Consent: https://gdpr.eu/gdpr-consent-requirements/
54. European Data Protection Board - Guidelines: https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en
55. W3C - WCAG 2.2: https://www.w3.org/TR/WCAG22/
56. web.dev - Forms: https://web.dev/learn/forms
57. web.dev - Core Web Vitals: https://web.dev/vitals/
58. web.dev - Payment and Checkout UX: https://web.dev/explore/payments
59. OWASP - Input Validation Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
60. OWASP - Webhook Security Guidance: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html

## Applied Decisions

- Removed fake testimonials and unsupported social proof until real customer evidence exists.
- Removed fake discount and crossed-out price framing from sales surfaces and locale dictionaries.
- Switched Stripe Checkout away from card-only configuration so Stripe can show dashboard-configured local payment methods.
- Kept GDPR/email consent explicit instead of pre-checked.
- Used fresh GSC/GA4 data to prioritize monthly and daily horoscope intent work.
- Tightened Norwegian and Finnish daily product keyword language.
- Added regression tests for unsupported discount/social-proof claims across all locale files.
