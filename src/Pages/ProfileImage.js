import React, { useState } from 'react';

function ProfileImage({ imageUrl, onImageChange }) {
  const [image, setImage] = useState(imageUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      onImageChange(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <img
        src={image}
        alt="Profile"
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
}

export default ProfileImage;
