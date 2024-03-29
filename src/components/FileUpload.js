import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const FileUpload = ({ setHandle, setInfo, info }) => {
    require('dotenv').config();
    const BASE = process.env.REACT_APP_BASE_URL + 'api/';

    const classes = useStyles();

    const [errorMessage, setErrorMessage] = useState('');
    const fileInput = useRef(null);

    // Checks the file size and sets the image url preview.
    const handleUploadImage = (event) => {
        if (checkFileSize(event)) {
            setErrorMessage('');
            return true;
        }
        return false;
    };

    const checkFileSize = (event) => {
        let files = event.target.files[0];
        let size = 2000000; //2Mb File Limit
        let err = '';
        if (files == null) {
            return false;
        }
        if (files.size > size) {
            err +=
                files.name +
                ' File should be less than 2Mb, please pick a smaller file\n';
        }
        if (err !== '') {
            event.target.value = null;
            setErrorMessage(err);
            return false;
        }
        return true;
    };
    // This handler is activated when the button is clicked. After calling handleUploadImage() it posts the image to the backend database for temporary storage.
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleUploadImage(event)) {
            const formData = new FormData();
            formData.append('FileToUpload', fileInput.current.files[0]);
            const options = {
                method: 'POST',
                body: formData,
            };
            const response = await fetch(`${BASE}files`, options)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setHandle('fileName', data.filename);
                    setInfo({
                        ...info,
                        fileName: data.filename,
                        file: URL.createObjectURL(event.target.files[0]),
                    });
                });
        }
    };
    return (
        <div>
            <form>
                <p>Select File to Upload </p>
                <Button
                    variant="contained"
                    component="label"
                    // color="primary"
                    className={classes.browseButton}
                    onChange={handleSubmit}
                >
                    Choose File
                    <input
                        encType="multipart/form-data"
                        accept="image/* "
                        type="file"
                        ref={fileInput}
                        style={{ display: 'none' }}
                    />
                </Button>
                {info.fileName && <p>Currently using {info.fileName}</p>}
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </form>
        </div>
    );
};
export default FileUpload;
const useStyles = makeStyles((theme) => ({
    browseButton: {
        backgroundColor: '#DF3A48',
        color: '#FFF',
        width: '20%',
        height: '30px',
        fontWeight: 'bold',
        fontSize: '10px',
        borderRadius: '10px',
        border: 'none',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            margin: '2% auto 5% auto',
            width: '40%',
            fontSize: '10px',
        },
    },
}));
