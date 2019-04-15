import React, { Fragment } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  TextArea
} from "semantic-ui-react";
import ShowComment from "./showComment";

export default function Comments(props) {
  const {
    showComments,
    toggleComments,
    handleChangeComment,
    commentValue,
    onAddComment,
    eventDetails,
    comments,
    getDetailsFromUser
  } = props;
  return (
    <Fragment>
      {props ? (
        <Modal open={showComments} onClose={toggleComments}>
          <Modal.Header>
            Comments |
            <span className="eventComment">
              {props.eventDetails && props.eventDetails.title}
            </span>
          </Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="small"
              src="https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Comments-512.png"
            />
            <Modal.Description>
              <Header>{props.eventDetails && props.eventDetails.title}</Header>
              <p>{props.eventDetails && props.eventDetails.description}</p>
              <Form>
                <Form.Field
                  control={TextArea}
                  label="Add Comment"
                  placeholder="Here the content of comment.."
                  value={commentValue}
                  onChange={handleChangeComment}
                />
                <Form.Field
                  control={Button}
                  id={eventDetails && eventDetails.eventId}
                  onClick={onAddComment}
                >
                  Add Comment
                </Form.Field>
              </Form>
              {comments &&
                comments.map(comment => (
                  <ShowComment
                    user={getDetailsFromUser(comment.user, true)}
                    text={comment.text}
                    date={comment.date}
                  />
                ))}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      ) : null}
    </Fragment>
  );
}
