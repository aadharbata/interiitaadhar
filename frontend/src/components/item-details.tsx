import useStore from '@/store';
import ItemCard from './item-card';
import { useEffect, useState } from 'react';
import { ItemProps } from '@/types';
import { Spinner } from './spinner';
import { motion } from 'framer-motion'
import Navigation from './navigation';
import { Button } from './ui/button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Details() {
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(!token){
            navigate('/user/login')   
        }

    },[token])
    const apiUrl = import.meta.env.VITE_API_URL;
    const itemId = useStore((state) => state.itemId);
    const [item, setItem] = useState<ItemProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`${apiUrl}/item/${itemId}`);
                const data = response.data;
                setItem(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false); 
            }
        };
       
        if (itemId !== "") {
            fetchData();
        }

    }, [itemId]);

    useEffect(() => {
        if (itemId === "") {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'; 
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [itemId]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const childVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    }
    const types = ["Toys", "Clothing", "Furniture", "Electronics", "Tools"]
    return (
        <>
            {itemId === "" ? (
                <motion.div
                    className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className=" flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-center p-8">
                        <motion.h1 className="text-4xl font-extrabold text-white mb-4 shadow-text" variants={childVariants} >
                            Welcome to the Warehouse Management System
                        </motion.h1>
                        <motion.h3 className="text-xl font-medium text-white mb-2 shadow-text" variants={childVariants}>
                            Manage Your Inventory Efficiently
                        </motion.h3>
                        <motion.p className="mt-4 text-white text-lg shadow-text" variants={childVariants}>
                            Please select a warehouse from the sidebar to view its details and manage your stock effectively
                        </motion.p>
                        <br />
                        <motion.h3 className="text-xl font-medium text-white mb-2 shadow-text" variants={childVariants}>
                            OR
                        </motion.h3>
                        <motion.p className="mt-4 text-white text-lg shadow-text" variants={childVariants}>
                            Please select a Category to see its stocks
                        </motion.p>
                        <motion.div className="mt-4 flex gap-2  text-white text-lg shadow-text" variants={childVariants} >
                            {types.map((element, index) => {
                                return (
                                    <Button key={index} className='bg-gradient-to-br from-purple-400 to to-blue-600' name={element} onClick={(e) => {
                                        navigate('/filter/' + e.currentTarget.name)
                                    }}>{element}</Button>
                                );
                            })}
                        </motion.div>
                        <motion.p className="mt-12 text-white italic shadow-text" variants={childVariants}>
                            Your success is our priority!
                        </motion.p>
                    </div>
                </motion.div>
            ) : (
                <div>
                    {
                        loading ? (
                            <div >
                                <Spinner>Loading</Spinner>
                            </div >
                        ) : item ? (  
                            <div >
                                <Navigation/>
                                <div >
                                    <br />
                                    <div className=' flex justify-center'>
                                        <ItemCard item={item} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No item found.</p>  
                        )
                    }
                </div >
            )}


        </>
    );
}
