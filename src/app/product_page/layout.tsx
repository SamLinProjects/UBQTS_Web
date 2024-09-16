'use client';
import "./layout.css";
import { ProductContext } from "@/src/context/Products";
import useProducts from "@/src/hooks/useProducts";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    const router = useRouter();
    const { products } = useContext(ProductContext);
    const { getProducts, deleteProducts } = useProducts();
    const [ productList, setProductList ] = useState<ProductContext[]>([]);
    const [ homePage, setHomePage ] = useState<boolean>(true);
    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const [ saveProduct, setSaveProduct ] = useState<boolean>(false);

    useEffect(() => {
        const fetchProductList = async () => {
            const productListInit = await getProducts();
            const productListJSON: ProductContext[] = productListInit["products"];
            setProductList(productListJSON);
        }
        const checkHomePage = () => {
            if (window.location.pathname === "/product_page") {
                setHomePage(true);
            } else {
                setHomePage(false);
            }
        }
        checkHomePage();
        fetchProductList();
    },[]);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { isEditing, saveProduct });
        }
        return child;
    });

    const deleteProduct = async (id: number) => {
        try {
            await deleteProducts(id);
            alert("產品刪除成功！");
            location.reload();
        } catch (error) {
            alert("產品刪除失敗！");
            console.log("error: ", error);
        }
    }

    // console.log(productList);

    return (
        <div className="container">
            <div className="banner">
                <img src="https://picsum.photos/1700/450" alt="banner" />
            </div>
            <div className="blankBanner" />
            {/* 客戶端頁面 */}
            <div className="wrapper">
                <div className="productPanel">
                    <p onClick={() => {
                        router.push("/product_page");
                        setHomePage(true);
                    }}>產品介紹</p>
                    {productList.map((product) => (
                        <p 
                            className="product" 
                            key={product.id} 
                            onClick={() => {
                                router.push(`/product_page/id=${product.id}`);
                                setHomePage(false);
                            }}>
                            {product.name}
                        </p>
                    ))}
                </div>
                {childrenWithProps}
            </div>
            <div className="blankBanner" />
            {homePage && <a className="prevPage" href="/new_product">新增產品</a>}
            {!homePage && !isEditing && <a className="prevPage" onClick={() => setIsEditing(true)}>編輯產品</a>}
            {!homePage && isEditing && <a className="prevPage" onClick={() => setIsEditing(false)}>取消編輯</a>}
            {!homePage && <a className="prevPage" onClick={() => {
                const url = window.location.href;
                const id = Number(url.split('=').pop());
                deleteProduct(id);
            }}>刪除產品</a>}
            {homePage && <a className="prevPage" href="/#">回上一頁</a>}
            {!homePage && isEditing && <a className="prevPage" onClick={() => setSaveProduct(true)}>儲存編輯</a>}
            {/* 客戶端頁面 */}

            <div className="blankBanner" />
            <div className="blankBanner" />
        </div>
    )
}