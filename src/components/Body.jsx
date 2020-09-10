import React from "react"
import { Link } from "gatsby"

import "../css/Body.scss"

const MonthDivider = ({ month }) => (
  <div className="MonthDivider">
    <div className="month">{month}</div>
    <div className="slash">/</div>
    <div className="line">
      <div></div>
    </div>
  </div>
)

const BlogPostPreview = ({ path, date, title, excerpt }) => (
  <div className="BlogPostPreview">
    <Link to={path}>
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

const PostsListItem = ({ post, newMonth }) => (
  <>
    {newMonth && <MonthDivider month={post.frontmatter.date.slice(0, 3)} />}
    <BlogPostPreview
      path={post.frontmatter.path}
      date={post.frontmatter.date.substring(4, 6)}
      title={post.frontmatter.title}
      excerpt={post.excerpt}
    />
  </>
)

const newMonth = (ind, post, arr) =>
  ind === 0 ||
  (ind > 0 &&
    post.frontmatter.date.slice(0, 3) !==
      arr[ind - 1].node.frontmatter.date.slice(0, 3))

const Body = ({ posts }) => (
  <div className="Body">
    {posts
      // .filter(post => filterOptions(post))
      .map(({ node: post }, ind, arr) => (
        <PostsListItem
          key={post.id}
          post={post}
          newMonth={newMonth(ind, post, arr)}
        />
      ))}
  </div>
)

export default Body
