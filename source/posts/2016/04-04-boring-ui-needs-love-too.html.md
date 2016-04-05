---
title: Boring UI deserves love too
category: User Interface (UI)
date: 04/04/2016 00:00
---

TL;DR We moderniser the Verified by Visa UI, adding some spacing, colour and accessibility features afforded by current web technologies; yet still supporting older browsers.

Recently while purchasing online using a new card, I was prompted by Barclays to register the card for the ‘Verified by Visa' authentication process. I'm sure many of you have seen this little window before:

This has been around for years. It's a great idea to make sure that the retailer you're buying from has that extra level of security and fills customers with confidence that their money is being safely transferred to the shop.

Once you have set this up, most of the time you will see this screen pop up after you have clicked ‘buy', it appears to whir away, then it disappears; having deemed you to be who you say you are. If not then you have to enter various characters from a password and hit continue to complete the process.

[citation about bad UI being more believable when it's from a bank]

Now, I have never, ever seen this while purchasing on mobile. And that's probably a good thing.

The page the authorisation is displayed on does not have meta tags to display well on a mobile device, so you'll get a tiny box (with even smaller inputs) on a desktop view on mobile. [cite needed]

And even if that were in place, the text is small, the inputs are small, everything is small. Accessibility and usability have not been taken into consideration.

[facts about mobile purchase rising]

Sometimes the boring, in-between interface elements are the ones that need the most love. They're the ones that stitch your product together.

Shop → Buy → Security Check → Confirmation.

In the case of the Verified by Visa auth you have absolutely no control. Your shopping flow is no longer seamless but has this jarring experience in the middle. It's like being specially selected for secondary screening at an airport; It really ruins the whole experience.

[facts about conversion and 3d secure]

I'm sure there are many legal and functional requirements involved that I'm unaware of, so take the following with a pinch of designery salt. I've tried to stay true to the terminology and form structure.

The ironic thing is that the form is so close to being acceptable on mobile! Let's give it a lick of paint.


### A Beautiful User Interface
- Balanced the size of the logos and given them a little room to breath
- Added a clear heading to draw your attention and clue you in as to what this page is
- Increase the form fields
- Differentiate the labels by making them bold
- Made all links consistent in size and colour
- Made the call to action much more prominent

### Less is more
Removed the welcome message as it's not really needed
Removed the paragraph saying you're not signed up as all the copy (and the now prominent call to action) indicate something needs to be signed up for / activated
Removed the paragraph about filling in the form… what else are you going to do?

### Visual Accessibility

Visually the original form met accessibility standards for contrast and colours (there were none) but the copy was very small and people with poor eyesight might struggle. The update also passes accessibility tests but adds a splash of colour.

[insert image or something proving it passes]

We've used the Barclays colours but you can see how you could theme based on different banks, or use the Verified by Visa brand colours.

### Accessibility in code

You can try this out for yourself as we've build the design in codepen using progressive enhancement to support all browsers (you heard that right).

Flexbox: http://caniuse.com/#search=flexbox Not well enough supported to offer any gains
SVG: http://caniuse.com/#search=svg As an enhancement using the `<picture>` element

<p data-height="680" data-theme-id="8030" data-slug-hash="2a14bec58bdc95e4485a3251e82be32f" data-default-tab="result" data-user="craigmdennis" class="codepen">See the Pen <a href="http://codepen.io/craigmdennis/pen/2a14bec58bdc95e4485a3251e82be32f/">Verified By Visa</a> by Craig Dennis (<a href="http://codepen.io/craigmdennis">@craigmdennis</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Coding Standards
Aria roles
Email fields
Placeholders
SVG for resolution independent logos / icons
