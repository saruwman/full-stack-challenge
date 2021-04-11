import { allComplaints,closedComplaints,openComplaints,constituentsComplaints} from '../../services/Complaints';
import React, { useEffect, useState } from 'react';
import {  PageHeader, Button,Badge } from 'antd';
import ComplaintTable from "./TableDisplay"
import 'antd/dist/antd.css';
export default function Dashboard() {
    const [complaints, setComplaints] = useState([]);
    const [activeTab, setActiveTab] = useState([]);
    const [title, setTitle] = useState([]);
    const columns = [
        {
            title: 'Type',
            dataIndex: 'complaint_type',
            key: 'type',
        },
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'acc',
        },
        {
            title: 'Description',
            dataIndex: 'descriptor',
            key: 'desc',
        },
        {
            title: 'Zip',
            dataIndex: 'zip',
            key: 'zip',
        },
        {
            title: 'Borough',
            dataIndex: 'borouh',
            key: 'borough',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Council District',
            dataIndex: 'council_dist',
            key: 'dist',
        },
        {
            title: 'Community Board',
            dataIndex: 'community_board',
            key: 'board',
        },
        {
            title: 'Opening date',
            dataIndex: 'opendate',
            key: 'opendate',
        },
       {
            title: 'Closing date',
            dataIndex: 'closedate',
            key: 'closedate',
        },
    ];
    const titles=[{
        title:"All complaints",
        subTitle:"within the district"
    },
    {
        title:"All active complaints",
        subTitle:"within the district"
    },
    {
        title:"All closed complaints",
        subTitle:"within the district"
    },
    {
        title:"All complaints by constituents",
        subTitle:"within the district"
    }
]
    useEffect(() => {
        let mounted = true;
        if(activeTab.length==0){ 
            setActiveTab("all");
            setTitle(titles[0]);
            allComplaints()
        .then(items => {
            if (mounted) {
                setComplaints(items)
            }
        })}
        return () => mounted = false;
    }, [])
    const changeTab=tab=>{
        switch(tab){
            case "all":
                setActiveTab("all");
            setTitle(titles[0])

                allComplaints()
                    .then(items => {
                            setComplaints(items)
                    })
                break;
            case "open":
                setActiveTab("open");
            setTitle(titles[1])

                openComplaints()
                .then(items => {
                  
                        setComplaints(items)
                
                })
                break;
            case "close":
                setActiveTab("close");
            setTitle(titles[2])

                closedComplaints()
                .then(items => {
                    setComplaints(items)
                    
                })
            break;
            case "constituents":
                setActiveTab("constituents");
            setTitle(titles[3])

            constituentsComplaints()
                .then(items => {
                    setComplaints(items)
                    
                })
            break;
    }

    }

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<> <Badge count={complaints.length} className="site-badge-count-109"
                style={{ backgroundColor: '#52c41a' ,marginRight:"10px"}}
                showZero
             />
             {title.title}
            </>}
                subTitle={title.subTitle}
                extra={[

                    <Button  onClick={e=>changeTab("all")} key="1" type={activeTab=="all"?"primary":""}>
                        All complaints
                    
    </Button>,
                    <Button key="2" onClick={e=>changeTab("open")} type={activeTab=="open"?"primary":""}>Open Complaints</Button>,
                    <Button key="3" onClick={e=>changeTab("close") } type={activeTab=="close"?"primary":""}>Closed Complaints</Button>,
                    <Button key="4" onClick={e=>changeTab("constituents") } type={activeTab=="constituents"?"primary":""}>Complaints by my constituents</Button>,

                ]}
            > </PageHeader>
            <div className="complaints">
               <ComplaintTable columns={columns} data={complaints} />
            </div>
        </>
    );
}