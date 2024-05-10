import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { getAllUsers } from '../../redux/action/user';
import { minWidth } from '@mui/system';



// this will be the one who will call the backend, with the use of redux
const AllUsers = () => {
    const {users, isLoading} = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllUsers(admin._id));
    }, [dispatch, admin._id]);

    
    console.log(users)
    const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 150, flex: 0.7 },
    { field: 'name', headerName: 'User Name', minWidth: 150, flex: 0.7 },
    { field: 'email', headerName: 'User Email', minWidth: 130, flex: 0.8 },
    {
      field: 'phonenumber',
      headerName: 'User Phone Number',
      type: 'number',
      minWidth: 150,
      flex: 0.8,
    },
    ];

    // Create rows from users
    const rows = users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phonenumber: user.phoneNumber,
    }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
}

export default AllUsers;
