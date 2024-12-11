// import axios from 'axios';
// import { PREDICT } from '@/constants/routesAPI';

// /**
//  * Mengirimkan gambar ke server Flask untuk prediksi
//  * @param {File} file - File gambar yang ingin diprediksi
//  * @returns {Promise<Object>} - Response dari server
//  */
// export const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await axios.post(PREDICT, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Menunjukkan bahwa kita mengirimkan form data
//       },
//     });
//     return response.data; // Mengembalikan hasil prediksi
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error; // Mengembalikan error jika ada
//   }
// };


import axios from "axios";
import { PREDICT } from "@/constants/routesAPI";

/**
 * Mengirimkan gambar ke server Flask untuk prediksi
 * @param {File | string} image - File gambar atau data URI gambar yang ingin diprediksi
 * @returns {Promise<Object>} - Response dari server
 */
export const uploadImage = async (image) => {
  const formData = new FormData();

  // Jika gambar yang diterima adalah data URI (gambar dari kamera)
  if (typeof image === "string") {
    const blob = dataURItoBlob(image); // Mengonversi data URI ke Blob
    formData.append("file", blob, "image.jpg"); // Nama file bisa disesuaikan
  } else {
    // Jika gambar berupa file (gambar dari input file)
    formData.append("file", image);
  }

  try {
    const response = await axios.post(PREDICT, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Menunjukkan bahwa kita mengirimkan form data
      },
    });
    return response.data; // Mengembalikan hasil prediksi
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Mengembalikan error jika ada
  }
};

/**
 * Mengonversi data URI ke Blob
 * @param {string} dataURI - Data URI gambar
 * @returns {Blob} - Blob gambar yang dihasilkan
 */
export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([uintArray], { type: "image/jpeg" });
};
