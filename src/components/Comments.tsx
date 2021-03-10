import React, { FC, SetStateAction, useContext, useEffect, useState } from 'react'
import { CommentsForm } from './Forms'
import '../css/Comments.scss'

const { GATSBY_COMMENTS_API_URL } = process.env

export const CommentContext = React.createContext(null)

interface Comment {
  commentId: string
  parentCommentId?: string | null
  children?: Comment[] | undefined[]
  name: string
  date: string
  text: string
  slug: string
  depth: number
}

interface CommentsBranchProps {
  commentsArr: Comment[]
  depth: number
}

interface CommentState {
  isLoading: boolean
  comments: Comment[] | []
}

interface CommentContext {
  slug: string
  submitStatus: SubmitStatus
  errors: Errors
  setErrors: (Obj: Errors) => SetStateAction<Errors>
  replyTo: Replies
  setReplyTo: (Obj: Replies) => SetStateAction<Replies>
}

interface NestedComments {
  position: {
    [id: string]: number[];
  };
  orderedList: Comment[];
}

interface Errors {
  hasError: boolean
  list: String[] 
  form: String[]
}

interface Replies {
  commentId: string
  name: string
}

interface SubmitStatus {
  hasSubmit: boolean
  success: boolean
}

const CommentFormResponse: FC<{success: boolean}> = ({ success }) => null
  // success ?
  //   (
  //     <div className="Success">Success</div>
  //   ) :
  //   (
  //     <div className="Failure">Failure</div>
  //   )

const Comment: FC<Comment> = ({
  name,
  text,
  slug,
  parentCommentId = null,
  commentId,
  date,
  children = [],
  depth,
}) => {
  const [ isHidden, setIsHidden ] = useState<boolean>(false)
  const { replyTo, setReplyTo, submitStatus } = useContext<CommentContext>(CommentContext)
  const isReplyTo: boolean = replyTo.commentId === commentId

  const [ day, mon, num, yea ]: string[] = new Date(Date.parse(date)).toDateString().split(" ")
  const [ hr, min, sec ]: string[] = new Date(Date.parse(date)).toTimeString().split(/:| /)

  const dateFormat: string = `${num} ${mon} ${yea.slice(2)}`
  const timeFormat: string = `${Number.parseInt(hr) > 12 ? Number.parseInt(hr)%12 : hr}:${min} ${Number.parseInt(hr) > 11 ? "pm" : "am"}`

  return (
  <div className={`Comment depth-${depth}`} id={commentId}>
    <div className="Comment-Details">
      <div>
        <span 
          className="Comment-Name-Date"
          onClick={() => setIsHidden(!isHidden)}
        >
          <span>
            <b className="name">{name}</b>
            {" · "}
            {dateFormat}
          </span>
        </span>
        {
          !submitStatus.hasSubmit && 
            <>
              {" · "}
              <span
                className="reply"
                onClick={() => {
                  if (!(replyTo.commentId === commentId)) {
                    setReplyTo({ name, commentId })
                  } else {
                    setReplyTo({ name: "", commentId: ""})
                  }
                }}
              >
                {isReplyTo 
                  ? <i className="fas fa-times"></i>
                  : <i className="fas fa-reply"></i>
                }
              </span>
            </>
        }
      </div>
    </div>
    {!isHidden && <p className="Comment-Message">{text}</p>}
    {
      children.length !== 0 && <CommentBranch commentsArr={children} depth={depth+1} />
    }
    {isReplyTo && (!submitStatus.hasSubmit && <CommentsForm className={`depth-${depth+1}`} /> || 
    submitStatus.hasSubmit && <CommentFormResponse success={submitStatus.success} />)}
  </div>
)}

const CommentBranch: FC<CommentsBranchProps> = ({ commentsArr, depth }) => {
  return (
    <div className="Comment-Branch">
      {commentsArr.map((comment: Comment) => (
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

const CommentsList: FC = () => {
  const [ commentState, setCommentState ] = useState<CommentState>({ isLoading: false, comments: [] })
  const { slug, submitStatus, errors, setErrors } = useContext<CommentContext>(CommentContext)

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
      setErrors({ ...errors, hasError: true, list: [error.message] })
    })
    return () => {
      setCommentState({ comments: [], isLoading: false })
    }
  }, [setCommentState, submitStatus.success])

  const orderedComments: Comment[] = commentState.comments.sort((a: Comment, b: Comment) => Date.parse(a.date) - Date.parse(b.date))
  const nestedComments: NestedComments = orderedComments.reduce((acc: NestedComments, cur: Comment) => {
    // if cur has no parents or list is empty, push cur into OL and add pos into position obj
    if (!cur.parentCommentId || acc.orderedList.length === 0) {
      acc.position[cur.commentId] = [acc.orderedList.length]
      acc.orderedList.push({...cur, children: []})
    // else if cur has parent;
    } else if (Array.isArray(acc.position[cur.parentCommentId]) && acc.position[cur.parentCommentId].length) {
      let pos: number[] = acc.position[cur.parentCommentId] // get the position of parent within orderedList
      let ptr: Comment = acc.orderedList[pos[0]] // pointer: point to first pos in position queue
      pos = pos.slice(1) // pop first item off oL

      while (pos.length !== 0) {
        ptr = ptr.children ? ptr.children[pos[0]] : ptr[pos[0]] // 
        pos = pos.slice(1) // pop first item off oL
      }
      
      acc.position[cur.commentId] = [...acc.position[cur.parentCommentId], ptr.children.length]
      ptr.children = [...ptr.children, {...cur, children: []}]
    } 
    return acc
  }, {position: {}, orderedList: []})

  return (
    <div className="Comments-List">
      {(!errors.hasError) ? <CommentBranch commentsArr={nestedComments.orderedList as Comment[]} depth={0} />
      : <div>Error: {(errors.list) ? `${errors.list[0]}` : 'Could not load comments'}</div>}
    </div>
  )
}

const CommentSection: FC = () => {
  const [ replyTo, setReplyTo ] = useState<Replies>({ commentId: "", name: "" })
  const [ errors, setErrors ] = useState<Errors>({ hasError: false, list: [], form: [] })
  const [ submitStatus, setSubmitStatus ] = useState<SubmitStatus>({ hasSubmit: false, success: false })
  const slug: string = typeof window !== 'undefined' ? window.location.href.split("/").slice(-2, -1)[0] : ''

  return (
    <CommentContext.Provider value={{ slug, replyTo, setReplyTo, errors, setErrors, submitStatus, setSubmitStatus }}>
      <div className="Comments">
        <div className="separator">
          <div className="separator-line"></div>
        </div>
        <p className="title">Comments</p>
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