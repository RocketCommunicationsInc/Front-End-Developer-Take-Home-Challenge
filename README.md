# Angular Developer Take Home Challenge

This is my submission for the take home challenge.

## Project Development

The project was done with Angular (obviously) and the Astro components. The accordion was chosen to form the main two lists based on the items in `alerts.json` and `contacts.json` having more information than would be easily displayed in a table. Using icons and the status component made some information easier to see at a glance, though the icons were chosen somewhat arbitrarily based on the alert data. Since the accordion lacks any built-in sorting capability, it was done manually, and *mostly* separated into the sorting component, as was pagination, using `jw-paginate` to avoid reinventing the wheel. 

To ensure a consistent theme while allowing the use of TailwindCSS utility classes, I ran a small script to convert the Astro CSS colors into a Tailwind theme, though in the scope of this project most colors went unused.

## Possible Future Changes

To allow for routing, `app-satellites` in `app.component.html` could be replaced with a `router-outlet`, but as the app stands, routing wasn't necessary.

Animation could be added to ease sorting movement.

The `accordion` component didn't allow for proper headings, which would make for easier column definition. Sorting could be on any arbitrary column instead of just on a single one per list. The list could be filtered by status as well, but making sorting, filtering, and pagination work together nicely would be better done with a dedicated table component.

## Time Spent

Functionality-wise, this probably took a couple hours. The two panes are nearly identical, only really being separated by the models used (alert vs contact). I took a bit of time to familiarize myself with the Astro components, and wireframed a couple designs before settling on this one, keeping the interpretation of "pane" consistent with the one in the [sample app](https://sample-app.astrouxds.com/). I also spent a bit of time fiddling with the stying to ensure consistent spacing, etc. with the sample app.

## External Libraries

- [tailwindcss](https://tailwindcss.com/) Used for CSS utility classes
- [heroicons](https://github.com/tailwindlabs/heroicons) Used for non-astro icons
- [jw-paginate](https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript) Used for pagination functionality
- [date-fns](https://date-fns.org/) Used for date formatting