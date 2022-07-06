import React from 'react'
import { Tabs,Sonnet } from 'react-bootstrap'
import LineChart from '../ChartJS/LineChart'
import LineChartMonth from '../ChartJS/LineChartMonth'
import LineChartYear from '../ChartJS/LineChartYear'
import './Tabs.css'
function Tab() {
    return (
        <Tabs defaultActiveKey="7 Day" id="uncontrolled-tab-example" >
            <Tab eventKey="7 Day" title="7 Day" className="7-day-tab">
                <LineChart className="BarChart"/>
            </Tab>
            <Tab eventKey="Month" title="Month" className="month-tab">
               <LineChartMonth className='BarChart'/>
            </Tab>
            <Tab eventKey="Year" title="Year" className="year-tab">
                <LineChartYear className='BarChart' />
            </Tab>
        </Tabs>
    )
}

export default Tab