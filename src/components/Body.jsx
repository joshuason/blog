import React from 'react'
import { Link } from 'gatsby'

import '../css/Body.scss'

const getMonth = date => date.slice(0,3)
const getDay = date => date.slice(4,6)

const MonthDivider = ({ month }) => (
  <div className="MonthDivider">
    <div className="month">{month}</div>
    <div className="slash">/</div>
    <div className="line">
      <div></div>
    </div>
  </div>
)

const BlogPostPreview = ({ slug, date, title, excerpt }) => (
  <div className="BlogPostPreview">
    <Link to={slug}>
      <div className="date">{date}</div>
      <div className="slash">/</div>
      <div className="title-blurb">
        <div className="title">{title}</div>
        <div className="slash">/</div>
        <div className="blurb">{excerpt}</div>
      </div>
    </Link>
  </div>
)

const PostsListItem = ({ post: { slug, date, title, excerpt }, isNewMonth }) => (
  <>
    {isNewMonth && <MonthDivider month={getMonth(date)} />}
    <BlogPostPreview
      slug={slug}
      date={date.substring(4, 6) && getDay(date)}
      title={title}
      excerpt={excerpt}
    />
  </>
)

// const newMonth = (ind, post, arr) =>
//   ind === 0 ||
//   (ind > 0 &&
//     (post.frontmatter  
//       ? post.frontmatter.date.slice(0,3)
//       : post.publishDate.slice(0,3)) 
//     !==
//     (arr[ind - 1].node.frontmatter
//       ? arr[ind - 1].node.frontmatter.date.slice(0, 3)
//       : arr[ind - 1].node.publishDate.slice(0,3))

//     // (post.frontmatter.date.slice(0, 3) !==
//     //   arr[ind - 1].node.frontmatter.date.slice(0, 3) ||
//     //   post.
//     // ) 
//   )

const Body = ({ posts }) => (
  <div className="Body">
    {/* {posts
      // .filter(post => filterOptions(post))
      .map(({ node: post }, ind, arr) => (
        <PostsListItem
          key={post.id}
          post={post}
          newMonth={newMonth(ind, post, arr)}
        />
      ))} */}
      {
        posts
          .map(({ node: post }) => (
            post.frontmatter ? 
            {
              id: post.id,
              slug: post.frontmatter.slug,
              title: post.frontmatter.title,
              date: post.frontmatter.date,
              excerpt: post.excerpt,
            } : 
            {
              id: post.id,
              slug: post.slug,
              title: post.title,
              date: post.publishDate,
              excerpt: post.description.childMdx.excerpt,
            }))
          .map((obj, ind, arr) => (
            <PostsListItem
              key={obj.id}
              post={obj}
              isNewMonth={ind === 0 || getMonth(obj.date) !== getMonth(arr[ind-1].date)}
            />
          ))
      }
  </div>
)

export default Body
