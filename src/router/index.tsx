import { asideList } from "@/config/aside.config"
import NotFound from "@/pages/NotFound"
import useUserStore from "@/store"
import { useEffect } from "react"
import { Navigate, NonIndexRouteObject, useLocation, useRoutes } from "react-router-dom"

type ComponetFunc = () => JSX.Element

interface RouteRecordRaw extends NonIndexRouteObject {
  meta?: {
    title?: string,
    requireAuth?: boolean
  },
  children?: RouteRecordRaw[]
}

const routesList: Record<string, ComponetFunc> = import.meta.glob('/src/pages/**/*.tsx', {
  eager: true,
  import: 'default'
})

const routes: RouteRecordRaw[] = asideList.map((v) => {
  function toTitle(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const childRoutes: RouteRecordRaw[] = v.children?.map((v2) => {
    const componetImportRoute = '/src/pages/' + toTitle(v.name) + '/' + toTitle(v2.name) + '.tsx'
    const Page = routesList[componetImportRoute]
    return {
      path: v2.path,
      element: (
        <UserAuth>
          <Page />
        </UserAuth>
      ),
      meta: {
        requireAuth: true,
        title: `${import.meta.env.VITE_TITLE} - ${v2.text}`
      }
    }
  }) || []
  childRoutes.push({
    path: '*',
    element: <NotFound />,
    meta: {
      title: '错误 - 404'
    }
  })
  return {
    path: v.path,
    children: childRoutes
  }
})

export function UserAuth({ children }: { children: JSX.Element }) {
  const auth = useUserStore((state) => state.auth)
  const location = useLocation()
  if (location.pathname === '/' && !auth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  const a = location.pathname.split('/')
  const fRoute = routes.find((v) => a[1] === v.path)
  if (fRoute?.children) {
    const cRoute = fRoute.children.find((v2) => a[2] === v2.path)
    if (cRoute?.meta?.requireAuth) {
      if (!auth) {
        return <Navigate to='/login' state={{ from: location }} replace />
      }
    }
  } else {
    if (fRoute?.meta?.requireAuth) {
      if (!auth) {
        return <Navigate to='/login' state={{ from: location }} replace />
      }
    }
  }

  return children
}

export default function WrapperRouter() {
  const location = useLocation()
  useEffect(() => {
    const a = location.pathname.split('/')
    const fRoute = routes.find((v) => a[1] === v.path)
    if (fRoute?.children) {
      const cRoute = fRoute.children.find((v2) => a[2] === v2.path)
      if (cRoute?.meta?.title) {
        document.title = cRoute.meta.title
      }
    } else {
      if (fRoute?.meta?.title) {
        document.title = fRoute.meta.title
      }
    }
  }, [location.pathname])

  return useRoutes(routes)
}
