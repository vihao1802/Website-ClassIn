import React, { useState, useEffect } from "react";
import { Alert, Slide } from "@mui/material";

const AlertComponent = ({ severity, message, onClose, open }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(open);
    const timer = setTimeout(() => {
      setShowAlert(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Slide direction="down" in={showAlert} mountOnEnter unmountOnExit>
      <Alert
        severity={severity}
        sx={{
          position: "absolute",
          zIndex: 10,
          width: "50%",
          left: "25%",
          top: "10%",
        }}
      >
        {message}
      </Alert>
    </Slide>
  );
};

export default AlertComponent;
