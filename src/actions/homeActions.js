import HereConfig from "../config/HereConfig";
import firebaseProvider from "../config/FireConfig";
import "es6-promise";
import "isomorphic-fetch";
import "fetch-jsonp-polyfill";
import * as actionTypes from "./actionstype";

export const resetFormState = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_FORM_STATE
    });
  };
};

export const requestLocationOptions = () => {
  return {
    type: actionTypes.REQUEST_LOCATION_OPTIONS
  };
};

export const receiveLocationOptions = data => {
  return {
    type: actionTypes.RECEIVE_LOCATION_OPTIONS,
    data: data
  };
};

export const requestSaveEvent = () => {
  return {
    type: actionTypes.REQUEST_SAVE_EVENT
  };
};

export const receiveSaveEvent = () => {
  return {
    type: actionTypes.RECEIVE_SAVE_EVENT
  };
};

export const requestEventList = () => {
  return {
    type: actionTypes.REQUEST_EVENT_LIST
  };
};

export const requestUserList = () => {
  return {
    type: actionTypes.REQUEST_USER_LIST
  };
};

export const receiveEventList = data => {
  return {
    type: actionTypes.RECEIVE_EVENT_LIST,
    data: data
  };
};

export const receiveUserList = data => {
  return {
    type: actionTypes.RECEIVE_USER_LIST,
    payload: data
  };
};

export const getLocationOptions = suggestion => {
  return dispatch => {
    dispatch(requestLocationOptions());

    //async function for getting the locations (here api)
    return fetch(
      `${HereConfig.BASE_URL_AUTOCOMPLETE}?app_id=${
        HereConfig.APP_ID
      }&app_code=${HereConfig.APP_CODE}&query=${suggestion}&maxresults=10`
    )
      .then(
        resp => {
          return resp.json();
        },
        err => err
      )
      .then(resp => {
        dispatch(receiveLocationOptions(resp));
      });
  };
};

export const updateFormState = (propPath, payload) => {
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_FORM_STATE,
      propPath: propPath,
      data: payload
    });
  };
};

export const removeSelectedLocation = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.REMOVE_SELECTED_LOCATION
    });
  };
};

export const saveEvent = payload => {
  return dispatch => {
    dispatch(requestSaveEvent());

    let locationId = payload.location.id;
    //get lat and long for a specific address
    return fetch(
      `${HereConfig.BASE_URL_GEOCODE}?app_id=${HereConfig.APP_ID}&app_code=${
        HereConfig.APP_CODE
      }&locationid=${locationId}&gen=8`,
      {
        method: "JSONP",
        callback: "jsoncallback",
        callbackName: "callbackFiiPractic"
      }
    )
      .then(
        resp => {
          return resp.json();
        },
        err => err
      )
      .then(resp => {
        const {
          Latitude
        } = resp.Response.View[0].Result[0].Location.DisplayPosition;
        const {
          Longitude
        } = resp.Response.View[0].Result[0].Location.DisplayPosition;
        const newEvent = {
          ...payload,
          location: {
            ...payload.location,
            latitude: Latitude,
            longitude: Longitude
          }
        };
        setNewEvent(newEvent, payload.userId).then(() => {
          dispatch(receiveSaveEvent());
        });
      });
  };
};

export const setNewEvent = (event, userId) => {
  return firebaseProvider
    .database()
    .ref("events")
    .push()
    .set(event);
};

export const addNewCommentToFirebase = (ev, comment) => {
  let comments = [];
  let participants = [];

  const {
    date,
    description,
    location,
    organizer,
    title,
    userId,
    category,
    eventId
  } = ev;
  if (ev.comments) comments = [...ev.comments];
  if (ev.participants) participants = [...ev.participants];
  comments.push(comment);
  const data = {
    date,
    description,
    location,
    comments,
    organizer,
    title,
    userId,
    category,
    participants
  };
  return firebaseProvider
    .database()
    .ref("events")
    .child(eventId)
    .update({ ...data });
};

export const addNewParticipant = (eventIndex, userIdFromData) => {
  let participants = [];
  let comments = [];
  const {
    date,
    description,
    location,
    organizer,
    title,
    userId,
    category,
    eventId
  } = eventIndex;
  if (eventIndex.comments) comments = [...eventIndex.comments];
  if (eventIndex.participants) participants = [...eventIndex.participants];
  participants.push(userIdFromData);
  const data = {
    date,
    description,
    location,
    comments,
    organizer,
    title,
    userId,
    category,
    participants
  };
  return firebaseProvider
    .database()
    .ref("events")
    .child(eventId)
    .update({ ...data });
};

export const joinEvent = (eventIndex, userIdFromData) => {
  return dispatch => {
    addNewParticipant(eventIndex, userIdFromData);
  };
};

export const addNewComment = (eventId, comment) => {
  return dispatch => {
    addNewCommentToFirebase(eventId, comment);
  };
};

export const getEventList = () => {
  return dispatch => {
    dispatch(requestEventList());
    fetchEventListFirebase().then(rsp => {
      dispatch(receiveEventList(rsp));
    });
  };
};

export const getUserList = () => {
  return dispatch => {
    dispatch(requestUserList());
    fetchUserListFirebase().then(res => {
      dispatch(receiveUserList(res));
    });
  };
};

export const fetchUserListFirebase = () => {
  let payload = {
    userList: []
  };
  return firebaseProvider
    .database()
    .ref("users")
    .once("value", snapshot => {
      if (snapshot.val() !== null) {
        payload["userList"] = snapshotToArray(snapshot, true);
      }
    })
    .then(() => {
      return payload;
    });
};

export const fetchEventListFirebase = () => {
  let payload = {
    eventList: []
    /*hint
     *here you can add another array for scheduled events
     *fetch scheduled events from firebase
     */
  };
  return (
    firebaseProvider
      .database()
      .ref("events")
      // .orderByChild('date')
      .once("value", snapshot => {
        if (snapshot.val() !== null) {
          payload["eventList"] = snapshotToArray(snapshot);
        }
      })
      .then(() => {
        return payload;
      })
  );
};

export const snapshotToArray = (snapshot, user = false) => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    if (user) {
      item.userId = childSnapshot.key;
    } else {
      item.eventId = childSnapshot.key;
    }
    returnArr.push(item);
  });

  return returnArr;
};
