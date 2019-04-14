import * as actionTypes from "../actions/actionstype";
import { categoryOptions } from "../utils/utils";

export default function homeReducer(
  state = {
    isFetching: false,
    isFetchingUsers: false,
    isFetchingSearch: false,
    formState: {
      title: "",
      organizer: "",
      description: "",
      location: {
        id: "",
        title: ""
      },
      date: {
        day: "",
        month: "",
        entireDate: ""
      },
      category: ""
    },
    locationOptions: [],
    categoryOptions: categoryOptions,
    eventList: [],
    userList: []
  },
  action
) {
  switch (action.type) {
    case actionTypes.RESET_FORM_STATE:
      return {
        ...state,
        formState: {
          title: "",
          organizer: "",
          description: "",
          location: {
            id: "",
            title: ""
          },
          date: {
            day: "",
            month: "",
            entireDate: ""
          },
          category: ""
        },
        locationOptions: []
      };
    case actionTypes.REQUEST_LOCATION_OPTIONS:
      return {
        ...state,
        isFetchingSearch: true
      };
    case actionTypes.RECEIVE_LOCATION_OPTIONS:
      const locationOptions = action.data.suggestions.map(item => {
        return {
          id: item.locationId,
          title: item.label
        };
      });
      return {
        ...state,
        isFetchingSearch: false,
        locationOptions: locationOptions
      };
    case actionTypes.REQUEST_SAVE_EVENT:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECEIVE_SAVE_EVENT:
      return {
        ...state,
        isFetching: false
      };
    case actionTypes.REQUEST_EVENT_LIST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.REQUEST_USER_LIST:
      return {
        ...state,
        isFetchingUsers: true
      };
    case actionTypes.RECEIVE_EVENT_LIST:
      return {
        ...state,
        isFetching: false,
        eventList: action.data.eventList
      };
    case actionTypes.RECEIVE_USER_LIST:
      return {
        ...state,
        isFetchingUsers: false,
        userList: action.payload.userList
      };
    case actionTypes.UPDATE_FORM_STATE:
      return {
        ...state,
        formState: {
          ...state.formState,
          [action.propPath]: action.data
        }
      };
    case actionTypes.REMOVE_SELECTED_LOCATION:
      return {
        ...state,
        formState: {
          ...state.formState,
          location: {
            id: "",
            title: ""
          }
        }
      };
    default:
      return state;
  }
}
