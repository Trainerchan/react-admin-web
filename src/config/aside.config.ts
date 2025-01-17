import { AsideItem } from "@/types/aside";
import { TeamOutlined, RobotOutlined, BookOutlined } from "@ant-design/icons";

export const asideList: AsideItem[] = [
  {
    icon: TeamOutlined,
    path: 'user',
    name: 'user',
    text: '用户管理',
    children: [
      {
        path: 'view',
        name: 'userView',
        text: '用户列表'
      },
      {
        path: 'change',
        name: 'userChange',
        text: '用户修改',
        isNonMenu: true
      }
    ]
  },
  {
    icon: BookOutlined,
    path: 'article',
    name: 'article',
    text: '文章管理',
    children: [
      {
        path: 'view',
        name: 'articleView',
        text: '文章列表'
      },
      {
        path: 'add',
        name: 'articleAdd',
        text: '文章添加'
      },
      {
        path: 'change',
        name: 'articleChange',
        text: '文章修改',
        isNonMenu: true
      }
    ]
  },
  {
    icon: RobotOutlined,
    path: 'model',
    name: 'model',
    text: '模型管理',
    children: [
      {
        path: 'view',
        name: 'modelView',
        text: '模型查看'
      },
      {
        path: 'add',
        name: 'modelAdd',
        text: '模型添加'
      },
      {
        path: 'change',
        name: 'modelChange',
        text: '模型修改',
        isNonMenu: true
      }
    ]
  },
]