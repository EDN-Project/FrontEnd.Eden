import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { mockDataTeam as initialData } from "../../data/mockData"; // استخدم نسخة قابلة للتعديل
import Header from "../../components/Header";
import "./team.css";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import images from "../../constants/images";
import AddUserModal from "../../components/DashBoardComp/AddUserModal/AddUserModal";


const DeleteModal = ({ isOpen, onClose, onDelete ,handleDelete}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" >
      <div className="border rounded-lg shadow-lg relative" style={{ backgroundColor: '#282828',width: '400px' }}>
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="justify-space-between ">
          
          <img src={images.warning} alt="Delete" className="w-20 h-20 mx-auto" />

          <Typography variant="h3" sx={{ color: "#FFF", fontWeight: "bold",my: 2 }} className="mt-4">
          You are about to delete this User
                    </Typography>
                    <Typography variant="h6" className="text-gray-500 mt-5 mb-6">
                    This will delete your User from the system <br /> Are You sure ?
                    </Typography>

                    <Button onClick={handleDelete} variant="contained" sx={{ backgroundColor: "#872727", color: "white",width: 100,justifyContent:'space-between',flexDirection:'row-reverse',fontSize:'15px',borderRadius:'8px',my: 2,marginRight: '10px' }}  startIcon={
                  <img style={{width: 15, height: 15, marginLeft: '15px'}} src={images.deleteuser} alt="logo" />
                }>
                  Delete
                </Button>
          <Button
            onClick={onClose}
             sx={{color:'#CEFBE2',fontSize:'15px',}}
          >
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState(initialData); 
  const [accessLevel, setAccessLevel] = useState("");

  const handleDelete = () => {
    setData((prevData) => prevData.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]); 
    setIsModalOpenDelete(false);
  };

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);





  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            // backgroundColor={
            //   access === "admin"
            //     ? colors.greenAccent[600]
            //     : access === "manager"
            //     ? colors.greenAccent[700]
            //     : colors.greenAccent[700]
            // }
            borderRadius="4px"
          >
            {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />} */}
            {/* {access === "manager" && <SecurityOutlinedIcon />} */}
            {/* {access === "user" && <LockOpenOutlinedIcon />} */}
            <Typography variant="h4" color={'#CEFBE2'} sx={{ marginRight: "70px" }}>
              {access}
            </Typography>

          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("Updated selectedRows:", selectedRows);
  }, [selectedRows]);
  
  const isDisabled = selectedRows.length === 0;

  return (
    <>
      <div className="app" style={{ backgroundColor: "#121212" }}>
        <Sidebar />
        <main className={`content ${!isSidebar ? "content-collapsed" : ""}`}>
          <div className="content" style={{ backgroundColor: "#121212" }}>
            <Topbar />

            <Box m="20px">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="USERS" subtitle=" Managing your Farm Members" />
              </Box>
            </Box>

            {/* Filter and Actions Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={2}>
      <Box  display="flex" alignItems="center" gap={2}>
        <Typography variant="h4" color="white">Filter By Access</Typography>
        <FormControl sx={{ minWidth: 350,  backgroundColor: "#333", borderRadius: "10px" }}>
          <Select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
            displayEmpty
            renderValue={(selected) => selected || "Choose access level"}
            sx={{
              borderRadius: "10px",
              color: accessLevel ? "white" : "#aaa", // لون باهت عند عدم الاختيار
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
              "& .MuiSvgIcon-root": { color: "white" }, // سهم القائمة المنسدلة
            }}
          >
            <MenuItem value="" disabled>
              Choose access level
            </MenuItem>
            <MenuItem value="Analyst">Analyst</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Farmer">Farmer</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
          </Select>
        </FormControl>
      </Box>
    



              {/* Action Buttons */}
              <Box display="flex" gap={3}>
                <Button 
                onClick={()=> setIsModalOpenAdd(true)}
                variant="contained" sx={{ backgroundColor: "#3F3F3F", color: "white",width: 100,justifyContent:'space-between',flexDirection:'row-reverse',fontSize:'15px',borderRadius:'8px' }} startIcon={
                  <img style={{width: 15, height: 15, marginLeft: '15px'}} src={images.adduser} alt="logo" />
                }>
                  Add
                </Button>
                <Button  variant="contained" sx={{ backgroundColor: "#3F3F3F", color: "white",width: 100,justifyContent:'space-between',flexDirection:'row-reverse',fontSize:'15px',borderRadius:'8px' }} startIcon={
                  <img style={{width: 15, height: 15, marginLeft: '15px'}} src={images.edituser} alt="logo" />
                }>
                  Edit
                </Button>
                      <Button
        disabled={isDisabled}
        onClick={() => setIsModalOpenDelete(true)}
        variant="contained"
        sx={{
          backgroundColor: isDisabled ? "#555" : "#872727",
          color: "white",
          width: 100,
          justifyContent: 'space-between',
          flexDirection: 'row-reverse',
          fontSize: '15px',
          borderRadius: '8px'
        }}
        startIcon={
          <img style={{width: 15, height: 15, marginLeft: '15px'}} src={images.deleteuser} alt="logo" />
        }
      >
        Delete
      </Button>
              </Box>
            </Box>

            {/* DataGrid Section */}
            <Box m="20px">
              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  borderRadius: "10px",  
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: '#CEFBE2',
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#717171",
                    borderBottom: "none",
                  },
                  
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: '#3F3F3F',
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: '#3F3F3F',
                  },
                  "& .MuiCheckbox-root": {
                    color: `!important`,
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
  fontSize: "20px",
  fontWeight: "bold",
  color: "white", 
},


                }}
              >
            <DataGrid   
  checkboxSelection
  rows={data}
  columns={columns}
  selectionModel={selectedRows} // (الخطأ هنا أيضًا, يجب أن يكون rowSelectionModel)
  onSelectionModelChange={(newSelection) => {
    setSelectedRows(newSelection);
    console.log("New Selection:", newSelection);
  }}
  sx={{
    borderRadius: "10px",
    backgroundColor: '#3F3F3F',
    "& .MuiDataGrid-columnHeaders": { backgroundColor: "#717171" },
    "& .MuiDataGrid-footerContainer": { backgroundColor: '#3F3F3F' },
  }}
/>

                  </Box>
            </Box>
          </div>
        </main>
{/* Moadals */}
<DeleteModal isOpen={isModalOpenDelete} onClose={() => setIsModalOpenDelete(false)} handleDelete={handleDelete} />
<AddUserModal isOpen={isModalOpenAdd} onClose={() => setIsModalOpenAdd(false)} />


      </div>
    </>
  );
};

export default Team;
