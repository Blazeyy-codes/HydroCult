# **App Name**: HydrateNow

## Core Features:

- Daily Goal Setting: Set and update a daily water intake goal, stored in Supabase using upsert logic.
- Water Intake Logging: Log water intake with quick buttons and optional custom input; each log includes amount, timestamp, and date, stored in Supabase using insert logic.
- Visual Progress Indicator: Display progress towards the daily goal with a circular progress bar or wave animation.
- Daily History: Show a list of today’s water intake logs, sorted by time (latest first), with amount and time (HH:MM) for each entry, filtering by current calendar date from the Supabase.
- Streak System: Track and display a hydration streak, incrementing when the daily goal is met and breaking when a day is missed.
- Milestone Celebrations: Trigger confetti or a subtle micro-animation upon reaching 50% and 100% of the daily goal.
- Smart Daily Summary: Display total intake, goal status (met or missed), and difference (e.g., "You were 300ml short") at the end of the day.
- Empty State Handling: Prompt user to set daily goal if no goal is set; display empty history message if no logs exist; disable progress indicators if goal = 0; show retry option for failed log submission; display end-of-day summary when goal is not met.
- Offline/Optimistic Updates: Immediately update UI when user logs water (optimistic update); implement retry logic or rollback if Supabase insert fails; handle slow or flaky network gracefully.
- Accessibility Standards: Ensure minimum 44px touch targets for buttons; use high contrast colors for progress bars and text; implement screen-reader friendly labels for all interactive elements; provide keyboard navigation support where relevant.
- Performance Optimization: Avoid full page reloads; use component-level state; optimize rendering to only update components affected by a new log; ensure smooth animations without jank; provide fast initial load using skeleton loaders instead of spinners.
- Mascot/visual metaphor: Plant filling up or droplet animation
- Export/share daily summary: Export/share daily summary
- Excess goal handling: Over 100% logs
- User Authentication & Data Scoping: Integrate Supabase Auth for user identification (email, magic link, or third-party). All daily goals, logs, streaks, and summaries must be scoped to the authenticated user. Define behavior for anonymous users if needed.
- Dynamic Water Mood: Visuals change based on hydration level: <50% → dull, sleepy colors; 50–80% → energetic, light blue; 100% → vibrant, celebratory colors. Could be paired with ambient sound cues (optional, subtle water sounds). Makes your app feel alive, not just numbers.
- Mini Daily Challenges: Example: “Drink 250ml within the next hour”, “Complete 2 quick logs before lunch”. Gives short-term goals besides the main daily goal.
- Progressive Reward System: Badges, avatars, or “water trophies” for: Consistent streaks, Logging every day for a week, Logging unusually large single intakes safely. Make it shareable (social or screenshot), optional.
- Hydration Insights & Fun Analytics: Show fun stats, not just raw numbers: “Most hydrated time of day”, “You drank 60% of water in the morning”. Visual: water wave graph over 24h. Could include weekly trends and predictive streak forecasts (“If you keep this pace, your streak hits 30 days!”). Most apps give raw numbers; giving insight with personality is a differentiator.
- Customizable Drink Types: Let users choose: Water, tea, coffee, juice. Optional icons for each. Track cumulative hydration vs. goal. For drinks other than water it should show users that what drinking too much of drink can cause them so that they dont overdose on it.

## Style Guidelines:

- Primary color: #1E90FF (Bright Blue) Calls to action, trust
- Secondary color: #00BFFF (Light Blue) Progress bars, highlights
- Background color: #F0F8FF (Off-white / Pale Blue) Soft, clean canvas
- Primary text color: #111827 (Dark Charcoal) High readability
- Secondary text color: #6B7280 (Gray 500) Timestamps, less prominent info
- Error color: #EF4444 (Red 500) Failed log submissions
- Milestone color: #10B981 (Green 500) Goal reached, streak complete
- Confetti color: #FBBF24, #F87171, #34D399 Fun micro-animations
- Headlines: PT Sans, 24–32px, Bold Primary hierarchy
- Sub-headlines / Labels: PT Sans, 18–20px, Medium Progress %, summaries
- Body / Paragraph: PT Sans, 14–16px, Regular Logs, messages, secondary text
- Buttons: PT Sans, 16px, Semi-bold Clear call-to-action
- Timestamps / Minor info: PT Sans, 12px, Regular, Gray Non-intrusive
- Mobile-first vertical layout
- Sticky “Add Water” button: fixed bottom center/right; thumb-friendly (≥44px)
- Padding / Margins: 16–24px around main containers
- List items: 12–16px vertical spacing for history logs
- Cards / Sections: rounded-lg with subtle shadow (shadow-sm) to separate areas
- Minimalist, line-style SVG icons
- Consistent stroke weight and style
- Size: 20–24px inline, 32–48px for emphasis
- Progress fill: Smooth circular or wave animation (0 → current %)
- Log addition: Micro bounce/ripple effect on water icon
- Milestones: Confetti or subtle glow at 50% / 100% goal
- Streak celebration: Brief fire/spark effect
- Hover & Tap: Buttons brighten slightly on hover, shadow increases on tap