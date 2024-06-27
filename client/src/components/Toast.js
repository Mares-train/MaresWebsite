import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Box } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({ toast, hideToast }) {
  const [isOpen, setIsOpen] = React.useState(toast.open)
  const [msg, setMsg] = React.useState(toast.text)
  const [typeOfToast, setTypeOfToast] = React.useState(toast.type)

  React.useEffect(() => {
    setTypeOfToast(toast.type)
  }, [toast])

  React.useEffect(() => {
    setMsg(toast.text)
  }, [toast])

  React.useEffect(() => {
    setIsOpen(msg != null && toast.open)
  }, [toast, msg])

  return (
    <Box rowGap={4} sx={{ width: "100%" }}>
      <Snackbar
        sx={{ mb: 0 }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={hideToast}>
        <Alert onClose={hideToast} severity={typeOfToast} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
