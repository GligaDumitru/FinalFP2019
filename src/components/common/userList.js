import React from "react";

export default function UserList(props) {
  return (
    <div class="item">
      <i class="large user secret icon" />
      <div class="content">
        <div class="description">{props.val}</div>
      </div>
    </div>
  );
}
