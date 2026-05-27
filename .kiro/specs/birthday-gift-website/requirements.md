# Requirements Document

## Introduction

A romantic, interactive birthday gift website built as a personal love letter in web form. The site is a single-page experience (with smooth scroll sections) designed to be shared with a boyfriend on his birthday. It combines cinematic visuals, personal memories, interactive surprises, and emotional storytelling across a curated set of sections. The aesthetic is **Dark Luxury** (black + gold + soft glows, cinematic transitions) with optional romantic particle effects. The site is built with modern web technologies and prioritises emotional impact, smooth animation, and mobile responsiveness.

---

## Glossary

- **Site**: The birthday gift website as a whole.
- **Visitor**: The boyfriend who receives and views the site.
- **Creator**: The person building and personalising the site.
- **Hero_Section**: The fullscreen opening section of the Site.
- **Timeline_Section**: The "Our Story" vertical timeline section.
- **Gallery_Section**: The photo and video memory gallery section.
- **Reasons_Section**: The "Reasons Why I Love You" card section.
- **Letter_Section**: The interactive love letter section.
- **Music_Section**: The music player section.
- **Surprise_Section**: The hidden surprise reveal section.
- **Future_Section**: The "Future Together" dream-board section.
- **Ending_Section**: The final birthday message and celebration section.
- **Modal**: A fullscreen or overlay popup triggered by user interaction.
- **Particle_System**: The animated floating hearts/stars background effect.
- **Countdown_Timer**: A live timer counting down to or since a specific date.
- **Flip_Card**: A card UI element that rotates 180° on interaction to reveal a back face.
- **Scroll_Animation**: An animation triggered when an element enters the viewport during scrolling.
- **GSAP**: GreenSock Animation Platform, a JavaScript animation library.
- **Framer_Motion**: A React animation library.
- **Lottie**: A library for rendering After Effects animations as JSON.

---

## Requirements

### Requirement 1: Hero Landing Section

**User Story:** As a Visitor, I want to be greeted by a stunning fullscreen opening, so that I immediately feel the emotional weight and excitement of the gift.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a fullscreen background that accepts either a video (MP4 or WebM) or a photo collage (JPEG, PNG, or WebP) provided by the Creator; IF no media is provided, THE Hero_Section SHALL display a solid dark gradient fallback background.
2. WHEN the Hero_Section loads, THE Particle_System SHALL animate floating hearts and stars across the screen at a density of 20–60 particles visible at any one time.
3. WHEN the Hero_Section loads, THE Site SHALL display a typewriter text animation showing a personalised greeting message of up to 200 characters, rendering each character at a speed of 50–80 milliseconds per character, and the animation SHALL stop when the full message has been displayed.
4. IF the Creator has configured a future birthday date, THEN THE Hero_Section SHALL display a Countdown_Timer showing days, hours, minutes, and seconds remaining until that date in DD:HH:MM:SS format.
5. IF the Creator has configured a past memorable date, THEN THE Hero_Section SHALL display a Countdown_Timer showing the total days elapsed since that date.
6. WHEN the Visitor clicks the "Open Your Gift" button, THE Site SHALL smoothly scroll to the next section over a duration of 600–800 milliseconds using an ease-in-out curve.
7. IF the Creator has provided an audio track, THEN THE Hero_Section SHALL display a music toggle button; WHEN the Visitor clicks the toggle button, THE Site SHALL play or pause the audio track accordingly; IF no audio track is provided, THE Hero_Section SHALL hide the toggle button.
8. WHEN the Hero_Section loads, THE Site SHALL apply a fade-in entrance animation to all Hero_Section elements over a duration of 800 milliseconds, transitioning from opacity 0 to opacity 1.
9. THE Hero_Section SHALL render the greeting card with a background opacity between 0.6 and 0.85 so that all text within the card achieves a contrast ratio of at least 4.5:1 against the card background.

---

### Requirement 2: Our Story Timeline

**User Story:** As a Visitor, I want to scroll through a visual timeline of our relationship milestones, so that I can relive our shared memories in a meaningful, chronological way.

#### Acceptance Criteria

