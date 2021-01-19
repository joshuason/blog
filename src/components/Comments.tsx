import React, { useContext, useEffect, useState } from 'react'
import { CommentsForm } from './Forms'
import '../css/Comments.scss'

const { GATSBY_COMMENTS_API_URL } = process.env

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
}) => {
  const [ isHidden, setIsHidden ] = useState(false)
  const comments = useContext(CommentContext)
  const isReplyTo = comments.replyTo === commentId

  const [ day, mon, num, yea ] = new Date(Date.parse(date)).toDateString().split(" ")
  const [ hr, min, sec ] = new Date(Date.parse(date)).toTimeString().split(/:| /)

  const dateFormat = `${num} ${mon} ${yea.slice(2)}`
  const timeFormat = `${Number.parseInt(hr) > 12 ? Number.parseInt(hr)%12 : hr}:${min} ${Number.parseInt(hr) > 11 ? "pm" : "am"}`

  return (
  <div className={`Comment depth-${depth}`} id={commentId}>
    {!isHidden && <p>{text}</p>}
    <div className="CommentDetails">
      <p style={{ display: "inline-block" }}>{name} · {dateFormat} · {timeFormat}</p>
      {" · "}
      <p
        style={{
          cursor: "pointer",
          display: "inline-block",
          color: "#C0C0C0"
        }}
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? "show" : "hide"}
      </p>
      {" · "}
      <p
        style={{
          cursor: "pointer",
          display: "inline-block",
          color: "#C0C0C0"
        }}
        onClick={() => {
          if (!(comments.replyTo === commentId)) {
            comments.setReplyTo(commentId)
          } else {
            comments.setReplyTo("")
          }
        }}
      >
        {isReplyTo ? "unreply" : "reply"}
      </p>
    </div>
    {
      children.length !== 0 && <CommentBranch commentsArr={children} depth={depth+1} />
    }
    {isReplyTo && <CommentsForm slug={slug} className={`depth-${depth+1}`} parentCommentId={commentId} replyTo={name} />}
  </div>
)}

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
  const [ commentState, setCommentState ] = useState({
    isLoading: false,
    comments: [],
  })

  useEffect(() => {
    setCommentState({ ...commentState ,isLoading: true })
    fetch(`${GATSBY_COMMENTS_API_URL}/${slug}`)
    .then((res) => res.json())
    .then((comments) => {
      if (Array.isArray(comments)) {
        setCommentState({ isLoading: false, comments })
      }
    })
    .catch(error => console.log(error))
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
      <h2 style={{ fontFamily: 'Crimson Text' }}>Comments</h2>
      {<CommentBranch commentsArr={nestedComments.orderedList as Comment[]} depth={0} />}
    </div>
  )
}

interface CommentsProps {
  slug: string,
}


const CommentContext = React.createContext(null)

// TODO: remove slug
const CommentSection: React.FC<CommentsProps> = ({ slug }) => {
  const [ replyTo, setReplyTo ] = useState("")

  console.log(slug)
  return (
    <CommentContext.Provider value={{replyTo, setReplyTo}}>
      <div className="Comments">
        <CommentsList slug={slug} />
        {replyTo.length === 0 && <CommentsForm slug={slug} />}
      </div>
    </CommentContext.Provider>
    
  )
}

export default CommentSection