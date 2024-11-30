'use client';
import "./page.css";
import { AdContext, Ad } from "@/src/context/Ads";
import { ProductContext, Product } from "@/src/context/Products";
import useAds from "@/src/hooks/useAds";
import useProducts from "@/src/hooks/useProducts";
// import BootstrapCarousel from "../components/bootstrap_carousel";
import CarouselItem from "@/src/components/carousel_item";
import ProductItem from "@/src/components/product_item";
import NewAdsDialog from "@/src/components/NewAdsDialog";

import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/src/i18n/client";
import { useSession } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import addIcon from "@/public/img/addIcon.png";

type HomeProps = { params: { lng: string } };

export default function Home({ params: { lng } }: HomeProps) {
    const router = useRouter();
    const { t } = useTranslation(lng, "home");
    const { data: session } = useSession();

    const { getAds } = useAds();
    const { getProducts } = useProducts();
    const { ads } = useContext(AdContext);
    const { products } = useContext(ProductContext);
    const [adsList, setAdsList] = useState<Ad[]>([]);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [showNewAdsDialog, setShowNewAdsDialog] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchAdsList = async () => {
            const adsListInit = await getAds();
            const adsListJSON: Ad[] = adsListInit["ads"];
            setAdsList(adsListJSON);
        }
        const fetchProductsList = async () => {
            const productsListInit = await getProducts();
            const productsListJSON: Product[] = productsListInit["products"];
            setProductsList(productsListJSON);
        }
        fetchAdsList();
        fetchProductsList();
    }, [getAds, getProducts]);

    const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
        setIndex(selectedIndex);
    };

    // const [ image, setImage ] = useState<File | null>(null);
    // const testApi = () => {
    //     try {
    //         if (image != null)  {
    //             postAds({ picture: image, language: "en" });
    //             alert("upload success!");
    //             router.refresh();
    //         }
    //     } catch(error) {
    //         alert("error occurred!");
    //         console.log("error: ", error);
    //     }
    // }

    return (
        <div className="container prevent-select">
            {/* <BootstrapCarousel /> */}

            <Carousel activeIndex={index} onSelect={handleSelect}>
                {session?.user.role === "admin" ? (
                    adsList.map((item) => (
                        <Carousel.Item key={item.id} interval={4000}>
                            <img src={item.picture} alt="slides" width={"100%"} style={{ objectFit: "cover", height: "50vw", maxHeight: "90vh" }} />
                            {/* <Carousel.Caption /> */}
                        </Carousel.Item>
                    ))) : (
                    adsList.filter((item) => (item.language.match(lng))).map((item) => (
                        <Carousel.Item key={item.id} interval={4000}>
                            <img src={item.picture} alt="slides" width={"100%"} style={{ objectFit: "cover", height: "50vw", maxHeight: "90vh" }} />
                            {/* <Carousel.Caption /> */}
                        </Carousel.Item>
                    )))}
            </Carousel>

            <div className="blankBanner" />
            {/* session?.user.role === "admin" && */ <div className="editCarousel">
                {adsList.map((ads) => (
                    <React.Fragment key={ads.id}>
                        <CarouselItem id={ads.id} picture={ads.picture} />
                    </React.Fragment>
                ))}
                <div className="addCarousel" onClick={() => setShowNewAdsDialog(true)}>
                    <img src={addIcon.src} alt="addCarousel" />
                </div>
            </div>}

            <div className="blankBanner" />
            <iframe
                width="560"
                height="315"
                loading="lazy"
                src="https://www.youtube.com/embed/iFYTCgEWPdk?si=vhBqX-pQkcGL5atx&amp;clip=UgkxUMnjTpA-Oe4Vxj_K7iEgZUxRyJcc43AT&amp;clipt=ELiUARiA9AM&amp;loop=1&amp;autoplay=1&amp;mute=1"
                title="YouTube video player"
                style={{ border: 'none', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            </iframe>

            <div className="blankBanner" />
            <div className="blankBanner" />

            <div className="content origin">
                <h1>{t("company-introduction-title")}</h1>

                {/* <div className="flex justify-between">
                    <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}/>
                    <button className="w-44 border bg-gray-50 rounded-md" onClick={() => testApi()}>upload</button>
                </div> */}

                <div className="imgWithText">
                    <img src="https://picsum.photos/400?random=4" alt="companyIntro" />
                    <div>
                        <p>{t("company-introduction-content_1")}</p>
                        <p>{t("company-introduction-content_2")}</p>
                        <p>{t("company-introduction-content_3")}</p>
                        <p>{t("company-introduction-content_4")}</p>
                        <p>{t("company-introduction-content_5")}</p>
                        <p>
                            {t("company-introduction-content_6")}<br />
                            {t("company-introduction-content_7")}<br />
                            {t("company-introduction-content_8")}<br />
                            {t("company-introduction-content_9")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="blankBanner" />

            <div className="content">
                <h1>{t("product-introduction-title")}</h1>
                <div className="productTable">
                    {session?.user.role === "admin" ? (
                        productsList.map((product) => (
                            <React.Fragment key={product.id}>
                                <ProductItem id={product.id} picture={product.picture} name={product.name} lng={lng} />
                            </React.Fragment>
                        ))) : (
                        productsList.filter((product) => (product.language.match(lng))).map((product) => (
                            <React.Fragment key={product.id}>
                                <ProductItem id={product.id} picture={product.picture} name={product.name} lng={lng} />
                            </React.Fragment>
                        )))}
                    {/* session?.user.role === "admin" && */(
                        <a href="/new_product">
                            <div className="addProduct">
                                <img src={addIcon.src} alt="addProduct" onClick={() => { router.push(`${lng}/new_product`) }} />
                            </div>
                        </a>
                    )}
                </div>
            </div>

            <div className="blankBanner" />
            <div className="blankBanner" />

            <NewAdsDialog open={showNewAdsDialog} onClose={() => setShowNewAdsDialog(false)} />
        </div >
    );
}