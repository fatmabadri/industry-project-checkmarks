import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { checkmarksTheme } from '../styles/Themes';
import {
    Button,
    Card,
    Fade,
    IconButton,
    Paper,
    TableCell,
    Typography,
} from '@material-ui/core';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ResultDetail from './LandingPage/ResultDetail';
import FilterMenu from './FilterMenu';

export default class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;
        // console.log('onRowClick: ', onRowClick);
        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex, rowIndex }) => {
        // ,onClick
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            // <Fade in={true} exit={true} timeout={1000}>
            <TableCell
                // onClick={() => console.log(rowIndex)}
                // onRowClick={(e) => console.log(e.target)} // ADDED
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) ||
                    false
                        ? 'right'
                        : 'left'
                }
            >
                {/* <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton> */}
                {cellData}
            </TableCell>
            // </Fade>
        );
    };

    headerRenderer = ({ label, columnIndex, dataKey }) => {
        const { headerHeight, columns, classes } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(
                    classes.tableCell,
                    classes.flexContainer,
                    classes.noClick
                )}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>
                    <FilterMenu
                        dataKey={dataKey}
                        label={label}
                        // onClick={onFilterClick}
                    />
                    {/* {label} */}
                </span>
            </TableCell>
        );
    };

    render() {
        const {
            classes,
            columns,
            rowHeight,
            headerHeight,
            ...tableProps
        } = this.props;
        // console.log('tableProps:', tableProps);
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        // onRowClick={() => console.log(this)} // ADDED
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}
