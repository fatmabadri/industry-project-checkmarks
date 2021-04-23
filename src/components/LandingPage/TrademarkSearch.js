import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    Typography,
} from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import { standardTheme } from '../../styles/Themes';
import { makeStyles } from '@material-ui/core/styles';

export default function TrademarkSearch() {
    const classes = searchBoxStyles();

    const [searchTerm, setSearchTerm] = useState('');
    const searchTrademark = (text) => {
        if (text.length > 2) {
            setSearchTerm(text);
        }
        console.log('Searching...');
    };
    useEffect(() => {}, [searchTerm]);

    return (
        <Box>
            <FormControl className={classes.container}>
                <InputLabel className={classes.label}>
                    {'Search for a Trademark...'}
                </InputLabel>
                <Input
                    className={classes.input}
                    onChange={(e) => searchTrademark(e.target.value)}
                    id="searchBox"
                    placeholder={'Enter Text...'}
                    disableUnderline={true}
                    startAdornment={
                        <InputAdornment
                            className={classes.adornment}
                            position="start"
                        >
                            <SearchTwoToneIcon className={classes.icon} />
                        </InputAdornment>
                    }
                />
            </FormControl>
            {searchTerm.length > 2 ? (
                <Typography>{'Results'}</Typography>
            ) : (
                <Typography>{'Nothing found'}</Typography>
            )}
        </Box>
    );
}

export const searchBoxStyles = makeStyles(() => ({
    //
    container: {
        backgroundColor: standardTheme.bgPrimary,
        borderRadius: '22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5px auto',
        padding: '10px',
        width: '95%',
        maxWidth: '320px',
    },
    label: {
        color: standardTheme.textLabel,
        fontSize: 20,
        fontStyle: 'italic',
        padding: '5px 17px',
        textAlign: 'left',
        width: '100%',
    },
    input: {
        backgroundColor: standardTheme.bgSecondary,
        textAlign: 'left',
        width: '100%',
        padding: '0 8px',
        borderRadius: '15px',
    },
    adornment: {},
    icon: {
        // margin: '2%',
        color: standardTheme.textPlaceholder,
    },
}));