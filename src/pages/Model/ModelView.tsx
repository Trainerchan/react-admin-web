import { useState, useEffect } from "react";
import { Select, Table, Button, Image, message } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ColumnsType } from "antd/es/table";
import { myRequest } from "@/api/request";
import { Model } from "@/types/model";
import { lodash } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import { Category } from "@/types/category";

export default function ModelView() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<Model[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(); // 初始选中值

  const getList = async (categoryId: number) => {
    try {
      const res = await myRequest({
        reqType: 'searchModelByCategoryId',
        params: {
          id: categoryId
        }
      });
      if (res.data === 200) {
        setDataList(
          res.response.map((v) => {
            v.key = v.ID;
            return v;
          })
        );
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryList = async () => {
    try {
      const res = await myRequest({
        reqType: "getCategoryList",
      });
      if (res.data === 200) {
        await getList(res.response[0].ID)
        setCategoryList(
          res.response.map((v) => {
            v.key = v.ID;
            return v;
          })
        );
        const optionData = res.response.map((v) => ({
          value: v.ID,
          label: v.name,
        }));
        setOptions(optionData);

        // 设置默认选中值（例如第一个选项）
        if (optionData.length > 0) {
          setSelectedValue(optionData[0].value);
        }
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const onSelectChange = async (value: number) => {
    console.log("选中的值:", value);
    await getList(value)
    setSelectedValue(value); // 更新选中值
  };

  const idToName = (id: number) => {
    return categoryList.find((v) => v.ID === id)?.name || "";
  };

  const columns: ColumnsType<Model> = [
    { title: "模型ID", dataIndex: "ID", key: "ID", align: "center", width: 80 },
    {
      title: "模型名称",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 200,
      ellipsis: true,
    },
    {
      title: "模型分类",
      dataIndex: "class_id",
      key: "class",
      align: "center",
      width: 100,
      render: (_, record, index) => (
        <div key={index}>{idToName(record.class_id)}</div>
      ),
    },
    {
      title: "模型Logo",
      dataIndex: "logo",
      key: "logo",
      align: "center",
      render: (_, record, index) => (
        <Image src={record.logo} key={index} width={150} />
      ),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record, index) => (
        <div className="flex justify-center gap-x-2" key={index}>
          <Button type="primary" onClick={() => onUpdate(record)}>
            修改
          </Button>
          <Button type="primary" danger onClick={() => onDelete(record)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  const onUpdate = lodash.debounce((value: Model) => {
    navigate("/model/change", { state: value });
  }, 300);

  const onDelete = lodash.debounce(async (value: Model) => {
    try {
      const res = await myRequest({
        reqType: "deleteModelById",
        params: { id: value.ID },
      });
      if (res.data === 200) {
        await getList(selectedValue!);
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, 300);

  return (
    <div>
      <div className="flex p-4 gap-x-2 items-center bg-white">
        模型分类:
        <Select
          className="w-32"
          value={selectedValue} // 当前选中的值
          options={options} // 选项列表
          onChange={onSelectChange} // 选择事件
          placeholder="请选择分类"
        />
      </div>
      <Table<Model> dataSource={dataList} columns={columns} bordered />
    </div>
  );
}
