import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    Card,
    Typography,
    TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

export default function PaymentForm() {
    const classes = useStyles();
    const history = useHistory();

    const [cardholderName, setCardholderName] = useState('');
    const [creditcardNumber, setCreditcardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [CVV, setCVV] = useState('');

    //handle Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        alert('Successfully login');
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.title} component="p">
                    Place a Trust Payment
                </Typography>
                <Typography className={classes.text} component="p">
                    Credit Card
                </Typography>
                <FormControl fullWidth={true}>
                    <TextField
                        id="outlined-basic"
                        label="Cardholder Name"
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        type="text"
                        value={cardholderName}
                        autoComplete="on"
                        onChange={(e) => setCardholderName(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <TextField
                        id="outlined-basic"
                        label="Credit Card Number"
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        type="text"
                        value={creditcardNumber}
                        autoComplete="on"
                        onChange={(e) => setCreditcardNumber(e.target.value)}
                    />
                </FormControl>
                <div className={classes.flexContainer}>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="outlined-basic"
                            label="Expiry Date (MM/YY)"
                            variant="outlined"
                            size="small"
                            className={classes.input}
                            type="text"
                            value={expiryDate}
                            autoComplete="on"
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="outlined-basic"
                            label="CVV"
                            variant="outlined"
                            size="small"
                            className={classes.input}
                            type="text"
                            value={CVV}
                            autoComplete="on"
                            onChange={(e) => setCVV(e.target.value)}
                        />
                    </FormControl>
                </div>
                <Typography className={classes.text} component="p">
                    Billing Addres
                </Typography>
                <FormControl fullWidth={true}>
                    <TextField
                        id="outlined-basic"
                        label="Street Address"
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        type="text"
                        value={creditcardNumber}
                        autoComplete="on"
                        onChange={(e) => setCreditcardNumber(e.target.value)}
                    />
                </FormControl>
                <div className={classes.flexContainer}>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="outlined-basic"
                            label="City"
                            variant="outlined"
                            size="small"
                            className={classes.input}
                            type="text"
                            value={expiryDate}
                            autoComplete="on"
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="outlined-basic"
                            label="Province"
                            variant="outlined"
                            size="small"
                            className={classes.input}
                            type="text"
                            value={CVV}
                            autoComplete="on"
                            onChange={(e) => setCVV(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div className={classes.flexContainer}>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="outlined-basic"
                            label="Postal Code"
                            variant="outlined"
                            size="small"
                            className={classes.input}
                            type="text"
                            value={expiryDate}
                            autoComplete="on"
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                            size="small"
                            className={classes.input}
                            type="text"
                            value={CVV}
                            autoComplete="on"
                            onChange={(e) => setCVV(e.target.value)}
                        />
                    </FormControl>
                </div>
                <Alert severity="info" className={classes.alert}>
                    Helper section with brief legal information, assisting the
                    client through the process.
                </Alert>
                <div className={classes.buttonContainer}>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                        className={classes.completeButton}
                    >
                        Complete
                    </Button>
                </div>
            </Card>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5%',
    },
    card: {
        padding: '2%',
        width: '80%',
    },
    title: {
        // margin: '5%',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#df3a48',
        marginBottom: '5%',
    },
    input: {
        width: '80%',
        margin: '3% auto',
        borderRadius: '10px',
    },
    text: {
        color: '#808080',
        fontSize: '12px',
        margin: '3%',
    },
    flexContainer: {
        // display: 'flex',
    },
    buttonContainer: {
        display: 'flex',
        margin: '3%',
    },
    completeButton: {
        color: '#df3a48',
        backgroundColor: '#FFF',
        fontWeight: 'bold',
        width: '40%',
        height: '50px',
        fontSize: '10px',
        margin: '3% auto',
        borderRadius: '10px',
        border: '1px solid #df3a48',
        [theme.breakpoints.down('xs')]: {
            fontSize: '8px',
        },
    },
    alert: {
        width: '80%',
        margin: '2% auto',
        color: '#2a9df4',
        fontSize: '12px',
    },
}));
