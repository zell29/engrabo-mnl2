import React, { useEffect, useState } from 'react';
import { backend_url } from '../../server';
import { useSelector } from 'react-redux';
import { AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/style';
import { Link } from 'react-router-dom';
import { MdOutlineTrackChanges, MdTrackChanges } from 'react-icons/md';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect to update name once user is loaded from Redux store
  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
    }
  }, [user]); // Depend on `user` so it updates `name` when `user` changes
  return (
    <div className="w-full">
      {/* Profile Content */}
      {active === 1 && (
        <>
          {/* Image and Change Image */}
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}/${user?.avatar.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#171203]"
                alt="User Avatar"
              />
              <div className="w-[30px] h-[30px] bg-[#e1c77a] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <div className="w-full px-5">
            <br />
            <br />
            <form
              onSubmit={handleSubmit}
              required
              className="flex flex-col items-center justify-center sm:px-5 px-2"
            >
              {/* Fullname and Email Addresss */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#171203]">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 pl-2`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#171203]">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0 pl-2`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone number and Zipcode */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#171203]">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 pl-2`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#171203]">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0 pl-2`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Addresss 1 and 2 */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#171203]">
                    Addresss 1
                  </label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 pl-2`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 text-[#171203]">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0 pl-2`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Update"
                required
                className={`w-[250px] text-center text-[#171203] border border-[#171203] mt-4 !rounded-[4px] !h-11 hover:bg-[#f9f1dc] transition duration-300 ease-in-out`}
              />
            </form>
          </div>
        </>
      )}

      {/* Order Content */}
      {active === 2 && (
        <div className="">
          <AllOrders />
        </div>
      )}

      {/* Refund Content */}
      {active === 3 && (
        <div className="">
          <AllRefundOrders />
        </div>
      )}

      {/* Tract Order Content */}
      {active === 5 && (
        <div className="">
          <TrackOrder />
        </div>
      )}

      {/* Payment Method Content */}
      {active === 6 && (
        <div className="">
          <PaymentMethod />
        </div>
      )}

      {/* User Address Content */}
      {active === 7 && (
        <div className="">
          <Address />
        </div>
      )}
    </div>
  );
};

// All Orders Table
const AllOrders = () => {
  const orders = [
    {
      _id: '123456',
      orderItems: [
        {
          name: 'Chopping Board Engraved',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: '₱' + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectOnClick
        autoHeight
      />
    </div>
  );
};

// All Refund Orders Table
const AllRefundOrders = () => {
  const orders = [
    {
      _id: '123456',
      orderItems: [
        {
          name: 'Chopping Board Engraved',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: '₱' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

// Track Order Table
const TrackOrder = () => {
  const orders = [
    {
      _id: '123456',
      orderItems: [
        {
          name: 'Chopping Board Engraved',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const colums = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: ' ',
      flex: 1,
      minWidth: 130,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: '₱' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={colums}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

// Payment Method
const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#171203] pb-2">
          Payment Methods
        </h1>
        <div
          className={`${styles.button}  mt-4 !rounded-[4px] !h-11 hover:opacity-95 transition duration-300 ease-in-out`}
        >
          <span className="text-[#fff4d7]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-[#f7ebca] h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600]">Card Name</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>63+ **** *** ****</h6>
          <h5 className="pl-6"> expired Date </h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

// Address
const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#171203] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button}  mt-4 !rounded-[4px] !h-11 hover:opacity-95 transition duration-300 ease-in-out`}
        >
          <span className="text-[#fff4d7]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-[#f7ebca] h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default Address</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>Blk 4 Kadima Letre, St Tonsuya Malabon City</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(63+) 992 404 1207</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
