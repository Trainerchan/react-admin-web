import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import { myRequest } from "@/api/request";
import { message, Image, Button, Table, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { lodash } from "@/utils/common";
export default function ArticleView() {
  const [dataList, setDataList] = useState<Article[]>([]);

  const getList = async () => {
    try {
      const res = await myRequest({
        reqType: 'getArticleList'
      });
      if (res.code === 200) {
        setDataList(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  const columns: ColumnsType<Article> = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center', width: 60 },
    { title: '标题', dataIndex: 'title', key: 'title', align: 'center', width: 200, ellipsis: true },
    { title: '作者', dataIndex: 'author', key: 'author', align: 'center', width: 120, ellipsis: true },
    {
      title: '封面', dataIndex: 'cover', key: 'cover', align: 'center', width: 100,
      render: (_, record, index) => (
        <Image key={index} src={record.cover} width={100} />
      )
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', align: 'center', width: 130 },
    { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt', align: 'center', width: 130 },
    { title: '删除时间', dataIndex: 'deletedAt', key: 'deletedAt', align: 'center', width: 130 },
    {
      title: '操作', key: 'action', align: 'center', width: 120,
      render: (_, record, index) => (
        <div className="flex justify-center gap-x-2" key={index}>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            修改
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            删除
          </Button>
        </div>
      )
    }
  ];

  const handleUpdate = lodash.debounce((record: Article) => {
    console.log(record);
  }, 300);

  const handleDelete = lodash.debounce((record: Article) => {
    Modal.confirm({
      title: '确定要删除吗？',
      content: '删除后将无法恢复',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          const res = await myRequest({
            reqType: "deleteArticleByIds",
            data: {
              ids: [record.id]
            }
          });
          if (res.code === 200) {
            await getList();
            message.success(res.message);
          } else {
            message.error(res.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  }, 300)

  return (
    <div>
      <Table<Article>
        dataSource={dataList}
        columns={columns}
        bordered />
    </div>
  )
}
