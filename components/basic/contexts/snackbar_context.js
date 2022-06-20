import { createContext } from "react";

const SnackbarContext = createContext({open:false, severity:'', message:'', includes_callback: false,close: () => {}, open: (severity, message, includes_callback=false, callback_fn=()=>{}) => {}, undo_action: (callback_fn) => {}})

export default SnackbarContext;