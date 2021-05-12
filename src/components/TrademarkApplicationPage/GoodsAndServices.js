import React, { useState, useEffect, useRef } from 'react';
import {
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Card,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { checkmarksTheme } from '../../styles/Themes';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import MuiVirtualizedTable from '../VirtualizedTable';
import SearchField from '../SearchField';
import TermSelector from './TermSelector';
import Checkmark from '../Checkmark';
import { searchTerms, getAllClasses } from '../../services/checkmarks';

export default function GoodsAndServices({
    navigation,
    step,
    info,
    setInfo,
    currentStep,
    setCurrentStep,
    progressValue,
    validationProgress,
}) {
    const classes = useStyles();

    // INPUT statevar
    const [searchTerm, setSearchTerm] = useState(''); // user's search
    const [open, setOpen] = useState(false); // dialog box showing when no terms selected

    // INITIALIZE From 'info' Statevar
    const [selectedTerms, setSelectedTerms] = useState(info.termsSelected); // rendered on Selected Terms summary
    const [selectedClasses, setSelectedClasses] = useState(
        info.classesSelected
    );
    const [totalAmount, setTotalAmount] = useState(0);

    // SELECTION HANDLING
    const [termBeingToggledNumber, setTermBeingToggledNumber] = useState(null);
    useEffect(() => {
        if (termBeingToggledNumber) {
            toggleTermSelectionStatus(termBeingToggledNumber);
        }
        setTermBeingToggledNumber(null);
    }, [termBeingToggledNumber]);

    // GET TERMS AFTER TEXT INPUT
    const [termSearchResults, setTermSearchResults] = useState([]);
    const { current: searchInstance } = useRef({});
    useEffect(() => {
        setTermTableData([]);
        if (searchInstance.delayTimer) {
            clearTimeout(searchInstance.delayTimer);
        }
        if (searchTerm.length > 2) {
            if (searchTerm !== '') {
                searchInstance.delayTimer = setTimeout(() => {
                    (async () => {
                        console.log('after 2 sec');
                        const result = await searchTerms(searchTerm);
                        setTermSearchResults(result.terms);
                    })();
                }, 750);
            }
        }
    }, [searchTerm]);

    // GET TERM DATA (on Search)
    const [termTableData, setTermTableData] = useState([]); // DATA Rendering on Table (Displayed)
    useEffect(() => {
        renderTerms();
    }, [termSearchResults, selectedTerms]);
    const renderTerms = () => {
        const termData = []; // formatted to fit table
        termSearchResults.forEach((resultItem) => {
            let termSelected = false;
            info.termsSelected.forEach((term) => {
                if (term.id === resultItem.id) {
                    termSelected = true;
                }
            });
            let termTableDataFormat = {
                ...resultItem,
                selected: termSelected,
                selectionCheckbox: (
                    <TermSelector
                        number={resultItem.id}
                        selected={termSelected}
                        handler={setTermBeingToggledNumber}
                    />
                ),
                id: resultItem.id,
                termName: resultItem.termName,
                termClass: resultItem.termClass,
                classShortName: resultItem.classShortName,
            };
            termData.push(termTableDataFormat);
        });
        setTermTableData(termData);
    };
    const removeTerm = (term) => {
        // const newSelectedTerms = selectedTerms;
        let newSelectedTerms = selectedTerms.filter(
            (item) => item.id !== term.id
        );
        setSelectedTerms(newSelectedTerms);
    };

    // COSMETIC statevar (indicator)
    const { current: instance } = useRef({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (instance.delayTimer) {
            clearTimeout(instance.delayTimer);
        }
        if (searchTerm !== '' && termTableData?.length === 0) {
            setLoading(true);
            instance.delayTimer = setTimeout(() => {
                setLoading(false); // after 3 seconds, stop Loading Indicator
            }, 3000);
        } else {
            setLoading(false);
        }
    }, [searchTerm, termTableData]);

    const [selectedRow, setSelectedRow] = useState(null); // toggle ListView, detailedView
    const [filterSelection, setFilterSelection] = useState(null); // filter termTableResults
    const onFilterClick = (e) => {
        setFilterSelection(e.currentTarget.value);
    };

    // Functions
    const toggleTermSelectionStatus = (termNumber) => {
        let termIndex = termTableData.findIndex(
            (term) => term.id == termNumber
        );
        if (termIndex === -1) {
            console.log('Term not found'); // handle error
        } else {
            let updatedTerm = {
                ...termTableData[termIndex],
                selected: !termTableData[termIndex].selected,
                selectionCheckbox: (
                    <TermSelector
                        number={termNumber}
                        selected={!termTableData[termIndex].selected}
                        handler={setTermBeingToggledNumber}
                    />
                ),
            };
            setTermTableData([
                ...termTableData.slice(0, termIndex),
                Object.assign({}, termTableData[termIndex], updatedTerm),
                ...termTableData.slice(termIndex + 1),
            ]);
            // handle SELECTED TERMS & CLASSES
            if (
                updatedTerm.selected === true ||
                termTableData[termIndex].selected === false
            ) {
                // ADD to Selected Terms
                setSelectedTerms([...selectedTerms, termTableData[termIndex]]);
            } else if (
                updatedTerm.selected === false ||
                termTableData[termIndex].selected === true
            ) {
                // REMOVE from Selected Terms
                removeTerm(termTableData[termIndex]);
            }
        }
    };

    // filter selectedTerms, get list of selected classes (no duplicates)
    useEffect(() => {
        const classesSelected = [];
        if (selectedTerms.length > 0) {
            selectedTerms.forEach((term) => {
                let termClassExists = false;
                classesSelected.forEach((niceClass) => {
                    if (niceClass.id === term.termClass) {
                        termClassExists = true;
                    }
                });
                if (!termClassExists) {
                    classesSelected.push({
                        id: term.termClass,
                        description: term.classShortName,
                    });
                }
                termClassExists = false;
            });
            setSelectedClasses(classesSelected);
            if (classesSelected.length > 0) {
                setTotalAmount(
                    (1500 + 100 * (classesSelected.length - 1)).toFixed(2)
                );
            } else if (classesSelected.length === 0) {
                setTotalAmount(0);
            }
        }
        if (selectedTerms?.length > 0) {
            setInfo({ ...info, termsSelected: selectedTerms });
        }
    }, [selectedTerms]);

    // UPDATE PARENT Statevar 'info'
    useEffect(() => {
        if (selectedClasses?.length > 0) {
            setInfo({ ...info, classesSelected: selectedClasses });
        }
        if (selectedTerms?.length > 0) {
            setInfo({ ...info, amount: totalAmount });
        }
    }, [selectedClasses]);

    const previousStep = () => {
        setCurrentStep(currentStep - 1); // assign currentStep to next step
        navigation.previous();
    };
    const nextStep = () => {
        setCurrentStep(currentStep + 1); // assign currentStep to next step
        navigation.next();
    };

    return (
        <Card className={classes.card}>
            <h1 className={classes.title}>Goods and Services</h1>
            <div className={classes.formContainer}>
                <Typography gutterBottom>
                    A Trademark is registered under one or more{' '}
                    <b>NICE class(es)</b>. <br />
                    <br />
                    This Trademark application service base price is $1,500.00
                    and includes 1 (one) NICE Class applied to your Trademark.{' '}
                    <br />
                    <br />
                    If your Trademark must be registered under additional NICE
                    Classes,{' '}
                    <b>
                        an additional government fee of $100.00 will be applied
                        per additional NICE class.
                    </b>
                    <br />
                    <br />
                    Please search for the <b>Terms</b> which may apply to your
                    Trademark. Each <b>Term</b> is associated with a{' '}
                    <b>NICE Class</b>.
                </Typography>

                {/* ///////////////////////////search trademark terms/////////////////////////// */}
                <h3>Search for your Trademark Terms</h3>
                <SearchField loading={loading} setInputTo={setSearchTerm} />

                {(searchTerm.length > 2 || termTableData.length > 0) &&
                    !loading && (
                        <>
                            {termTableData.length > 0 ? (
                                <Paper
                                    className={classes.results}
                                    style={{
                                        backgroundColor:
                                            checkmarksTheme.bgTransparent,
                                        height: '500px', // (window.innerHeight * 4) / 5,
                                        width: '100%',
                                    }}
                                >
                                    <MuiVirtualizedTable
                                        // style={{ height: 400, width: '100%' }}
                                        rowCount={termTableData.length} // row or data
                                        rowGetter={({ index }) =>
                                            termTableData[index]
                                        } // row or data
                                        onRowClick={(e) =>
                                            setSelectedRow(e.index)
                                        }
                                        onFilterClick={onFilterClick}
                                        columns={[
                                            {
                                                width:
                                                    (window.innerWidth * 2) /
                                                    10,
                                                label: [
                                                    'Selected',
                                                    '',
                                                    onFilterClick,
                                                    [],
                                                ],
                                                dataKey: 'selectionCheckbox',
                                            },
                                            {
                                                width:
                                                    (window.innerWidth * 3) /
                                                    10,
                                                label: [
                                                    'Term Name',
                                                    '',
                                                    onFilterClick,
                                                    [],
                                                ],
                                                dataKey: 'termName',
                                            },
                                            {
                                                width:
                                                    (window.innerWidth * 1) /
                                                    10,
                                                label: [
                                                    'NICE Class',
                                                    '',
                                                    onFilterClick,
                                                    [],
                                                ],
                                                dataKey: 'termClass',
                                            },
                                            {
                                                width:
                                                    (window.innerWidth * 4) /
                                                    10,
                                                label: [
                                                    'NICE Class Name',
                                                    '',
                                                    onFilterClick,
                                                    [],
                                                ],
                                                dataKey: 'classShortName',
                                            },
                                        ]}
                                    />
                                </Paper>
                            ) : (
                                <Paper>
                                    <Typography>No results</Typography>
                                </Paper>
                            )}
                        </>
                    )}

                {/* ///////////////////////////selected terms section /////////////////////////// */}
                <Card className={classes.selectedTerms}>
                    <CardContent>
                        <Typography variant="h6">
                            <b>Selected Terms:</b>
                        </Typography>

                        <List>
                            {selectedClasses?.length > 0 &&
                                selectedClasses.map((niceClass, index) => (
                                    <div key={index}>
                                        <h4>
                                            {'Class: ' +
                                                niceClass?.id +
                                                ' - ' +
                                                niceClass?.description}
                                        </h4>
                                        <ListItem
                                            className={classes.classTermList}
                                        >
                                            {selectedTerms
                                                // [selectedClasses?.indexOf(
                                                //         classNum.number)]?
                                                .map((term, index) => {
                                                    if (
                                                        term.termClass ===
                                                        niceClass.id
                                                    ) {
                                                        return (
                                                            <div
                                                                className={
                                                                    classes.selectedTermListItem
                                                                }
                                                                key={index}
                                                                style={{
                                                                    margin:
                                                                        '4px',
                                                                }}
                                                            >
                                                                <ListItemText
                                                                    // className={
                                                                    //     classes.selectedTermListItem
                                                                    // }
                                                                    primary={
                                                                        term.termName
                                                                    }
                                                                    secondary={
                                                                        'id: ' +
                                                                        term.id
                                                                    }
                                                                />
                                                                <IconButton
                                                                    color="secondary"
                                                                    variant="contained"
                                                                    onClick={() =>
                                                                        removeTerm(
                                                                            term
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteForeverTwoToneIcon />
                                                                </IconButton>
                                                            </div>
                                                        );
                                                    }
                                                })}
                                        </ListItem>
                                    </div>
                                ))}
                        </List>
                    </CardContent>
                </Card>
                {/* ///////////////////////////total amount section /////////////////////////// */}
                <Card>
                    <CardContent className={classes.amount}>
                        <Typography variant="h6">
                            <b>Amount:</b>
                        </Typography>
                        <Typography variant="body1" component="p">
                            {/* {additionalNICE} */}
                            {`$${totalAmount.toString()}`}
                        </Typography>
                    </CardContent>
                </Card>

                <Checkmark value={validationProgress.amountNotZero} />

                <Alert severity="info" className={classes.alert}>
                    Helper section with brief legal information, assisting the
                    client through the process.
                </Alert>

                <div className={classes.buttonContainer}>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.backButton}
                        onClick={() => previousStep()}
                    >
                        Back
                    </Button>
                    <Button
                        className={classes.continueButton}
                        type="submit"
                        variant="contained"
                        onClick={() => nextStep()}
                        disabled={progressValue < step.progressValueEnd}
                    >
                        Continue
                    </Button>
                </div>
            </div>
            {/* ///////////////////////////warning section /////////////////////////// */}
            <Dialog
                open={open}
                // onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Continue without selecting any terms?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have not selected any trademark terms. This can be
                        figured out at a later time. Do you wish to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => previousStep()}
                    >
                        Back
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => nextStep()}
                        disabled={progressValue < step.progressValueEnd}
                        autoFocus
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: checkmarksTheme.transparentCard,
        border: '1px solid #696969',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        margin: '3%',
        width: '95%',
        padding: '0 5% 5% 5%',
        [theme.breakpoints.up('md')]: {
            width: '60%',
            padding: '0 2% ',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            padding: '0 5% 2% 5%',
        },
    },
    formContainer: {
        border: '1px solid #696969',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        margin: '3%',
        padding: '25px',
    },
    title: {
        color: '#df3a48',
        marginBottom: '3%',
    },
    searchTermsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3%',
    },
    searchTermsButton: {
        marginLeft: '1%',
        width: '15%',
        color: '#FFF',
        backgroundColor: '#df3a48',
        fontWeight: 'bold',
    },
    selectedTerms: {
        margin: '3% 0',
        padding: '15px',
    },
    classTermList: {
        display: 'flex',
        flexDirection: 'column',
    },
    selectedTermListItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    amount: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '2% 0',
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
        margin: '10% 0 0 3%',
        width: '30%',
        height: '30px',
        fontSize: '10px',
        borderRadius: '10px',
        [theme.breakpoints.up('md')]: {
            margin: '5% 3% 2% 0',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            margin: '6% 3% 0% 0',
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
            margin: '5% 3% 2% 0',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            margin: '6% 3% 0% 0',
        },
    },
    alert: {
        color: '#2a9df4',
        marginTop: '10%',
        fontSize: '12px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '5%',
        },
    },
}));

