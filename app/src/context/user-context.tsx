import * as React from "react";

export type Response = {
  ok: boolean;
  token: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  error?: string;
};

type Action = { type: "logged"; payload: Response };
type Dispatch = (action: Action) => void;
type State = {
  isLogged?: boolean;
  token?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
};
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "logged": {
      return {
        isLogged: action.payload.ok,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isLogged: false,
    token: "",
    user: {
      _id: "",
      name: "",
      email: "",
    },
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return <UserStateContext.Provider value={value}>{children}</UserStateContext.Provider>;
}

function useCount() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a userProvider");
  }
  return context;
}

export { UserProvider, useCount };
