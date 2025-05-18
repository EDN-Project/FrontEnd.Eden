import { Box, Modal, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const NotificationModal = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Your crop preferences have been saved successfully",
      time: "14 min ago",
      read: false,
    },
    {
      id: 2,
      text: "Your weekly report is ready—check your performance insights now!",
      time: "7 hours ago",
      read: true,
    },
    {
      id: 3,
      text: "New data available! Market trends for the next quarter have been updated.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      text: "System maintenance scheduled for tomorrow.",
      time: "2 days ago",
      read: true,
    },
    {
      id: 5,
      text: "New security update available.",
      time: "3 days ago",
      read: true,
    },
    {
      id: 6,
      text: "Don't miss out on our latest webinar!",
      time: "4 days ago",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "#3F3F3F",
          color: "#CEFBE2",
          boxShadow: 24,
          p: 2,
          borderRadius: "10px",
          textAlign: "left",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" fontWeight="bold">
            Notification
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#CEFBE2" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* خط فاصل */}
        <Box
          sx={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            my: 1,
          }}
        />

        {/* خيارات */}
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            All Results ({notifications.length})
          </Typography>
          <Typography
            variant="body2"
            color="rgba(255, 255, 255, 0.7)"
            sx={{ cursor: "pointer", "&:hover": { color: "#CEFBE2" } }}
            onClick={markAllAsRead}
          >
            Mark All As Read
          </Typography>
        </Box>

        {/* قائمة الإشعارات مع سكورول */}
        <Box
  sx={{
    maxHeight: 250,
    overflowY: "auto",
    pr: 1, // تجنب تغطية النص
    "&::-webkit-scrollbar": {
      display: "none", // إخفاء شريط التمرير للمتصفحات التي تدعمه
    },
    "-ms-overflow-style": "none", // إخفاء التمرير في Internet Explorer و Edge
    "scrollbar-width": "none", // إخفاء التمرير في Firefox
  }}
>

          {notifications.map((notif) => (
            <Box
              key={notif.id}
              sx={{
                bgcolor: notif.read ? "transparent" : "#5A5A5A",
                p: 1.5,
                mb: 1,
                borderRadius: "8px",
                position: "relative",
              }}
            >
              {!notif.read && (
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: "#CEFBE2",
                    borderRadius: "50%",
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              )}
              <Typography variant="body2" color="white">
                {notif.text}
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                {notif.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
