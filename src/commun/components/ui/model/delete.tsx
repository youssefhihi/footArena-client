import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Button } from "../../../../modules/client/components/ui/button";

interface DeleteModelProps {
  cancelDelete: () => void;
  confirmDelete: () => void;
  textButton?: string;
  name: string;
}

export const DeleteModel: React.FC<DeleteModelProps> = ({
  textButton,
  name,
  cancelDelete,
  confirmDelete,
}) => {
  const [inputValue, setInputValue] = useState("");
  const isMatch = inputValue === name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl"
      >
        <div className="text-center">
          <FiTrash2 className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h3 className="mb-5 text-lg font-medium">Delete {name}</h3>
          <p className="mb-5 text-gray-200">
            Are you sure you want to delete{" "}
            <span className="font-medium text-red-600">{name}</span>? This
            action cannot be undone.
          </p>
          <p className="mb-5 text-white">
            Please type <span className="font-medium text-gray-400">{name}</span> to confirm.
          </p>
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="mt-4 flex justify-between space-x-4">
            <Button onClick={cancelDelete} variant="ghost">
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              variant="danger"
              disabled={!isMatch}
            >
              {textButton || "Delete"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
