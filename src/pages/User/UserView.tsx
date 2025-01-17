import { myRequest } from "@/api/request"
import { User } from "@/types/user"
import { lodash } from "@/utils/common"
import { Button, message, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UserView() {
  const navigate = useNavigate()
  const [dataList, setDataList] = useState<User[]>([])
  const getList = async () => {
    try {
      const res = await myRequest({
        reqType: 'getUserList'
      })
      if (res.code === 200) {
        setDataList(res.data.map((v) => {
          v.key = v.id
          return v
        }))
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const columns: ColumnsType<User> = [
    { title: 'OpenID', dataIndex: 'openid', key: 'openid', align: 'center' },
    { title: '用户名', dataIndex: 'username', key: 'username', align: 'center', width: 300, ellipsis: true },
    { title: '手机号', dataIndex: 'phone', key: 'phone', align: 'center', width: 200 },
    { title: '邀请码', dataIndex: 'invitation_code', key: 'invitation_code', align: 'center', width: 200 },
    { title: '剩余点数', dataIndex: 'count', key: 'count', align: 'center', width: 100 },
    {
      title: '操作', key: 'action', align: 'center', width: 150, render: (_, record, index) => (
        <div className="flex justify-center gap-x-2" key={index}>
          <Button type="primary" onClick={() => onUpdate(record)}>修改</Button>
          <Button type="primary" danger onClick={() => onDelete(record)}>删除</Button>
        </div>
      ),
    }
  ]

  const onUpdate = lodash.debounce((value: User) => {
    navigate('/user/change', { state: value })
  }, 300)
  const onDelete = lodash.debounce(async (value: User) => {
    try {
      const res = await myRequest({
        reqType: 'deleteUserById',
        params: {
          id: value.id
        }
      })
      if (res.code === 200) {
        await getList()
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, 300)

  return (
    <div>
      <Table<User>
        dataSource={dataList}
        columns={columns}
        bordered
      />
    </div>
  )
}