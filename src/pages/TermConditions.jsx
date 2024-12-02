import {Typography} from "@/components/ui/Typography";
import React from "react";

const termsconditions = [
    {
        title: "1. Penerimaan Ketentuan",
        content: `Dengan mengakses atau menggunakan layanan Greenlify, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat dengan syarat dan ketentuan ini. 
        Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap tidak menggunakan layanan kami. Kami menganjurkan agar setiap pengguna meninjau syarat dan ketentuan ini secara berkala, 
        karena perubahan dapat dilakukan sewaktu-waktu. Ketentuan ini mencakup penggunaan semua fitur dan layanan Greenlify, termasuk, tetapi tidak terbatas pada, aplikasi, situs web, dan layanan pendukung lainnya.`,
    },
    {
        title: "2. Penggunaan Layanan",
        content: (
            <>
                Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan hukum yang
                berlaku. Anda dilarang menggunakan layanan kami untuk aktivitas berikut:
                <ul className="list-disc pl-5 mt-2">
                    <li>Melakukan tindakan yang dapat merugikan pihak lain, termasuk individu, organisasi, atau
                        perusahaan.
                    </li>
                    <li>Menyalahgunakan layanan untuk aktivitas ilegal seperti penipuan, pencucian uang, atau aktivitas
                        kriminal lainnya.
                    </li>
                    <li>Mencoba mendapatkan akses tidak sah ke sistem atau data Greenlify, termasuk meretas,
                        menyalahgunakan bug, atau mengganggu operasional sistem kami.
                    </li>
                </ul>
                Jika ditemukan pelanggaran terhadap syarat dan ketentuan ini, kami berhak untuk menangguhkan atau
                menghentikan akses Anda tanpa pemberitahuan sebelumnya.
            </>
        ),
    },
    {
        title: "3. Kewajiban Pengguna",
        content: (
            <>
                Sebagai pengguna layanan kami, Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda,
                termasuk nama pengguna dan kata sandi.
                Selain itu, Anda wajib:
                <ul className="list-disc pl-5 mt-2">
                    <li>Memastikan semua informasi yang Anda berikan selama proses registrasi adalah akurat dan
                        terkini.
                    </li>
                    <li>Melaporkan kepada kami jika Anda mencurigai adanya pelanggaran keamanan, seperti akses tidak sah
                        ke akun Anda.
                    </li>
                    <li>Mematuhi semua kebijakan tambahan yang mungkin berlaku untuk fitur atau layanan tertentu.</li>
                </ul>
            </>
        ),
    },
    {
        title: "4. Pembaruan dan Perubahan",
        content: `Kami berhak untuk memperbarui atau mengubah syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Perubahan tersebut akan efektif segera setelah dipublikasikan di situs web kami. 
        Kami menganjurkan Anda untuk secara berkala meninjau halaman ini agar tetap mengetahui perubahan yang mungkin memengaruhi Anda. Penggunaan layanan kami secara berkelanjutan setelah perubahan diterapkan akan dianggap sebagai penerimaan terhadap perubahan tersebut.`,
    },
    {
        title: "5. Pembatasan Tanggung Jawab",
        content: (
            <>
                Greenlify tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial
                yang mungkin terjadi akibat penggunaan atau ketidakmampuan untuk menggunakan layanan kami.
                Ini termasuk, tetapi tidak terbatas pada:
                <ul className="list-disc pl-5 mt-2">
                    <li>Gangguan layanan akibat faktor teknis di luar kendali kami.</li>
                    <li>Kesalahan atau kehilangan data akibat penggunaan aplikasi atau layanan kami.</li>
                    <li>Kerugian finansial atau material yang mungkin timbul sebagai hasil dari keputusan berdasarkan
                        informasi yang tersedia di platform kami.
                    </li>
                </ul>
            </>
        )
    },
    {
        title: "6. Hukum yang Berlaku",
        content: `Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia. Segala perselisihan yang timbul dari syarat dan ketentuan ini akan diselesaikan melalui mediasi terlebih dahulu. 
        Jika mediasi tidak berhasil, sengketa akan diajukan ke pengadilan yang memiliki yurisdiksi atas wilayah tersebut. Pengguna diwajibkan untuk mematuhi semua peraturan perundang-undangan yang berlaku selama menggunakan layanan kami.`,
    },
    {
        title: "7. Hubungi Kami",
        content: (
            <>
                Jika Anda memiliki pertanyaan atau keluhan terkait syarat dan ketentuan ini, silakan hubungi kami
                melalui email di
                <a href="mailto:support@greenlify.com" target="_blank"
                   className="text-emerald-500"> support@greenlify.com</a>. Kami juga menyediakan formulir kontak di
                situs web kami untuk memudahkan Anda menyampaikan saran atau masukan.
                Tim kami akan dengan senang hati membantu Anda dan berkomitmen untuk memberikan respon yang cepat dan
                solutif terhadap setiap pertanyaan atau masalah yang Anda alami.,
            </>
        )
    },
];

export default function TermConditions() {
    return (
        <div className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
            <div className="max-w-3x1 text-center lg:text-center">
                <Typography variant="title" className="hero-title">
                    <strong className="text-emerald-700">Syarat</strong> & Ketentuan
                </Typography>
            </div>
            <div className="md:max-w-5xl lg:max-w-8xl px-4 lg:px-0 text-justify lg:text-center hero-description">
                <Typography variant="p">
                    Halaman ini menetapkan syarat dan ketentuan penggunaan layanan Greenlify. Dengan menggunakan layanan
                    kami, Anda menyetujui syarat dan ketentuan yang dijelaskan di bawah ini.
                </Typography>
            </div>
            <div className="w-full flex flex-col max-w-7xl gap-[33px]">
                {termsconditions.map((section, index) => (
                    <div key={index} className="w-full">
                        <Typography variant="h2" className="text-justify lg:text-left px-4 lg:px-0">
                            {section.title}
                        </Typography>
                        <Typography variant="p" className="mt-4 text-justify md:text-left px-4 lg:px-0">
                            {section.content}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}