// From Above: (Ref# 12345678)
// constructor(props) {
//     super(props);
//     this.clickContinue = this.clickContinue.bind(this);

//     this.state = {
//         terms: [],
//         classShortNames: [],
//         selectedClasses: [],
//         selectedTerms: [],
//         searchTerm: '',
//         searchError: '',
//         open: false,
//     };
// }

// componentDidMount() {
//     if (this.props.values.classes.length > 0) {
//         this.setState({
//             selectedClasses: this.props.values.classes.slice(),
//         });
//     }
//     if (this.props.values.terms.length > 0) {
//         this.setState({
//             selectedTerms: this.props.values.terms.slice(),
//         });
//     }
//     this.fetchClassShortName();
// }

// const clickContinue = (e) => {
//     if (selectedTerms.length == 0) {
//       setOpen(true)
//     } else {
//         this.continue(e);
//     }
// };

//const continue = (e) => {
//     e.preventDefault();
//     this.props.handler('classes', this.state.selectedClasses);
//     this.props.handler('terms', this.state.selectedTerms);
//     this.changeAmount();
//     this.props.nextStep();
// };

// back = (e) => {
//     e.preventDefault();
//     this.props.prevStep();
// };

// changeAmount() {
//     var newAmount = 150000;
//     if (this.state.selectedClasses.length > 1) {
//         newAmount += (this.state.selectedClasses.length - 1) * 100 * 100;
//     }
//     this.props.handler('amount', newAmount);
// }

