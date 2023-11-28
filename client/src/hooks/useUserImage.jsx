import { useState, useEffect } from 'react';

const useUserImage = (user, width = '100') => {
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const getUserImage = () => {
      if (user && user.profilePic) {
        return user.profilePic;
      } else {
        const initial = user ? user.name.charAt(0) : "";
        let randomColor = localStorage.getItem(`user-color_${user._id}`);
        if (!randomColor) {
          const colors = ["A7DBD8", "90EE90", "FFC0CB", "C4A1FF", "FFDB58"];
          randomColor = colors[Math.floor(Math.random() * colors.length)];
          localStorage.setItem(`user-color_${user._id}`, randomColor);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = width;
        const context = canvas.getContext('2d');

        context.fillStyle = `#${randomColor}`;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#FFFFFF';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = `${width / 2}px Inter`;
        context.fillText(initial, canvas.width / 2, canvas.height / 2);

        return canvas.toDataURL();
      }
    };
    setUserImage(getUserImage());
  }, [user, width]);

  return { userImage };
};

export default useUserImage;