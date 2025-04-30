import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QuickstartProvider } from "./Context";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from './Context/AuthProvider'
import axios, {HeadersDefaults} from 'axios';
import './global'
import './App.module.scss'
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reportdesigner.min.css';
//Data-Visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
//Reports react base
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';
import { registerLicense } from '@syncfusion/ej2-base';
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt/QHRqVVhkVVpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jS35adERnWX9Xc3xRQA==;Mgo+DSMBPh8sVXJ0S0J+XE9Af1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdEVqW35acHRcQmBcVw==;ORg4AjUWIQA/Gnt2VVhkQlFaclZJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkdjUH1fdHRVT2RdVUI=;MTEwMjA4OUAzMjMwMmUzNDJlMzBPS0JiMVdiZ0xVU2c2WHkvZ05ISUdMSHMxL0x6bU82aFlyQzd3Zk1CUFBNPQ==;MTEwMjA5MEAzMjMwMmUzNDJlMzBESjFlSnZ3NjNHdVYranZKeGFBZVphVll3d25qSGVTU3pSejJiN3hiM0xBPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtLVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUVhWXZccXBVRmlYVkxw;MTEwMjA5MkAzMjMwMmUzNDJlMzBNZGNIcGdwNHBRNzJFeHZNYVR0dUxhRGVpbC9xZGs5VHJDamRPMVlUMGpFPQ==;MTEwMjA5M0AzMjMwMmUzNDJlMzBTb3gwVWZvMW54TGt3QkkxR29ORS83dFJ4RE9ZRUpBQmFHUmg1YWFVYW5zPQ==;Mgo+DSMBMAY9C3t2VVhkQlFaclZJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkdjUH1fdHRVT2VYV0Y=;MTEwMjA5NUAzMjMwMmUzNDJlMzBFb1pJTC9BU2RNUzNkemRqMFU0bisyNzY0QU5DN010SDFIb0ViM2U1RkdVPQ==;MTEwMjA5NkAzMjMwMmUzNDJlMzBLdUVjbDFFZkdpd1c5NUhsbDZiZ1lUbEUzWjJ2dzJpSjIwTHFVTU1WK1hZPQ==;MTEwMjA5N0AzMjMwMmUzNDJlMzBNZGNIcGdwNHBRNzJFeHZNYVR0dUxhRGVpbC9xZGs5VHJDamRPMVlUMGpFPQ==');

axios.defaults.baseURL ='https://webapi20220126203702.azurewebsites.net/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QuickstartProvider>
        <App />
      </QuickstartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
