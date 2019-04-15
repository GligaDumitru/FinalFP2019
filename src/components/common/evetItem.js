import React, { Component } from "react";

export default class EvetItem extends Component {
  onClickParticipantsList = () => {
    this.props.toggleParticipants(
      this.props.participants,
      this.props.participants,
      this.props.event
    );
  };
  onClickShowComments = () => {
    this.props.toggleComments(
      this.props.participants,
      this.props.comments || {},
      this.props.event
    );
  };

  render() {
    const { event, onClick, joined, id } = this.props;

    return (
      <div
        className={`event_item-container ${this.props.className}`}
        onClick={this.props.onClickEvent}
      >
        <div className="event_item-date-container">
          <div className="event_item-date-day">{event.date.day}</div>
          <div className="event_item-date-month">{event.date.month}</div>
        </div>
        <div className="event_item-info-container">
          <div className="event_item-info-title">{event.title}</div>
          <div className="event_item-info-date">
            <i className="clock outline grey icon" />
            {event.date.entireDate}
          </div>
          <div className="event_item-info-location">
            <i className="map marker alternate grey icon" />
            {event.location.title}
          </div>
          <div className="event_item-info-description">
            <div className="event_item-info-description-label">
              <i className="circle orange icon tiny" />
              <span>Description:</span>
            </div>
            {event.description}
          </div>
          <div className="event_item-info-organizer">
            <div className="event_item-info-organizer-label">
              <i className="circle orange icon tiny" />
              <span>Organizer:</span>
            </div>
            {event.organizer}
          </div>
          <div className="event_item-info-category">
            <div className="event_item-info-category-label">
              <i className="circle orange icon tiny" />
              <span>Category:</span>
            </div>
            {event.category}
          </div>
        </div>
        <div className="event_item-action-container">
          <button
            className={joined ? "ui icon button joined" : "ui icon button join"}
            disabled={joined ? true : false}
            onClick={onClick}
            id={id}
          >
            {!joined ? "Join" : "Going"}
          </button>
          <button
            id={id + "_participants_list"}
            className="ui icon button"
            onClick={this.onClickParticipantsList}
          >
            Participants
          </button>
          <button
            className="ui icon button"
            title="add comment"
            data-content="Add users to your feed"
            onClick={this.onClickShowComments}
          >
            <i class="comment icon" /> Add Comment
          </button>
        </div>
      </div>
    );
  }
}
