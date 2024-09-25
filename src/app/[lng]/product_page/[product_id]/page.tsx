'use client';
import "./page.css";
// import EditProductItem from "@/src/components/edit_product_item";
import { ProductContext, Product } from "@/src/context/Products";
import useProducts from "@/src/hooks/useProducts";

import { useContext, useState, useEffect } from "react";

// type PageProps = {
//     isEditing: boolean;
//     saveProduct: boolean;
// }

const Page = ({/*{ isEditing, saveProduct }: PageProps*/}) => {
    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const [ saveProduct, setSaveProduct ] = useState<boolean>(false);
    const [ product, setProduct ] = useState<Product>();
    const [ editName, setEditName ] = useState<string>("");
    const [ editPicture, setEditPicture ] = useState<string>("");
    const [ editDescription, setEditDescription ] = useState<string>("");
    const { products } = useContext(ProductContext);
    const { putProducts } = useProducts();

    useEffect(() => {
        const fetchProduct = async () => {
            const url = window.location.href;
            const id = Number(url.split('=').pop());
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.log("error: ", error);
            }
        }
        const handleSaveProduct = async () => {
            if (!saveProduct) {
                return;
            } else {
                if (!editName) {
                    alert("請輸入產品名稱！");
                } else if (!editPicture) {
                    alert("請輸入產品圖片！");
                } else if (!editDescription) {
                    alert("請輸入產品描述！");
                } else {
                    const url = window.location.href;
                    const id = Number(url.split('=').pop());
                    try {
                        await putProducts({
                            id: id,
                            name: editName,
                            picture: editPicture,
                            description: editDescription,
                        });
                        alert("產品修改成功！");
                        location.reload();
                    } catch (error) {
                        alert("產品修改失敗！");
                        console.log("error: ", error);
                    }
                }
            }
        }
        fetchProduct();
        handleSaveProduct();
    }, [editDescription, editName, editPicture, putProducts, saveProduct]);

    const handleEditPicture = () => {
        const newImg = prompt("請輸入新圖片網址");
        if (newImg) {
            setEditPicture(newImg);
        }
    }

    console.log("isEditing in page.tsx: ", isEditing);
    console.log("saveProduct in page.tsx: ", saveProduct);

    return (
        <div className="container">
            <div className="wrapper">
                <div className="content">
                    {!isEditing && <h1 className="title">{product?.name}</h1>}
                    {!isEditing && <img src={product?.picture} alt="productImg" />}
                    {!isEditing && <p>{product?.description}</p>}
                    {isEditing && <input className="title" defaultValue={product?.name} onChange={(e) => setEditName(e.target.value)}/>}
                    {isEditing && <img src={product?.picture} alt="productImg" onClick={() => handleEditPicture()}/>}
                    {isEditing && <textarea defaultValue={product?.description} onChange={(e) => setEditDescription(e.target.value)}/>}
                </div>
            </div>
            <div className="blankBanner" />
        </div>
    )
}

export default Page;