import React, { useCallback, useState } from 'react';
import { Modal, Button, Typography, IconButton, LinearProgress } from '@mui/material';
import { Grid2 } from '@mui/material'; 
import '../styles/styles.css';
import uploadimg from './uploadimg.png'

const DragAndDrop = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);
  const [shirtPhoto, setShirtPhoto] = useState(null);
  const [shirtPhotoPreview, setShirtPhotoPreview] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDrop = useCallback((event, setFile, setPreview) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0])); 
    }
  }, []);

  const handleFileSelect = (event, setFile, setPreview) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const removeFile = (setFile, setPreview) => {
    setFile(null);
    setPreview(null);
  };

  const uploadFiles = () => {
    if (userPhoto && shirtPhoto) {
      const formData = new FormData();
      formData.append('userPhoto', userPhoto);
      formData.append('shirtPhoto', shirtPhoto);

      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        // Dummy image response
        setGeneratedImage(data.image); // Placeholder image
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '100px' }}>
          <Typography >
              Wondering how you'd look in this?<br /> We're making it happen!
          </Typography>
          <span style={{ 
            fontSize: '48px',
            animation: 'fly 4s linear infinite',
            display: 'grid',
            justifyItems: 'center',
            marginTop: '60px'
          }}
          >
            🐦
          </span>
          <LinearProgress style={{ marginTop: '0px' }} />

          <style>
            {`
              @keyframes fly {
                0% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0); }
              }
            `}
          </style>
        </div>
      ): (
        <>
        {generatedImage ? (
          <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
            <Typography variant="h6">Boom! This looks awesome...</Typography>
            <IconButton
              size="small"
              style={{ position: 'absolute' }}
              onClick={() => removeFile(setGeneratedImage, setGeneratedImage)}
            >
              <span style={{ fontSize: '34px', color: 'black' }}>&times;</span>
            </IconButton>
            <img
              src={generatedImage}
              alt="Generated Try-On"
              onClick={handleImageClick}
              style={{ width: '100%', height: 'auto', maxWidth: '100%', objectFit: 'contain' }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setGeneratedImage(null); // Clears the generated image
                setUserPhoto(null);      // Clears user photo if needed
                setUserPhotoPreview(null);
                setShirtPhoto(null);     // Clears shirt photo if needed
                setShirtPhotoPreview(null);
              }}
              sx={{
                marginTop: '10px',
                background: '#8a2be2',
                color: 'white',
                '&:hover': {
                  background: '#8a2be2',
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.3s, background 0.3s',
              }}
            >
              Generate More
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (generatedImage) {
                  const link = document.createElement('a');
                  link.href = generatedImage; // Image URL (you might need to update this if `generatedImage` is not the URL directly)
                  link.download = 'try_on_image.png'; // Define the name of the file to be downloaded
                  link.click();
                } else {
                  alert('No generated image available to download.');
                }
              }}
              sx={{
                marginTop: '10px',
                background: '#8a2be2',
                color: 'white',
                '&:hover': {
                  background: '#8a2be2',
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.3s, background 0.3s',
              }}
            >
              Download
            </Button>
          </div>
        ) : (
          <Grid2 container spacing={2} justifyContent="center" alignItems="center">
            <Grid2 style={{ marginRight: '28px' }} item xs={5}>
              <div
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  marginTop: '10px',
                  width: '104%', 
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '2px dashed #6d1cb7',
                  borderRadius: '10px', 
                }}
                onDragOver={(e) => e.preventDefault()} // Prevent default behavior
                onDrop={(e) => handleDrop(e, setUserPhoto, setUserPhotoPreview)} // Handle drop event
              >
                {userPhotoPreview ? (
                  <>
                    <IconButton
                      size="small"
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 0,
                      }}
                      onClick={() => removeFile(setUserPhoto, setUserPhotoPreview)}
                    >
                      <span style={{ fontSize: '24px', color: 'black' }}>&times;</span>
                    </IconButton>
                    <img
                      src={userPhotoPreview}
                      alt="User Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={uploadimg}
                      alt="upload-photo"
                      onClick={() => document.getElementById('userPhotoInput').click()}
                      style={{ width: '20%', height: 'auto', maxWidth: '100%', objectFit: 'contain' }}
                    />
                    <Typography>Drag and drop your photo here or Broswe</Typography>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      id="userPhotoInput"
                      onChange={(e) => handleFileSelect(e, setUserPhoto, setUserPhotoPreview)}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => document.getElementById('userPhotoInput').click()}
                      sx={{
                        marginTop: '10px',
                        background: '#8a2be2',
                        color: 'white',
                        '&:hover': {
                          background: '#8a2be2',
                          transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.3s, background 0.3s',
                      }}
                    >
                      Upload Photo
                    </Button>
                  </>
                )}
              </div>
            </Grid2>

            {/* Shirt Photo Upload */}
            <Grid2 style={{ marginRight: '22px' }} item xs={5}>
              <div
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  marginTop: '10px',
                  width: '100%',
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '2px dashed #6d1cb7',
                  borderRadius: '10px', 
                }}
                onDragOver={(e) => e.preventDefault()} // Prevent default behavior
                onDrop={(e) => handleDrop(e, setShirtPhoto, setShirtPhotoPreview)} // Handle drop event
              >
                {shirtPhotoPreview ? (
                  <>
                    <IconButton
                      size="small"
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 10,
                      }}
                      onClick={() => removeFile(setShirtPhoto, setShirtPhotoPreview)}
                    >
                      <span style={{ fontSize: '24px', color: 'black' }}>&times;</span>
                    </IconButton>
                    <img
                      src={shirtPhotoPreview}
                      alt="Shirt Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={uploadimg}
                      alt="clothe-photo"
                      onClick={() => document.getElementById('shirtPhotoInput').click()}
                      style={{ width: '20%', height: 'auto', maxWidth: '100%', objectFit: 'contain' }}
                    />
                    <Typography>Drag and drop clothe photo here or Browse</Typography>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      id="shirtPhotoInput"
                      onChange={(e) => handleFileSelect(e, setShirtPhoto, setShirtPhotoPreview)}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => document.getElementById('shirtPhotoInput').click()}
                      sx={{
                        marginTop: '10px',
                        background: '#8a2be2',
                        color: 'white',
                        '&:hover': {
                          background: '#8a2be2',
                          transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.3s, background 0.3s',
                      }}
                    >
                      Upload Clothe
                    </Button>
                  </>
                )}
              </div>
            </Grid2>
          </Grid2>
        )}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div>
          <img
            src={generatedImage}
            alt="Generated Try-On"
            style={{ width: '100%', height: 'auto', maxWidth: '100%', objectFit: 'contain' }}
          />
          <IconButton
              size="small"
              style={{ position: 'absolute' }}
              onClick={handleCloseModal}
            >
              <span style={{ fontSize: '34px', color: 'black' }}>&times;</span>
            </IconButton>
        </div>
      </Modal>
        </>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {!loading && userPhoto && shirtPhoto && !generatedImage && (
          <Button
            variant="contained"
            onClick={uploadFiles}
            sx={{
              background: '#8a2be2',
              color: 'white',
              '&:hover': {
                background: '#8a2be2',
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.3s, background 0.3s',
            }}
          >
            Generate!
          </Button>
        )}
      </div>
    </>
  );
};

export default DragAndDrop;
