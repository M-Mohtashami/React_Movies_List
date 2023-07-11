export interface InputType {
  value: string;
  error: string;
}
export interface StateType {
  name: InputType;
  desc: InputType;
  genre: InputType;
  year: InputType;
  director: InputType;
  submit: 'ذخیره' | 'ویرایش';
  isSubmited: boolean;
  targetId: string;
}

export type ActionType =
  | {
      type: 'Field_is_Required';
      payload: {
        key: keyof StateType;
        value: InputType;
      };
    }
  | {
      type: 'Fetch_Data_To_Form';
      payload: StateType;
    }
  | {
      type: 'Reset_Form_State';
    }
  | {
      type: 'Render_Ui';
      payload: boolean;
    };

export interface ContextType {
  state: StateType;
  dispatch: (value: ActionType) => void;
}

export interface MovieType {
  id: string;
  name: string;
  genre: string;
  desc: string;
  director: string;
  year: string;
}
export interface MovieStateType {
  Movies: MovieType[];
}

export type MovieActionType =
  | {
      type: 'Update_data';
      payload: MovieType[];
    }
  | {
      type: 'Delete_data';
      payload: MovieType;
    }
  | {
      type: 'Post_data';
      payload: MovieType;
    };

export interface DataContextType {
  dataState: MovieStateType;
  dataDispatch: (value: MovieActionType) => void;
}
