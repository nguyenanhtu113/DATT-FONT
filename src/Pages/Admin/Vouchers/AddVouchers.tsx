import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addVoucher } from "../../../api/vouchers";
import { useNavigate } from "react-router-dom";

const AddVouchers = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await addVoucher(data);
      if (response.status === 201) {
        console.log("Thêm phiếu voucher thành công:", response.data);
        navigate("/admin/vouchers");
      } else {
        console.error("Có lỗi khi thêm phiếu voucher:", response.data.message);
      }
      toast.success("Thêm phiếu voucher thành công", { autoClose: 2000 });
    } catch (error) {
      if (error instanceof Error && "message" in error) {
        console.error("Có lỗi:", error.message);
      } else {
        console.error("Có lỗi không xác định");
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Thêm Phiếu Voucher</h1>
      <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Voucher_Code"
          >
            Mã Phiếu Voucher
          </label>
          <Controller
            name="Voucher_Code"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập Mã Phiếu Voucher"
              />
            )}
          />
          {errors.Voucher_Code && (
            <p className="text-red-500">Bắt buộc phải nhập Mã Phiếu Voucher.</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Discount_Type"
          >
            Loại Giảm Giá
          </label>
          <Controller
            name="Discount_Type"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập Loại Giảm Giá"
              />
            )}
          />
          {errors.Discount_Type && (
            <p className="text-red-500">Bắt buộc phải nhập Loại Giảm Giá.</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Expiration_Date"
          >
            Ngày Hết Hạn
          </label>
          <Controller
            name="Expiration_Date"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập Ngày Hết Hạn"
              />
            )}
          />
          {errors.Expiration_Date && (
            <p className="text-red-500">Bắt buộc phải nhập Ngày Hết Hạn.</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="IsActive"
          >
            Trạng Thái
          </label>
          <Controller
            name="IsActive"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            )}
          />
          {errors.IsActive && (
            <p className="text-red-500">Bắt buộc phải chọn Trạng Thái.</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Description"
          >
            Mô Tả
          </label>
          <Controller
            name="Description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập Mô Tả"
              />
            )}
          />
          {errors.Description && (
            <p className="text-red-500">Bắt buộc phải nhập Mô Tả.</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Thêm Phiếu Voucher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVouchers;
