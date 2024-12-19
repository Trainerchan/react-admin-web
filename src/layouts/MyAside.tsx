import { asideList } from "@/config/aside.config";
import { MenuProps, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyAside() {
  // 获取导航对象
  const navigate = useNavigate();
  const location = useLocation();
  // 定义选择的key和打开的key
  const selectMenuKeys: string[] = [];
  const openMenuKeys: string[] = [];
  useEffect(() => {
    // 无依赖判断当前的路由
    const pathRoute = location.pathname;
    selectMenuKeys.push(pathRoute);
    openMenuKeys.push('/' + pathRoute.split('/')[1]);
  }, []);

  // 对asideList进行操作，返回指定的menuItems
  const menuItems: MenuProps['items'] = asideList.map((v) => {
    // 判断当前的路由是否相等，相等加入活跃
    if (location.pathname.split('/')[1] === v.path) {
      openMenuKeys.push(`/${v.path}`);
    }
    return {
      icon: React.createElement(v.icon!),
      key: `/${v.path}`,
      label: v.text,
      children: v.children?.filter((v2) => !v2.isNonMenu).map((v2) => {
        if (
          `/${location.pathname.split('/')[2]}/${location.pathname.split('/')[3]}` ===
          `/${v.path}/${v2.path}`
        ) {
          selectMenuKeys.push(`/${v.path}/${v2.path}`);
        }
        return {
          key: `/${v.path}/${v2.path}`,
          label: v2.text,
        };
      }) as MenuProps['items'],
    };
  });
  const handleMenuItemClick = (item: { key: string }) => {
    navigate(item.key);
  };

  return (
    <Sider className="overflow-auto">
      <Menu
        mode="inline"
        className="!h-full"
        defaultSelectedKeys={selectMenuKeys}
        defaultOpenKeys={openMenuKeys}
        items={menuItems}
        onClick={handleMenuItemClick}
      />
    </Sider>
  );
}