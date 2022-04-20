import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io'; 
import * as RiIcons from 'react-icons/ri';

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
        icon: <IoIcons.IoIosAlbums />, 
        cName: 'nav-text' 
    },
    
    { 
        title: 'Units', 
        path: '/units', 
        icon: <IoIcons.IoIosBulb />,
        iconClosed:<RiIcons.RiArrowDownFill />,
        iconOpened:<RiIcons.RiArrowUpFill />,
        
        subNav:[
            {
                title:'RegisterOwner',
                path:'/units/registerowner',
                icon:<IoIcons.IoMdHome />,
                cName:'sub-nav'
            },
            {
                title:'RegisterOccupier',
                path:'/units/registeroccupier',
                icon:<IoIcons.IoIosFemale/>
            }
        ]
        
    }, 
    
    
    
    { 
        title: 'Committee', 
        path: '/committee', 
        icon: <FaIcons.FaIndustry />,
        
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


    

    
        
];