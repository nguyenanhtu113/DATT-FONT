import React, { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { deleteUser, getUsers } from '../../../api/user';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
      toast.success('Xóa người dùng thành công', { autoClose: 2000 });
    } catch (error) {
      console.log('Error deleting user:', error);
      toast.error('Xóa người dùng thất bại');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/users/${record.id}`}>Sửa</Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <a href="/#">Xóa</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="justify-between">
  <ToastContainer />
  
  <h1 className="text-2xl font-semibold" >Quản Lý Users</h1>
  <Table style={{ marginTop: '28px' }} dataSource={users} columns={columns} />
</div>

  );
};

export default ListUsers;