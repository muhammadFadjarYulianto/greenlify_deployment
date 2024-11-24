import React from "react";
import { Typography } from "@/components/ui/Typography";
import trashImage from "@/assets/images/trash.svg";

const partners = [
  { id: 1, name: "KLHK", imageSrc: "/src/assets/images/KLHK.svg" },
  {
    id: 2,
    name: "Waste4Change",
    imageSrc: "/src/assets/images/waste4change.svg",
  },
  { id: 3, name: "Greenpeace", imageSrc: "/src/assets/images/Greenpeace.svg" },
  { id: 4, name: "Kehati", imageSrc: "/src/assets/images/kehati.svg" },
  { id: 5, name: "Avani", imageSrc: "/src/assets/images/avani.svg" },
];

const teamMembers = [
  {
    id: 1,
    name: "I NGURAH KOMANG AGUS SURYADIYATMIKA. S",
    role: "Product Manager",
    imageSrc:
      "/src/assets/images/Kumpulan Foto Anggota/I Ngurah Komang Agus Suryadiyatmika. S.JPG",
  },
  {
    id: 2,
    name: "ANNA BERTTRIA NOVEM BUDIA",
    role: "UI/UX Designer",
    imageSrc: "/src/assets/images/Kumpulan Foto Anggota/Anna Berttria.jpg",
  },
  {
    id: 3,
    name: "NATASYA HELMALIA PUTRI",
    role: "UI/UX Designer",
    imageSrc:
      "/src/assets/images/Kumpulan Foto Anggota/Natasya Helmalia Putri.PNG",
  },
  {
    id: 4,
    name: "DAMAR GALIH",
    role: "Front-end Developer",
    imageSrc: "/src/assets/images/Kumpulan Foto Anggota/Damar Galih.jpg",
  },
  {
    id: 5,
    name: "TAUFIQ KURNIAWAN AKBAR",
    role: "Front-end Developer",
    imageSrc:
      "/src/assets/images/Kumpulan Foto Anggota/Taufiq Kurniawan Akbar.jpg",
  },
  {
    id: 6,
    name: "NAUFAL FAHMI KARTIKA",
    role: "Back-end Developer",
    imageSrc:
      "/src/assets/images/Kumpulan Foto Anggota/Naufal Fahmi Kartika.png",
  },
  {
    id: 7,
    name: "HILHAM YULISTIO",
    role: "Back-end Developer",
    imageSrc: "/src/assets/images/Kumpulan Foto Anggota/Hilham Yulistio.png",
  },
  {
    id: 8,
    name: "TIFANI AQLICIAN",
    role: "Data Science",
    imageSrc: "/src/assets/images/Kumpulan Foto Anggota/Tivany Aqlicia.png",
  },
  {
    id: 9,
    name: "ABDILLAH",
    role: "Data Science",
    imageSrc: "/src/assets/images/Kumpulan Foto Anggota/Abdillah.jpg",
  },
  {
    id: 10,
    name: "MUHAMMAD FADJAR YULIANTO",
    role: "QA Engineer",
    imageSrc:
      "/src/assets/images/Kumpulan Foto Anggota/Muhammad Fadjar Yulianto.jpg",
  },
];
const About = () => {
  return (
    <main>
      <div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
        <div className="max-w-3x1 text-center lg:text-center">
          <Typography variant="title">
            <strong className="text-emerald-700">Tentang</strong> Kami
          </Typography>
        </div>
        <div className="text-center lg:max-w-4xl md:max-w-2xl">
          <Typography variant="p">
            GreenLify adalah solusi berbasis teknologi yang memanfaatkan
            kecerdasan buatan (Al) dan visi komputer untuk mendeteksi dan
            mengklasifikasikan jenis sampah melalui gambar. Hal ini membantu
            masyarakat mengenali sampah dan mendapatkan rekomendasi pengelolaan
            yang tepat, seperti daur ulang atau kompos.
          </Typography>
        </div>
        <img
          src={trashImage}
          alt="trashImage"
          className="w-full mt-4 px-4 md:px-12 lg:px-24 xl:px-52"
        />
      </div>

      <div className="w-full mt-[66px] flex flex-col lg:flex-row justify-around items-center px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0">
        <div className="max-w-2x1 text-center lg:text-left">
          <Typography variant="h1">Visi</Typography>
        </div>
        <div className="max-w-2xl text-justify lg:text-justify">
          <Typography variant="p">
            Menjadi platform terdepan yang mendukung pengelolaan sampah secara
            bijaksana dan ramah lingkungan, sekaligus mendorong masyarakat untuk
            mengambil langkah proaktif dalam menjaga kelestarian bumi. Platform
            ini bertujuan untuk meningkatkan kesadaran akan pentingnya daur
            ulang dan pengurangan limbah, serta menyediakan solusi inovatif yang
            memudahkan pengelolaan sampah secara efisien.
          </Typography>
        </div>
      </div>

      <div className="w-full flex flex-col-reverse lg:flex-row justify-around items-center py-[33px] px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0">
        <div className="max-w-2xl text-justify lg:text-justify">
          <Typography variant="p">
            Meningkatkan kesadaran masyarakat tentang pentingnya pengelolaan
            sampah melalui informasi statistik yang akurat dan relevan. Platform
            ini juga menyediakan panduan praktis untuk daur ulang dan
            pengurangan limbah, sehingga mempermudah individu dan komunitas
            dalam menerapkan kebiasaan yang ramah lingkungan.
          </Typography>
        </div>
        <div className="max-w-2x1 text-center lg:text-left">
          <Typography variant="h1">
            <strong className="text-emerald-700">Misi</strong>
          </Typography>
        </div>
      </div>

      <div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px] px-4">
        <div className="max-w-3xl text-center">
          <Typography variant="h1">
            Kerja <strong className="text-emerald-700">Sama</strong>
          </Typography>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {partners.map((partner) => (
            <img
              key={partner.id}
              src={partner.imageSrc}
              alt={partner.name}
              className="h-16 w-auto md:h-full lg:h-full"
            />
          ))}
        </div>
      </div>

      <div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
        <div className="max-w-3x1 text-center lg:text-center">
          <Typography variant="title">
            <strong className="text-emerald-700">Profile Tim</strong>
          </Typography>
        </div>
        <div className="max-w-2xl text-center lg:text-center-full">
          <Typography variant="p">
            Kami adalah sekelompok individu yang berdedikasi untuk menciptakan
            solusi inovatif dalam pengelolaan sampah dan pelestarian lingkungan.
          </Typography>
        </div>
        <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex flex-col items-center space-y-4 ${
                index === 8 ? "lg:col-start-2" : ""
              } ${index === 9 ? "lg:col-start-3" : ""}`}
            >
              <img
                src={member.imageSrc}
                alt={member.name}
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
              <Typography variant="p-semibold" className="text-center">
                {member.name}
              </Typography>
              <Typography variant="p">{member.role}</Typography>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
};

export default About;
