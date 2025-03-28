import { CircleUser, Bell, Lock, Star, ShieldBan, CircleOff, MessageCircle, AtSign, Repeat2, ALargeSmall, BellOff, Youtube, HeartOff, Crown, ArrowDownFromLine, Languages, Laptop, House, ChartColumnIncreasing, LifeBuoy, GlobeLock, User, ArrowLeft } from "lucide-react"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/ui/sidebar"
import { Link, Outlet } from 'react-router'

const items = [
	{
		title: "Настройки безопасности для подростков",
		url: "#",
		icon: CircleUser,
	},
	{
		title: "Редактировать профиль",
		url: "#",
		icon: CircleUser,
	},
	{
		title: "Уведомление",
		url: "#",
		icon: Bell,
	},
	{
		title: "Конфиденциальность",
		url: "#",
		icon: Lock,
	},
	{
		title: "Близкие друзья",
		url: "#",
		icon: Star,
	},
	{
		title: "Заблокированные",
		url: "#",
		icon: ShieldBan,
	},
	{
		title: "Скрывать историю и эфиры",
		url: "#",
		icon: CircleOff,
	},
	{
		title: "Сообщение и ответы на истории",
		url: "#",
		icon: MessageCircle,
	},
	{
		title: "Метки и упоминания",
		url: "#",
		icon: AtSign,
	},
	{
		title: "Коментарии",
		url: "/comments",
		icon: MessageCircle,
	},
	{
		title: "Настройкт репостов",
		url: "#",
		icon: Repeat2,
	},
	{
		title: "Аккаунты с ограничениями",
		url: "#",
		icon: CircleUser,
	},
	{
		title: "Скрытые слова",
		url: "/hidden_words",
		icon: ALargeSmall,
	},
	{
		title: "Скрытые аккаунты",
		url: "#",
		icon: BellOff,
	},
	{
		title: "Настройки контента",
		url: "#",
		icon: Youtube,
	},
	{
		title: `Число отметок "Нравится" и репостов`,
		url: "#",
		icon: HeartOff,
	},
	{
		title: "Платные подписки",
		url: "#",
		icon: Crown,
	},
	{
		title: "Архивирование и скачивание",
		url: "#",
		icon: ArrowDownFromLine,
	},
	{
		title: "Язык",
		url: "#",
		icon: Languages,
	},
	{
		title: "Разрешение сайта",
		url: "#",
		icon: Laptop,
	},
	{
		title: "Родительский контроль",
		url: "#",
		icon: House,
	},
	{
		title: "Тип аккаунта и инмтрументы",
		url: "#",
		icon: ChartColumnIncreasing,
	},
	{
		title: "Помошь",
		url: "/help",
		icon: LifeBuoy,
	},
	{
		title: "Центр конфиденциальности",
		url: "#",
		icon: GlobeLock,
	},
	{
		title: "Статус аккаунта",
		url: "#",
		icon: User,
	},
]



export const SettingsSidebar = () => {
	return (

		<div className='flex justify-between'>
			<Sidebar className='ml-[320px]'>
				<SidebarContent>
					<SidebarGroup>
						<div className='flex'>
							<SidebarGroupLabel className='text-[30px] mb-[40px]'>Настройки</SidebarGroupLabel>
							<SidebarGroupLabel className='mt-[5px] ml-[60px] cursor-pointer'><Link to={"/"}><ArrowLeft /></Link></SidebarGroupLabel>
						</div>
						<p className='text-[gray] ml-[10px]'>Для вас</p>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link to={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<Outlet />
		</div>
	)
}
export default SettingsSidebar