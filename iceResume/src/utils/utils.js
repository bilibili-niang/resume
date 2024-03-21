import {iceMessage} from "icepro";

export const messageAlert = (message, type = "info") => {
  iceMessage({
    message,
    type
  });
};