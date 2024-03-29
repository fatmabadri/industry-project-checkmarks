import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { checkmarksTheme } from '../../../styles/Themes';
import Alert from '@material-ui/lab/Alert';
import FileUpload from '../../FileUpload';

const LogoForm = ({ info, setInfo }) => {
    const classes = useStyles();
    const [handle, setHandle] = useState('');

    return (
        <div className={classes.logoCard} fullwidth>
            <div>
                <p style={{ color: '#DF3A48' }}>Select a file to upload</p>
                <h5 style={{ color: '#DF3A48' }}>Preview:</h5>
                <img className={classes.previewImage} src={info.file} />
                <FileUpload
                    setHandle={setHandle}
                    info={info}
                    setInfo={setInfo}
                />
            </div>
            <Alert severity="info" className={classes.alert}>
                Single image file should be under 2MB
            </Alert>
            <Alert severity="info" className={classes.alert}>
                If you wish to use more than one file, or a larger one, please
                follow up with the confirmation email sent at the end of the
                form.
            </Alert>
        </div>
    );
};

export default LogoForm;
const useStyles = makeStyles((theme) => ({
    alert: {
        backgroundColor: checkmarksTheme.transparentCard,
        color: checkmarksTheme.textActive,
        fontSize: '13px',
        margin: 'auto',
    },
    logoCard: {
        width: '100%',
        margin: 'auto',
        marginBottom: '3%',
    },
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
    previewImage: {
        maxWidth: '200px',
        height: 'auto',
    },
}));
