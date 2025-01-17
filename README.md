# react-admin模板
react-router  typescript zustand Ant-Design tailwindcss axios

1. 自定义封了request请求，包含请求拦截，响应拦截，包含类型推导，params data参数类型推导，response响应类型推导
2. 自定义路由中间件，userAuth验证组件，路由自定义获取无需手动添加，只需更新aside.config.ts, 该中间件需要加入token校验，后端有/autologin接口，目前仅仅判断静态变量，后续需要改为动态获取
3. pages创建页面，需根据规则：ModuleName+"View|Change|Add"，后面表示查看，修改，增加，前面是模块名称, 然后到、config/aside.config.ts中添加路由