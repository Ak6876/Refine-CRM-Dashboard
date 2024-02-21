import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";
//path definition that will help refine recognize actions,
//actions are paths that can be used for crud operations on specific resource 
export const resources: IResourceItem[] = [
    /**
     * A resource is Refine performs these actions:
     * list -> get all records (Read)
     * show -> get a single records (Read)
     * create -> create a record (Update)
     * delete -> delete a record (Delete)
     * or clone
     */
    {
        name:'dashboard',
        list:'/',
        meta:{
            label:'Dashboard',
            icon:<DashboardOutlined/>
        },
    },
    {
        name:'Companies',
        list:'/companies',
        show:'/companies/:id',
        create:'/companies/new',
        edit:'/companies/edit/:id',
        meta:{
            label:'Companies',
            icon:<ShopOutlined/>
        }
    },
    {
        name:'tasks',
        list:'/tasks',
        create:'/tasks/new',
        edit:'/tasks/edit/:id',
        meta:{
            label:'Tasks',
            icon:<ProjectOutlined/>
        }
    },
]