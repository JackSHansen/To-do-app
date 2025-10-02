import { state } from "js/modules/model/state.js";
import { Storage } from "js/modules/model/storage.js";
import { Actions } from "js/modules/model/actions.js";

export const Model = {
  ...state,
  ...Storage,
  ...Actions,
};