// handleClose = () => {
//     this.setState({ open: false });
// };

// //Checks for any speical characters in the search string. Prints error message if true.
// validateSearchString() {
//     let searchError = '';
//     if (!this.state.searchTerm) {
//         searchError = 'Please enter a word that describes your trademark';
//     }
//     if (this.state.searchTerm.includes('/')) {
//         searchError = "Your search cannot include '/'";
//     }
//     if (
//         this.state.searchTerm.includes('.') ||
//         this.state.searchTerm.includes(';') ||
//         this.state.searchTerm.includes('$') ||
//         this.state.searchTerm.includes(',') ||
//         this.state.searchTerm.includes(':') ||
//         this.state.searchTerm.includes('?') ||
//         this.state.searchTerm.includes('@') ||
//         this.state.searchTerm.includes('#') ||
//         this.state.searchTerm.includes('!') ||
//         this.state.searchTerm.includes('&') ||
//         this.state.searchTerm.includes('*') ||
//         this.state.searchTerm.includes('(') ||
//         this.state.searchTerm.includes("'") ||
//         this.state.searchTerm.includes(')') ||
//         this.state.searchTerm.includes('"') ||
//         this.state.searchTerm.includes('}') ||
//         this.state.searchTerm.includes('-') ||
//         this.state.searchTerm.includes('{') ||
//         this.state.searchTerm.includes('%')
//     ) {
//         searchError = 'Please do not include any special characters';
//     }
//     if (searchError) {
//         this.setState({ searchError });
//         return false;
//     } else {
//         this.setState({ searchError });
//     }
//     return true;
// }

