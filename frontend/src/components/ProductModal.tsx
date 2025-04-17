import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Products } from "../../types";
import { AddToCart } from "./AddToCart";

type ProductModalProps = {
  product: Products;
  isOpen: boolean;
  onClose: () => void;
};

export const ProductModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        onClick={onClose}
        data-testid="modal-overlay"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden h-[50vh]"
          onClick={(e) => e.stopPropagation()}
          data-testid="modal-content"
        >
          <div className="h-full flex flex-col overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 p-6">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4 ">
                  <img
                    src={product.photo}
                    alt={product.title}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              </div>

              <div className="md:w-1/2 p-6 md:border-l border-gray-200">
                <h2
                  className="text-2xl font-bold text-gray-900 mb-2"
                  data-testid="title"
                >
                  {product.title}
                </h2>

                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-gray-900 mr-4">
                    {product.price}₽
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">Vendor</h3>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium">{product.vendorInfo}</p>
                    </div>
                  </div>
                </div>
                <div className=" h-[10vh] flex justify-center items-center">
                  <AddToCart data={product} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
