export type AsideItem = {
  icon?: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >
  path: string
  name: string
  text: string
  // 是否menu展示
  isNonMenu?: boolean
  children?: AsideItem[]
}