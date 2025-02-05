import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await fetch(
          `https://hackathon-8k3r.onrender.com/getNotifications`
        );
        const response = await data.json();
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        alert("An error occured!");
      }
    };
    fetchNotifications();
  }, []);

  const filteredNotifications =
    role === "student"
      ? notifications.filter((item) =>
          item.content.toLowerCase().includes("post")
        )
      : notifications;

  return (
    <div className="p-8 md:w-[50%]  md:mt-10 mx-auto bg-gradient-to-r from-[#2c3e50] to-[#34495e] rounded-xl shadow-lg transition-transform transform hover:scale-105 md:ml-[400px] w-[70%] mt-16">
      <h2 className="mb-4 text-2xl font-semibold text-white">Notifications</h2>
      <ul className="space-y-4">
        {filteredNotifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-5 rounded-xl transition-all duration-300 cursor-pointer ${
              notif.read
                ? "bg-[#f2f2f2] text-gray-600 hover:bg-[#e0e0e0]"
                : "bg-white text-gray-800 hover:bg-[#f9f9f9]"
            } hover:shadow-xl hover:border-2 border-gray-300`}
          >
            <div className="flex items-center justify-start space-x-4">
              <i className="fa-solid fa-bell fa-2xl"></i>
              <div className="w-full">
                <p className="text-sm font-medium md:text-lg">{notif.content}</p>
                <p className="mt-1 text-sm text-gray-500">{notif.createdAt}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
