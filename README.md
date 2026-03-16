# GuestCard — Apartment Search Chatbot

Conversational chatbot that qualifies apartment leads through a guided chat flow, builds a formatted guest card with all prospect details and search criteria, matches the renter to properties in the Georgetown TX market, and sends the guest card directly to the property leasing office via email.

Designed to be embedded in apartment locator ad campaigns, landing pages, social media links, and property websites as a lead capture widget.

## How It Works

1. **Chat flow** — The bot walks the renter through a friendly conversation: name, contact info, move-in timeline, bedroom count, budget, pets, and must-have amenities
2. **Property matching** — Based on the renter's criteria, the bot instantly filters the property database and shows matching communities with current specials
3. **Guest card builder** — All collected info is formatted into a professional guest card with prospect details, search criteria, and referral attribution
4. **Email to property** — The renter selects which properties to contact, reviews the card, and sends it directly to leasing offices in one click
5. **Start over** — After sending, the renter can start a new search immediately

## Features

- **Guided conversation UI** with typing indicators, bot/user bubbles, and smooth auto-scroll
- **Smart input types** — text fields, single-select buttons, multi-select tags, and validation (email format checking)
- **Real-time property matching** against 5 Georgetown apartment communities
- **Move-in specials** displayed on matched properties to drive urgency
- **Formatted guest card** with prospect info, search criteria, notes, and referral branding
- **Multi-property send** — select one or more properties to receive the guest card
- **mailto integration** — opens the user's email client with a pre-filled professional guest card
- **Embeddable** — 480px max-width, works as standalone page or iframe widget
- **Mobile-first** — fully responsive down to 320px for use in mobile ad campaigns

## Properties in Database

| Property | Beds | Rent Range | Current Special |
|----------|------|------------|-----------------|
| The Retreat at Georgetown | 1-3 BR | $1,250 – $2,100 | $200 off first month |
| Rivery Park Apartments | 1-2 BR | $1,100 – $1,750 | Waived app fee |
| Wolf Ranch Residences | 1-3 BR | $1,400 – $2,400 | Up to 6 weeks free |
| San Gabriel Flats | 1-2 BR | $975 – $1,450 | No deposit for qualified |
| The Preserve at Georgetown | 2-4 BR | $1,650 – $2,800 | 1 month free (14-mo lease) |

## Tech Stack

- **React 19** — component architecture with hooks
- **Vite 6** — dev server and production builds
- **CSS** — custom dark theme, chat UI, animations
- **mailto** — email integration (no backend required)

## Getting Started

```bash
npm install
npm run dev       # Start dev server at http://localhost:5175
npm run build     # Build for production
npm run preview   # Preview production build
```

## Embedding

After building, embed in any page with an iframe:

```html
<iframe src="https://your-domain.com/guestcard" width="480" height="700" frameborder="0"></iframe>
```

---

Built in the Lab · 2026
