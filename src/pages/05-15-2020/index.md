---
path: "/challenge-2"
date: 2020-05-15
title: "Challenge #2"
blurb: "My challenges and victories whilst attempting challenge #2"
tags: ["deployment", "cdn"]
---

This week the challenge was to deploy my Gatsby blog to a CDN. I'm going to be honest and state that I've never actually deployed anything to the web before. I've pushed things to the internet via GitHub, blogs, forums but that has always utilised someone else's infrastructure. They've built containers so that their sites are... contained. I've always been anxious that I'd release some destructive code and would break the internet.

Now that I've grown up, my fears subsided with becoming more informed, I can't wait to publish it. I have chose to deploy my Gatsby blog to three CDNs: <i>Surge, Netlify and GitHub Pages</i>. Here is my take on the three.

Note: prior to deployment one must <span class="code">gatsby build</span>!

## Surge

Surge's sole aim is to simplify deployment. Their website states "simple, single-command web publishing. Publish HTML, CSS, and JS for free, without leaving the command line." And have they achieved that goal? I'd say hell yeah! ✊

To deploy: just install surge, <span class="code">build</span> your Gatsby site, <span class="code">cd</span> into the <span class="code">public</span> dir, then <span class="code">surge[enter]</span>. After entering in your email address and password, and a custom subdomain address, the site is live. All without leaving your terminal!

Sooo. Freaking. SIMPLE!

What about signing up? They've included that into the process too! They've kinda merged it with the sign in process which is pretty cool, I must say. Assumingly, under the hood, Surge checks to see whether the email address has been signed up. If not, sign them up with the password they provide. This is entirely my noobie speculation though.

Other noteable bonuses: ability to integrate a custom domain, custom 404's, great docs and many other goodies. Their proud stats featured on their front page states the respectably garnered following with 6.2m deployments, almost 60TB of published content and just shy of 1 million projects. Also, most importantly they have a cute mascot of a walrus.

## Netlify

This one is pretty popular within the web dev community and I can see why. It's pretty much just as simple to deploy as surge but has added bells and whistles. They have a nice graphical user interface--for lack of better words--with features such as drag and drop deployment, site overview, analytics, and other various settings and customisation utilities.

To deploy to Netlify, one must create an account. Log into said account. Use the build tool (<span class="code">gatsby build</span>). Then drag and drop the <span class="code">public</span> folder into the browser. Piece of cake! 🍰

The myriad of other features would definitely be great to explore and provides an intro into what tools are required when deploying a fully blown website. Feel free to explore and research these added functionalities to see which ones work for you.

## GitHub Pages

Finally, I deployed my site to GitHub Pages. My Gatsby blog's repo is stored there, openly for all you code fiends (feel free to critique my code), so I thought it was fitting to try their's out. And fittingly, I had the most difficulty with it. It went as smoothly as curdled cat-octopus milk.

First time around it kept publishing my ReadMe.md which was/is (god, I hope it's the former) currently the word "Blog". What a lovely, succinct website. I reread the instructions, analysing every detail to see what steps I missed out but couldn't find it. I had followed the instructions on [gatsbyjs for deploying to GitHub Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages).

Things I tried include: consulting with Dr. Google, switching the repo from public to private to public, screaming at my laptop, deploying a few thousand times.

Naturally, I came to the conclusion that GitHub was flawed and that I was faultless. Dunning-Kruger my bff. In all seriousness, I'm still unsure as to how I finally got it working. If anyone has any suspicion of where I could've went wrong, let me know. My guess is the fault lies with me. I possibly published the wrong branch, my raw source files and not the public build branch. But until the next time I deploy to GH Pages I won't know. Hopefully, just a one-off occurence: 🤞

## Conclusion

If I were to be completely candid, I haven't had much chance to play around with the different features they all have to offer, so I can't provide you with an indepth analysis and compare these additional features––I'll leave that up to you.

However, as an anxious noob web developer with the intention of deploying my first site, I'd recommend pushing your first project off with Surge. I love the ease of use and the access within the terminal. Some may not like this which is totally fine! However, think of Surge as a means to just get the ball rolling and ease you into deployment... baby steps; exposure therapy in a way.

When you become a bit more advanced and require extra tools you may find the integrated features of Netlify easier to manage rather than installing different third party plugins. It's pretty packed full of goodies if you prefer a more comprehensive suite of tools at your disposal.

Definitely have a play around with other providers to see what works for you. I've only discussed three however there are a good number of others out there, swimming in the sea of the internet.

See the list on [Gatsby](https://www.gatsbyjs.org/docs/deploying-and-hosting/) for a start!

<!--
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
    <li>Used Gatsby build.</li>
    <li>Published site to various CDNs.</li>
    <li>Ran my first lighthouse audit.</li>
  </ul>
</div>
-->
