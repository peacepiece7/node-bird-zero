import React from 'react'
import PropTypes from 'prop-types'

const PostCardContent = ({ postData }) => {
  console.log(postData)
  return <div>post data split</div>
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
}
export default PostCardContent
