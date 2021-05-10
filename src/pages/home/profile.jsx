import { useState } from "react";

const ProfilePage = () => {
  const [images, setImages] = useState(null);

  //   const onFileChange = (e) => {
  //     const files = e.target.files;
  //     if (files.length) {
  //       const file = files[0];
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setImages(file);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       setImages(null);
  //     }
  //   };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setImages(fileUrl);
  };

  return (
    <>
      {/* <input
        type="file"
        onChange={(e) => {
          onFileChange(e);
        }}
      /> */}
      {/* {images ? (
        <div>
          <img src={images} />
        </div>
      ) : null} */}
      <div>Rinka</div>
      <div>
        <h2>プロフィール</h2>
        <p>自己紹介</p>
      </div>
      <h1>Latest articles</h1>
      <h1>いいねした投稿</h1>
    </>
  );
};

export default ProfilePage;
