import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { TFunction } from 'i18next';

import { ProductContext, Product } from '../../context/Products';
import useProducts from '../../hooks/useProducts';
import { useSession } from 'next-auth/react';

type SidePanelProps = {
    t: ((key: string) => string) & TFunction<"translation", undefined>;
    lng: string;
}

export const SidePanelBase = ({ t, lng }: SidePanelProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { products } = useContext(ProductContext);
    const { getProducts } = useProducts();
    const [ productList, setProductList ] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProductList = async () => {
            const productListInit = await getProducts();
            const productListJSON: Product[] = productListInit["products"];
            setProductList(productListJSON);
        }
        fetchProductList();
    }, [getProducts]);

    return (
        <div className="productPanel">
            <p onClick={() => router.push("/product_page")}>{t("product-introduction")}</p>
            {session ? (
                productList.map((product) => (
                    <p
                        className="product"
                        key={product.id}
                        onClick={() => router.push(`/product_page/id=${product.id}`)}>
                        {product.name}
                    </p>
            ))) : (
                productList.filter((product) => (product.language.match(lng))).map((product) => (
                    <p
                        className="product"
                        key={product.id}
                        onClick={() => router.push(`/product_page/id=${product.id}`)}>
                        {product.name}
                    </p>
            )))}
        </div>
    )
};