import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "@/store";

interface Item {
  item_id: string;
  parentGodownId: string;
  name: string;
  quantity: number;
  price: number;
  brand: string;
}

export default function MinItemCard({
  item_id,
  parentGodownId,
  name,
  quantity,
  price,
  brand,
}: Item) {
  const navigate = useNavigate();
  const setItemId = useStore((state) => state.setItemId);
  const setParentGodownId = useStore((state) => state.setParentGodownId);
  return (
    <motion.div
      className="w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-52 p-6 bg-gradient-to-br from-purple-600 to-pink-500 relative flex flex-col justify-between">
        <motion.div
          className="absolute top-2 right-2 text-white opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Package size={80} />
        </motion.div>
        <div className="flex flex-col h-full justify-between">
          <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
          <p className="text-purple-200 mb-4">Brand: {brand}</p>
          <div className="flex justify-between items-center text-white">
            <span className="text-lg font-semibold">${price.toFixed(2)}</span>
            <span className="bg-white text-purple-600 px-2 py-1 rounded-full text-sm font-medium">
              Qty: {quantity}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div>
            <p className="text-gray-500">ID</p>
            <p className="font-medium">{item_id}</p>
          </div>
          <div>
            <p className="text-gray-500">Parent Godown ID</p>
            <p className="font-medium">{parentGodownId}</p>
          </div>
        </div>
        <motion.button
          className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View details"
        >
          <span onClick={() => {
            setItemId(item_id)
            setParentGodownId(parentGodownId)
            navigate('/')
          }}>View Details</span>
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
