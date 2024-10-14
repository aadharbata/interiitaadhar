import { useEffect, useState } from "react";
import MinItemCard from "./min-item-card";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {  Home } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { Spinner } from "./spinner";
import axios from "axios";
interface Item {
    item_id: string,
    parentGodownId: string,
    name: string,
    quantity: number,
    price: number,
    brand: string,
}
const ItemType = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(!token){
            navigate('/user/login')   
        }

    },[token])
    const { type } = useParams();
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchType = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/item/filter/${type}`);
                // if (!response.ok) {
                //     throw new Error(`Error fetching data: ${response.statusText}`);
                // }
                const fetchedData =  response.data;
                setItems(fetchedData)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            finally {
                setLoading(false);
            }
        }
        console.log(type);
        if (type) {
            fetchType();
        }
    }, [type])
    const types = ["Toys", "Clothing", "Furniture", "Electronics", "Tools"]
    return (
        <>
            <div className="flex gap-4 p-2 items-center justify-center">
                <div>
                    <Home className="w-8 h-8 text-black hover:cursor-pointer" onClick={() => {
                        navigate('/')
                    }} />
                </div>
                {types.map((element, index) => {
                    return (
                        <Button key={index} className='bg-gradient-to-br from-purple-400 to to-blue-600' name={element} onClick={(e) => {
                            navigate('/filter/' + e.currentTarget.name)
                        }}>{element}</Button>
                    );
                })}
            </div>
            {
                loading ? (<div className="flex h-screen flex-col items-center justify-center">
                    <Spinner>Loading...</Spinner>
                </div>) : (<div className="grid p-5 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {items?.map((item) => (
                        <MinItemCard {...item} />
                    ))}
                </div>)
            }

        </>

    );
}

export default ItemType;