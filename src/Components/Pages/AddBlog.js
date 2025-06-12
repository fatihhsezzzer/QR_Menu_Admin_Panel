import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name_TR: "",
    name_EN: "",
    description_TR: "",
    description_EN: "",
    price: 0,
    is_Active: true,
    categoryID: "",
    sortOrder: 0,
    productAllergens: [],
    halfPortionOf: "", // ✅ eklendi
  });

  const [categories, setCategories] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchAllergens();
    fetchProducts();
    if (id) fetchProduct(id);
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Category"
      );
      setCategories(response.data.$values || []);
    } catch (error) {
      console.error("Kategoriler alınırken hata oluştu:", error);
    }
  };

  const fetchAllergens = async () => {
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Allergen"
      );
      setAllergens(response.data.$values || []);
    } catch (error) {
      console.error("Alerjenler alınırken hata oluştu:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://api.mazina.com.tr/api/Product");
      setAllProducts(response.data.$values || []);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
    }
  };

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(
        `https://api.mazina.com.tr/api/Product/${id}`
      );
      const product = response.data;

      setProductData({
        name_TR: product.name_TR || "",
        name_EN: product.name_EN || "",
        description_TR: product.description_TR || "",
        description_EN: product.description_EN || "",
        price: product.price || 0,
        is_Active: product.is_Active || false,
        categoryID: product.categoryID || "",
        sortOrder: product.sortOrder,
        productAllergens: product.productAllergens?.$values
          ? product.productAllergens.$values.map((a) => a.allergenId)
          : [],
        halfPortionOf: product.halfPortionOf || "", // ✅ eklendi
      });
    } catch (error) {
      console.error("Ürün verisi getirirken hata oluştu:", error);
    }
  };
  const halfPortionProduct = allProducts.find(
    (p) => p.productId === Number(productData.halfPortionOf)
  );

  console.log("Seçilen yarım porsiyon ürün:", productData.halfPortionOf);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleAllergenToggle = (allergenID) => {
    const isSelected = productData.productAllergens.includes(allergenID);
    setProductData({
      ...productData,
      productAllergens: isSelected
        ? productData.productAllergens.filter((id) => id !== allergenID)
        : [...productData.productAllergens, allergenID],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productData.name_TR) newErrors.name_TR = "Ürün adı (Türkçe) gerekli.";
    if (!productData.name_EN)
      newErrors.name_EN = "Ürün adı (İngilizce) gerekli.";
    if (!productData.description_TR)
      newErrors.description_TR = "Açıklama (Türkçe) gerekli.";
    if (!productData.description_EN)
      newErrors.description_EN = "Açıklama (İngilizce) gerekli.";
    if (!productData.categoryID)
      newErrors.categoryID = "Kategori seçimi gerekli.";
    if (productData.price <= 0) newErrors.price = "Fiyat 0'dan büyük olmalı.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductSave = async () => {
    const productPayload = {
      name_TR: productData.name_TR,
      name_EN: productData.name_EN,
      description_TR: productData.description_TR,
      description_EN: productData.description_EN,
      price: productData.price,
      is_Active: productData.is_Active,
      categoryID: productData.categoryID,
      sortOrder: productData.sortOrder,
      HalfPortionOf: productData.halfPortionOf || null,
      productAllergens: productData.productAllergens.map((id) => ({
        allergenId: id,
      })),
    };

    try {
      const url = id
        ? `https://api.mazina.com.tr/api/Product/${id}`
        : "https://api.mazina.com.tr/api/Product";
      const method = id ? "put" : "post";

      const response = await axios[method](url, productPayload, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data.productId || id;
    } catch (error) {
      console.error(
        "Ürün kaydetme hatası:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleImageUploadApi = async (productId) => {
    if (!selectedImage || !productId) return;
    const formData = new FormData();
    formData.append("file", selectedImage);
    try {
      await axios.put(
        `https://api.mazina.com.tr/api/Product/${productId}/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.error(
        "Resim yükleme hatası:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const productId = await handleProductSave();
      if (selectedImage) await handleImageUploadApi(productId);
      alert(`Ürün başarıyla ${id ? "güncellendi" : "eklendi"}!`);
      navigate("/product-list");
    } catch (error) {
      console.error("İşlem sırasında hata oluştu.");
    }
  };

  return (
    <div className="page-content">
      <form onSubmit={handleSubmit} className="add-product-form">
        <h2>{id ? "Ürün Güncelle" : "Ürün Ekle"}</h2>

        {/* Kategori */}
        <div className="mb-4">
          <label>Kategori</label>
          <select
            className="form-control"
            name="categoryID"
            value={productData.categoryID}
            onChange={handleChange}
          >
            <option value="" disabled>
              Kategori Seçiniz
            </option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.name_TR}
              </option>
            ))}
          </select>
          {errors.categoryID && (
            <div className="text-danger">{errors.categoryID}</div>
          )}
        </div>

        {/* Yarım Porsiyon Seçimi */}
        <div className="mb-4">
          <label>Bu ürün hangi ürünün yarım porsiyonu?</label>
          <Select
            name="halfPortionOf"
            placeholder="Bir ürün seçin..."
            isClearable
            options={allProducts
              .filter((p) => !id || p.productId !== parseInt(id))
              .map((product) => ({
                label: product.name_TR,
                value: product.productId,
              }))}
            value={
              allProducts
                .filter((p) => !id || p.productId !== parseInt(id))
                .map((product) => ({
                  label: product.name_TR,
                  value: product.productId,
                }))
                .find(
                  (option) => option.value === Number(productData.halfPortionOf)
                ) || null
            }
            onChange={(selectedOption) =>
              setProductData({
                ...productData,
                halfPortionOf: selectedOption ? selectedOption.value : "",
              })
            }
          />

          {/* ✅ Seçili ürün bilgisi gösterimi */}
          {halfPortionProduct && (
            <p className="text-muted mt-2">
              Bu ürün, <strong>{halfPortionProduct.name_TR}</strong> ürününün
              yarım porsiyonudur.
            </p>
          )}
        </div>

        {/* Alerjenler */}
        <div className="mb-4">
          <label>Alerjenler</label>
          {allergens.map((allergen) => (
            <div key={allergen.allergenID} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`allergen-${allergen.allergenID}`}
                checked={productData.productAllergens.includes(
                  allergen.allergenID
                )}
                onChange={() => handleAllergenToggle(allergen.allergenID)}
              />
              <label
                className="form-check-label"
                htmlFor={`allergen-${allergen.allergenID}`}
              >
                {allergen.name_TR}
              </label>
            </div>
          ))}
        </div>

        {/* Adlar & Açıklamalar */}
        <div className="mb-4">
          <label>Ürün Adı (TR)</label>
          <input
            type="text"
            className="form-control"
            name="name_TR"
            value={productData.name_TR}
            onChange={handleChange}
          />
          {errors.name_TR && (
            <div className="text-danger">{errors.name_TR}</div>
          )}
        </div>

        <div className="mb-4">
          <label>Ürün Adı (EN)</label>
          <input
            type="text"
            className="form-control"
            name="name_EN"
            value={productData.name_EN}
            onChange={handleChange}
          />
          {errors.name_EN && (
            <div className="text-danger">{errors.name_EN}</div>
          )}
        </div>

        <div className="mb-4">
          <label>Açıklama (TR)</label>
          <input
            className="form-control"
            name="description_TR"
            value={productData.description_TR}
            onChange={handleChange}
          />
          {errors.description_TR && (
            <div className="text-danger">{errors.description_TR}</div>
          )}
        </div>

        <div className="mb-4">
          <label>Açıklama (EN)</label>
          <input
            className="form-control"
            name="description_EN"
            value={productData.description_EN}
            onChange={handleChange}
          />
          {errors.description_EN && (
            <div className="text-danger">{errors.description_EN}</div>
          )}
        </div>

        <div className="mb-4">
          <label>Fiyat</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
          {errors.price && <div className="text-danger">{errors.price}</div>}
        </div>

        <div className="mb-4">
          <label>Ürün Durumu</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="is_Active"
              checked={productData.is_Active}
              onChange={handleChange}
            />
            <label className="form-check-label">Aktif</label>
          </div>
        </div>

        {/* Resim Yükle */}
        <div className="mb-4">
          <label>Resim Yükle</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
          />
          {selectedImage && (
            <p>
              Seçilen resim: <b>{selectedImage.name}</b>
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
