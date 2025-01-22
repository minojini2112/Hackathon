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
    <div className="p-8 max-w-md mx-auto bg-gradient-to-r from-[#2c3e50] to-[#34495e] rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <h2 className="mb-4 text-2xl font-semibold text-white">Notifications</h2>
      {newNotification && (
        <p className="mb-6 text-sm text-yellow-300">New notification available!</p>
      )}
      <ul className="space-y-4">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            onClick={() => handleNotificationClick(notif.id)}
            className={`p-5 rounded-xl transition-all duration-300 cursor-pointer ${
              notif.read
                ? "bg-[#f2f2f2] text-gray-600 hover:bg-[#e0e0e0]"
                : "bg-white text-gray-800 hover:bg-[#f9f9f9]"
            } hover:shadow-xl hover:border-2 border-gray-300`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
              <div className="w-full">
                <p className="text-lg font-medium">{notif.message}</p>
                <p className="mt-1 text-sm text-gray-500">{notif.timestamp}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
