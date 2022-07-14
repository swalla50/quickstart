import React from "react"
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement"

const SkeletonProject = ({ theme }) => {
    const themeClass = theme || 'light';

    return (
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-project">
                <SkeletonElement type="title" />
                <SkeletonElement type="description" />
                <SkeletonElement type="lasttask" />
                <SkeletonElement type="taskassignee" />
                <SkeletonElement type="progress" />
                <SkeletonElement type="percent" />
            </div>
            <Shimmer/>
        </div>
    )
}

export default SkeletonProject