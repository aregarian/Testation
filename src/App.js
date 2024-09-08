import React, { useState } from 'react';
import DataTable from './components/DataTable';
import AddRecordForm from './components/AddRecordForm';
import { Button } from '@mui/material';
import './App.css'; 

const App = () => {
    const [openForm, setOpenForm] = useState(false);

    return (
        <div className="appContainer">
            <h1 className="header">Personal Data Form</h1> {}
            <div className="dataTableWrapper">
                <DataTable />
            </div>
            <AddRecordForm 
                open={openForm} 
                handleClose={() => setOpenForm(false)} 
                onRecordAdded={() => {}} 
            />
            <Button 
                className="addRecordButton" 
                onClick={() => setOpenForm(true)}
            >
                Add Record
            </Button>
        </div>
    );
};

export default App;