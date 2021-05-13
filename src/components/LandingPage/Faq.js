import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';
import { checkmarksTheme } from '../../styles/Themes';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
}));

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: checkmarksTheme.bgCardHeader1,
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(255, 0, 0, .25)',
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function Faq() {
    const classes = useStyles();

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {/* Hero unit */}
            <Container
                maxWidth="sm"
                component="main"
                className={classes.heroContent}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    F.A.Q
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit */}
                </Typography>
            </Container>
            <Container>
                {/*  /// PANEL 1 ////  */}
                <Accordion
                    square
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography>What is a trademark?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        A trademark is like a fingerprint for businesses. It is something that distinguishes your goods or services from others. <br /> 
                        Trademarks include brands, names, slogans, logos, colours, sounds, textures, the way something is packaged, the layout of a store, etc
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/*  /// PANEL 2 ////  */}
                <Accordion
                    square
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                    >
                        <Typography>
                        What is the difference between a trade name and a trademark?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        A trade name is the name of your business, which is sometimes the tradename is the trademark
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/*  /// PANEL 3 ////  */}
                <Accordion
                    square
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                    >
                        <Typography>Should you register your trademark?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Generally, simply making and using a trademark gives you a trademark (called a <strong>“common law trademark”</strong>). This is free but relates to real goodwill enjoyed by the trademark and so it can be hard to enforce across Canada. If you only have goodwill in Vancouver, it will very hard to enforce your common law trademark rights in Halifax.  Registering a trademark with the Canadian Intellectual Property Office <strong>(CIPO)</strong> and there are several advantages to doing so:
                        <br/>
                        (a)	Registration of your trademark will give you Canada-wide rights to the exclusive use of that mark in your industry regardless of whether your trademark enjoys goodwill or reputation in any particular area of Canada;<br/>
                        (b)	Registration allows you to take easier steps to prevent others from using an identical or confusingly similar trademark in relation to a similar business;<br/>
                        (c)	CIPO will screen future trademark registration applications thereby offering your registered trademark some additional protection;<br/>
                        (d)	Trademark registration will deter others from adopting a trademark similar to yours; and<br/>
                        (e)	Trademark registration may prevent others from registering a trademark similar to yours, and then taking action against you for damages or to prevent you from using your established trademark.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/*  /// PANEL 4 ////  */}
                <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>How long is the “trademarking” process?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    The procedure for registration of a trademark in Canada takes approximately <strong>12-30 months</strong> depending on many variables including whether the <strong>CIPO</strong>trademark examiner raises any objections to the application or whether it is opposed by other trademark owners. <br/>
                    This will be a slow-moving process. If you plan to wait to <strong>"start"</strong> the business until the trademark is registered - please speak with a <strong>Checkmarks lawyer</strong> to discuss. 
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/*  /// PANEL 5 ////  */}
            {/* <Accordion
                    square
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        </Typography>
                    </AccordionDetails>
                </Accordion> */}
            </Container>
        </React.Fragment>
    );
}
