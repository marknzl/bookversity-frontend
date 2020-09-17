import React from 'react';
import IFilterBoxProps from '../../types/Props/IFilterBoxProps';

function FilterBox(props: IFilterBoxProps) {
    return (
        <div className="col-sm-3">
            <div className="card mt-3 border-dark">
                <h5 className="card-header bg-dark text-white">Filters</h5>
                <div className="card-body">
                    <label htmlFor="search-bar">Search:</label>
                    <input className="form-control mb-3" placeholder="Search..." name="search-bar" onChange={e => props.handleSearchFunc(e.target.value)}></input>

                    {/* <label>By Faculty:</label>
                    <div>
                        <a href="Science" onClick={onFacultyClick}><span className="ml-1 badge badge-secondary">Science<button type="button" className="close"></button></span></a>
                        <span className="ml-1 badge badge-secondary">Engineering</span>
                        <span className="ml-1 badge badge-secondary">Business</span>
                        <span className="ml-1 badge badge-secondary">Arts</span>
                        <span className="ml-1 badge badge-secondary">Medical and Health Science</span>
                        <span className="ml-1 badge badge-secondary">Law</span>
                        <span className="ml-1 badge badge-secondary">Education and Social Work</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default FilterBox;