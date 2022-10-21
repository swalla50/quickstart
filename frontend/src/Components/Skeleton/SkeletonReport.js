import React from "react"
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement"

const SkeletonReport = ({ theme }) => {
    const themeClass = theme || 'light';

    return (
        <div className={`skeleton-wrapper-report ${themeClass}`}>
            <div className="report-row">
                <SkeletonElement type="report-row" />
            </div>
            <Shimmer/>
        </div>
    )
}

export default SkeletonReport