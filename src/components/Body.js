import React from "react"
import { Link } from "gatsby"

export function MonthDivider({ month }) {
  return (
    <div className="MonthDivider">
      <div className="month">{month}</div>
      <div className="slash">/</div>
      <div className="line">
        <div></div>
      </div>
    </div>
  )
}

export function BlogPostPreview({ path, date, title, excerpt }) {
  return (
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
}

export default function Body({ posts }) {
  return (
    <div className="Body">
      {posts
        // .filter(post => filterOptions(post))
        .map(({ node: post }, ind, arr) => (
          <React.Fragment key={post.frontmatter.date}>
            {ind === 0 ||
            (ind > 0 &&
              post.frontmatter.date.slice(0, 3) !==
                arr[ind - 1].node.frontmatter.date.slice(0, 3)) ? (
              <MonthDivider month={post.frontmatter.date.slice(0, 3)} />
            ) : null}
            <BlogPostPreview
              path={post.frontmatter.path}
              date={post.frontmatter.date.substring(4, 6)}
              title={post.frontmatter.title}
              excerpt={post.excerpt}
            />
          </React.Fragment>
        ))}
    </div>
  )
}
