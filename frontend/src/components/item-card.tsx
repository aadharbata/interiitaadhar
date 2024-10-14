import { useEffect, useState } from "react"
import { Package, DollarSign, Warehouse, Wrench, Info } from "lucide-react"
import { ItemProps } from "@/types"

export default function ItemCard({ item }: { item: ItemProps }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  }

  const formatAttributeValue = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    return value.toString()
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function useBreakpoint() {
    const [isLargeScreen, setIsLargeScreen] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 1024px)')
      const handleMediaChange = () => setIsLargeScreen(mediaQuery.matches)
      handleMediaChange()
      mediaQuery.addEventListener('change', handleMediaChange)
      return () => mediaQuery.removeEventListener('change', handleMediaChange)
    }, [])
    return isLargeScreen
  }

  const isLargeScreen = useBreakpoint()

  return (
    <div
      className="max-w-3xl border rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg p-4">
        <h2 className="text-2xl font-bold">{item.name}</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center items-center">
            {loading && (
              <div className="h-full w-48 animate-pulse bg-gray-300 rounded-lg" />
            )}
            <img
              src={item.image_url}
              alt={item.name}
              width={isLargeScreen ? 250 : 200}
              className={`object-cover rounded-lg ${loading ? 'hidden' : 'block'} transition-all duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
              onLoad={() => setLoading(false)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${item.status === 'out_of_stock' ? 'text-red-500' : 'text-green-500'}`}>
                {item.status === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
              </span>
              <span className="text-2xl font-bold text-emerald-600">{formatPrice(item.price)}</span>
            </div>
            <div className="h-px bg-gradient-to-r from-purple-500 to-pink-500" />
            <div className="flex lg:flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  <span>Quantity: <span className="font-semibold text-blue-700">{item.quantity}</span></span>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Category: <span className="font-semibold text-green-700">{item.category}</span></span>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <Warehouse className="w-5 h-5 text-yellow-500" />
                  <div className="flex items-center flex-wrap">
                    <span>Godown ID:</span>
                    <span className="pl-1 font-medium text-sm text-yellow-700 truncate max-w-full">
                      {item.parentGodownId}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <Wrench className="w-5 h-5 text-red-500" />
                  <span>Brand: <span className="font-semibold text-red-700">{item.brand}</span></span>
                </div>
              </div>
              <div className="hidden lg:block h-px bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-purple-600">Attributes</h3>
                {Object.entries(item.attributes).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                    <Info className="w-5 h-5 text-indigo-500" />
                    <span>
                      {capitalizeFirstLetter(key.replace('_', ' '))}:
                      <span className="font-semibold text-indigo-700"> {formatAttributeValue(value)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
