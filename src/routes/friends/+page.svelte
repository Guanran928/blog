<script lang="ts">
	import Card from '$lib/component/Card.svelte';

	const links = [
		{
			image: 'https://avatars.githubusercontent.com/u/46253950?s=144',
			name: 'Mare_Infinitus',
			description: '此处会不定时产生包含大量废话的日志文件',
			url: 'https://lab.gb0.dev/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/23130178?s=144',
			name: "@ShadowRZ's Blog",
			description: 'Where something happens.',
			url: 'https://shadowrz.github.io/blog/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/34574198?s=144',
			name: '李皓奇',
			description: '岂有文章倾社稷，从来佞幸覆乾坤。',
			url: 'https://liolok.com/zhs/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/25235514?s=144',
			name: 'prince213',
			description: 'sic vita est',
			url: 'https://prince213.top/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/22363274?s=144',
			name: 'This Cute World',
			description: '忽而盛夏',
			url: 'https://thiscute.world/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/86996742?s=144',
			name: 'CronfoxLabs',
			description: '你是靠着什么努力到这里的？',
			url: 'https://cronfox.2434.me/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/119720365?s=144',
			name: '悠笙の开发日记',
			description: '愿世间万物都能被温柔以待',
			url: 'https://www.iyoroy.cn/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/52288096?s=144',
			name: "静静's Blog",
			description: '偶尔有电波信号出没。',
			url: 'https://leak.moe/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/54884471?s=144',
			name: 'Herbarium.Requiem.Garden',
			description: '子夜钟鸣',
			url: 'https://herbarium.requiem.garden/friends/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/22406910?s=144',
			name: 'pluie.me',
			description: '普鲁伊',
			url: 'https://pluie.me/'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/146514518?s=144',
			name: '後戸の国',
			url: 'https://www.dustymind.cc',
			description: '边缘之地上的边缘节点'
		},
		{
			image: 'https://avatars.githubusercontent.com/u/68736947?s=144',
			name: 'lonerOrz',
			url: 'https://astro-blog-rosy.vercel.app/',
			description: "lonerOrz's website"
		}
	];
</script>

<h2 class="pb-2 text-2xl font-semibold" style:--tag="c-header">好友</h2>
<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
	{#each links as link, index (link.name)}
		<a href={link.url} target="_blank" rel="external" style:--tag="c-{index}">
			<Card class="group relative flex items-center justify-between gap-2 pr-2">
				<div class="flex flex-col truncate">
					<span class="font-semibold">
						{link.name}
					</span>
					<span class="text-sm text-muted-foreground decoration-underline group-hover:underline">
						{link.description}
					</span>
				</div>
				<img src={link.image} alt={link.name} class="size-12" />
			</Card>
		</a>
	{/each}
</div>
