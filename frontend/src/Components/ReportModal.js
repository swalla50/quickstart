import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import moment from 'moment';
import './Reportfunc.css'
// // Report Viewer source
// import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
// import '@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css';
// //Data-Visualization
// import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
// import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
// //Reports react base
// import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';
// var viewerStyle = { 'height': '700px', 'width': '100%' };

function ReportModal(props) {
    // const [invList, setinvList] = useState([]);
    // const [invID, setinvID] = useState ("");
    // const [invNum, setinvNum] = useState("");
    // const [currNum, setcurrNum] = useState("");
    // const [newNum, setnewNum] = useState("");
    // const [user, setUser] = useState("");
    // const [srLog, setsrLog] = useState([]);
    // const generate =   {
    //     "datasets": [
    //       {
    //         "id": "8edc5e31-44e6-487e-a99e-9fa3fcf2a091"
    //       }
    //     ],
    //     "reports": [
    //       {
    //         "allowEdit": true,
    //         "id": "1db405ab-48e4-49cd-9782-0a6365276607"
    //       }
    //     ]
    //   }

    // function generateToken(){
    //     axios.post('https://api.powerbi.com/v1.0/myorg/GenerateToken', generate)
    //             .then(res => {

    //                 console.log(res.data)
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })

    // }

    // useEffect(() => {
    //     axios.get(`getinventory/getInventoryList`)
    //         .then((response) => {
    //             setinvList(response.data.filter(inv => inv.isDeleted == false));
    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    //         axios.get(`UserProfile`)
    //         .then((res) => {
    //             setUser(res.data)

    //             console.log(user)



    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    //         axios.get(`getSRLog/getSRLog`)
    //         .then((response) => {
    //             setsrLog(response.data);


    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    // }, [])

    // function onRestockIDChange( currentNum) {


    //     const select = currentNum.target;
    //     const id = select.children[select.selectedIndex].id;
    //     const newNumber = select.children[select.selectedIndex].value
    //     setcurrNum(newNumber);
    //     setinvID(id);
    //     // var event = document.getElementById('item-selection').value
    //     axios.get(`getSRLog/getSRLog`)
    //     .then((response) => {
    //         setsrLog(response.data);


    //     })
    //     .catch((err) => {
    //         console.log(err, "Unable to get user time info");
    //     });
    //     console.log("id", newNumber, id)

    // }
    // function onRestocknumChange(numofitem) {
    //     setnewNum(numofitem);


    // }

    // function onRestockChange(){
    //     var newNumber = (parseInt(currNum) + parseInt(newNum));
    //     var Restock = {
    //         InventoryID: invID,
    //         ItemName: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryName).at(0),
    //         ItemAmount: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryCost).at(0),
    //         Sold: false,
    //         Restocked: true,
    //         numberSR: newNum,
    //         NumofInventory: newNumber,
    //         Clerk: user.FullName,
    //         Date: moment().format('YYYY-MM-DDTHH:mm:ss')
    //     }

    //     axios.put('Restockinventory/RestockInventory', Restock)
    //     .then(res => {
    //         console.log("edited time", res.data)
    //         toast.success(`${"Restocked " + newNum + " Items Successfully!"}`, {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 5000,
    //             theme:'dark'
    //         });
    //         axios.post('addSRLog/addSRLog', Restock)
    //         .then(res => {
    //             var srlog = res.data;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //         axios.get(`getinventory/getInventoryList`)
    // .then((response) => {
    //     setinvList(response.data.filter(inv => inv.isDeleted == false));

    // })
    // .catch((err) => {
    //     console.log(err, "Unable to get user time info");
    // });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    //     console.log("Sold:", Restock);
    //     props.onHide()
    // }

    return (
        <div className='ReportModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width"
                contentClassName="modal-height"
            >

                <Modal.Header closeButton>
                    Restock Items
                </Modal.Header>
                <Modal.Body>
                    {/* <PowerBIEmbed
                    
                        embedConfig={{
                            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                            id: '1db405ab-48e4-49cd-9782-0a6365276607',
                            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=1db405ab-48e4-49cd-9782-0a6365276607&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUNFTlRSQUwtQi1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBRdWVyeURhdGFTYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFQYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFFeHBvcnRUbyI6dHJ1ZX19',
                            accessToken: 'H4sIAAAAAAAEACXTx66DVgAE0H95WyLBBdMiZUExvRkwbUdvpmMuEOXf86LsZzE6o_n7x0mvz5QWP3_-nDOVWE4uyTXTa5qXYpFx7ESce6lQJW4fdkV-E5DX6q9JbKPywGxcvfAwdHVnbtY1Vw5t09XkYQgtKETobe75LI4mjg8qOpGMnZp1sTs2GJfLKKreQeRa3T9sRtwjz1GZfFQH605fl-7AqKQQn8gm7Bgy6PCJjYp7Rta72gECym0VB-61k0TEnJriX4OK898A0mZLYrLS4tC0F0ej0rAgJb5zOP6yzMGSuuqsmS-kghJTFV3pI71IS0l1iib0Oa8AVOFBzhgYJ4z2GHk0eVdYrDaGQTR78w2xgglpuusbfjvn7hx33OpF5VRFj09D6bAqP-q88OsZMC70RkrRQtKoq7uoT4abq2PqkikvZ7sFJidqqpAri0W_Bp12gXWiylW2lq2kZGJKwsLol45EJtQaRTLM0GVpRlNtBBD2qdLjyOaROV82IOvGTqN4Nz7tir4Rzm8eUcOHtpS3KRFmbKyQtdVk-NpJ0e70j7QZfkVthmiXUujOuXZUN6K4RsYXsOAtx66fNX59rNdbb1P2aEnTCGKioLUkjBLciNnKcjyoki1O0f5QGXgkFCcjDd4QDx_Sb3PU52Bl8d5Tbcd1JWUYPo2veq_aQc_4q4ErFjVOA4WovnfcXwrLvyejiqtrRMSewRVnHdNrevkK0Am-NSOiX5QLq5WPQ5w6Pwdip08T7GvJoYEkWJNCPNTNriKw5wssEWLbvonOKDSvgrcjJdgdfpkogl5g3psiXLNhPJ9XTk3-jb3ehHsyIphBYq988ZHrAoV-djzDomsNfO9L4YlVtC0aGAkcT4zB0-xQRgKmbFLCGYhPtkGU6LTQEAR92mj6_PPHj7Be8z7p5fV7Jz9Ynl8pLLSGFr3njh43d3hs0X-5KEWISwPcqcqehFGQ4RcgpEQN7VvVxj6nvhb_xm3uue93NrTO7NQoijTVV4AWdY7HRWBmCTYBresL03H4cP0D2W0tm40qlLXStAWcE6GEA14o8ggCDPKbi2ub6-iiXxmZFdOrkXdk2ntuvNitZh8NBxhV_V7K81VME4e7vSKV-bfCqkk0sVNvmAdqvLvsibf6GzwMTE3YU5M86hiv6Wlo8bvxhHdZ5_fHRLKT4WGByuAN4iKJJLmQHy9xQhjq-b1ZQvRzRtRe2MtF1geq-sjG2ZOnhzAYfClZqgkqUupNmY2SvZy5AjCas09eCoiE-q-__mO-5qZc1eBX2SPpbOG8i6j6ZA7yGBZDbPyf8tp6TPfvWv7GGjKU-25LM4BLzSRQ9godEaZJmBvCZ5ueSvPqtFLmm89LC6WWY3IsUrLyjqwNIvV3Y-3XnvJvliOA0FMDoyzSq9Px0oC7KYIY35ZC-qyF4fupM_aBnUgpz9Z6EuQ3_lEYcZ7KVuq9mwN0uaV7ETrrt7tiym5U1V2wIH2h6mhDX6oRD2EC9eJOvT_ZHPGWycpZTaJmM2AiH3Sl3GScuigllrDRQX4OlwwT6s4dkZ4HFGc_xMpmZkAUnTVMw75aWNI7GhfTlV5fj2G28kwup3ODqOC6o9b-luWOtyvwZAHCQvzdwRg8GyYDw3qPKFUni4QHydMVc4xT2fuAjk1xJSKkpOAv8z__AkpbH1dCBgAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUNFTlRSQUwtQi1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6ZmFsc2V9fQ==',
                            tokenType: models.TokenType.Embed,
                            settings: {
                                panes: {
                                    filters: {
                                        expanded: false,
                                        visible: false
                                    }
                                },
                                background: models.BackgroundType.Default,
                                
                            }
                        }}

                        eventHandlers={
                            new Map([
                                ['loaded', function () { console.log('Report loaded'); }],
                                ['rendered', function () { console.log('Report rendered'); }],
                                ['error', function (event) { console.log(event.detail); }]
                            ])
                        }

                        cssClassName={"report-style-class"}

                        getEmbeddedComponent={(embeddedReport) => {
                            window.report = embeddedReport;
                        }}
                    /> */}
                    {/* <iframe  src="https://app1665116455.boldreports.com/reporting/reports/3af446dd-aeb3-457b-8bfb-4abc5e799273/Altbook/UserSummaryReport?showmyreports=1"  /> */}
                    {/* SECRET: aIMqR2ftbSmuiwsTumJ2wFPxHV80q1U */}

                    <iframe src='https://app1665116455.boldreports.com/reporting/reports/5de0af0e-2be0-46b7-9b17-4971b3b618b3/Altbook/UserReport?isembed=true' id='report-frame' width='100%' height='720px' allowFullscreen frameBorder='0'></iframe>                    </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default ReportModal