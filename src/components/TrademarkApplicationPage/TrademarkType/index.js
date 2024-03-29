import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { checkmarksTheme } from '../../../styles/Themes';
import { Box, Button, Card, Typography } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import Alert from '@material-ui/lab/Alert';
import DesignCard from '../TrademarkType/DesignCard';
import DetailSelectCard from '../TrademarkType/DetailSelectCard';
import TextSearchCard from '../TrademarkType/TrademarkTypeCard';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkmark from '../../Checkmark';

const TrademarkForm = ({
    navigation,
    step,
    info,
    currentStep,
    setCurrentStep,
    setInfo,
    progressValue,
    validationProgress,
    setDirty,
}) => {
    const classes = useStyles();
    const history = useHistory();
    //selection of all the other trademark type
    const otherTypesSelection = [
        'Color',
        'Position',
        'Hologram',
        'Motion',
        'Mode of packaging goods',
        'Three dimensional',
        'Sound',
        'Taste',
        'Scent',
        'Texture',
    ];

    const nextStep = () => {
        setCurrentStep(currentStep + 1); // assign currentStep to next step
        navigation.next();
    };

    setDirty();

    return (
        <Card className={classes.outerCard}>
            {/* <h1 className={classes.title}>Trademark Type</h1> */}
            <div className={classes.outerText}>
                <Typography className={classes.trademarkMessage}>
                    Please{' '}
                    <span style={{ color: '#DF3A48' }}>
                        <strong>select all </strong>{' '}
                    </span>
                    that apply, and provide additional information as you can:
                </Typography>
            </div>
            {/* ======================================== */}
            {/* Text Search Form */}
            {/* ======================================== */}
            <FormControlLabel
                control={<Checkbox checked={info.isText} />}
                label="Standard Characters"
                value="standardCharacter"
                onChange={(e) =>
                    setInfo({
                        ...info,
                        isText: !info.isText,
                        characterText: '',
                    })
                }
            />
            {info.isText && <TextSearchCard info={info} setInfo={setInfo} />}
            {/* ======================================== */}
            {/* Logo card */}
            {/* ======================================== */}
            <FormControlLabel
                control={<Checkbox checked={info.isLogo} />}
                label="Design/Logo"
                onChange={(e) =>
                    setInfo({
                        ...info,
                        isLogo: !info.isLogo,
                        fileName: '',
                        file: '',
                    })
                }
            />
            {info.isLogo && <DesignCard info={info} setInfo={setInfo} />}
            {/* ======================================== */}
            {/* detail selection card */}
            {/* ======================================== */}
            <FormControlLabel
                control={<Checkbox checked={info.isOther} />}
                label="Others "
                onChange={(e) =>
                    setInfo({
                        ...info,
                        isOther: !info.isOther,
                        otherTypes: [],
                    })
                }
            />
            {info.isOther && (
                <div>
                    <p style={{ fontWeight: 'bold' }}>Select all that apply</p>
                    <p style={{ color: '#DF3A48', fontSize: 12 }}>
                        For below selections,{' '}
                        <strong>Contact with a lawyer</strong> is required to
                        process the application.
                    </p>
                </div>
            )}
            {/* <div className={classes.detailSelectCardContainer}> */}
            {/* map other Types Selection */}
            {info.isOther && (
                <Box className={classes.detailSelectCardContainer}>
                    {otherTypesSelection.map((otherType, index) => (
                        <DetailSelectCard
                            otherType={otherType}
                            info={info}
                            setInfo={setInfo}
                            index={index}
                            key={index}
                        />
                    ))}
                </Box>
            )}
            {info.otherTypes.length > 0 && (
                // <Card className={classes.alertContainer}>
                <Alert
                    severity="error"
                    variant="outlined"
                    className={classes.alert}
                    action={
                        <Button
                            className={classes.bookApppintmentButton}
                            target="blank"
                            component="a"
                            href="https://calendly.com/golbey_justin/checkmarks"
                        >
                            <EventIcon className={classes.menuItemIcon} />
                            Book Appointment
                        </Button>
                    }
                >
                    <Typography className={classes.alertText}>
                        Looks like you're applying for a Trademark with a less
                        common characteristic. This is perfectly fine, however
                        discussion with a lawyer is required before submission.
                    </Typography>
                </Alert>
                // </Card>
            )}

            <Box className={classes.checkboxContainer}>
                <Checkmark
                    value={validationProgress.trademarkTypeFormCompleted}
                />
            </Box>
            <div className={classes.buttonContainer}>
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.backButton}
                    onClick={() => history.push('/')}
                >
                    Back
                </Button>
                <Button
                    className={classes.continueButton}
                    type="submit"
                    variant="contained"
                    onClick={() => nextStep()}
                    disabled={
                        progressValue < step.progressValueEnd || info.isOther
                    }
                >
                    Continue
                </Button>
            </div>
        </Card>
    );
};
export default TrademarkForm;
const useStyles = makeStyles((theme) => ({
    outerCard: {
        backgroundColor: checkmarksTheme.transparentCard,
        borderRadius: '15px',
        margin: '3%',
        display: 'flex',
        padding: '5%',
        flexDirection: 'column',
        width: '76%',
        [theme.breakpoints.up('md')]: {
            width: '64%',
            padding: '3% ',
        },
        border: '1px solid #696969',
    },
    title: {
        color: '#DF3A48',
    },
    outerText: {
        justifyContent: 'flex-start',
        fontWeight: 550,
    },
    detailSelectCardContainer: {
        columns: '1 auto',
        width: '90%',
        margin: '0 auto',
        padding: '3%',
        [theme.breakpoints.up('md')]: {
            columns: '2 auto',
        },
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '3%',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    continueButton: {
        color: '#FFF',
        backgroundColor: '#df3a48',
        fontWeight: 'bold',
        marginTop: '10%',
        marginLeft: '3%',
        width: '30%',
        height: '30px',
        fontSize: '10px',
        borderRadius: '10px',
        [theme.breakpoints.up('md')]: {
            margin: '5% 3% 5% 0',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            margin: '6% 2% 1% 0',
        },
    },
    backButton: {
        color: '#df3a48',
        backgroundColor: '#FFF',
        fontWeight: 'bold',
        marginTop: '10%',
        width: '30%',
        height: '30px',
        fontSize: '10px',
        borderRadius: '10px',
        border: '1px solid #df3a48',
        [theme.breakpoints.up('md')]: {
            margin: '5% 3% 5% 0',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            margin: '6% 3% 1% 0',
        },
    },
    trademarkMessage: {
        marginBottom: '3%',
        fontSize: 17,
    },
    alertContainer: {
        backgroundColor: checkmarksTheme.transparentCard,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    alert: {
        backgroundColor: checkmarksTheme.transparentCard,
        display: 'flex',
        flexDirection: 'column',
        color: checkmarksTheme.textPrimaryDark,
        margin: '2% 0 5% 0',
        fontSize: '16px',
        [theme.breakpoints.up('sm')]: {
            margin: '0',
        },
    },
    bookApppintmentButton: {
        flex: 1,
        color: '#FFF',
        backgroundColor: '#df3a48',
        fontWeight: 'bold',
        margin: 'auto',
        // marginLeft: '3%',
        width: '100%',
        height: '40px',
        fontSize: '10px',
        borderRadius: '10px',
        [theme.breakpoints.up('md')]: {
            // margin: '5% 3% 5% 0',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            // margin: '6% 2% 1% 0',
        },
    },
}));
