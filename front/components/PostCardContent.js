import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardContent = ({ postData }) => {
  console.log(postData)
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hastag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          )
        } else {
          return <span>{v}</span>
        }
      })}
    </div>
  )
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
}
export default PostCardContent
