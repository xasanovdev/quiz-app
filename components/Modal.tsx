import React from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import { IoIosCloseCircleOutline } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  className,
  children,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={clsx(
          "bg-white rounded-lg max-w-96 w-full overflow-hidden shadow-xl",
          className
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <IoIosCloseCircleOutline className="hover:text-red-500 text-black duration-200 text-xl"/>
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
