const isProd = process.env.NODE_ENV === 'production'

export const ASSETS = isProd ? '/zyrresume/assets/' : '/assets/'

export const projects = [
  {
    no: '01',
    name: '真探官——作者等级体系',
    type: 'C端/成长体系',
    role: '你的角色 · 项目阶段',
    result: '项目亮点结果',
    cover: 'project-covers/placeholder-01.webp',
  },
  {
    no: '02',
    name: '美团——境外官网设计',
    type: '项目类型/所属领域',
    role: '你的角色 · 项目阶段',
    result: '项目亮点结果',
    cover: 'project-covers/project-02.webp',
  },
  {
    no: '03',
    name: '占位项目名称三',
    type: '项目类型/所属领域',
    role: '你的角色 · 项目阶段',
    result: '项目亮点结果',
    cover: 'project-covers/placeholder-03.webp',
  },
  {
    no: '04',
    name: '占位项目名称四',
    type: '项目类型/所属领域',
    role: '你的角色 · 项目阶段',
    result: '项目亮点结果',
    cover: 'project-covers/project-04.webp',
  },
  {
    no: '05',
    name: '占位项目名称五',
    type: '项目类型/所属领域',
    role: '你的角色 · 项目阶段',
    result: '项目亮点结果',
    cover: 'project-covers/placeholder-05.webp',
  },
]

export const contactCards = [
  {
    icon: 'about/contact-email.webp',
    value: '474005527@qq.com',
    href: 'mailto:474005527@qq.com',
  },
  {
    icon: 'about/contact-phone.webp',
    value: '13325360090',
    href: 'tel:13325360090',
    featured: true,
  },
  {
    icon: 'about/contact-wechat.webp',
    value: 'VAsh03113',
    href: '#about',
  },
]

export const navLinks = [
  ['About', '#about'],
  ['Work', '#work'],
  ['Capabilities', '#capabilities'],
]

export const capabilities = [
  { title: '能力标题一', en: 'ONE' },
  { title: '能力标题二', en: 'TWO' },
  { title: '能力标题三', en: 'THREE' },
  { title: '能力标题四', en: 'FOUR' },
]
