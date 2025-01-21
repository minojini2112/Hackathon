import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);

  // Simulate fetching notifications from an API
  useEffect(() => {
    // Simulated initial data fetch
    const initialData = [
      {
        id: 1,
        message: "There's a post",
        timestamp: "4 hours ago",
        read: false,
      },
      {
        id: 2,
        message: "New post from HOD ",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: 3,
        message: "staff posted a hackathon",
        timestamp: "4 days ago",
        read: false,
      },
    ];
    setNotifications(initialData);
  }, []);

  // Simulated new notification addition
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: notifications.length + 1,
        message: "New notification from Hod!",
        timestamp: "Just now",
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setNewNotification(true);
    }, 10000); // Adds a new notification every 10 seconds

    return () => clearInterval(interval);
  }, [notifications]);

  const handleNotificationClick = (id) => {
    // Mark the clicked notification as read
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setNewNotification(false); // Reset the new notification flag
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-[#0A5175] hover:bg-[##0A4A6A] transition-all duration-300 rounded-lg shadow-md">
    <h2 className="mb-4 text-xl font-semibold text-prussian blue">Notifications</h2>
    {newNotification && (
      <p className="mb-4 text-sm text-red-500">New notification available!</p>
    )}
      <ul className="space-y-3">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            onClick={() => handleNotificationClick(notif.id)}
            className={`p-4 border rounded-lg shadow-sm cursor-pointer ${
              notif.read ? "bg-gray-200" : "bg-[white]"
            } hover:bg-gray-300`}
          >
            <div className="flex items-start">
              <div className="w-10 h-10 mr-3 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {notif.message}
                </p>
                <p className="text-xs text-gray-500">{notif.timestamp}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;