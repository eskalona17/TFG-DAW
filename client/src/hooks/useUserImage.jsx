import { useState, useEffect } from 'react';

const useUserImage = (user, width = '100') => {
  const [userImage, setUserImage] = useState("");
  const serverImagePath = import.meta.env.VITE_REACT_APP_API_URL + '/public/profilePic';

  useEffect(() => {
    const getUserImage = () => {
      if (user && user.profilePic && user.profilePic !== '') {
        return `${serverImagePath}/${user.profilePic}`;
      } else {
        let userColors = sessionStorage.getItem('user-colors');
        if (userColors) {
          userColors = JSON.parse(userColors);
        } else {
          userColors = {};
        }
        if (user && !userColors[user._id]) {
          const colors = ["A7DBD8", "90EE90", "FFC0CB", "C4A1FF", "FFDB58"];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          userColors[user._id] = randomColor;
          sessionStorage.setItem('user-colors', JSON.stringify(userColors));
        }

        const randomColor = user ? userColors[user._id] : null;
        const initial = user && user.name ? user.name.charAt(0) : "";

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = width;
        const context = canvas.getContext('2d');

        context.fillStyle = `#${randomColor}`;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = `${width / 2}px Inter`;
        context.fillStyle = '#FFFFFF';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(initial, canvas.width / 2, canvas.height / 2);

        return canvas.toDataURL();
      }
    };
    setUserImage(getUserImage());
  }, [serverImagePath, user, width]);

  return { userImage, setUserImage };
};

export default useUserImage;