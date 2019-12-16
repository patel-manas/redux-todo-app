import React from "react";

import { Pane, Dialog } from "evergreen-ui";

const Modal = props => {
  return (
    <Pane>
      <Dialog
        isShown={props.isShown}
        title="Add Task"
        onCloseComplete={() => props.completed()}
        confirmLabel="Add"
      >
        {props.children}
      </Dialog>
    </Pane>
  );
};

export default Modal;
