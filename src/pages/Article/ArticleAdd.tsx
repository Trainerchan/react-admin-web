import { myRequest } from "@/api/request"
import { ArticleForm } from "@/types/article"
import { lodash } from "@/utils/common"
import { Button, Form, Input, message } from "antd"

export default function ArticleAdd() {
  const [form] = Form.useForm<ArticleForm>()
  const imgList = [
    'https://pic4.zhimg.com/v2-845988445f6dbdeceeaf82deea4fcedf_r.jpg',
    'https://pic3.zhimg.com/v2-36d081796a647c4dab804f13aa7f5a57_r.jpg',
    'https://ts1.cn.mm.bing.net/th/id/R-C.9371529cc125f81ef35ce288306e9824?rik=ZLL04ocTCByWnw&riu=http%3a%2f%2fwww.10wallpaper.com%2fwallpaper%2f1366x768%2f1508%2fWindows_10_System_Desktop_Wallpaper_02_1366x768.jpg&ehk=mmFh34hNK%2bfbHgAKqvyuB3InW1tLIwzs06Z0j4ulThE%3d&risl=&pid=ImgRaw&r=0',
    'https://img-blog.csdnimg.cn/20191104201102880.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZseV93dA==,size_16,color_FFFFFF,t_70'
  ]
  const handleSubmit = lodash.debounce(() => {
    form.validateFields().then(async (values) => {
      values.cover = imgList[Math.floor(Math.random() * imgList.length)];
      console.log(values)
      try {
        const res = await myRequest({
          reqType: 'addArticle',
          data: values
        })
        console.log(res)
        if (res.code === 200) {
          message.success(res.message)
        } else {
          message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }, 300)
  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item<ArticleForm>
          label="标题"
          name="title"
          rules={[{ required: true, message: '标题不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<ArticleForm>
          label="作者"
          name="author"
          rules={[{ required: true, message: '作者不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<ArticleForm>
          label="内容"
          name="content"
          rules={[{ required: true, message: '内容不能为空' }]}
        >
          <Input.TextArea autoSize={{ minRows: 10, maxRows: 10 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">确 认 添 加</Button>
        </Form.Item>
      </Form>
    </div>
  )
}