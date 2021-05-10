import React, { useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Checkmark from './Checkmark';

const IdUpload = ({ setHandle, setInfo, info }) => {
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState('');
    const fileInput = useRef(null);

    //File size condition
    const checkFileSize = (event) => {
        let files = event.target.files[0];
        let size = 2000000; //2Mb File Limit
        let err = '';
        if (files == null) {
            return false;
        }
        if (files.size > size) {
            err += 'File is too large, please pick a smaller file\n';
        }
        if (err !== '') {
            event.target.value = null;
            setErrorMessage(err);
            return false;
        }
        return true;
    };

    //Checks the file size and sets url preview
    const handleIdUpload = (event) => {
        if (checkFileSize(event)) {
            setErrorMessage('');
            return true;
        }
        return false;
    };

    // This handler is activated when the button is clicked. After calling handleUploadImage() it posts the image to the backend database for temporary storage.
    const handleIdSubmit = async (event) => {
        event.preventDefault();

        if (handleIdUpload(event)) {
            const formData = new FormData();
            formData.append('FileToUpload', fileInput.current.files[0]);
            const options = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch(
                'https://localhost:44397/api/files',
                options
            )
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setHandle('fileName', data.filename);
                    setInfo({
                        ...info,
                        idName: data.filename,
                        file: URL.createObjectURL(event.target.files[0]),
                    });
                });
        }
    };

    return (
        <div className={classes.field}>
            {info.idName && (
                <p>
                    <strong>Image file name: </strong> {info.idName}
                </p>
            )}
            <Button
                // onClick={() =>
                //     setInfo({
                //         ...info,
                //         idDocumentUploaded: true,
                //     })
                // }
                variant="contained"
                component="label"
                className={classes.uploadButton}
                onChange={handleIdSubmit}
            >
                Upload ID Document
                <input
                    encType="multipart/form-data"
                    accept="image/* "
                    type="file"
                    ref={fileInput}
                    style={{ display: 'none' }}
                />
            </Button>
            {/* <Checkmark value={inputValidationValue.idDocumentUploaded} /> */}
            {errorMessage && (
                <p className={classes.errorMessage}>{errorMessage}</p>
            )}
        </div>
    );
};

export default IdUpload;
const useStyles = makeStyles((theme) => ({
    field: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    uploadButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%',
    },
    uploadButton: {
        backgroundColor: '#df3a48',
        color: '#FFF',
        width: '85%',
        height: '40px',
        borderRadius: '10px',
        fontSize: '12px',
    },
    errorMessage: {
        color: '#df3a48',
    },
}));