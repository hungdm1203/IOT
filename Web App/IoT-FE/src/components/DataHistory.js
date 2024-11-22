// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { getDatabase, ref, onValue, push } from "firebase/database"; // Thêm từ Firebase

// const DataHistory = () => {
//   const [dataHistory, setDataHistory] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const [error, setError] = useState(null);

//   const isDifferentData = (newData, lastData) => {
//     return (
//       newData.gasThreshold !== lastData.gasThreshold ||
//       newData.fireState !== lastData.fireState
//     );
//   };

//   useEffect(() => {
//     const db = getDatabase(); // Tạo kết nối tới Firebase Database
//     const historyRef = ref(db, "dataHistory");

//     // Lấy các bản ghi lưu trữ khi trang được tải lại
//     onValue(historyRef, (snapshot) => {
//       const savedData = snapshot.val();
//       const loadedHistory = savedData ? Object.values(savedData) : [];
//       setDataHistory(loadedHistory);
//     });

//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://whldjc-3001.csb.app/api/data");
//         const newData = {
//           ...response.data,
//           timestamp: new Date().toLocaleString(),
//         };

//         // Kiểm tra nếu có lửa hoặc khí gas vượt ngưỡng
//         if (newData.fireState === 1 || newData.gasValue >= newData.gasThreshold) {
//           // Kiểm tra xem dữ liệu mới đã tồn tại trong lịch sử chưa (dựa trên gasThreshold và fireState)
//           const existingData = dataHistory.find(
//             (item) => item.gasThreshold === newData.gasThreshold && item.fireState === newData.fireState
//           );

//         if (!existingData) {
//           push(historyRef, newData); // Chỉ lưu nếu không có dữ liệu trùng
//         }
//       }

//         setDataHistory((prevHistory) => {
//           if (prevHistory.length === 0 || isDifferentData(newData, prevHistory[prevHistory.length - 1])) {
//             return [...prevHistory, newData];
//           }
//           return prevHistory;
//         });
//       } catch (error) {
//         setError("Lỗi khi lấy dữ liệu từ server: " + error.message);
//         console.error("Chi tiết lỗi:", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // const displayedData = showAll ? dataHistory : dataHistory.slice(-5).reverse();
//   const displayedData = [...dataHistory]
//     .reverse()
//     .slice(0, showAll ? dataHistory.length : 5);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Lịch sử trạng thái</h2>
//       {dataHistory.length > 0 ? (
//         <table style={styles.table}>
//           <thead>
//             <tr style={styles.headerRow}>
//               <th style={{ ...styles.th, ...styles.timestamp }}>Thời gian</th>
//               <th style={{ ...styles.th, ...styles.fanState }}>Trạng thái quạt</th>
//               <th style={{ ...styles.th, ...styles.pumpState }}>Trạng thái máy bơm</th>
//               <th style={{ ...styles.th, ...styles.windowState }}>Trạng thái cửa sổ</th>
//               <th style={{ ...styles.th, ...styles.gasValue }}>Giá trị mức khí gas hiện tại(ppm)</th>
//               <th style={{ ...styles.th, ...styles.gasThreshold }}>Ngưỡng khí gas(ppm)</th>
//               <th style={{ ...styles.th, ...styles.fireState }}>Phát hiện lửa</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedData.map((data, index) => (
//               <tr key={index}>
//                 <td style={styles.timestamp}>{data.timestamp}</td>
//                 <td style={styles.fanState}>{data.fanState}</td>
//                 <td style={styles.pumpState}>{data.pumpState}</td>
//                 <td style={styles.windowState}>{data.windowState}</td>
//                 <td style={styles.gasValue}>{data.gasValue}</td>
//                 <td style={styles.gasThreshold}>{data.gasThreshold}</td>
//                 <td style={styles.fireState}>{data.fireState}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p style={styles.loadingText}>Đang tải dữ liệu...</p>
//       )}
//       {dataHistory.length > 5 && (
//         <button onClick={() => setShowAll(!showAll)} style={styles.button}>
//           {showAll ? "Ẩn bớt" : "Xem tất cả"}
//         </button>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "700px",
//     margin: "auto",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     backgroundColor: "#f9f9f9",
//   },
//   header: {
//     textAlign: "center",
//     color: "#333",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "10px",
//   },
//   headerRow: {
//     backgroundColor: "#333",
//     color: "#000",
//   },
//   th: {
//     padding: "10px",
//     border: "1px solid #ddd",
//     fontWeight: "bold",
//   },
//   timestamp: {
//     backgroundColor: "#ffebcc",
//     textAlign: "center",
//   },
//   fanState: {
//     backgroundColor: "#ffcccc",
//     textAlign: "center",
//   },
//   fireState: {
//     backgroundColor: "#ffe6cc",
//     textAlign: "center",
//   },
//   gasThreshold: {
//     backgroundColor: "#ffffcc",
//     textAlign: "center",
//   },
//   gasValue: {
//     backgroundColor: "#e6ffcc",
//     textAlign: "center",
//   },
//   pumpState: {
//     backgroundColor: "#cce6ff",
//     textAlign: "center",
//   },
//   windowState: {
//     backgroundColor: "#e6ccff",
//     textAlign: "center",
//   },
//   loadingText: {
//     textAlign: "center",
//     color: "#888",
//   },
//   button: {
//     display: "block",
//     width: "100%",
//     padding: "10px",
//     marginTop: "10px",
//     fontSize: "16px",
//     borderRadius: "4px",
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     cursor: "pointer",
//     textAlign: "center",
//   },
// };

