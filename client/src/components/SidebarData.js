import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io'; 
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md'
export const SidebarData = [ 
    { 
        title: 'Home', 
        path: '/admin/dashboard', 
        icon: <AiIcons.AiFillHome />, 
        cName: 'nav-text' 
    },
    
    { 
        title: 'Society  ', 
        path: '/society', 
        icon: <FaIcons.FaBuilding />, 
        cName: 'nav-text' 
    },
    
    { 
        title: 'Units', 
        path: '/units', 
        icon: <RiIcons.RiCommunityFill />,
        iconClosed:<RiIcons.RiArrowDownFill />,
        iconOpened:<RiIcons.RiArrowUpFill />,
        
        subNav:[
            {
                title:'RegisterOwner',
                path:'/units/registerowner',
                icon:<AiIcons.AiTwotoneCrown />,
                cName:'sub-nav'
            },
            {
                title:'RegisterOccupier',
                path:'/units/registeroccupier',
                icon:<GrIcons.GrUserAdmin/>
            }
        ]
        
    }, 
    
    
    
    { 
        title: 'Committee', 
        path: '/committee', 
        icon: <SiIcons.SiHomeassistantcommunitystore />,
        
        iconClosed:<RiIcons.RiArrowDownSFill/>,
        iconOpened:<RiIcons.RiArrowUpSFill/>,

        subNav:[
            {
                title:'Committee Role',
                path:'/committee/committeerole',
                icon:<IoIcons.IoIosPerson/>
            },

            {
                title:'Committees',
                path:'/committee/committees',
                icon:<IoIcons.IoIosPeople/>
            },
        ]
        
    },
    {
        title:"Invoice",
        path:"/invoice",
        icon: <FaIcons.FaFileInvoice />
    },
    {
        title:"Payment Entry",
        path:"/payment",
        icon: <MdIcons.MdPayment />
    }

    

    
        
];