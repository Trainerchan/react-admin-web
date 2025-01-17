import useUserStore from "@/store";
import { lodash } from "@/utils/common";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { message, MenuProps, Dropdown, Avatar, Modal } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import LogoImg from '@/assets/logo.jpg'
import { myRequest } from "@/api/request";
import { Session } from "@/utils/storage";

export default function MyHeader() {

  const navigate = useNavigate();
  const userData = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.reset)

  // 注销登录
  const logout = lodash.debounce(async () => {
    Modal.confirm({
      title: '提示',
      content: '确认注销？',
      okText: '确认',
      cancelText: '取消',
      onOk: async (close) => {
        try {
          const res = await myRequest({
            reqType: 'logout',
          });
          if (res.code === 200) {
            resetUser()
            Session.clear()
            message.success(res.message);
            close()
            navigate('/login');
          } else {
            message.error(res.message);
          }
        } catch (error) {
          console.log('注销出错: ', error);
        }
      }
    })
  }, 300);


  const dropItems: MenuProps['items'] = [
    {
      key: '1',
      label: '注销登录',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Header className="flex items-center justify-between px-4">
      <div className="font-bold text-white">
        <Avatar src={LogoImg} />
        <span>艺境Arttime管理后台</span>
      </div>
      <Dropdown menu={{ items: dropItems }}>
        <div className="flex items-center gap-x-3">
          <Avatar src={userData.avatarUrl} />
          <span className="text-slate-100">{userData.username}</span>
          <DownOutlined className="text-slate-100" />
        </div>
      </Dropdown>
    </Header>
  )
}