// //Fetches the term information from the backend web api
// getSearchTerms = () => {
//     var searchString = this.state.searchTerm;
//     if (this.validateSearchString()) {
//         let url =
//             this.props.values.checkmarksApiUrl +
//             'cipo/GetTermDataByString/' +
//             searchString;
//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 this.setState({
//                     terms: data.terms,
//                 });
//             });
//     }
// };

// handleTextFieldChange = (event) => {
//     this.setState({
//         searchTerm: event.target.value,
//     });
// };

// //Checks if the term has already been entered in the list
// isDupTerm(termList, term) {
//     if (termList.length == 0) {
//         return false;
//     } else {
//         var i;
//         var x;
//         for (i = 0; i < termList.length; i++) {
//             for (x = 0; x < termList[i].length; x++) {
//                 if (termList[i][x] == term) {
//                     return true;
//                 }
//             }
//         }
//     }
//     return false;
// }

// //Checks for any duplicate classes. If true, returns its index, else returns -1
// checkDupClass(classList, newClassNum) {
//     var i;
//     for (i = 0; i < classList.length; i++) {
//         if (classList[i] == newClassNum) {
//             return i;
//         }
//     }
//     return -1;
// }

// async fetchClassShortName() {
//     let tempShortNames = [];
//     let url = this.props.values.checkmarksApiUrl + 'cipo/GetAllClasses/';
//     await fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//             var i;
//             for (i = 0; i < data.classes.length; i++) {
//                 tempShortNames.push(data.classes[i].name);
//             }
//         });
//     this.setState({
//         classShortNames: tempShortNames,
//     });
// }

