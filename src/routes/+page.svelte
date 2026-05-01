<script lang="ts">
	import { resolve } from '$app/paths';
	import ArticleListLarge from '$lib/component/ArticleListLarge.svelte';
	import { cn } from '$lib/cn';

	import SiGithub from '@icons-pack/svelte-simple-icons/icons/SiGithub';
	import SiGnuprivacyguard from '@icons-pack/svelte-simple-icons/icons/SiGnuprivacyguard';
	import SiLastdotfm from '@icons-pack/svelte-simple-icons/icons/SiLastdotfm';
	import SiMastodon from '@icons-pack/svelte-simple-icons/icons/SiMastodon';
	import SiMatrix from '@icons-pack/svelte-simple-icons/icons/SiMatrix';
	import SiMonkeytype from '@icons-pack/svelte-simple-icons/icons/SiMonkeytype';
	import SiSteam from '@icons-pack/svelte-simple-icons/icons/SiSteam';
	import SiTelegram from '@icons-pack/svelte-simple-icons/icons/SiTelegram';
	import SiX from '@icons-pack/svelte-simple-icons/icons/SiX';

	import Rss from '@lucide/svelte/icons/rss';
	import Mail from '@lucide/svelte/icons/mail';

	const links = [
		{
			name: 'GPG',
			username: '91F97D9ED12639CF',
			url: 'https://github.com/Guanran928.gpg',
			icon: SiGnuprivacyguard
		},
		{
			name: 'Email',
			username: 'guanran928@outlook.com',
			url: 'mailto:guanran928@outlook.com',
			icon: Mail
		},
		{
			name: 'Matrix',
			username: '@nyancat:ny4.dev',
			url: 'https://matrix.to/#/@nyancat:ny4.dev',
			icon: SiMatrix
		},
		{
			name: 'Telegram',
			username: '@guanranwang',
			url: 'https://t.me/guanranwang',
			icon: SiTelegram
		},
		{
			name: 'GitHub',
			username: '@Guanran928',
			url: 'https://github.com/Guanran928',
			icon: SiGithub
		},
		{
			name: 'Mastodon',
			username: '@nyancat@ny4.dev',
			url: 'https://mastodon.ny4.dev/@nyancat',
			icon: SiMastodon
		},
		{
			name: 'Twitter',
			username: '@Guanran928',
			url: 'https://x.com/Guanran928',
			icon: SiX
		},
		{
			name: 'Last.fm',
			username: '@Guanran928',
			url: 'https://www.last.fm/user/Guanran928',
			icon: SiLastdotfm
		},
		{
			name: 'Monkeytype',
			username: '@Guanran928',
			url: 'https://monkeytype.com/profile/Guanran928',
			icon: SiMonkeytype
		},
		{
			name: 'Steam',
			username: 'd-.-b',
			url: 'https://steamcommunity.com/profiles/76561198855505856',
			icon: SiSteam
		}
	];

	let { data } = $props();
</script>

<div class="space-y-5">
	<section class="space-y-2">
		<div class="flex items-center justify-between gap-2">
			<h2 class="text-2xl font-semibold">最新文章</h2>
			<a
				href={resolve('/index.xml')}
				aria-label="RSS feed"
				class="border border-border bg-surface p-1"><Rss size="20" /></a
			>
		</div>

		<ArticleListLarge data={data.posts} />
	</section>

	<section class="space-y-2">
		<h2 class="text-2xl font-semibold" style:--tag="c-header">联系方式</h2>
		<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
			{#each links as link, index (link.name)}
				{@const Icon = link.icon}

				<a
					class="group relative flex items-center justify-between gap-2 border border-border bg-surface px-3 py-2 shadow-xs text-shadow-md text-shadow-stone-200 dark:text-shadow-stone-900"
					href={link.url}
					target="_blank"
					rel="me external"
					style:--tag="c-{index}"
				>
					<div class="flex flex-col truncate">
						<span class="font-semibold">
							{link.name}
						</span>
						<span
							class={cn(
								'text-sm text-muted-foreground decoration-underline group-hover:underline',
								link.name === 'GPG' && 'font-mono'
							)}
						>
							{link.username}
						</span>
					</div>

					<Icon class="size-6 shrink-0" />
				</a>
			{/each}
		</div>
	</section>
</div>
