import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import Swal from 'sweetalert2';
const Products = () => {
    const [isPro, setIsPro] = useState(false)
    const [product, setProduct] = useState({
        productname: "",
        category: "",
        price: "",
        stock: "",
        status: "",
        description: "",
        productdetails: ""
    });

    const [showProduct, setShowProduct] = useState([]);
    const [category, setCategory] = useState([]);


    const [isEditMode, setIsEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(false);


    const getProduct = async () => {
        try {
            const response = await axios.get("http://localhost:5100/admin/products");
            setShowProduct(response.data.data);
            console.log(response.data.data);

        } catch (error) {
            console.log('Failed to fetch products', error);
        }
    };

    const getCategory = async () => {
        try {
            const response = await axios.get("http://localhost:5100/admin/category");
            setCategory(response.data.categories);
        } catch (error) {
            console.log('Failed to fetch category', error);
        }
    }

    useEffect(() => {
        getProduct();
        getCategory();
    }, []);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const [image, setImage] = useState(null)

    const handleSubmit = async () => {

        if (isEditMode) {
            try {
                const response = await axios.put(`http://localhost:5100/admin/products/${editProductId}`, product);
                console.log(response.data);
                getProduct();
                setIsPro(false);
                setProduct({
                    productname: "",
                    category: "",
                    price: "",
                    stock: "",
                    status: "",
                    description: "",
                    productdetails: ""
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Product Updated Successfully',
                    timer: 2000,
                    showConfirmButton: false
                });

            } catch (error) {
                console.log("Failed to update product", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update product',
                });
            }
        } else {

            try {
                console.log(image);

                const formData = new FormData();

                formData.append('image', image)

                formData.append("product", JSON.stringify(product))

                const response = await axios.post("http://localhost:5100/admin/products", formData, {
                    header: {
                        "Content-Type": 'multipart/form-data'
                    }
                });

                console.log(response.data.data);
                getProduct();
                setIsPro(false);
                setProduct({
                    productname: "",
                    category: "",
                    price: "",
                    stock: "",
                    status: "",
                    description: "",
                    productdetails: ""
                })
                setImage(null)
                setImage(null)
                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'Product Added Successfully',
                    timer: 2000,
                    showConfirmButton: false
                });

            } catch (error) {
                console.log("Failed to save product", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to save product',
                });
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5100/admin/products/${id}`);
                Swal.fire(
                    'Deleted!',
                    'The product has been deleted.',
                    'success'
                );
                getProduct();
            } catch (error) {
                console.log("Failed to delete product", error);
                Swal.fire(
                    'Error!',
                    'Failed to delete product.',
                    'error'
                );
            }
        }
    };


    const handleEditProduct = (p) => {
        setIsEditMode(true);
        setEditProductId(p._id)
        setProduct({
            productname: p.productname,
            category: p.category,
            price: p.price,
            stock: p.stock,
            status: p.status,
            description: p.description,
            productdetails: p.productdetails
        });
        setIsPro(true);
    };

    return (
        <>
            <div className="users-container">
                <input type="search" placeholder="Search..." />
                <button className="btn-users" style={{ backgroundColor: "#218332" }} onClick={() => setIsPro(true)}>
                    Add Product
                </button>
            </div>

            {isPro ? (
                <div className="product-input">

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <GiCancel
                            onClick={() => setIsPro(false)}
                            style={{ cursor: "pointer" }}
                        />
                    </div>


                    <input
                        type="file" onChange={(e) => setImage(e.target.files[0])}
                        name="image"
                    />


                    <input
                        type="text"
                        name="productname"
                        placeholder="Product Name"
                        value={product.productname}
                        onChange={handleChange}
                    />


                    <select name="category" value={product.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {category.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.categoryname}
                            </option>
                        ))}
                    </select>


                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={handleChange}
                    />

                    <select name="status" value={product.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                    </select>


                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
                    />
                    <textarea
                        type="text"
                        name="productdetails"
                        placeholder="product Details"
                        value={product.productdetails}
                        onChange={handleChange}
                    />


                    <button onClick={handleSubmit}>
                        {isEditMode ? 'Edit Product' : 'Add Product'}
                    </button>
                </div>

            ) : (

                <div className="tables-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>id</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Image</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Product Name</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Category</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Price</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Stock</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Status</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Description</th>
                                <th style={{ backgroundColor: "#66baeb", color: "white" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showProduct.map((p, index) => (
                                <tr key={p._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:5100/uploads/${p.image}`}
                                            alt={p.productname}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{p.productname}</td>
                                    <td>{p?.category?.categoryname}</td>
                                    <td>₹{p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.status}</td>
                                    <td>{p.description.length > 20 ? p.description.slice(0, 20) + "..." : p.description}</td>
                                    <td>
                                        <button style={{ background: "#219cc9" }} onClick={() => handleEditProduct(p)}> <FaEdit /></button>
                                        <button style={{ backgroundColor: "#FF3838", marginLeft: "5px" }} onClick={() => handleDeleteProduct(p._id)}> <MdDeleteForever /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}
        </>
    );
};

export default Products;
