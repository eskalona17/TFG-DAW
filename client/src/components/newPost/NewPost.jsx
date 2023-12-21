import { useContext, useState } from "react";
import useUserImage from "../../hooks/useUserImage";
import Styles from "./newPost.module.css";
import { VscVmRunning, VscLocation, VscBookmark } from "react-icons/vsc";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Button from "../button/Button";
import { useForm } from "react-hook-form";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL



const NewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
  // const [newPostContent, setNewPostContent] = useState("");
  const [imageData, setImageData] = useState({
    selectedImage: null,
    imagePreview: null,
  });

  const { selectedImage } = imageData;

  const {
    newPost,
    newPost_container,
    user_img,
    multimedia_Container,
    multimedia_button,
    previewStyle,
  } = Styles;


  const {
    handleSubmit,
    reset,
    register
  } = useForm()


  const handleMultimediaClick = (e) => {
    e.preventDefault()
    const input = document.createElement("input");
    input.type = "file";
    input.newPost = "newPost";
    input.onchange = (e) => {
      const file = e.target.files[0];

      setImageData({
        selectedImage: file,
        imagePreview: URL.createObjectURL(file), // Crear la URL de la vista previa
      });
    };

    input.click();
  };

  const handleUbicacionClick = () => {
    console.log("boton Ubicacion");
  };

  const handleEtiquetaClick = () => {
    console.log("boton Etiqueta");
  };

  // const onSubmit = handleSubmit(async (data) => {
  //   console.log(data);
  //   try {
  //     const commonData = {
  //       author: currentUser._id,
  //       content: data.content,
  //     }
  //     console.log(commonData);
  //     let response = null
  //     if (selectedImage) {
  //       console.log(selectedImage);
  //       const formDataWithImage = new FormData()
  //       Object.entries(commonData).forEach(([key, value]) => formDataWithImage.append(key, value))
  //       formDataWithImage.append('media', selectedImage)

  //       console.log(formDataWithImage);

  //       response = await axios.post(apiUrl + '/api/posts/create', formDataWithImage, {
  //         withCredentials: true,
  //       })
  //     } else {
  //       response = await axios.post(apiUrl + "/api/posts/create", {
  //         ...commonData,
  //       }, {
  //         withCredentials: true,
  //       })
  //     }


  //     if (response.status === 201) {
  //       console.log("post creado con exito")
  //       reset()
  //     } else {
  //       alert("Error al crear post")
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message)
  //     alert("Error al crear post")
  //   }
  //   reset()
  // })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const commonData = {
        author: currentUser._id,
        content: data.content,
      };
  
      let postData = { ...commonData };
      let response = null
      console.log(postData);
  
      if (selectedImage) {
        console.log(selectedImage.name);
        // Agrega el campo de imagen directamente al objeto postData
        postData.media = selectedImage;
        
  
        response = await axios.post(
          apiUrl + '/api/posts/create',
          postData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido correcto
            },
          }
        );
      } else {
        response = await axios.post(
          apiUrl + '/api/posts/create',
          postData,
          {
            withCredentials: true,
          }
        );
      }

  
      if (response.status === 201) {
        console.log('Post creado con éxito');
        reset();
      } else {
        alert('Error al crear el post');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error al crear el post');
    }
    reset();
  });
  

  return (
    <form onSubmit={onSubmit}>
      <div className={newPost}>
        <div className={newPost_container}>
          <img src={userImage} alt="" className={user_img} />
          <input
            type="text"
            name="content"
            placeholder="¿Qué estás pensando?"
            {...register("content", {
              required: {
                value: true,
                message: "El contenido es requerido",
              }
            })}
          />
        </div>
        <div className={multimedia_Container}>
          <button className={multimedia_button} onClick={handleMultimediaClick}>
            <VscVmRunning />Multimedia
          </button>
          <button className={multimedia_button} onClick={handleUbicacionClick}>
            <VscLocation />Ubicación
          </button>
          <button className={multimedia_button} onClick={handleEtiquetaClick}>
            <VscBookmark />Etiqueta
          </button>
        </div>
        {imageData.selectedImage && (
          <div className={previewStyle}>
            <img src={imageData.imagePreview} alt="Preview" />
          </div>
        )}
        <Button text="enviar" type="submit"
          variant="primary"></Button>
      </div>
    </form>
  );
};

export default NewPost;
