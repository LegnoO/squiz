import { IoCloseSharp } from "react-icons/io5";

interface IProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

const Modal = ({ children, open, onClose }: IProps) => {
  return (
    <div
      style={{ borderRadius: "inherit" }}
      className="Modal_Layer fixed inset-0 z-[100]">
      <div
        className="Modal_Wrapper fixed inset-0 z-[-1] flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <div className="Modal_Content relative">
          <button className="p-1.5 absolute right-0 top-0 rounded bg-white hover:bg-gray-100">
            <IoCloseSharp className="h-[1.5rem] w-[1.5rem] text-black" />
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
