import React, { useState, useEffect } from "react";
import { FaGripVertical } from "react-icons/fa"; // 🔥 FontAwesome sürükleme ikonu
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ Yükleme durumu eklendi
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true); // ✅ API çağrısı başlamadan önce yükleme aktif
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Category"
      );
      const sortedCategories = response.data.$values
        ? response.data.$values.sort((a, b) => a.sortOrder - b.sortOrder)
        : [];
      setCategories(sortedCategories);
    } catch (error) {
      console.error("❌ Kategorileri getirirken hata oluştu:", error);
    } finally {
      setIsLoading(false); // ✅ API isteği tamamlandıktan sonra yükleme kapatılır
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Bu kategoriyi silmek istediğinize emin misiniz?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://api.mazina.com.tr/api/Category/${id}`);
      fetchCategories();
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex(
      (cat) => cat.categoryID.toString() === active.id
    );
    const newIndex = categories.findIndex(
      (cat) => cat.categoryID.toString() === over.id
    );

    const updatedCategories = arrayMove(categories, oldIndex, newIndex);

    const reorderedCategories = updatedCategories.map((category, index) => ({
      ...category,
      sortOrder: index,
    }));

    setCategories(reorderedCategories);

    try {
      await axios.put(
        "https://api.mazina.com.tr/api/Category/UpdateCategoryOrder",
        reorderedCategories,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("✅ Yeni sıralama API'ye kaydedildi:", reorderedCategories);
    } catch (error) {
      console.error("❌ Sıralama güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="page-content category-list">
      <h2>Kategori Listesi</h2>

      {/* 🔥 Eğer yükleniyorsa "Yükleniyor..." mesajı göster */}
      {isLoading ? (
        <p
          style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
        >
          🔄 Kategoriler yükleniyor...
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Tut</th>
                <th>Sıra No</th>
                <th>Resim</th>
                <th>Ad (TR)</th>
                <th>Ad (EN)</th>
                <th>Yeni Kategori Mi?</th>
                <th>Aktif Mi?</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <SortableContext
              items={categories.map((category) =>
                category.categoryID.toString()
              )}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {categories.map((category) => (
                  <SortableCategoryRow
                    key={category.categoryID}
                    category={category}
                    navigate={navigate}
                    deleteCategory={deleteCategory}
                  />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      )}
    </div>
  );
};

const SortableCategoryRow = ({ category, navigate, deleteCategory }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.categoryID.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#f8f9fa" : "white",
    boxShadow: isDragging ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      {/* 🔥 Yalnızca ikon üzerinde "grab" efekti olsun */}
      <td style={{ width: "40px", textAlign: "center" }}>
        <span {...listeners} style={{ cursor: "grab" }}>
          <FaGripVertical size={20} color="#666" />
        </span>
      </td>
      <td>
        <strong>{category.sortOrder + 1}</strong>
      </td>
      <td>
        {category.imagePath ? (
          <img
            src={`https://api.mazina.com.tr/${category.imagePath}`}
            alt={category.name_TR}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          "Resim Yok"
        )}
      </td>
      <td>{category.name_TR}</td>
      <td>{category.name_EN}</td>

      <td>
        <span
          className={`badge ${category.is_New ? "bg-success" : "bg-secondary"}`}
          style={{ fontSize: "0.9rem", padding: "5px 10px" }}
        >
          {category.is_New ? "Evet" : "Hayır"}
        </span>
      </td>

      <td>
        <span
          className={`badge ${category.is_Active ? "bg-primary" : "bg-danger"}`}
          style={{ fontSize: "0.9rem", padding: "5px 10px" }}
        >
          {category.is_Active ? "Evet" : "Hayır"}
        </span>
      </td>
      <td style={{ width: "200px" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/add-category/${category.categoryID}`);
          }}
          className="btn btn-primary"
        >
          Düzenle
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCategory(category.categoryID);
          }}
          className="btn btn-danger ms-2"
        >
          Sil
        </button>
      </td>
    </tr>
  );
};

export default CategoryList;
