import { myRequest } from "@/api/request";
import { VerifyCodeType } from "@/types/verify";
import { Button, message } from "antd";
import { useState, useEffect, useRef } from "react";

interface VerifyButtonProps {
  email: string;
  codeType: VerifyCodeType;
  className?: string;
}

export default function VerifyButton({ email, codeType, className }: VerifyButtonProps) {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [verifyText, setVerifyText] = useState<string>('获取验证码');
  const timerRef = useRef<NodeJS.Timeout>(); // 用于存储定时器引用

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    if (!email) {
      message.warning('邮箱不能为空');
      return;
    }
    try {
      const res = await myRequest({
        reqType: 'sendEmailVerifyCode',
        data: {
          email,
          codeType
        }
      });
      if (res.code === 200) {
        message.success(res.message);
        setDisabled(true);
        let countdown = 60;

        // 清除可能存在的旧定时器
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        // 设置新的定时器
        timerRef.current = setInterval(() => {
          countdown -= 1;
          if (countdown === 0) {
            clearInterval(timerRef.current);
            setDisabled(false);
            setVerifyText('获取验证码');
          } else {
            setVerifyText(`${countdown}s`);
          }
        }, 1000);

        setVerifyText('60s');
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Button className={className} disabled={disabled} type="primary" onClick={handleClick}>{verifyText}</Button>
  );
}
