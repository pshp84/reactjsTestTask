const defaultState = {
    text: "initial",
    foo: [
      {
        name: "Pay Bills",
        id: 1,
        check: false,
      },
      {
        name: "Go Shopping",
        id: 2,
        check: false,
      },
      {
        name: "See the Doctor",
        id: 3,
        check: true,
      },
    ],
  };
  
  export default function (state = defaultState, action = {}) {
    switch (action.type) {
      case "GET":
        return {
          ...state,
          foo: [...action.data],
        };
      case "ADD":
        return {
          ...state,
          foo: [...state.foo, action.data],
        };
      case "UPDATE":
        return {
          ...state,
          foo: action.data,
        };
      case "DELETE":
        return {
          ...state,
          foo: action.data,
        };
      default:
        return state;
    }
  }
  