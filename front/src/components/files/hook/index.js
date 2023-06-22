import { useRef, useState, useEffect } from "react";

const GeneratePicture = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [tempImg, setTempImg] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (file) {
      fileToDataUri(file).then((dataUri) => {
        setImage(dataUri);
      });
    }
  }, [file]);

  useEffect(() => {
    if (tempImg) {
      getBase64FromUrl(tempImg).then((data) => setImage(data));
    }
  }, [tempImg]);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };
  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const deleteFile = () => {
    setFile(null);
    setImage(null);
    setTempImg(null);
  };

  return [
    image,
    inputRef,
    handleUploadClick,
    handleFileChange,
    deleteFile,
    tempImg,
    setTempImg,
  ];
};

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export default GeneratePicture;
