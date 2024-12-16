import {Typography} from "@/components/ui/Typography";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableHead, TableHeader, TableCell, TableRow} from "@/components/ui/table";
import {getMembers} from "@/services/member";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {differenceInDays} from 'date-fns';
import Img_1 from "@/assets/activity_comunity/1.png";
import Img_2 from "@/assets/activity_comunity/2.png";
import Img_3 from "@/assets/activity_comunity/3.png";
import Img_4 from "@/assets/activity_comunity/4.png";
import Img_5 from "@/assets/activity_comunity/5.png";
import Img_6 from "@/assets/activity_comunity/6.png";

const activityCommunityData = [
    {
        id: 1,
        img: Img_1,
    },
    {
        id: 2,
        img: Img_2,
    },
    {
        id: 3,
        img: Img_3,
    },
    {
        id: 4,
        img: Img_4,
    },
    {
        id: 5,
        img: Img_5,
    },
    {
        id: 6,
        img: Img_6,
    }
];

export default function Members() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMembers();
                setMembers(response);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMembers().catch(console.error);
    }, []);

    return (
        <>
            <div className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
                <div className="max-w-sm md:max-w-xl text-center lg:text-center">
                    <Typography variant="title">
                        Anggota<strong className="text-emerald-700"> Kami</strong>
                    </Typography>
                </div>
                <div className="md:max-w-5xl lg:max-w-6xl p-4 lg:p-0 text-justify lg:text-center hero-description">
                    <Typography variant="p">
                        "Kenali komunitas inspiratif yang telah menjadi bagian penting dari gerakan pengelolaan sampah
                        yang lebih baik. Mereka adalah wujud nyata kepedulian dan aksi kolektif dalam menciptakan
                        lingkungan yang bersih dan lestari. Berikan apresiasi atas kontribusi mereka, dan mari
                        bersama-sama bergabung dalam langkah nyata untuk membangun masa depan yang lebih hijau dan
                        berkelanjutan"
                    </Typography>
                </div>
                <div className="w-full max-w-6xl overflow-x-auto">
                    <Table className="mx-4 md:mx-0">
                        <TableHeader>
                            <TableRow className="bg-emerald-700 text-white">
                                <TableHead className="text-center">No</TableHead>
                                <TableHead className="text-center">RT/RW</TableHead>
                                <TableHead className="text-center">Desa</TableHead>
                                <TableHead className="text-center">Lama Bergabung</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {members.map((wilayah, index) => (
                                <TableRow
                                    key={index}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-background"
                                            : "bg-emerald-50"
                                    }`}
                                >
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="text-center">{wilayah.rt}/{wilayah.rw}</TableCell>
                                    <TableCell className="text-center">{wilayah.desa}</TableCell>
                                    <TableCell className="text-center">
                                        {differenceInDays(new Date(), new Date(wilayah.created_at)) > 365
                                            ? `${Math.floor(differenceInDays(new Date(), new Date(wilayah.created_at)) / 365)} tahun`
                                            : differenceInDays(new Date(), new Date(wilayah.created_at)) > 30
                                                ? `${Math.floor(differenceInDays(new Date(), new Date(wilayah.created_at)) / 30)} bulan`
                                                : `${differenceInDays(new Date(), new Date(wilayah.created_at))} hari`}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="w-full mt-[66px] min-h-screen flex flex-col items-center">
                <div className="md:max-w-xl lg:max-w-7xl p-4 lg:p-0 text-justify lg:text-center">
                    <div className="flex flex-col items-center gap-[33px] mb-[33px] w-full">
                        <Typography variant="h1">Kegiatan Komunitas</Typography>
                        <Typography variant="p" className="max-w-4xl">
                            Berikut adalah beberapa kegiatan yang telah dilakukan oleh komunitas kami. Kami bersama-sama
                            bekerja untuk mencapai tujuan dan membawa perubahan positif. Mari bergabung dan jadi bagian
                            dari perjalanan ini!
                        </Typography>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
                        {activityCommunityData.map((activity, index) => (
                            <LazyLoadImage
                                key={activity.id}
                                src={activity.img}
                                alt={`activity-${index}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}