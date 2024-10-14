import { ChevronRight,  Box  } from 'lucide-react'
import { useEffect, useState } from 'react';
import useStore from '@/store';
import axios from 'axios';
export default function Navigation() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [locations, setLocations] = useState<string[] | null>([])
    const parentGodownId = useStore((state) => state.parentGodownId);
    useEffect(()=>{
        const fetchFlow = async () => {
            try {
                const response = await axios.get(`${apiUrl}/flow/${parentGodownId}`);
                const data = response.data
                setLocations(data);
            } catch (error) {
                console.error('There was a problem with the fetch flow:', error);
            }
        }
        if(parentGodownId!=""){
            fetchFlow();
        }
    },[parentGodownId])
    return (

        <div className='w-fit flex gap-3' >
            {
                locations?.map((element: string , index: number) => {
                    return (
                        <div className='flex items-center gap-1 max-w-xs'>
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500">
                                <Box className="w-3 h-3 text-black" />
                            </div>
                            <div className='flex-1 overflow-hidden whitespace-nowrap text-ellipsis'>
                                {element}
                            </div>
                            {index < locations.length - 1 && (
                                <ChevronRight className="w-4 h-4 text-blue-black mx-0" />
                            )}
                        </div>

                    )
                })
            }
        </div>
    )
}