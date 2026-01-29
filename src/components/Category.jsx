import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { GiCancel } from "react-icons/gi";

const Category = () => {
  const [isCat, setIsCat] = useState(true);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [category, setCategory] = useState({
    categoryname: "",
    subcategory: "",
    description: "",
    action: "",
  });
  const [showCat, setShowCat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/category");
      setShowCat(response.data.categories);
    } catch (error) {
      console.log("Category fetch failed", error);
      setMessage("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category", JSON.stringify(category));
      if (image) formData.append("image", image);

      if (isEditMode) {
        await axios.put(
          `http://localhost:5100/admin/category/${editCategoryId}`,
          formData,
          {
            header: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setMessage("Category updated successfully");
        alert("update successfully");
      } else {
        await axios.post("http://localhost:5100/admin/category", formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Category added successfully");
        alert("Category Added successfully");
      }
      getCategory();
      setIsCat(true);
      setIsEditMode(false);
      setImage(null);
      setCategory({
        categoryname: "",
        subcategory: "",
        description: "",
        action: "",
      });
    } catch (err) {
      console.log(err);
      setMessage("Error  saving category");
    }
  };

  const handleEditCategory = (cat) => {
    setIsEditMode(true);
    setEditCategoryId(cat._id);
    setCategory({
      categoryname: cat.categoryname,
      subcategory: cat.subcategory,
      description: cat.description,
      action: cat.action,
      image: cat.image,
    });
    setIsCat(false);
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete the category?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `http://localhost:5100/admin/category/${id}`,
        );
        if (res.data.success) {
          getCategory();
          setMessage("Category deleted successfully ");
        }
      } catch (err) {
        console.log("Error deleting category", err);
        setMessage("Error deleting category ");
      }
    }
  };

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const filteredCategories = showCat.filter((cat) =>
    cat.categoryname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="users-container">
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn-users"
          style={{ backgroundColor: "#218332" }}
          onClick={() => {
            setIsCat(false);
            setIsEditMode(false);
            setCategory("");
          }}
        >
          Add Category
        </button>
      </div>

      {message && <p style={{ color: "blue" }}>{message}</p>}

      {isCat ? (
        <div className="main-content">
          <div className="table-responsive">
            <table style={{ marginRight: "50%" }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Category Name</th>
                  <th>SubCategory</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat, index) => (
                  <tr key={cat._id || index}>
                    <td>{index + 1}</td>
                    <td>{cat.categoryname}</td>
                    <td>{cat.subcategory}</td>
                    <td>{cat.description}</td>
                    <td>
                      {cat.image && (
                        <img
                          src={`http://localhost:5100/uploads/${cat.image}`}
                          alt={cat.categoryname}
                          width="50"
                          height="50"
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditCategory(cat)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteCategory(cat._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="category-container">
          <GiCancel
            onClick={() => setIsCat(true)}
            style={{
              justifyContent: "flex-end",
              marginLeft: "98%",
              cursor: "pointer",
            }}
          />
          <h2>{isEditMode ? "Edit Category" : "Add Category"}</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ color: "grey" }}>Category Name</label>
            <input
              type="text"
              name="categoryname"
              placeholder="Category Name"
              value={category.categoryname}
              onChange={handleChange}
              required
            />
            <label style={{ color: "grey" }}>Sub category</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Subcategory"
              value={category.subcategory}
              onChange={handleChange}
            />
            <label style={{ color: "grey" }}>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={category.description}
              onChange={handleChange}
            />
            <label style={{ color: "grey" }}>Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit" className="add-btn">
              {isEditMode ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Category;
