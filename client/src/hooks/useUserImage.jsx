import { useState, useEffect } from 'react';

const useUserImage = (currentUser) => {
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const getUserImage = () => {
      if (currentUser && currentUser.profilePic) {
        return currentUser.profilePic;
      } else {
        const initial = currentUser ? currentUser.name.charAt(0) : "";
        let randomColor = localStorage.getItem(`user-color_${currentUser._id}`);
        if (!randomColor) {
          const colors = ["A7DBD8", "90EE90", "FFC0CB", "C4A1FF", "FFDB58"];
          randomColor = colors[Math.floor(Math.random() * colors.length)];
          localStorage.setItem(`user-color_${currentUser._id}`, randomColor);
          return `https://placehold.co/150/${randomColor}/FFFFFF?text=${initial}`;
        }
        return `https://placehold.co/150/${randomColor}/FFFFFF?text=${initial}`;
      }
    };
    setUserImage(getUserImage());
  }, [currentUser]);

  return { userImage };
};

export default useUserImage;