// getClassShortName(index) {
//     return this.state.classShortNames[index - 1];
// }

// //Adds the term and class into the selectedTerms and selectedClasses lists, while also checking for duplicates
// handleAdd(data) {
//     var tempClassList = this.state.selectedClasses.slice(); //Slice returns a copy of array rather than a reference
//     var tempTermList = this.state.selectedTerms.slice();

//     data.forEach((element) => {
//         var classIndex = this.checkDupClass(
//             tempClassList,
//             element.termClass
//         );
//         if (classIndex == -1) {
//             tempClassList.push(element.termClass);
//             tempTermList.push(Array(element.termName));
//         } else {
//             if (!this.isDupTerm(tempTermList, element.termName)) {
//                 tempTermList[classIndex].push(element.termName);
//             }
//         }
//     });

//     this.setState({
//         selectedClasses: tempClassList,
//         selectedTerms: tempTermList,
//     });
// }

// //Removes the term from the list, and removes the class if there are no more terms left for that class.
// handleRemove(classNumber, term) {
//     var tempClassList = this.state.selectedClasses.slice();
//     var tempTermList = this.state.selectedTerms.slice();
//     var classIndex = this.state.selectedClasses.indexOf(classNumber);

//     for (var i = 0; i < tempTermList[classIndex].length; i++) {
//         if (tempTermList[classIndex][i].localeCompare(term) == 0) {
//             tempTermList[classIndex].splice(i, 1);
//         }
//     }

//     if (tempTermList[classIndex].length == 0) {
//         tempTermList.splice(classIndex, 1);
//         tempClassList.splice(classIndex, 1);
//     }

//     this.setState({
//         selectedClasses: tempClassList,
//         selectedTerms: tempTermList,
//     });
// }
