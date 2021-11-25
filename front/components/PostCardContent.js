import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import nanoid from "nanoid";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hastag/${v.slice(1)}`} key={nanoid()}>
              <a>{v}</a>
            </Link>
          );
        }
        return <span>{v}</span>;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};
export default PostCardContent;
