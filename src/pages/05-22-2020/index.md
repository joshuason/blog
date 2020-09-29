---
slug: '/challenge-3'
date: 2020-05-22
title: 'Images, you b*tch'
blurb: 'My challenges and victories whilst attempting challenge #3'
tags: ['image', 'markdown', 'jsx']
featuredImg: '../../images/batu-gezer-1HcNgs3RrKE-unsplash.jpg'
imageAlt: 'Pink PSP'
---

Hello world, again,

This week the challenge was all about adding images to pages and showcasing the brilliantly, gorgeous gatsby-image API. To summarise the objectives for those unfamiliar, the tasks this week were to:

- add an image to markdown-based blog post
- create an about page
- learn about gatsby-image api to transform selfie into a black and white square
- implement above on the about page
- do lighthouse audit before and after adding image (extra)

More details can be seen at the [gatsby 100 day challenge](https://www.gatsbyjs.org/blog/100days/gatsby-image/).

But boy, oh boy, was adding an image more difficult than I thought it would be. I'm sure the <span class="code">&lt;img&gt;</span> could've sufficed but no... To fully utilise Gatsby's image optimization through the gatsby-image api one has to work for it.

And work for it I did.

## Adding an image to Markdown

Firstly, a quick read through of Gatsby's [working with images in markdown post](https://www.gatsbyjs.org/docs/working-with-images-in-markdown/) provided an outline of steps to incorprate images in my blog:

1. Add the images to <span class="code">src/images</span> folder
2. Add the folder to <span class="code">gatsby-config.js</span>
3. Add image's relative url/path to frontmatter

Following said steps, only frustratingly resulted in an error message:

<p class="code-error">Field "image" must not have a selection since type "String" has no subfields</p>

![Jake Peralta](https://steamuserimages-a.akamaihd.net/ugc/823506058661954611/B3685679465B62E28B582A6A31781532F65DD46F/)

What does this even mean? After some light googling came the sensation of derp when I discovered that someone else had made the same error: the url/source dir was incorrect. After that was realised, another error appeared. Cool.

Turns out blog posts with no images were unaccounted for and thus errored out. There was an error in my logic--fair call! I edited <span class="code">blog-post.js</span> to ignore the function of image adding should a url not be present in its frontmatter... and lo-and-behold 'twas fixed and I accomplished my first real task!

_\*Pats self on back\*_

## Adding an image to JSX

Reading about [the API](https://www.gatsbyjs.org/docs/gatsby-image/) proved harder than I had planned. This may be due to my irregular sleep cycle or the fact I haven't left the house in a few days (thanks pandemic) but I felt less focused as of late, and lack of focus is not conducive to productivity, let alone reading documentation. But I digress.

So, to add an image to my JSX about page I read up on [another Gatsby doc](https://www.gatsbyjs.org/docs/working-with-images/). To summarise, the steps I made to achieve this were:

1. Script up the GraphQL query
2. Add <span class="code">(&#123; data &#125;)</span> to the function to utilise the data returned from query
3. Add <span class="code">import Img from 'gatsby-image'</span>
4. Add <span class="code">&lt;Img&gt;</span> to JSX

It was pretty straight forward. And bam! – 3 of the tasks completed.

✅ ✅ ✅

## Lighthouse this

Finally, the lighthouse audit.

Before:

![Before embedded image](../../images/before-image.png)

After:

![After embedded image](../../images/after-image.png)

Pretty darn good I must say. Image optimisation at its finest! There was only a three percent drop in performance but that's not too bad!

## Conclusion

I'd say this has been the most eventful week of my Gatsby challenge. I still need to clean up my code and have still yet to implement a reuseable component for the top nav bar (added to my todos). However, the week has been successful in terms of meeting the objectives and my productivity.

Featuring images on your blog can initially be a pain in the ass, but just like riding a bike once you know you know–_until something changes in the code base_. Also, it does add a bit of flare to your site and makes it less boring, I suppose.

## Resources

Main docs:  
https://www.gatsbyjs.org/docs/working-with-images/  
https://www.gatsbyjs.org/docs/working-with-images-in-markdown/  
https://www.gatsbyjs.org/docs/images-and-files/  
https://www.gatsbyjs.org/docs/gatsby-image/  
https://www.gatsbyjs.org/packages/gatsby-image/

Supporting docs:  
https://www.gatsbyjs.org/docs/plugins/  
https://www.gatsbyjs.org/packages/gatsby-source-filesystem/  
https://www.gatsbyjs.org/docs/gatsby-config/  
https://www.gatsbyjs.org/docs/gatsby-link/
