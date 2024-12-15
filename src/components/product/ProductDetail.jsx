import React from "react";
import {Button} from "@/components/ui/button";
import {Typography} from "@/components/ui/Typography";
import {Badge} from "@/components/ui/badge";
import {ArrowLeft, Slash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useDateStore from "@/store/useDateStore";

function ProductDetail({product}) {
    const {formatDate} = useDateStore();
    const navigate = useNavigate();

    if (!product) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row items-center w-10/12 mx-auto mt-[99px]">
                <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img
                        src={product.img_file}
                        alt={product.product_name}
                        className="max-w-full h-auto rounded-3xl shadow-lg"
                    />
                </div>
                <div className="w-full md:w-1/2 md:pl-8 flex flex-col">
                    <div className="w-full flex justify-end mb-[33px]">
                        <Button variant='icon' className="bg-emerald-500 hover:bg-emerald-600 shadow-lg"
                                onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-4 w-4 text-background"/>
                        </Button>
                    </div>
                    <Breadcrumb className="my-4 font-normal text-slate-600 overflow-x-auto">
                        <BreadcrumbList className="flex flex-wrap">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash/>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/produk">Produk</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash/>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{product.category_name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <Badge className="h-8 bg-emerald-600 text-white">
                            {product.category_name}
                        </Badge>
                        <Badge variant="outline"
                               className="h-8 bg-background text-emerald-500 border-2 border-emerald-500">
                            {formatDate(product.created_at)}
                        </Badge>
                    </div>
                    <div className="mb-4">
                        <Typography
                            variant="h1"
                            className="mb-2 text-emerald-600 text-4xl md:text-6xl"
                        >
                            {product.product_name}
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <Typography variant="h2" className="mb-2 text-2xl md:text-3xl text-emerald-600">
                            Rp. {product.price}
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <Typography variant="h4" className="mb-2 text-slate-700">
                            Deskripsi:
                        </Typography>
                        <Typography variant="p" className="mb-4 text-justify text-slate-700">
                            {product.description}
                        </Typography>
                    </div>
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full md:w-1/2 shadow-lg"
                        onClick={() => window.open(`https://wa.me/${product.contact}`, '_blank')}
                    >
                        Hubungi
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;