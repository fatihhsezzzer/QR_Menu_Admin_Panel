import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [insertedProducts, setInsertedProducts] = useState([]);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedResult = await axios.get(
          "https://api.mazina.com.tr/api/DailyUpdate/updated"
        );
        setUpdatedProducts(updatedResult.data.$values);

        const insertedResult = await axios.get(
          "https://api.mazina.com.tr/api/DailyUpdate/inserted"
        );
        setInsertedProducts(insertedResult.data.$values);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchData();
  }, []);

  const filterByDate = (products) => {
    return products.filter((product) => {
      const productDate = new Date(product.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && productDate < start) return false;
      if (end && productDate > end) return false;
      return true;
    });
  };

  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div className="page-content dark-theme container">
      <div className="container my-5">
        <h1 className="text-center mb-4 fw-bold">📊 Yönetim Paneli</h1>

        <div className="card shadow-sm mb-5 p-4">
          <h5 className="mb-3 fw-semibold">📅 Tarih Aralığı Seçimi</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Başlangıç Tarihi</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Bitiş Tarihi</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold">🛠️ Güncellenen Ürünler</h5>
            <button
              className="btn btn-outline-success"
              onClick={() =>
                exportToExcel(
                  filterByDate(updatedProducts),
                  "Guncellenen_Urunler"
                )
              }
            >
              Excel'e Aktar
            </button>
          </div>

          <div className="table-responsive" style={{ maxHeight: "300px" }}>
            <table className="table table-striped  table-bordered align-middle text-center">
              <thead className="table-dark sticky-top">
                <tr>
                  <th>Ürün Adı</th>
                  <th>Eski Fiyat</th>
                  <th>Yeni Fiyat</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {filterByDate(updatedProducts).map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.oldPrice} ₺</td>
                    <td>{product.newPrice} ₺</td>
                    <td>{new Date(product.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold">➕ Eklenen Ürünler</h5>
            <button
              className="btn btn-outline-success"
              onClick={() =>
                exportToExcel(filterByDate(insertedProducts), "Eklenen_Urunler")
              }
            >
              Excel'e Aktar
            </button>
          </div>

          <div className="table-responsive" style={{ maxHeight: "300px" }}>
            <table className="table table-striped  table-bordered align-middle text-center">
              <thead className="table-dark sticky-top">
                <tr>
                  <th>Ürün Adı</th>
                  <th>Fiyat</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {filterByDate(insertedProducts).map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price} ₺</td>
                    <td>{new Date(product.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
