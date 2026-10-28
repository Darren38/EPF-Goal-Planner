# Notes for working on this project

A single-file web app (`index.html`, plus `sw.js`), published by GitHub Pages straight from `main`.

## How the owner likes changes made

- Commit straight to `main`, no pull requests (the same way as Tech Comparison Hub).
- Commits are authored by Darren38 only, with no co-author or session lines, so Darren38 stays the only contributor.
- Commit messages and the README are written in plain, friendly words for people who are not developers.

## Lessons from bugs found here

These came out of a full check on phones (320–430px), tablets and laptops (up to 1920px). Check for each of them
before calling a change finished, here or in any similar page.

1. **The `hidden` attribute loses to any class that sets `display`.** A footer styled `display:flex` stayed visible
   after the script hid it. Keep the global `[hidden]{display:none !important}` rule.
2. **Fixed gaps between chart bars eat the chart when there are many bars.** Fifty years on a 320px phone left bars
   0px wide. Scale the gap with the number of bars, and space axis labels by real pixel width, not by count.
3. **Labels centred on a thin bar hang off the edge.** The final-balance label and the last year label widened the
   page by a few pixels. Anchor edge labels to the edge, drop labels that would be cut, and clip chart cards.
4. **Grid and flex children with text that never wraps widen the whole page.** A formula box set to `nowrap` pushed
   its grid column past the screen. Give such children `min-width:0`, and use `minmax(min(330px,100%),1fr)` rather
   than a bare `minmax(330px,1fr)`.
5. **`white-space:nowrap` on a header fixes wrapping but can overflow the smallest phones.** Shrink buttons for
   widths of 380px and below, and always test at 320px.
6. **Hover-only interactions do nothing on a phone.** The chart breakdown needs `pointerdown`/`click` as well as hover,
   and must not hide itself on `pointerleave` from a finger.
7. **A floating bar at the bottom of a phone screen covers whatever scrolls to the bottom.** Add
   `scroll-padding-bottom` the height of the bar, and padding at the end of the page.
8. **Keyboard shortcuts on a dialog only fire when focus is inside it.** Escape is now listened for on the whole page
   while the dialog is open.
9. **Browsers keep GitHub Pages files for about ten minutes**, so visitors saw the old version after an update.
   `sw.js` makes every visit check for newer files.
10. **Saved settings can be old or damaged.** A mode name the page doesn't know left it half in one mode and half in
    another. `loadState` accepts only the real choices for each setting.

### Lessons from GSO Grid Archive (the owner's other site), worth checking here too

11. **A stacked chart counts a missing lower value as zero** and draws everything above it too low. Stack only values
    taken at the same moment, and make a moment with any missing value a gap for every layer.
12. **A row of buttons that doesn't wrap widens the page on a 320 px phone.** Button groups need `flex-wrap: wrap`.
13. **`pkill -f <pattern>` can kill the shell that runs it**, because the pattern is in its own command line. Stop test
    servers by their process number instead.
14. **A service worker makes its own requests**, so Playwright's `page.route()` can't fake them. Tests that fake
    failures or slow answers open their context with `serviceWorkers: "block"`.
15. **Where an official site has the same chart, draw ours the way it does**; charts this site works out itself stay
    as they are.

The same lessons are kept in GSO Grid Archive's `CLAUDE.md`. When a new lesson turns up in either project, add it to
both.

## How to check a change

Use the preinstalled Playwright and Chromium. For each width (320, 360, 390, 430, phone landscape 844, 768, 1024,
1280, 1366, 1440, 1920):

- `document.documentElement.scrollWidth` must equal the window width: no sideways scrolling.
- No console errors, and no `NaN`, `undefined` or `Infinity` anywhere in the page text.
- Go through every tab, every mode (salary or fixed amount, bonus, non-Malaysian, all four dividend bases, Shariah,
  monthly crediting), and the edge cases: age 58 and 70, a goal that is never reached, a goal already reached, a zero
  balance.
- Tap (on phones) or hover (on laptops) a chart bar, and confirm the breakdown appears inside the chart.
- Run the setup wizard from start to finish, reload to confirm settings are kept, and download the CSV.
- Check the maths against a hand-worked year: RM100,000 at 6% with RM1,000 a month, counted from 1 January,
  gives a RM5,775 dividend and RM116,775 at the end of the first year.
