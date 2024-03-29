import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { checkmarksTheme } from '../styles/Themes';

export default function ServiceSelect({
    info,
    setInfo,
    setTotalAmount,
    selectedClasses,
}) {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Button
                className={classes.buttonDIY}
                onClick={() => {
                    setInfo({
                        ...info,
                        selectedServiceName: 'DIY',
                        basePrice: 690,
                        amount: (
                            690 +
                            100 * (selectedClasses.length - 1)
                        ).toFixed(2),
                    });
                    setTotalAmount(
                        (690 + 100 * (selectedClasses.length - 1)).toFixed(2)
                    );
                }}
            >
                <Box
                    className={classes.buttonDIYContentContaner}
                    style={{
                        border:
                            info.selectedServiceName === 'DIY'
                                ? '5px solid green'
                                : '1px solid white',
                    }}
                >
                    <Typography className={classes.buttonDIYText}>
                        DIY+
                    </Typography>
                    <Typography className={classes.buttonDIYAmount}>
                        $690.00
                    </Typography>
                </Box>
            </Button>
            <Button
                className={classes.buttonFullService}
                onClick={() => {
                    setInfo({
                        ...info,
                        selectedServiceName: 'Full',
                        basePrice: 1500,
                        amount: (
                            1500 +
                            100 * (selectedClasses.length - 1)
                        ).toFixed(2),
                    });
                    setTotalAmount(
                        (1500 + 100 * (selectedClasses.length - 1)).toFixed(2)
                    );
                }}
            >
                <Box
                    className={classes.buttonFullServiceContentContaner}
                    style={{
                        border:
                            info.selectedServiceName === 'Full'
                                ? '5px solid green'
                                : '1px solid red',
                    }}
                >
                    <Typography className={classes.buttonFullServiceText}>
                        Full Service
                    </Typography>
                    <Typography className={classes.buttonFullServiceAmount}>
                        $1500.00
                    </Typography>
                </Box>
            </Button>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: checkmarksTheme.transparent,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: '3% 0',
    },
    buttonDIY: {
        backgroundColor: checkmarksTheme.buttonPrimary,
        height: '120px',
        width: '50%',
        margin: '3px',
    },
    buttonDIYText: {
        color: checkmarksTheme.buttonTextPrimary,
        fontWeight: 'bold',
    },
    buttonDIYAmount: {
        fontStyle: 'italic',
        fontSize: '22px',
        fontWeight: 'bold',
    },
    buttonFullServiceAmount: {
        color: 'black',
        fontStyle: 'italic',
        fontSize: '22px',
        fontWeight: 'bold',
    },
    buttonFullService: {
        backgroundColor: checkmarksTheme.buttonSecondary,
        height: '120px',
        width: '50%',
        margin: '3px',
    },
    buttonFullServiceText: {
        color: checkmarksTheme.buttonTextSecondary,
        fontWeight: 'bold',
    },
    buttonDIYContentContaner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // border: '1px solid white',
        borderRadius: '5px',
        height: '112px',
        width: '99%',
    },
    buttonFullServiceContentContaner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // border: '1px solid red',
        borderRadius: '5px',
        height: '112px',
        width: '99%',
    },
    buttonIcon: {
        color: checkmarksTheme.textActive,
    },
}));
