import { useEffect } from "react";

function AlertMessage({
  message,
  type = "success",
  duration = 4000,
  onClose
}) {

  useEffect(() => {

    if (!message || !onClose) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };

  }, [message, duration, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {message}

      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>

    </div>
  );
}

export default AlertMessage;