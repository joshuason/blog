---
path: "/challenge-3"
date: 2020-05-22
title: "Challenge #3"
blurb: "My challenges and victories whilst attempting challenge #2"
tags: ["imgs", "blog", "blah"]
featuredImg: "../../images/batu-gezer-1HcNgs3RrKE-unsplash.jpg"
imageAlt: "Pink PSP"
---

Hello world, again.

This week the challenge was to:

- add an image to markdown-based blog post
- do lighthouse audit before and after adding image
- create an about page
- learn about gatsby-image api to transform selfie into a black and white square -- and have that implemented on the about page

(If you see an image on this page, you'll know that the challenge has been completed.)
((If you don't, something probably went wrong))

Boy, oh boy, was adding an image more difficult than I thought it would be. I'm sure the &lt;img&gt; would've sufficed but as I wanted to utilise Gatsby's image optimization via gatsby-image api.

I first went through Gatsby's [working with images in markdown](https://www.gatsbyjs.org/docs/working-with-images-in-markdown/) post. Adding the test images to <span class="code">src/images</span> folder, then adding the folder to <span class="code">gatsby-config.js</span> only (frustratingly) resulted in an error message <span class="code error">Field "image" must not have a selection since type "String" has no subfields</span>. After some light googling came the feeling of derp when I discovered that the url/source dir was incorrect. After that was resolved, another error showed up. Great. --Errors were appearing more often than wild pokemon when you're rushing towards the pokecenter in a vast field of grass, with a poisoned pokemon.

This error was a result of blog posts with no images. There was an error in my logic. Fair call. I edited blog-post.js and lo-and-behold 'twas fixed and I accomplished my first task! **Pats self on back**.

Reading about the API proved harder than I had planned. May be due to my irregular sleep cycle or the fact I haven't left the house in a few days but I felt less focused as of late and lack of focus is not conducive to productivity, let alone reading documentation. But I digress.

The gatsby-image API is a wonderful image api
