import { closedComplaints, openComplaints, topComplaints } from '../../services/Complaints';
import React, { useEffect, useState } from 'react';
import { PageHeader, Statistic, Button, Descriptions, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import Logout from "../Logout/Logout"
import ComplaintTable from "./TableDisplay"
import 'antd/dist/antd.css';
export default function ComplaintOverview() {

    const { TabPane } = Tabs;
    const [topComplaintsTypes, setTopComplaintsTypes] = useState([]);
    const [openCases, setOpenCases] = useState([]);
    const [closedCases, setClosedCases] = useState([]);
    let history = useHistory();

    const columns = [
        {
            title: 'Type',
            dataIndex: 'complaint_type',
            key: 'type',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        }

    ]
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            closedComplaints()
                .then(items => {
                    setClosedCases(items.length)
                })
            openComplaints()
                .then(items => {
                    setOpenCases(items.length)
                })
            topComplaints().then(items => { setTopComplaintsTypes(items) })
        }
        return () => mounted = false;
    }, [])

    return (
        <>
        <Logout />
            <PageHeader
                className="site-page-header-responsive"
                title="General overview of district complaints"
                subTitle="within the district"
                extra={[
                    <Button key="3" onClick={() => history.push('/dashboard')}>Dashboard</Button>,

                ]}
                footer={
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Top complaints types" key="1" />
                    </Tabs>
                }
            >
                <div className="content">

                    <div className="extra"><div
                        style={{
                            display: 'flex',
                            width: 'max-content',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Statistic
                            title="Open Cases"
                            value={openCases}
                            style={{
                                marginRight: 32,
                            }}
                        />
                        <Statistic title="Closed cases" value={closedCases} />
                    </div></div>
                </div>
            </PageHeader>


            <div className="complaints">
                <ComplaintTable columns={columns} data={topComplaintsTypes} />
            </div>
        </>
    );
}