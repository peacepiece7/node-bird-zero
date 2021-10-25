import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = (props) => {
  console.log(props.children);
  return (
    <div>
      <div>
        <div>
          <Link href="/">node bird</Link>
        </div>
        <div>
          <Link href="/profile">profile</Link>
        </div>
        <div>
          <Link href="/signup">sign up</Link>
        </div>
      </div>
      {props.children}
    </div>
  );
};

// children은 type이 node임 (return안에 들어갈 수 있는 값)
AppLayout.PropTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
