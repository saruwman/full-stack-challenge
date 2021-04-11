import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
export default function TableDisplay({ columns, data }) {

    return (
        <>
           
            <div className="complaints">
                <Table dataSource={data} columns={columns} />;
            </div>
        </>
    );
}