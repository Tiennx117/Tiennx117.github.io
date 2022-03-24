import React from 'react';
import { Link } from 'react-router-dom';
export default class Breadcrumb extends React.Component{
    render(){
        return(
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Title</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item active">Table</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>  
        );
    }
    
}

