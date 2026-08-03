import React from "react";
import NotificationCard from "../components/notification/NotificationCard";

const notifications = [
  {
    id: 1,
    notification:
      "Heads up! Your SEO Fundamentals class starts in 30 minutes. Log in and be ready to optimize!",
    date: "March 1, 2025",
  },
  {
    id: 2,
    notification:
      "🚀 Ready to code? Your ReactJS for Beginners session is live at 2:00 PM today.",
    date: "February 26, 2025",
  },
  {
    id: 3,
    notification:
      "Final reminder: Submit your Google Ads Campaign Strategy assignment by midnight tonight.",
    date: "April 25, 2025",
  },
  {
    id: 4,
    notification:
      "📢 Don’t miss our Digital Growth Summit this Friday—featuring top marketers and devs!",
    date: "March 1, 2025",
  },
];

export default function NotificationsPage() {
  return (
    <div className="font-roboto max-w-2xl mx-auto">
      <h1 className="text-2xl ">Notifications</h1>
      <div className="my-7">
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
