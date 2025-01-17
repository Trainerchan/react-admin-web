import WrapperRouter from "@/router";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import MyAside from "./MyAside";
import MyHeader from "./MyHeader";

export default function DashboardLayout() {
  return (
    <Layout className="h-full">
      <MyHeader />
      <Layout>
        <MyAside />
        <Layout className="p-4">
          <Content
            className='overflow-auto bg-white p-4'
          >
            <WrapperRouter />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}