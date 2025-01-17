import { myRequest } from '@/api/request';
import useUserStore from '@/store';
import {
  LockOutlined,
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { lodash } from '@/utils/common';
import { LoginForm } from '@/types/user';
import { useEffect } from 'react';
import VerifyButton from '@/components/VerifyButton';


export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginForm>();
  const verifyEmail = Form.useWatch('email', form);
  const setUserStore = useUserStore((state) => state.setUser);
  const setUserAuth = useUserStore((state) => state.setAuth);
  // submit handler
  const handlerSubmit = lodash.debounce(async (values) => {
    try {
      const res = await myRequest({
        reqType: 'adminLogin',
        data: values
      });
      if (res.code === 200) {
        setUserStore(res.data);
        setUserAuth(true)
        message.success(res.message);
        navigate('/user/view');
      } else {
        message.error('Login Failed: ' + res.message);
      }
    } catch (error) {
      console.log('Login Failed: ', error);
    }
  }, 300)

  useEffect(() => {
    document.title = `${import.meta.env.VITE_TITLE} - 登录`
  }, [])
  return (
    <div className={styles.container}>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={handlerSubmit}
        style={{
          width: '350px',
          background: '#fff',
          padding: '2rem',
          borderRadius: '6px',
        }}
      >
        <h1 className="mb-5 text-center text-xl font-bold">管 理 员 登 录</h1>
        <Form.Item<LoginForm>
          name="email"
          rules={[{ required: true, message: '邮箱不能为空.' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="管理员邮箱." />
        </Form.Item>

        <Form.Item<LoginForm>
          name="password"
          rules={[{ required: true, message: '密码不能为空.' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            autoComplete="off"
            placeholder="管理员密码"
          />
        </Form.Item>
        <Form.Item<LoginForm>
          name="verifyCode"
          rules={[{ required: true, message: '验证码不能为空.' }]}
        >
          <div className='flex gap-x-2'>
            <Input className='w-3/5' prefix={<KeyOutlined />} placeholder="验证码" />
            <VerifyButton className='flex-1' email={verifyEmail} codeType='LOGIN' />
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登 录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
