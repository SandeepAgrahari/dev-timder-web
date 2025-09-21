// src/components/Toast.jsx
import ReactDOM from "react-dom";

const Toast = ({ type = "info", message }) => {
  const typeClass = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  const toast = (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${typeClass[type]}`}>
        <span>{message}</span>
      </div>
    </div>
  );

  return ReactDOM.createPortal(toast, document.getElementById("toast-root"));
};

export default Toast;
