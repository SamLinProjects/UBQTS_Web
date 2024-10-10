import "./news_item.css";
import useNews from "@/src/hooks/useNews";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type NewsProps = {
    id?: number;
    title: string;
    picture: string;
    description: string;
    date?: Date;
    isAdding: boolean;
    setIsAdding?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewsItem({ id, title, picture, description, date, isAdding, setIsAdding }: NewsProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [EditTitle, setEditTitle] = useState(title);
    const [EditPicture, setEditPicture] = useState(picture);
    const [EditDescription, setEditDescription] = useState(description);
    const [imgLng, setImgLng] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const { postNews, putNews, deleteNews } = useNews();

    useEffect(() => {
        if (isAdding) {
            setIsEditing(true);
        }
    }, [isAdding])

    const handleChangeImg = () => {
        const newImg = prompt("請輸入新圖片網址");
        if (newImg) {
            setEditPicture(newImg);
        }
    }

    const handleSave = () => {
        if (!EditTitle) {
            alert("新聞標題不得為空！");
        } else if (!EditDescription) {
            alert("新聞內容不得為空！");
        } else if (!EditPicture) {
            alert("圖片網址不得為空！");
        } else {
            if (!isAdding && id) {
                try {
                    putNews({
                        id,
                        picture: EditPicture,
                        title: EditTitle,
                        description: EditDescription,
                        // date,
                    });
                    alert("編輯新聞成功！");
                } catch (error) {
                    alert("發生錯誤！");
                    console.log("error: ", error);
                }
            } else {
                try {
                    postNews({
                        title: EditTitle,
                        picture: EditPicture,
                        description: EditDescription,
                        date: new Date(),
                        language: imgLng,
                    });
                    alert("新增新聞成功！");
                } catch (error) {
                    alert("發生錯誤！");
                    console.log("error: ", error);
                }
            }
            setIsEditing(false);
            setIsEditing(false);
            location.reload();
        }
    }

    const handleDelete = () => {
        if (id) {
            try {
                deleteNews(
                    id,
                );
                setIsEditing(false);
                alert("刪除成功");
                location.reload();
            } catch (error) {
                alert("發生錯誤！");
                console.log("error: ", error);
            }
        }
    }

    const handleOnClick = () => {
        if (session) {
            setIsEditing(true);
        } else {
            router.push(`/news/id=${id}`);
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
        if (setIsAdding) {
            setIsAdding(false);
        }
    }

    return (
        <div>
            <div className="newsItem prevent-select" onClick={() => handleOnClick()}>
                <div className="newsImg">
                    {!isEditing && <img src={picture} alt="1" />}
                    {isEditing && <img src={picture} alt="1" className="editNewsImgButton" onClick={() => handleChangeImg()} />}
                </div>
                <div className="newsInfo">
                    {!isEditing && <p className="newsTitle">{title}</p>}
                    {!isEditing && <p className="newsContent">{description}</p>}
                    {isEditing && <input className="newsTitle" defaultValue={title} onChange={(e) => setEditTitle(e.target.value)} />}
                    {isEditing && <textarea className="newsContent" defaultValue={description} onChange={(e) => setEditDescription(e.target.value)} />}
                    {(isAdding || isEditing) &&
                        <div className="langContainer">
                            <div className="choice">
                                <input type="checkbox" value="en" id="enNews" checked={imgLng === "en"} onChange={(e) => { setImgLng(e.target.value) }} />
                                <label htmlFor="enNews">英文</label>
                            </div>
                            <div className="choice">
                                <input type="checkbox" value="zh-tw" id="twNews" checked={imgLng === "zh-tw"} onChange={(e) => setImgLng(e.target.value)} />
                                <label htmlFor="twNews">繁體中文</label>
                            </div>
                            <div className="choice">
                                <input type="checkbox" value="zh-cn" id="cnNews" checked={imgLng === "zh-cn"} onChange={(e) => setImgLng(e.target.value)} />
                                <label htmlFor="cnNews">簡體中文</label>
                            </div>
                        </div>
                    }
                </div>
                {/* <p className="date">{date.getFullYear()}-{date.getMonth()}-{date.getDate()}</p> */}
                <p className="date">{date?.toString()}</p>
            </div >
            <div className="apiButtons">
                {(!isAdding && isEditing) && <button className="deleteButton" onClick={() => handleDelete()}>刪除</button>}
                {isEditing && <button className="saveButton" onClick={() => handleSave()}>儲存</button>}
                {isEditing && <button className="cancelButton" onClick={() => handleCancel()}>取消</button>}
            </div>
        </div>
    );
}