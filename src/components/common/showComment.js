import React from "react";
import { List } from "semantic-ui-react";

const ShowComment = ({ text, date, user }) => (
  <List>
    <List.Item>
      <List.Icon name="user" />
      <List.Content>
        <List.Header as="a">
          {user && user} <span className="dateComment">{date && date}</span>{" "}
        </List.Header>
        <List.Description>{text && text}</List.Description>
      </List.Content>
    </List.Item>
  </List>
);

export default ShowComment;
