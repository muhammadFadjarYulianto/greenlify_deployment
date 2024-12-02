import React, {useEffect, useRef} from "react";
import {Typography} from "@/components/ui/Typography";
import trashImage from "@/assets/images/img-about.svg";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
    {id: 1, name: "KLHK", imageSrc: "/src/assets/partners/KLHK.svg"},
    {
        id: 2,
        name: "Waste4Change",
        imageSrc: "/src/assets/partners/waste4change.svg",
    },
    {id: 3, name: "Greenpeace", imageSrc: "/src/assets/partners/Greenpeace.svg"},
    {id: 4, name: "Kehati", imageSrc: "/src/assets/partners/Kehati.svg"},
    {id: 5, name: "Avani", imageSrc: "/src/assets/partners/Avani.svg"},
];

const teamMembers = [
    {
        id: 1,
        name: "I NGURAH KOMANG AGUS SURYADIYATMIKA. S",
        role: "Product Manager",
        imageSrc:
            "https://ik.imagekit.io/3s8oi0rad/Members/I%20Ngurah%20Komang%20Agus%20Suryadiyatmika.%20S.JPG?updatedAt=1732680256424",
    },
    {
        id: 2,
        name: "ANNA BERTTRIA NOVEM BUDIA",
        role: "UI/UX Designer",
        imageSrc: "https://ik.imagekit.io/3s8oi0rad/Members/Anna%20Berttria.jpg?updatedAt=1732680250697",
    },
    {
        id: 3,
        name: "NATASYA HELMALIA PUTRI",
        role: "UI/UX Designer",
        imageSrc:
            "https://ik.imagekit.io/3s8oi0rad/Members/Natasya%20Helmalia%20Putri.PNG?updatedAt=1732680248804",
    },
    {
        id: 4,
        name: "DAMAR GALIH",
        role: "Front-end Developer",
        imageSrc: "https://ik.imagekit.io/3s8oi0rad/Members/Damar%20Galih.jpg?updatedAt=1732680113550",
    },
    {
        id: 5,
        name: "TAUFIQ KURNIAWAN AKBAR",
        role: "Front-end Developer",
        imageSrc:
            "https://ik.imagekit.io/3s8oi0rad/Members/Taufiq%20Kurniawan%20Akbar.jpg?updatedAt=1732680248010",
    },
    {
        id: 6,
        name: "NAUFAL FAHMI KARTIKA",
        role: "Back-end Developer",
        imageSrc:
            "https://ik.imagekit.io/3s8oi0rad/Members/Naufal%20Fahmi%20Kartika.png?updatedAt=1732680259709",
    },
    {
        id: 7,
        name: "HILHAM YULISTIO",
        role: "Back-end Developer",
        imageSrc: "https://ik.imagekit.io/3s8oi0rad/Members/Hilham%20Yulistio.png?updatedAt=1732680254765",
    },
    {
        id: 8,
        name: "TIFANI AQLICIAN",
        role: "Data Science",
        imageSrc: "https://ik.imagekit.io/3s8oi0rad/Members/Tivany%20Aqlicia.png?updatedAt=1732680260454",
    },
    {
        id: 9,
        name: "ABDILLAH",
        role: "Data Science",
        imageSrc: "https://ik.imagekit.io/3s8oi0rad/Members/Abdillah.jpg?updatedAt=1732680248214",
    },
    {
        id: 10,
        name: "MUHAMMAD FADJAR YULIANTO",
        role: "QA Engineer",
        imageSrc:
            "https://ik.imagekit.io/3s8oi0rad/Members/Muhammad%20Fadjar%20Yulianto.jpg?updatedAt=1732680248192",
    },
];
const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.from(".fade-in", {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".fade-in",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            gsap.from(".zoom-in", {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".zoom-in",
                    start: "top 80%",
                },
            });

            gsap.from(".team-member", {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".team-member",
                    start: "top 90%",
                },
            });
        }, containerRef);

        return () => context.revert();
    }, []);
    return (
        <main ref={containerRef}>
            <div className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px] fade-in">
                <div className="max-w-sm md:max-w-xl text-center lg:text-center">
                    <Typography variant="title">
                        <strong className="text-emerald-700">Tentang</strong> Kami
                    </Typography>
                </div>
                <div className="md:max-w-5xl lg:max-w-7xl p-4 lg:p-0 text-justify lg:text-center hero-description">
                    <Typography variant="p">
                        GreenLify adalah solusi berbasis teknologi yang memanfaatkan
                        kecerdasan buatan (Al) dan visi komputer untuk mendeteksi dan
                        mengklasifikasikan jenis sampah melalui gambar. Hal ini membantu
                        masyarakat mengenali sampah dan mendapatkan rekomendasi pengelolaan
                        yang tepat, seperti daur ulang atau kompos.
                    </Typography>
                </div>
                <LazyLoadImage
                    src={trashImage}
                    alt="trashImage"
                    className="hidden md:block w-full mt-4 px-4 md:px-12 lg:px-24 xl:px-52 zoom-in"
                    effect="blur"
                />
            </div>

            <div
                className="w-full mt-[66px] flex flex-col lg:flex-row justify-around items-center px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0 fade-in">
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

            <div
                className="w-full flex flex-col-reverse lg:flex-row justify-around items-center mt-[33px] px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0 fade-in">
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

                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-16">
                    {partners.map((partner) => (
                        <LazyLoadImage
                            key={partner.id}
                            src={partner.imageSrc}
                            alt={partner.name}
                            className="h-16 w-auto md:h-full lg:h-full"
                            effect="blur"
                        />
                    ))}
                </div>
            </div>

            <div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
                <div className="max-w-3x1 text-center lg:text-center fade-in">
                    <Typography variant="title">
                        <strong className="text-emerald-700">Profile Tim</strong>
                    </Typography>
                </div>
                <div className="max-w-2xl px-4 md:px-0 text-center lg:text-center-full">
                    <Typography variant="p">
                        Kami adalah sekelompok individu yang berdedikasi untuk menciptakan
                        solusi inovatif dalam pengelolaan sampah dan pelestarian lingkungan.
                    </Typography>
                </div>
                <div className="w-full mt-[33px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.id}
                            className={`flex flex-col items-center team-member justify-center space-y-4 ${
                                index === 8 ? "lg:col-start-2" : ""
                            } ${index === 9 ? "lg:col-start-3" : ""}`}
                        >
                            <LazyLoadImage
                                src={member.imageSrc}
                                alt={member.name}
                                className="w-80 h-80 object-cover rounded-lg shadow-md"
                                effect="opacity"
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
