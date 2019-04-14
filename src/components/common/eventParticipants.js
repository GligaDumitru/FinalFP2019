import React, { Fragment } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import UserList from "./userList";

export default function EventParticipants(props) {
  if (props.currentEvent !== "") {
    console.log("ce am primit:", props.currentEvent);
  }
  return (
    <Fragment>
      {props ? (
        <Modal open={props.showParticipants} onClose={props.close}>
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src="http://outlier.uchicago.edu/img/computer_science_landscape_study/Who-Is-Participating-PD_3.png"
            />
            <Modal.Description>
              <div className="ui relaxed divided list">
                <h1>Participants for event: [{props.currentEvent.title}] </h1>
                {props.participants &&
                  props.participants.map((item, index) => {
                    let nameOfUser = props.getDetailsFromUser(item);
                    return <UserList val={nameOfUser} />;
                  })}
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      ) : null}
    </Fragment>
  );
}