1. THE Timeline_Section SHALL display a vertical timeline containing at least the following milestone types: first meeting, first chat, first date, shared trips, and future dreams — all configurable by the Creator.
2. WHEN a timeline milestone enters the viewport by at least 20% of its height during scroll, THE Timeline_Section SHALL trigger a Scroll_Animation revealing that milestone entry within one animation frame (≤16ms).
3. WHEN the Visitor hovers over a timeline milestone, THE Timeline_Section SHALL display a hover card showing a photo (or a placeholder icon if no photo is provided) and a short description of up to 150 characters for that milestone.
4. WHERE the Creator has provided an audio clip for a milestone, THE Timeline_Section SHALL display a play button on that milestone's hover card; WHEN the Visitor clicks the play button, THE Timeline_Section SHALL play that audio clip in-place and SHALL pause any other currently playing audio clip before starting the new one.
5. WHEN the Timeline_Section is visible in the viewport, THE Timeline_Section SHALL animate the timeline connector dots with a repeating pulse or glow effect on a cycle of 1.5–2.5 seconds.

---

### Requirement 3: Memory Gallery

**User Story:** As a Visitor, I want to browse a gallery of our photos and videos, so that I can experience our memories in a visually rich, interactive format.

#### Acceptance Criteria

1. THE Gallery_Section SHALL display photos in a masonry grid layout styled as polaroid frames; WHERE the Creator has provided a caption for a gallery item, THE Gallery_Section SHALL display that caption below the image within the polaroid frame.
2. WHEN the Visitor clicks a gallery item, THE Gallery_Section SHALL open a Modal displaying the image at its natural resolution (up to the viewport dimensions) or the video player, along with its caption if provided; WHEN the Visitor clicks outside the Modal or presses the Escape key, THE Gallery_Section SHALL close the Modal.
3. WHERE the Creator has provided a video clip (MP4) for a gallery item, THE Gallery_Section SHALL display and play that video within the Modal with standard play/pause controls; IF the video fails to load, THE Gallery_Section SHALL display an error message within the Modal.
4. WHERE the Creator has provided a "before" and "now" image pair, THE Gallery_Section SHALL display an interactive slider that the Visitor can drag or swipe horizontally to reveal the "before" image on the left and the "now" image on the right.
5. WHEN the Visitor moves the cursor over a gallery card on a device with a pointer input, THE Gallery_Section SHALL apply a 3D tilt effect that tracks the cursor position, with a maximum tilt angle of 15 degrees on each axis.

---

### Requirement 4: Reasons Why I Love You

**User Story:** As a Visitor, I want to discover personalised reasons why I am loved, so that I feel seen and appreciated in a fun, interactive way.

#### Acceptance Criteria

1. THE Reasons_Section SHALL display a grid of Flip_Cards; each card SHALL have a front face showing a decorative visual (such as a heart icon or pattern) with no reason text visible, and a back face containing the reason text.
2. WHEN the Visitor clicks or taps a Flip_Card, THE Reasons_Section SHALL animate the card rotating 180° around its vertical axis to reveal the reason text on the back face; the rotation animation SHALL complete within 300–600 milliseconds.
3. THE Reasons_Section SHALL support a minimum of 10 reasons and a maximum of 100 reasons, all configurable by the Creator.
4. WHEN the Visitor clicks the "Show Me Another" button, THE Reasons_Section SHALL select a random un-flipped Flip_Card, apply a visually distinct pulsing or scaled highlight state to it, and scroll it into the centre of the viewport.
5. WHEN all Flip_Cards have been revealed, THE Reasons_Section SHALL display a confetti burst animation lasting 2–4 seconds.
6. IF the Visitor clicks the "Show Me Another" button when all Flip_Cards have already been flipped, THEN THE Reasons_Section SHALL display a message indicating that all reasons have been revealed, and SHALL NOT attempt to highlight or scroll to any card.

---

### Requirement 5: Interactive Love Letter

**User Story:** As a Visitor, I want to read a personal love letter presented as a physical letter, so that the message feels intimate and handcrafted.

#### Acceptance Criteria

