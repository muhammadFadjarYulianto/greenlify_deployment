import React from "react";
import { Typography } from "@/components/ui/Typography";
import Kaca from "../../assets/images/kaca.png";
import Kardus from "../../assets/images/kardus.png";
import Kertas from "../../assets/images/kertas.png";
import Metal from "../../assets/images/metal.png";
import Organik from "../../assets/images/organik.png";
import Plastik from "../../assets/images/plastik.png";

const CardSampah = [
  {
    id: 1,
    img: Kardus,
    heading: "Kardus atau Cardboard",
    subHeading: "Kertas dengan bahan tebal",
  },
  {
    id: 2,
    img: Kaca,
    heading: "Kaca",
    subHeading: "Sampah berbahan dasar kaca",
  },
  {
    id: 3,
    img: Metal,
    heading: "Metal",
    subHeading: "Sampah berbahan metal seperti kaleng",
  },
  {
    id: 4,
    img: Kertas,
    heading: "Kertas",
    subHeading: "Majalah, koran bekas, kertas bekas",
  },
  {
    id: 5,
    img: Plastik,
    heading: "Plastik",
    subHeading: "Sampah berbahan dasar plastik",
  },
  {
    id: 6,
    img: Organik,
    heading: "Organik",
    subHeading: "Sisa-sisa makanan, sampah dapur",
  },
];

const KategoriSection = () => {
  return (
    <section>
      {/* Section kategori sampah */}
      <div className="grid grid-cols-1 md:grid-cols-12 place-items-center mx-auto max-w-[1512px] px-8 md:px-12 lg:px-16 mt-10 md:mt-14 lg:mt-16">
        {/* Title section */}
        <div className="col-span-4 text-center md:text-left place-self-start flex flex-col gap-2">
          <div>
            <Typography variant="h1" className="hero-title">
              <strong className="text-emerald-600">Kategori Sampah</strong> Yang
              Tersedia
            </Typography>
          </div>
          <div className="max-w-[300px] mx-auto md:mx-0">
            <Typography variant="p" className="hero-description">
              Jenis Sampah Yang Dapat Kami Deteksi Klasifikasi
            </Typography>
          </div>
        </div>
        {/* Container card sampah */}
        <div className="col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4 md:gap-y-8">
          {CardSampah.map((item) => (
            <figure
              key={item.id}
            >
              <img
                src={item.img}
                alt={item.heading}
                className="rounded-t-md w-full shadow-md"
              />
              <figcaption className="px-2 py-4">
                <Typography variant="lead">
                  <strong className="text-emerald-600">{item.heading} </strong>
                </Typography>
                <Typography variant="p">{item.subHeading}</Typography>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KategoriSection;
