import { myRequest } from "@/api/request"
import { MAX_FILE_SIZE } from "@/config/base.config"
import { UploadResponse } from "@/types/http"
import { Model, ModelForm } from "@/types/model"
import { lodash } from "@/utils/common"
import { PlusOutlined } from "@ant-design/icons"
import { message, Input, Button, Form, Upload, UploadFile, Image, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { RcFile, UploadProps } from "antd/es/upload"
import { useEffect, useState } from "react"
import { useLocation, Location, useNavigate } from "react-router-dom"

type BeforeUploadValueType = void | boolean | string | Blob | File

const onUploadFile = (e: any) => {
  if (e.file.status === 'done') {
    return e.file.response.response.url
  }
};

export default function ModelChange() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const { state } = useLocation() as Location<Model>
  const [form] = Form.useForm<ModelForm>()
  const [uploadList, setUploadList] = useState<UploadFile<UploadResponse>[]>([])
  const [optionList, setOptionList] = useState<DefaultOptionType[]>([])

  const getCategoryList = async () => {
    try {
      const res = await myRequest({
        reqType: 'getCategoryList'
      })
      if (res.data === 200) {
        setOptionList(res.response.map((v) => {
          return {
            value: v.ID,
            label: v.name
          }
        }))
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = lodash.debounce(async (values: ModelForm) => {
    try {
      const res = await myRequest({
        reqType: 'updateAndAddModel',
        data: {
          id: state.ID,
          ...values
        }
      })
      if (res.data === 200) {
        message.success(res.message)
        navigate('/model/view')
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, 300)

  useEffect(() => {
    getCategoryList()
  }, [])

  useEffect(() => {
    if (state) {
      console.log(state)
      form.setFieldsValue(state)

      if (state.logo) {
        setUploadList([
          {
            uid: '-1',
            name: state.name,
            status: 'done',
            url: state.logo
          }
        ])
      }
    }
  }, [state, form])

  const beforeUpload: ((file: RcFile, fileList: RcFile[]) => BeforeUploadValueType | Promise<BeforeUploadValueType>) | undefined = (file) => {
    return new Promise((resolve) => {
      if (uploadList.find((v) => v.name === file.name)) {
        message.warning('所选图片已存在.')
        return Upload.LIST_IGNORE
      }
      if (file.size > MAX_FILE_SIZE) {
        message.error('图片大小超过50MB!')
        return Upload.LIST_IGNORE
      }
      return resolve(file)
    })
  }

  const onUploadChange: UploadProps<UploadResponse>['onChange'] = ({ fileList }) => {
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.response.url
      }
      return file
    })
    setUploadList(fileList)
  }

  const onPreviewImg: UploadProps<UploadResponse>['onPreview'] = (file) => {
    setPreviewUrl(file.url!)
    setVisible(true)
  }

  return (
    <div className="p-4 bg-white">
      <Form
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item<ModelForm>
          name='name'
          label='模型名称'
          rules={[{ required: true, message: '模型名称不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<ModelForm>
          name='class_id'
          label="模型分类"
          rules={[{ required: true, message: '模型分类不能为空' }]}

        >
          <Select
            options={optionList}>
          </Select>
        </Form.Item>
        <Form.Item<ModelForm>
          name='logo'
          label='模型logo'
          rules={[{ required: true, message: '模型logo不能为空' }]}
          valuePropName="url"
          getValueFromEvent={onUploadFile}

        >
          <Upload
            action='/api/upload'
            listType='picture-card'
            maxCount={1}
            accept=".jpg,.jpeg,.png"
            beforeUpload={beforeUpload}
            onChange={onUploadChange}
            onPreview={onPreviewImg}
            fileList={uploadList}
          >
            {uploadList.length >= 1 ? null : <button className="w-40 aspect-square bg-slate-200 rounded" type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>}

          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">确 认 修 改</Button>
        </Form.Item>
      </Form>
      <Image
        width={200}
        style={{ display: 'none' }}
        src={previewUrl}
        preview={{
          visible,
          src: previewUrl,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </div>
  )
}