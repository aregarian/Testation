import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, TextField, Modal } from '@mui/material';
import './AddRecordForm.css'; 

const AddRecordForm = ({ open, handleClose, onRecordAdded }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      age: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      surname: Yup.string().required('Required'),
      age: Yup.number().required('Required').positive('Age must be positive').integer('Age must be an integer'),
      address: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      await axios.post('http://localhost:5000/records', values);
      onRecordAdded(); 
      handleClose(); 
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-content">
        <h2 id="modal-title">Add New Record</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Surname"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Add Record
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddRecordForm;