// export default DataHistory;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, onValue, push } from "firebase/database";

const ITEMS_PER_PAGE = 10; // Số mục mỗi trang

const DataHistory = () => {
  const [dataHistory, setDataHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  useEffect(() => {
    const db = getDatabase();
    const historyRef = ref(db, "dataHistory");
  
    let lastRecord = null; // Lưu bản ghi cuối cùng đã thêm
  
    onValue(historyRef, (snapshot) => {
      const savedData = snapshot.val();
      const loadedHistory = savedData ? Object.values(savedData) : [];
      setDataHistory(loadedHistory);
      setTotalPages(Math.ceil(loadedHistory.length / ITEMS_PER_PAGE));
      if (loadedHistory.length > 0) {
        lastRecord = loadedHistory[loadedHistory.length - 1]; // Lấy bản ghi cuối cùng
      }
    });
  
    const fetchData = async () => {
      try {
        const response = await axios.get("https://whldjc-3001.csb.app/api/data");
        const newData = {
          ...response.data,
          timestamp: new Date().toLocaleString(),
        };
  
        // Kiểm tra sự khác biệt với bản ghi cuối cùng
        const isDifferent =
          !lastRecord ||
          newData.fireState !== lastRecord.fireState ||
          newData.gasValue !== lastRecord.gasValue ||
          newData.gasThreshold !== lastRecord.gasThreshold;
  
        if (isDifferent && (newData.fireState === 0 || newData.gasValue >= newData.gasThreshold)) {
          push(historyRef, newData); // Thêm bản ghi mới vào Firebase
          lastRecord = newData; // Cập nhật bản ghi cuối cùng
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  

  // Lọc dữ liệu dựa trên trang hiện tại
  const displayedData = [...dataHistory]
    .reverse()
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Tính toán danh sách trang hiển thị
  const calculatePages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) pages.push(1, 2, "...");
      for (
        let i = Math.max(3, currentPage - 2);
        i <= Math.min(totalPages - 2, currentPage + 2);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...", totalPages - 1, totalPages);
    }
    return pages;
  };

  // Điều hướng giữa các trang
  const handlePageSelect = (page) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Lịch sử trạng thái</h2>
      {dataHistory.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Thời gian</th>
              <th style={styles.th}>Trạng thái quạt</th>
              <th style={styles.th}>Trạng thái máy bơm</th>
              <th style={styles.th}>Trạng thái cửa sổ</th>
              <th style={styles.th}>Giá trị mức khí gas hiện tại</th>
              <th style={styles.th}>Ngưỡng khí gas</th>
              <th style={styles.th}>Phát hiện lửa</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data, index) => (
              <tr key={index}>
                <td style={styles.td}>{data.timestamp}</td>
                <td style={styles.td}>{data.fanState}</td>
                <td style={styles.td}>{data.pumpState}</td>
                <td style={styles.td}>{data.windowState}</td>
                <td style={styles.td}>{data.gasValue}</td>
                <td style={styles.td}>{data.gasThreshold}</td>
                <td style={styles.td}>{data.fireState}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.loadingText}>Đang tải dữ liệu...</p>
      )}
      <div style={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1} style={styles.pageButton}>
          {"</"}
        </button>
        {calculatePages().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageSelect(page)}
            style={{
              ...styles.pageNumber,
              backgroundColor: page === currentPage ? "#007bff" : "#f0f0f0",
              color: page === currentPage ? "#fff" : "#000",
            }}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages} style={styles.pageButton}>
          {"/>"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "700px", margin: "auto", padding: "20px" },
  header: { textAlign: "center", color: "#333" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { padding: "10px", border: "1px solid #ddd", fontWeight: "bold", backgroundColor: "#f0f0f0" },
  td: { padding: "10px", border: "1px solid #ddd" },
  loadingText: { textAlign: "center", color: "#888" },
  pagination: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" },
  pageButton: { padding: "10px", fontSize: "16px", margin: "0 5px", cursor: "pointer" },
  pageNumber: { padding: "5px 10px", margin: "0 2px", border: "1px solid #ddd", cursor: "pointer" },
};

export default DataHistory;
