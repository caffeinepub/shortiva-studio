# Shortiva Studio

## Current State
Full UGC portfolio site with Navbar, Hero (parallax), Services, Portfolio grid, Pricing (3 plans with USD prices), Testimonials, Contact form, and Footer. Has basic motion/react animations (fadeUp, stagger, scroll parallax). Social links in footer point to generic URLs. No real contact info shown. Pricing uses USD.

## Requested Changes (Diff)

### Add
- Gmail contact: shortivastudio@gmail.com — show in Contact section (left info block) and/or footer
- Instagram: @shortiva.studio — update footer Instagram href to https://instagram.com/shortiva.studio
- Pricing disclaimer below the 3 pricing cards: "Note: Prices depend on your account type — the above prices may vary."
- 3D visual effects: CSS 3D card transforms (rotateX/rotateY on hover using mouse position), floating/levitating 3D orbs in hero, perspective depth on sections
- Enhanced scroll animations: parallax layers with different speeds, scroll-triggered reveals with slide+depth (translateZ), horizontal scroll marquee for portfolio tags or stats, sticky section transitions

### Modify
- PLANS pricing:
  - Starter: ₹599
  - Growth (mid): ₹1,299
  - Premium: ₹1,999
- Footer Instagram href: https://instagram.com/shortiva.studio
- Contact section info list: add Gmail and Instagram as clickable contact items
- Hero: add 3D floating geometric shapes (CSS/SVG) that animate on scroll
- Pricing cards: add 3D hover tilt effect using mouse tracking
- Service cards: add 3D tilt on hover
- Portfolio cards: deeper 3D lift on hover

### Remove
- Nothing removed

## Implementation Plan
1. Update PLANS array: change prices to ₹599, ₹1,299, ₹1,999
2. Add pricing disclaimer text below pricing cards grid
3. Update footer Instagram href to https://instagram.com/shortiva.studio
4. Add Gmail (shortivastudio@gmail.com) and Instagram (@shortiva.studio) to Contact left info block as clickable links
5. Add useTilt hook for 3D mouse-tracking card tilt (perspective + rotateX/Y)
6. Apply tilt to Pricing cards, Service cards, Portfolio cards
7. Add 3D floating geometric shapes to Hero (CSS keyframe animations: float + rotate3d)
8. Add scroll-driven parallax depth layers using useScroll + useTransform with multiple speeds
9. Add horizontal marquee strip (brand logos / stats) between sections
10. Validate and build
