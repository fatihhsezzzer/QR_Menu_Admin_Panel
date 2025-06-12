import React, { useEffect, useState } from "react";
import axios from "axios";

const ratingTexts = {
  1: "😠 Hiç memnun kalmadım",
  2: "😐 Memnun kalmadım",
  3: "🙂 Memnunum",
  4: "😄 Çok memnunum",
};

const FeedbackList = () => {
  const today = new Date().toISOString().split("T")[0];
  const [feedbacks, setFeedbacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "https://api.mazina.com.tr/api/feedback"
        );
        const data = response.data.$values || [];
        setFeedbacks(data);
        setFiltered(data);
      } catch (error) {
        console.error("Geri bildirimler alınırken hata oluştu:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    let temp = [...feedbacks];

    if (startDate) {
      temp = temp.filter((f) => new Date(f.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      temp = temp.filter((f) => new Date(f.createdAt) <= new Date(endDate));
    }
    if (selectedRating) {
      temp = temp.filter((f) => f.rating === parseInt(selectedRating));
    }

    setFiltered(temp);
  }, [startDate, endDate, selectedRating, feedbacks]);

  const getStats = (data) => {
    const total = data.length;
    const counts = [1, 2, 3, 4].map(
      (rating) => data.filter((f) => f.rating === rating).length
    );
    const average =
      total > 0
        ? (data.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(2)
        : 0;

    return { total, counts, average };
  };

  const stats = getStats(filtered);

  return (
    <div className="page-content dark-theme container my-5">
      <h2 className="text-center fw-bold mb-4">📋 Müşteri Geri Bildirimleri</h2>

      {/* Filtre Alanları */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-4">
            <label>Başlangıç Tarihi</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Bitiş Tarihi</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Memnuniyet</label>
            <select
              className="form-select"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="">Tümü</option>
              <option value="1">😠 Hiç memnun kalmadım</option>
              <option value="2">😐 Memnun kalmadım</option>
              <option value="3">🙂 Memnunum</option>
              <option value="4">😄 Çok memnunum</option>
            </select>
          </div>
        </div>
      </div>

      {/* İstatistik Alanı */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="fw-bold mb-3">📊 Rapor</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Toplam Geri Bildirim: <strong>{stats.total}</strong>
          </li>
          <li className="list-group-item">
            Ortalama Memnuniyet: <strong>{stats.average}</strong>
          </li>
          {[1, 2, 3, 4].map((r) => (
            <li key={r} className="list-group-item">
              {ratingTexts[r]} —{" "}
              <strong>
                {stats.counts[r - 1]} (
                {stats.total > 0
                  ? ((stats.counts[r - 1] / stats.total) * 100).toFixed(1)
                  : 0}
                %)
              </strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Geri Bildirim Tablosu */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Memnuniyet</th>
              <th>Telefon</th>
              <th>Yorum</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{ratingTexts[item.rating]}</td>
                <td>{item.phoneNumber || "-"}</td>
                <td>{item.comment || <em>Yorum yok</em>}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
