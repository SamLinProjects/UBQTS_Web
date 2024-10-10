import "./NewAdsDialog.css";
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Input } from '@mui/material';

import useAds from "@/src/hooks/useAds";

type NewAdsDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function NewAdsDialog({ open, onClose }: NewAdsDialogProps) {
    const [newImg, setNewImg] = useState<string>("");
    const [image, setImage] = useState(null);
    const [imgLng, setImgLng] = useState<string>("");
    const { postAds } = useAds();

    const handleFileChange = (e: any) => {
        setImage(e.target.files[0]);
    }

    const handleAddAds = () => {
        if (newImg === ""/* image === null */) {
            alert("請輸入圖片網址");
            return;
        } else if (imgLng === "") {
            alert("請輸入語言");
            return;
        } else {
            const formData = new FormData();
            if (image) formData.append("file", image);

            try {
                postAds({ picture: newImg, language: imgLng });
                alert("新增廣告成功！");
                onClose();
                location.reload();
            } catch (error) {
                alert("新增廣告失敗！");
                console.log("error: ", error);
            }
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <div>
                <DialogTitle>新增廣告</DialogTitle>
                <div>
                    <DialogContent>請輸入圖片網址</DialogContent>
                    <Input
                        type="text"
                        value={newImg}
                        onChange={(e) => setNewImg(e.target.value)}
                    />
                    <Input
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="langContainer">
                    <div className="choice">
                        <input type="checkbox" value="en" id="enAd" checked={imgLng === "en"} onChange={(e) => setImgLng(e.target.value)} />
                        <label htmlFor="enAd">英文</label>
                    </div>
                    <div className="choice">
                        <input type="checkbox" value="zh-tw" id="twAd" checked={imgLng === "zh-tw"} onChange={(e) => setImgLng(e.target.value)} />
                        <label htmlFor="twAd">繁體中文</label>
                    </div>
                    <div className="choice">
                        <input type="checkbox" value="zh-cn" id="cnAd" checked={imgLng === "zh-cn"} onChange={(e) => setImgLng(e.target.value)} />
                        <label htmlFor="cnAd">簡體中文</label>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={onClose}>取消</Button>
                    <Button onClick={() => handleAddAds()}>新增廣告</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}