import React, { useEffect, useState } from 'react'

const COMMENTS_API_URL = process.env.GATSBY_COMMENTS_API_URL

type Comment = {
  commentId: string,
  parentCommentId?: string | null,
  children?: Comment[] | [],
  name: string,
  date: string,
  text: string,
  slug: string,
  depth: number,
}

const Comment: React.FC<Comment> = ({
  name,
  text,
  slug,
  parentCommentId = null,
  commentId,
  date,
  children = [],
  depth,
}) => (
  <div className={`Comment depth-${depth}`} id={commentId}>
    {/* <p>ID: {commentId}</p> */}
    <p>Date: {(new Date(Date.parse(date))).toString()}</p>
    <p>Name: {name}</p>
    <p>Text: {text}</p>
    {/* <p>Slug: {window ? window.location.href : slug}</p> */}
    {
      parentCommentId && <p>In response to: {parentCommentId}</p>
    }
    {
      children.length !== 0 && <CommentBranch commentsArr={children} depth={depth+1} />
    }
  </div>
)

interface CommentsBranchProps {
  commentsArr: Comment[],
  depth: number,
}

const CommentBranch: React.FC<CommentsBranchProps> = ({ commentsArr, depth }) => {
  return (
    <div className="CommentBranch">
      {commentsArr.map(comment => (
        comment.parentCommentId &&
          comment.parentCommentId === comment.commentId ?
            <div className="error">
              ILLEGAL COMMENT: SELF-REFERENCING
            </div> :
            <Comment 
              key={comment.commentId}
              name={comment.name}
              slug={comment.slug}
              commentId={comment.commentId}
              date={comment.date}
              text={comment.text}
              children={comment.children || []}
              parentCommentId={comment.parentCommentId || null}
              depth={depth}
            /> 
        ))}
    </div>
  )
}

const CommentsList = ({ slug }) => {
  // Get comments from slug
  const [ commentState, setCommentState ] = useState({
    isLoading: false,
    comments: [],
  })

  useEffect(() => {
    setCommentState({ ...commentState ,isLoading: true })
    try {
      fetch(`${COMMENTS_API_URL}/${slug}`)
      .then((res) => res.json())
      .then((comments) => {
        if (Array.isArray(comments)) {
          setCommentState({ isLoading: false, comments })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [setCommentState])

  const orderedComments = commentState.comments.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  const nestedComments = orderedComments.reduce((acc, cur) => {
    if (!cur.parentCommentId || acc.length === 0) {
      acc.position[cur.commentId] = [acc.orderedList.length]
      acc.orderedList.push({...cur, children: []})
    } else {
      if (Array.isArray(acc.position[cur.parentCommentId])) {
        // if parent position exists, then locate the parent, 
        // then push into children

        let pos = acc.position[cur.parentCommentId]
        const { orderedList } = acc
        let ptr = orderedList

        while (pos.length !== 0) {
          ptr = ptr.children ? ptr.children[pos[0]] : ptr[pos[0]]
          pos = pos.slice(1) // pop first item off
        }
        
        try {
          acc.position[cur.commentId] = [...acc.position[cur.parentCommentId], ptr.children.length]
          ptr.children.push({...cur, children: []})
        } catch (error) {
          console.log(`ERROR: ${error}, ${JSON.stringify(cur)}, ${ptr.parentCommentId === null}`)

        }
      }
    } 
    return acc
  }, {position: {}, orderedList: []})
  console.log(commentState.comments)
  console.log(orderedComments)
  console.log(nestedComments)
  return (
    <div className="CommentsList">
      <h3 style={{ textDecoration: 'underline' }}>Comments List</h3>
      {<CommentBranch commentsArr={nestedComments.orderedList as Comment[]} depth={0} />}
    </div>
  )
}

const CommentsForm = () => (
  <div className="CommentsForm">
    <h3 style={{ textDecoration: 'underline' }}>Comments Form</h3>
  </div>
)

interface CommentsProps {
  slug: string,
}

const CommentSection: React.FC<CommentsProps> = ({ slug }) => {
  return (
    <div className="Comments">
      <CommentsList slug={slug}/>
      <CommentsForm />
    </div>
  )
}

export default CommentSection