1. THE Letter_Section SHALL display the love letter on a component with a paper texture background image and a handwriting-style font at a minimum size of 16px.
2. WHEN the Letter_Section enters the viewport, THE Letter_Section SHALL first play the envelope opening animation (criterion 3), and only after that animation completes SHALL it begin the typing animation that reveals the letter text character by character at a rate of 30–60 characters per second.
3. THE Letter_Section SHALL display an envelope opening animation with a duration of 0.5–2 seconds before the letter text is revealed.
4. THE Letter_Section SHALL display a signature at the end of the letter using a cursive handwriting font, animated as a path-drawing effect over 1–3 seconds, beginning only after the typing animation has completed.
5. WHERE the Creator has enabled background music for the Letter_Section, THE Letter_Section SHALL begin playing a soft piano audio track when the Letter_Section enters the viewport and SHALL pause that track when the Letter_Section leaves the viewport.

---

### Requirement 6: Music Section

**User Story:** As a Visitor, I want to listen to songs that are meaningful to our relationship, so that I can feel the emotions tied to our shared musical memories.

#### Acceptance Criteria

1. THE Music_Section SHALL display a list of songs provided by the Creator; each song entry SHALL show a title of up to 100 characters, an occasion label of up to 50 characters, and album art of at least 80×80 pixels.
2. WHEN the Visitor clicks the play control on a song entry, THE Music_Section SHALL start rotating the vinyl record animation for that song within 300 milliseconds; WHEN the Visitor clicks the pause control, THE Music_Section SHALL stop the vinyl rotation within 300 milliseconds.
3. WHERE the Creator has provided lyrics for a song, WHEN the Visitor clicks the play control, THE Music_Section SHALL open a lyrics popup displaying those lyrics; WHEN the Visitor switches to a different song, THE Music_Section SHALL close the previous lyrics popup and open a new one for the selected song if lyrics are available.
4. WHERE the Creator has provided a Spotify playlist link, THE Music_Section SHALL embed the Spotify playlist player widget using the official Spotify embed iframe.
5. THE Music_Section SHALL visually distinguish the currently playing song entry from all other entries using a highlighted background or border state that is applied within 300 milliseconds of the play action.

---

### Requirement 7: Surprise Reveal Section

**User Story:** As a Visitor, I want to unlock a hidden surprise through an interactive mechanic, so that the reveal feels earned and exciting.

#### Acceptance Criteria

1. THE Surprise_Section SHALL present the Visitor with exactly one of the following unlock mechanics, configurable by the Creator: (a) a scratch card effect where the Visitor scratches at least 70% of the surface area to unlock, (b) a password entry field accepting up to 50 characters where the Visitor must enter the correct value, or (c) a "press and hold" button that the Visitor must hold for 3 continuous seconds.
2. WHEN the Visitor successfully completes the unlock mechanic, THE Surprise_Section SHALL reveal the surprise content within 500 milliseconds using a fade-in or slide-up transition; the surprise content may be a trip plan, a gift description, a heartfelt message, or an embedded video montage as configured by the Creator.
3. WHEN the Visitor successfully completes the unlock mechanic, THE Surprise_Section SHALL play a celebratory confetti or fireworks animation lasting 2–5 seconds.
4. IF the Visitor submits an incorrect password, THEN THE Surprise_Section SHALL display a hint message within 300 milliseconds without revealing any portion of the correct password or the surprise content.
5. THE Surprise_Section SHALL keep the surprise content fully hidden (no portion readable or visible) until the unlock mechanic is successfully completed.

---

### Requirement 8: Future Together Section

**User Story:** As a Visitor, I want to see a visual dream-board of our shared future plans, so that I feel excited and hopeful about what we will build together.

#### Acceptance Criteria

1. THE Future_Section SHALL display a dream-board layout containing cards for: places to visit, shared goals, bucket list items, and future milestones — all configurable by the Creator; each card SHALL display a title of up to 80 characters and detail text of up to 300 characters.
2. WHERE the Creator has provided location data (latitude and longitude) for places to visit, THE Future_Section SHALL display an interactive map with animated markers appearing at those locations within 1 second of the map becoming visible.
3. THE Future_Section SHALL display a progress tracker for each shared goal showing a numeric completion percentage (0–100) set by the Creator, rendered as both a numeric label and a proportional filled bar.
4. WHEN the Visitor hovers over a future goal card on a device with a pointer input, THE Future_Section SHALL apply a 3D tilt animation completing within 300 milliseconds and SHALL display the card's detail text.
5. WHEN each Future_Section card enters the viewport by at least 20% of its height during scroll, THE Future_Section SHALL trigger a Scroll_Animation revealing that card within one animation frame (≤16ms).

