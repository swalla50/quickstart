import React from "react"
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement"

const SkeletonTable = ({ theme }) => {
    const themeClass = theme || 'light';

    return (
        <div className={`skeleton-wrapper-table ${themeClass}`}>
            <div className="skeleton-table">
                <SkeletonElement type="tablerow" />
                <SkeletonElement type="button1" />
                <SkeletonElement type="button2" />
            </div>
            <Shimmer/>
        </div>
    )
}

export default SkeletonTable