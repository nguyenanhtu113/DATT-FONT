import { useEffect, useState } from "react";
import { IVouchers } from "../../../interfaces/vouchers";
import { getVoucher, deleteVoucher } from "../../../api/vouchers";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "antd";

const ListVouchers = () => {
  const [vouchers, setVouchers] = useState<IVouchers[]>([]);
  const [voucherToDelete, setVoucherToDelete] = useState<
    string | number | null
  >(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getVoucher()
      .then((response) => {
        if (Array.isArray(response.data.vouchers)) {
          setVouchers(response.data.vouchers);
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching vouchers:", error);
      });
  }, []);

  const handleDeleteClick = (voucherId: string | number) => {
    setVoucherToDelete(voucherId);
    setVisible(true);
  };

  const handleConfirmDelete = () => {
    if (voucherToDelete) {
      deleteVoucher(voucherToDelete)
        .then(() => {
          setVouchers((prevVouchers) =>
            prevVouchers.filter((voucher) => voucher._id !== voucherToDelete)
          );
        })
        .catch((error) => {
          console.error("Error deleting voucher:", error);
        });
    }
    setVoucherToDelete(null);
    setVisible(false);
  };

  const columns = [
    {
      title: "Voucher Code",
      dataIndex: "Voucher_Code",
      key: "Voucher_Code",
    },
    {
      title: "Discount Type",
      dataIndex: "Discount_Type",
      key: "Discount_Type",
    },
    {
      title: "Expiration Date",
      dataIndex: "Expiration_Date",
      key: "Expiration_Date",
      render: (record: any) =>
        new Date(record.Expiration_Date).toLocaleDateString(),
    },
    {
      title: "IsActive",
      dataIndex: "IsActive",
      key: "IsActive",
      // render: (record: any) => (record.IsActive ? "Active" : "InActive"),
    },

    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <div>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteClick(record._id)}
          >
            Delete
          </Button>
          <Button type="primary">
            <Link to={`/admin/vouchers/update/${record._id}`}>Update</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4">List of Vouchers</h1>
        <Link to={"add"}>
          <Button className="bg-blue-500 flex items-center gap-2  hover:bg-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-[190px]">
            Add Vouchers
          </Button>
        </Link>

        <Table dataSource={vouchers} columns={columns} />
        <Modal
          title="Confirm Delete"
          visible={visible}
          onOk={handleConfirmDelete}
          onCancel={() => setVisible(false)}
        >
          <p>Are you sure you want to delete this voucher?</p>
        </Modal>
      </div>
    </div>
  );
};

export default ListVouchers;
