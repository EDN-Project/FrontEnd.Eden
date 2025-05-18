import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
// import './calendar.css';
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import images from "../../constants/images";
const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <>
    <div className="app" style={{ backgroundColor: "#121212" }}>
        <Sidebar />
        <main className={`content ${!isSidebar ? "content-collapsed" : ""}`}>
          <div className="content" style={{ backgroundColor: "#121212" }}>
            <Topbar />
    <div className="calendarContainer">
    <Box m="20px">
      <Header title="Calendar" subtitle="" />
      <Typography sx={{ m: "0 0 10px 0" }} align='left' variant="h4" color={'#FFFF'}> Full Calendar Interactive Page</Typography>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={'#717171'}
          p="15px"
          borderRadius="4px"
        >
          <Typography align="left" color={'#fff'} variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: '#EAFDF2',
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box
  bgcolor={'#141b2d'}
  flex="1 1 100%"
  ml="15px"
  sx={{
    "& .fc .fc-toolbar-title": { color: "white !important" }, // لون الشهر والسنة
    "& .fc .fc-button": { 
      // backgroundColor: "black !important", 
      color: "white !important", 
      border: "none !important" 
    }, 
    "& .fc-daygrid-day-number": { color: "white !important" }, // لون أرقام الأيام
  }}
>
  <FullCalendar
    height="75vh"
    plugins={[
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      listPlugin,
    ]}
    themeSystem="bootstrap"
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    }}
    initialView="dayGridMonth"
    editable={true}
    selectable={true}
    selectMirror={true}
    dayMaxEvents={true}
    select={handleDateClick}
    eventClick={handleEventClick}
    eventsSet={(events) => setCurrentEvents(events)}
    initialEvents={[
      { id: "12315", title: "All-day event", date: "2022-09-14" },
      { id: "5123", title: "Timed event", date: "2022-09-28" },
    ]}
  />
</Box>

      </Box>
    </Box>
    </div>
    </div>

    </main>
 </div>
 </>
  );
};

export default Calendar;
