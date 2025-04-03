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
		title: "Конфиденциальность аккаунта",
		url: "/account_privacy",
		icon: Lock,
	},
	{
		title: "Близкие друзья",
		url: "/close_friends",
		icon: Star,
	},
	{
		title: "Заблокированные",
		url: "/blocked_accounts",
		icon: ShieldBan,
	},
	{
		title: "Скрывать историю и эфиры",
		url: "/hide_story_and_live",
		icon: CircleOff,
	},
	{
		title: "Сообщение и ответы на истории",
		url: "/messages_and_story_replies",
		icon: MessageCircle,
	},
	{
		title: "Метки и упоминания",
		url: "/tags_and_mentions",
		icon: AtSign,
	},
	{
		title: "Коментарии",
		url: "/comments",
		icon: MessageCircle,
	},
	{
		title: "Настройкт репостов",
		url: "/sharing_and_reuse",
		icon: Repeat2,
	},
	{
		title: "Аккаунты с ограничениями",
		url: "/restricted_accounts",
		icon: CircleUser,
	},
	{
		title: "Скрытые слова",
		url: "/hidden_words",
		icon: ALargeSmall,
	},
	{
		title: "Скрытые аккаунты",
		url: "/muted_accounts",
		icon: BellOff,
	},
	{
		title: "Настройки контента",
		url: "/content_preferences",
		icon: Youtube,
	},
	{
		title: `Число отметок "Нравится" и репостов`,
		url: "/like_count",
		icon: HeartOff,
	},
	{
		title: "Платные подписки",
		url: "/subscriptions",
		icon: Crown,
	},
	{
		title: "Архивирование и скачивание",
		url: "/archiving_and_downloading",
		icon: ArrowDownFromLine,
	},
	{
		title: "Язык",
		url: "#",
		icon: Languages,
	},
	{
		title: "Разрешение сайта",
		url: "/website_permissions",
		icon: Laptop,
	},
	{
		title: "Родительский контроль",
		url: "#",
		icon: House,
	},
	{
		title: "Тип аккаунта и инмтрументы",
		url: "/account_type_and_tools",
		icon: ChartColumnIncreasing,
	},
	{
		title: "Помошь",
		url: "/help",
		icon: LifeBuoy,
	},
	{
		title: "Центр конфиденциальности",
		url: "https://privacycenter.instagram.com/?entry_point=instagram_settings_page",
		icon: GlobeLock,
	},
	{
		title: "Статус аккаунта",
		url: "/account_status",
		icon: User,
	},
]



export const SettingsSidebar = () => {
	return (

		<div className='flex justify-between'>
			<Sidebar className='ml-[200px] p-[10px]'>
				<SidebarContent>
					<SidebarGroup>
						<div className='flex justify-between'>
							<SidebarGroupLabel className='text-[30px] mb-[40px]'>Настройки</SidebarGroupLabel>
							<SidebarGroupLabel className='mt-[5px] cursor-pointer'><Link to={"/"}><ArrowLeft /></Link></SidebarGroupLabel>
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