---

### Requirement 9: Ending Section

**User Story:** As a Visitor, I want the website to end with a joyful, celebratory finale, so that the experience closes on a high emotional note.

#### Acceptance Criteria

1. WHEN the Visitor scrolls into the Ending_Section, THE Ending_Section SHALL trigger a fullscreen fireworks and confetti animation lasting 3–6 seconds.
2. THE Ending_Section SHALL display the final birthday message provided by the Creator at a font size of at least 32px on desktop (≥1024px wide) and at least 22px on mobile (<1024px wide).
3. THE Ending_Section SHALL display a heartbeat animation consisting of a pulsing heart icon that scales up and down on a cycle of 0.8–1.2 seconds, running continuously while the Ending_Section is visible.
4. THE Ending_Section SHALL display 3–10 floating lantern animations rising upward and fading out as they reach the top of the viewport.
5. WHEN the fireworks animation completes, THE Ending_Section SHALL transition over 500 milliseconds to a calm final state displaying only the birthday message and a looping subtle Particle_System effect.

---

### Requirement 10: Site-Wide Navigation and Scroll Experience

**User Story:** As a Visitor, I want smooth, guided navigation through the site, so that the experience feels like a curated journey rather than a standard webpage.

#### Acceptance Criteria

1. THE Site SHALL implement smooth scroll behaviour between all sections with a transition duration of 600–1000 milliseconds using an ease-in-out curve.
2. THE Site SHALL display a fixed navigation indicator showing one dot per section; the dot corresponding to the Visitor's current section SHALL be visually distinct (e.g. filled or enlarged) and SHALL update within one animation frame (≤16ms) as the Visitor scrolls.
3. WHEN the Visitor moves the cursor on a device with a pointer input, THE Site SHALL render a custom cursor effect (glow or trailing heart) that follows the cursor position with a lag of no more than 100 milliseconds.
4. THE Site SHALL apply parallax scrolling to background elements in the Hero_Section and Timeline_Section, moving background layers at 20–60% of the foreground scroll rate.
5. THE Site SHALL be fully responsive and SHALL render all sections without horizontal overflow at viewport widths from 375px to 2560px.
6. IF the Visitor's device does not support autoplay audio, THEN THE Site SHALL display a visible prompt with a minimum tap target size of 44×44 pixels inviting the Visitor to enable sound.

---

### Requirement 11: Personalisation and Content Configuration

**User Story:** As a Creator, I want to configure all personal content in one place, so that I can customise the site without modifying component logic.

#### Acceptance Criteria

1. THE Site SHALL store all personalised content — including names, dates, messages, photo paths, audio paths, and reasons — in a single configuration file or data module; no personalised values SHALL be hardcoded inside component source files.
2. WHEN the Creator updates the configuration file and rebuilds the Site, THE Site SHALL reflect those changes without requiring modifications to any component source file.
3. THE Site SHALL provide placeholder content for every configurable field so that the site renders without layout breakage or missing-element errors before personalisation is complete.
4. THE Site SHALL support the following media types for gallery and timeline items: JPEG, PNG, WebP, GIF, and MP4; WHERE a media file fails to load, THE Site SHALL display a visible error indicator in place of the missing media.

---

### Requirement 12: Technical Stack and Performance

**User Story:** As a Creator, I want the site built with modern, well-supported technologies, so that it is easy to deploy, maintain, and extend.

#### Acceptance Criteria

1. THE Site SHALL be built using React as the UI framework.
2. THE Site SHALL use GSAP or Framer_Motion for all scroll-triggered and entrance animations.
3. THE Site SHALL use Lottie for any complex pre-rendered animations such as fireworks or floating lanterns.
4. THE Site SHALL achieve a Lighthouse performance score of 80 or above on desktop when tested with representative personalised content.
5. THE Site SHALL be deployable as a static site to platforms such as Vercel, Netlify, or GitHub Pages without requiring a backend server.
6. WHEN the Site loads for the first time, THE Site SHALL display a loading screen; THE Site SHALL dismiss the loading screen and complete the initial render within 4 seconds on a standard broadband connection of 25 Mbps or faster.
7. THE Site SHALL lazy-load images and videos, beginning to load each media asset only when it is within 200 pixels of the visible viewport boundary, so that media outside that range does not block the initial page load.
