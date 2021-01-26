import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import { CommentsForm } from './Forms'
import '../css/Comments.scss'

const { GATSBY_COMMENTS_API_URL } = process.env

export const CommentContext = React.createContext(null)


const CommentFormResponse = ( success ) => null
  // success ?
  //   (
  //     <div className="Success">Success</div>
  //   ) :
  //   (
  //     <div className="Failure">Failure</div>
  //   )

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
  const { replyTo, setReplyTo, submitStatus } = useContext(CommentContext)
  const isReplyTo = replyTo.commentId === commentId

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
      {!submitStatus.hasSubmit && 
      <>
        {" · "}
        <p
          style={{
            cursor: "pointer",
            display: "inline-block",
            color: "#C0C0C0"
          }}
          onClick={() => {
            if (!(replyTo.commentId === commentId)) {
              setReplyTo({ name, commentId })
            } else {
              setReplyTo({ name: "", commentId: ""})
            }
          }}
        >
          {isReplyTo ? "unreply" : "reply"}
        </p>
        </>}
    </div>
    {
      children.length !== 0 && <CommentBranch commentsArr={children} depth={depth+1} />
    }
    {isReplyTo && (!submitStatus.hasSubmit && <CommentsForm className={`depth-${depth+1}`} /> || 
    submitStatus.hasSubmit && <CommentFormResponse success={submitStatus.success} />)}
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

const CommentsList = () => {
  const [ commentState, setCommentState ] = useState({
    isLoading: false,
    comments: [],
  })

  const { slug, submitStatus, errors, setErrors } = useContext(CommentContext)

  useEffect(() => {
    if (submitStatus.hasSubmit && !submitStatus.success) {
      return
    }
    setCommentState({ ...commentState ,isLoading: true })
    fetch(`${GATSBY_COMMENTS_API_URL}/${slug}`)
    .then((res) => res.json())
    .then((comments) => {
      if (Array.isArray(comments)) {
        setCommentState({ ...commentState, comments })
      }
      else if (comments.error) {
        throw Error(comments.error)
      }
    })
    .catch(error => {
      console.log(error.message)
      setErrors({ ...errors, hasError: true, list: [error.message]})
    })
    return () => {
      setCommentState({ comments: [], isLoading: false })
    }
  }, [setCommentState, submitStatus.success])

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

  return (
    <div className="CommentsList">
      {(!errors.hasError) ? <CommentBranch commentsArr={nestedComments.orderedList as Comment[]} depth={0} />
      : <div>Error: {(errors.list) ? `${errors.list[0]}` : 'Could not load comments'}</div>}
    </div>
  )
}



type Errors = {
  hasError: boolean,
  list: String[],
  form: String[],
}
// TODO: remove slug
const CommentSection: React.FC = () => {
  const [ replyTo, setReplyTo ] = useState({ commentId: "", name: "" })
  const [ errors, setErrors ] = useState<Errors>({ hasError: false, list: [], form: [] })
  const [ submitStatus, setSubmitStatus ] = useState({ hasSubmit: false, success: false })
  const slug = window.location.href.split("/").slice(-2, -1)[0] as string

  return (
    <CommentContext.Provider value={{slug, replyTo, setReplyTo, errors, setErrors, submitStatus, setSubmitStatus }}>
      <div className="Comments">
        <h2 style={{ fontFamily: 'Crimson Text' }}>Comments</h2>
        <CommentsList />
        {/* if no replies, and submit status = false*/}
        {!errors.hasError && replyTo.commentId.length === 0 && 
          (!submitStatus.hasSubmit 
            ? <CommentsForm /> 
            : <CommentFormResponse success={submitStatus.success} />)
        }
      </div>
    </CommentContext.Provider>
  )
}

export default CommentSection