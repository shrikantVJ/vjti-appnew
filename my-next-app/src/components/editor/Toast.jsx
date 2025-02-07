export const Toast = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
  
      return () => clearTimeout(timer);
    }, [duration, onClose]);
  
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
        {message}
      </div>
    );
  };