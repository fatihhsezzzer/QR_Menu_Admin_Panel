import React, { useState, useEffect } from "react";
import { FaGripVertical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCategory } from "../Contexts/CategoryContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ProductList = () => {
  const { selectedCategory, updateCategory } = useCategory();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [showUnActiveOnly, setShowUnActiveOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://api.mazina.com.tr/api/Product");
      const sortedProducts = response.data.$values
        ? response.data.$values.sort((a, b) => a.sortOrder - b.sortOrder)
        : [];
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (error) {
      console.error("Ürünleri getirirken hata oluştu:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Category"
      );
      setCategories(response.data.$values);
    } catch (error) {
      console.error("Kategorileri getirirken hata oluştu:", error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    showActiveOnly,
    showUnActiveOnly,
    selectedCategory,
    products,
  ]);

  const applyFilters = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name_TR.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showActiveOnly) {
      filtered = filtered.filter((product) => product.is_Active);
    }

    if (showUnActiveOnly) {
      filtered = filtered.filter((product) => !product.is_Active);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categoryID.toString() === selectedCategory
      );
    }

    filtered = filtered.map((p, index) => ({
      ...p,
      sortOrder: index,
    }));

    setFilteredProducts(filtered);
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Bu ürünü silmek istediğinize emin misiniz?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://api.mazina.com.tr/api/Product/${productId}`);
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error("Ürün silinirken hata oluştu:", error);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = filteredProducts.findIndex(
      (product) => product.productId.toString() === active.id
    );
    const newIndex = filteredProducts.findIndex(
      (product) => product.productId.toString() === over.id
    );

    const updatedProducts = arrayMove(filteredProducts, oldIndex, newIndex);

    const reorderedProducts = updatedProducts.map((product, index) => ({
      ...product,
      sortOrder: index,
    }));

    setFilteredProducts(reorderedProducts);
    setProducts(reorderedProducts);

    try {
      await axios.put(
        "https://api.mazina.com.tr/api/Product/UpdateProductOrder",
        reorderedProducts,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Ürün sıralaması güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="page-content product-list" style={{ padding: "1rem" }}>
      <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>Ürün Listesi</h2>

      <div
        className="filters mb-4"
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Ürün adı ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          style={{ flex: "1 1 200px" }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => updateCategory(e.target.value)}
          className="form-select"
          style={{ flex: "1 1 200px" }}
        >
          {categories.map((category) => (
            <option key={category.categoryID} value={category.categoryID}>
              {category.name_TR}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            checked={showActiveOnly}
            onChange={(e) => setShowActiveOnly(e.target.checked)}
          />
          Sadece aktif ürünler
        </label>

        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            checked={showUnActiveOnly}
            onChange={(e) => setShowUnActiveOnly(e.target.checked)}
          />
          Sadece pasif ürünler
        </label>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ minWidth: "600px", width: "100%" }}>
            <thead>
              <tr>
                <th>Tut</th>
                <th>Sıra No</th>
                <th>Resim</th>
                <th>Ad (TR)</th>
                <th>Kategori</th>
                <th>Fiyat</th>
                <th>Aktif Mi?</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <SortableContext
              items={filteredProducts.map((product) =>
                product.productId.toString()
              )}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {filteredProducts.map((product) => (
                  <SortableProductRow
                    key={product.productId}
                    product={product}
                    categories={categories}
                    navigate={navigate}
                    deleteProduct={deleteProduct}
                  />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </div>
      </DndContext>
    </div>
  );
};

const SortableProductRow = ({
  product,
  categories,
  navigate,
  deleteProduct,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.productId.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#f8f9fa" : "white",
    boxShadow: isDragging ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      <td {...listeners} style={{ cursor: "grab", textAlign: "center" }}>
        <FaGripVertical size={20} color="#666" />
      </td>
      <td>{product.sortOrder + 1}</td>
      <td>
        {product.imagePath ? (
          <img
            src={`https://api.mazina.com.tr${product.imagePath}`}
            alt={product.name_TR}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          "Resim Yok"
        )}
      </td>
      <td>{product.name_TR}</td>
      <td>
        {categories.find((c) => c.categoryID === product.categoryID)?.name_TR ||
          "Bilinmiyor"}
      </td>
      <td>{product.price} TL</td>
      <td>{product.is_Active ? "Evet" : "Hayır"}</td>
      <td>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/add-blog/${product.productId}`);
          }}
          className="btn btn-primary btn-sm"
        >
          Düzenle
        </button>
      </td>
    </tr>
  );
};

export default ProductList;
