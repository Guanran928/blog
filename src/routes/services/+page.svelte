<script lang="ts">
	import Card from '$lib/component/Card.svelte';
	import Network from '@lucide/svelte/icons/network'
	import ClipboardList from '@lucide/svelte/icons/clipboard-list'
	import Egg from '@lucide/svelte/icons/egg'

	const links = [
		{
			name: 'IP checker',
			url: 'https://ip.ny4.dev',
			icon: Network
		},
		{
			name: 'Pastebin',
			url: 'https://pb.ny4.dev',
			icon: ClipboardList
		},
		{
			name: 'Chicken Box',
			url: 'https://cxk.ny4.dev',
			icon: Egg
		}
	];
</script>

<h2 class="pb-2 text-2xl font-semibold" style:--tag="c-header">服务</h2>
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
	{#each links as link, index (link.name)}
		{@const Icon = link.icon}
		<a href={link.url} target="_blank" rel="external" style:--tag="c-{index}">
			<Card class="group relative flex items-center justify-between gap-2">
				<div class="flex flex-col truncate">
					<span class="font-semibold">
						{link.name}
					</span>
					<span class="text-sm text-muted-foreground group-hover:underline">
						{link.url.replace('https://', '')}
					</span>
				</div>
				<Icon class="size-6 shrink-0" />
			</Card>
		</a>
	{/each}
</div>
