---
path: "/challenge-2"
date: 2020-05-15
title: "Challenge #2"
blurb: "My challenges and victories whilst attempting challenge #2"
tags: ["gats", "blog", "blah"]
---

This week the challenge was to deploy my gatsby blog to a CDN. I chose to deploy it to three of them: surge, netlify and github pages. Here is my take on the three.

## Surge.sh

They have a cute mascot of a walrus. They've gained a respectable following with 6.2m deployments, almost 60TB of published content and just shy of 1 million projects.

Surge's sole aim is simple deployment. Their website states "simple, single-command web publishing. Publish HTML, CSS, and JS for free, without leaving the command line." And have they achieved that goal? I'd say hell yeah!

## Netlify

This one is pretty popular within the web dev community and I can see why. It's pretty much just as simple to deploy as surge but has added bells and whistles. They have a GUI--for lack of better words--on their site with features such as drag and drop deployment, site overview, analytics, and other various settings and customisation utilities.

To deploy to Netlify, one must create and account. Log in to said account. Use the build tool (gatsby build). Then drag and drop the public folder. Piece of cake.

🍰

## GitHub Pages

Lastly, I deployed my site to GitHub Pages. My Gatsby blog's repo is stored there openly for all you code fiends (feel free to critique my code), so I thought it was fitting to try their's out. And fittingly, I had the most difficulty with it. It went as smoothly as curdled cat-octopus milk.

First time around it kept publishing my ReadMe.md which was/is (god, I hope it's the former) currently the word "Blog". What a lovely, succinct website. I reread the instructions, analysing every detail to see what steps I missed out but couldn't find it. I switched the repo from private to public. Deployed a few thousand times.

Naturally, I came to the conclusion that GitHub was flawed and that I was faultless. Dunning-Kruger my bff.

In all seriousness, I'm still unsure as to how I finally got it working. If anyone has any suspicion of where I could've went wrong, let me know. But until the next time I deploy to GH Pages I won't know.

## TL;DR Chart

## Conclusion

It's pretty packed full of goodies if you prefer a more comprehensive

<div class="summary">
  <h2>
    Challenges:
  </h2>
  <ul>
    <li>Initial filter function didn't do what I wanted.</li>
    <li>New ESLint warnings.</li>
    <li>Github pages threw shade.</li>
  </ul>
  <h2>
    Victories:
  </h2>
  <ul>
    <li>Added a filter function to filter tags.</li>
    <li>Pushed to github.</li>
    <li>Used gatsby build.</li>
    <li>Published site to various CDNs.</li>
    <li>Ran my first lighthouse audit.</li>
  </ul>
</div>
