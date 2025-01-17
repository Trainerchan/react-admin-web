import { myRequest } from "@/api/request"
import { User, UserForm } from "@/types/user"
import { lodash } from "@/utils/common"
import { Button, Form, Input, message } from "antd"
import { useEffect } from "react"
import { useLocation, Location, useNavigate } from "react-router-dom"

export default function UserChange() {
  const navigate = useNavigate()
  const { state } = useLocation() as Location<User>
  const [form] = Form.useForm<UserForm>()
  const onSubmit = lodash.debounce(async (values: UserForm) => {
    try {
      const res = await myRequest({
        reqType: 'updateAndAddUser',
        data: {
          id: state.id,
          ...values,
        }
      })
      if (res.code === 200) {
        message.success(res.message)
        navigate('/user/view')
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, 300)

  useEffect(() => {
    if (state) {
      form.setFieldsValue(state)
    }
  }, [state, form])

  return (
    <div>
      <Form
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item<UserForm>
          name='username'
          label='用户名'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UserForm>
          name='phone'
          label='手机号'
          rules={[{ required: true, message: '手机号不能为空' }]}

        >
          <Input />
        </Form.Item>
        <Form.Item<UserForm>
          name='count'
          label='剩余点数'
          rules={[{ required: true, message: '剩余点数不能为空' }]}

        >
          <Input />
        </Form.Item>
        <Form.Item<UserForm>
          name='invitation_code'
          label='邀请码'
          rules={[{ required: true, message: '邀请码不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">确 认 修 改</Button>
        </Form.Item>
      </Form>
    </div>
  )
}