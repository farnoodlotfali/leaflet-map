import { memo, PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
  show: boolean;
  onClose: () => void;
}>;

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="bg-white p-8 rounded-lg  overflow-y-auto shadow-lg max-h-[90%] container w-full m-5">
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);
