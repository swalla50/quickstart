import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { faFilter, faPieChart } from '@fortawesome/free-solid-svg-icons'
import './Reportfunc.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap'
import {
    Grid,
    TextField,
    Card,
    CardContent,
    Typography,
    Checkbox,
    Autocomplete,
    Chip,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    ListItemText,
    Paper,
    Stack
} from "@mui/material";
import { CheckBoxOutlineBlank } from '@material-ui/icons'
import { CheckBoxOutlined } from '@material-ui/icons'

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxOutlined fontSize="small" />;



//     {
//         id: 1,
//         reportName: 'ASC Report',
//         reportCreation: '01-10-2022',
//         reportType: 'Standard'
//     },
//     {
//         id: 2,
//         reportName: 'Yearly End Report',
//         reportCreation: '01-10-2022',
//         reportType: 'Standard'
//     },
//     {
//         id: 3,
//         reportName: 'Month End Report',
//         reportCreation: '06-10-2022',
//         reportType: 'Standard'
//     },
//     {
//         id: 4,
//         reportName: 'AWS Lambda Report',
//         reportCreation: '06-30-2022',
//         reportType: 'Standard'
//     },
//     {
//         id: 5,
//         reportName: 'Azure Cosmo Report',
//         reportCreation: '01-12-2022',
//         reportType: 'Standard'
//     },
//     {
//         id: 6,
//         reportName: 'Annual Charges Report',
//         reportCreation: '01-30-2022',
//         reportType: 'Custom'
//     }
// ]
// ;

function Reportfunc() {
    const [reportList, setReportList] = useState([]);
    const [query, setQuery] = useState([]);
    const [querydropName, setquerydropName] = useState("");
    const [filterPublished, setFilterPublished] = useState([]);
    var option = []
    function clearFilter() {
        setQuery([]);


    }
    //Grab
    useEffect(() => {

        axios.get(`getReportList/getReportList`)
            .then((response) => {
                setReportList(response.data);
                
               

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
 
    }, []);
    console.log("report list", reportList)
    const search = (list) => {
        return reportList.filter(report => report.reportName?.toLocaleLowerCase().includes(query) || report.reportType?.includes(query) || report.reportType?.toLocaleLowerCase().includes(query) || report.reportCreation?.includes(query));
    }
    // const dropdownrName = (rName) => {
    //     return reportList.filter(reportN => reportN.reportName.toLocaleLowerCase().includes(query));
    // }
    console.log("result", query, "    ++ ", search(reportList))
    var ReportTypes = [];
    var ReportNames = [];

    for (let i = 0; i < reportList.length; i++) {
        ReportTypes.push(reportList[i].reportType)
        let setOfValue = new Set(ReportTypes)
        //   //distinct building name values from array
        let uniqueBuildingValues = [...setOfValue]
        ReportTypes = uniqueBuildingValues
    }
    for (let i = 0; i < reportList.length; i++) {
        ReportNames.push(reportList[i].reportName)
        let setOfValue = new Set(ReportNames)
        //   //distinct building name values from array
        let uniqueBuildingValues = [...setOfValue]
        ReportNames = uniqueBuildingValues
    }


    var finalReportType = [...new Set(ReportTypes)]
    var finalReportName = [...new Set(ReportNames)]

    return (
        <div className='reportsfunc'>
            <h2 className='Reports-list-header'>REPORTS <FontAwesomeIcon icon={faPieChart} size='1x' /></h2>

            <div className='Report-page-metric-container'>
                <div className='Report-metric-top'>
                    <div className='Report-count-container'>
                        <h6 className='report-count-header'>Report Count</h6>
                        <h1 className='report-count'>{reportList.length}</h1>
                    </div>
                    <div className='Report-Types-container'>
                        <h6 className='report-count-header'>Report Types</h6>
                        <p className='report-type'>19</p>
                        <p className='report-type'>19</p>
                        <p className='report-type'>19</p>
                        <p className='report-type'>19</p>
                    </div>
                </div>
                <div className='Report-metric-bottom'>
                    <div className='Report-filter-container'>
                        <h6 className='report-count-header'>Report Filter</h6>
                        <div className='filters'>
                            <input type="text" placeholder='Search...' className='search-reports' onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} />
                            <Autocomplete
                                id="checkboxes-tags-demo"
                                options={finalReportType}
                                onChange={(e, value) => setQuery(value)}
                                getOptionLabel={(option) => option}
                                renderTags={(value, getTagProps) => {
                                    const numTags = value.length;
                                    const limitTags = 3;

                                    return (
                                        <>
                                            {value.slice(0, limitTags).map((option, index) => (
                                                <Chip
                                                    {...getTagProps({ index })}
                                                    key={index}
                                                    label={option}
                                                />
                                            ))}

                                            {numTags > limitTags && ` +${numTags - limitTags}`}
                                        </>
                                    );
                                }}
                                PaperComponent={({ children }) => (
                                    <Paper style={{ width: 300 }}>{children}</Paper>
                                )}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Report Types..."
                                        variant="outlined"
                                        size="medium"
                                    />
                                )}
                            />
                            <Autocomplete
                                id="checkboxes-tag-demo"
                                options={finalReportName}
                                onChange={(e, value) => setQuery(e.target.value.toLocaleLowerCase())}
                                getOptionLabel={(options) => options}
                                renderTags={(value, getTagProps) => {
                                    const numTags = value.length;
                                    const limitTags = 3;

                                    return (
                                        <>
                                            {value.slice(0, limitTags).map((options, index) => (
                                                <Chip
                                                    {...getTagProps({ index })}
                                                    key={index}
                                                    label={options}
                                                />
                                            ))}

                                            {numTags > limitTags && ` +${numTags - limitTags}`}
                                        </>
                                    );
                                }}
                                PaperComponent={({ children }) => (
                                    <Paper style={{ width: 300 }}>{children}</Paper>
                                )}
                                renderOption={(props, options, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            checked={selected}
                                        />
                                        {options}
                                    </li>
                                )}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select a Report By Name..."
                                        variant="outlined"
                                        size="medium"
                                    />
                                )}
                            />
                            {/* <Form.Select onChange={(e) => setQuery(e.target.value)} >
                                <option>Select a Report By Name</option>
                                {reportList.map(rnameItem => (
                                    <option value={rnameItem.reportName.toLocaleLowerCase()}>{rnameItem.reportName}</option>
                                ))}
                            </Form.Select> */}
                            {/* <Form.Select multiple onChange={(e) => setQuery(e.target.value)} >
                                <option>Select a Report Type</option>
                                {finalReportType.map(result => (

                                    <option value={result.toLocaleLowerCase()}>{result}</option>
                                ))}
                            </Form.Select> */}
                            {/* <input type="date" data-date-format="DD MMMM YYYY" onChange={(e) => setQuery(e.target.value)}/> */}
                            <Button className="clear" title="Clear" aria-label="Clear" onClick={clearFilter}>
                                Clear Filter <FontAwesomeIcon icon={faFilter} size='2x' />
                            </Button>
                            <div className='report-return-count-container'><h5 className='report-return-count'>Reports: </h5><h5 className='search-number-count'>{search(reportList).length}</h5></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='report-list-container'>
                {search(reportList).map(item => (
                    <div className='report-item' key={item.reportID}>
                        <h5 className='report-name'>{item.reportName}</h5>
                        <p className='report-date'>{item.reportCreation}</p>
                        <p className='report-type'>{item.reportType}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reportfunc