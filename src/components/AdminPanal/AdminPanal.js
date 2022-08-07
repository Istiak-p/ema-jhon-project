import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import './AdminPanal.css';

const AdminPanal = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const onSubmit = data => {
        const savedCart = getStoredCart();
        data.order = savedCart;

        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Product Added Successfully');
                    clearTheCart();
                    reset();
                }
            })
    };
    return (
        <div>
            <form className="adminPanel" onSubmit={handleSubmit(onSubmit)}>

                 <input placeholder="key" defaultValue="" {...register("key")} />

                <input  placeholder="Product name" defaultValue="" {...register("name")} />

                <input placeholder="Image Link" defaultValue="" {...register("img")} />
                
                <input placeholder="Price" defaultValue="" {...register("price")}  />
                <input placeholder="Stock" defaultValue="" {...register("stock")} />
                

                <input type="submit" />
            </form>
        </div>
    );;
};

export default AdminPanal;