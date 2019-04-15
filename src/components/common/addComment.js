import React, { Component } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";

class AddComment extends Component {
  render() {
    return (
      <Form>
        <Form.Field
          control={TextArea}
          label="Add Comment"
          placeholder="Here the content of comment.."
        />
        <Form.Field control={Button}>Add Comment</Form.Field>
      </Form>
    );
  }
}

export default AddComment;
