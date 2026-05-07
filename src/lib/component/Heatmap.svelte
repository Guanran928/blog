<script lang="ts">
	import Skeleton from '$lib/component/Skeleton.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	type CalendarDay = { date: string; month: number; value: number };
	type CalendarRow = (CalendarDay | undefined)[];

	const weekdays = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
	const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });

	const toDateKey = (date: Date) => {
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${date.getFullYear()}-${month}-${day}`;
	};

	const getCalendarStart = (year: number) => {
		const start = new SvelteDate(year, 0, 1);
		const daysSinceMonday = (start.getDay() + 6) % 7;
		start.setDate(start.getDate() - daysSinceMonday - 1);
		return start;
	};

	const getLevel = (max: number, value: number) => {
		if (!value || !max) return 0;
		return Math.ceil((value / max) * 4);
	};

	const getDescription = (date: string, value: number) => {
		const formatDate = () => {
			const ordinalRules = new Intl.PluralRules('en-US', { type: 'ordinal' });
			const ordinalSuffixes: Record<Intl.LDMLPluralRule, string> = {
				zero: 'th',
				one: 'st',
				two: 'nd',
				few: 'rd',
				many: 'th',
				other: 'th'
			};
			const tooltipMonthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

			const [year, month, day] = date.split('-').map(Number);
			const suffix = ordinalSuffixes[ordinalRules.select(day)];
			return `${tooltipMonthFormatter.format(new Date(year, month - 1, day))} ${day}${suffix}`;
		};

		return value === 0
			? `No contributions on ${formatDate()}.`
			: `${value} ${value === 1 ? 'contribution' : 'contributions'} on ${formatDate()}.`;
	};

	const buildHeatmap = (data: { [key: string]: number }, year: number) => {
		let max = 0;
		const start = getCalendarStart(year);
		const rows: CalendarRow[] = Array.from({ length: 7 }, (_, weekdayIndex) =>
			Array.from({ length: 53 }, (_, weekIndex) => {
				const day = new SvelteDate(start);
				day.setDate(start.getDate() + weekdayIndex + weekIndex * 7);

				if (day.getFullYear() !== year) return undefined;

				const date = toDateKey(day);
				const value = data[date] ?? 0;
				max = Math.max(max, value);

				return { date, month: day.getMonth(), value };
			})
		);

		const monthSpans: { month?: number; colspan: number }[] = [];

		for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
			const days = rows.map((row) => row[weekIndex]);
			const firstDay = days[0];
			const month =
				firstDay && days.every((day) => day?.month === firstDay.month) ? firstDay.month : undefined;

			const last = monthSpans.at(-1);
			if (last && last.month === month) {
				last.colspan++;
			} else {
				monthSpans.push({ month, colspan: 1 });
			}
		}

		return { max, monthSpans, rows };
	};

	let {
		data,
		year = new Date().getFullYear(),
		loading = false
	}: {
		data: { [key: string]: number };
		year?: number;
		loading?: boolean;
	} = $props();

	let { max, monthSpans, rows } = $derived(buildHeatmap(data, year));
</script>

<div class="heatmap flex flex-col gap-1 font-sans">
	{#if loading}
		<div class="overflow-x-auto">
			<Skeleton class="aspect-61/9 h-auto w-full min-w-150" />
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full min-w-150 table-fixed border-separate border-spacing-0.5">
				<colgroup>
					<col class="w-8" />
					<col span={rows[0].length} />
				</colgroup>
				<thead>
					<tr class="text-xs">
						<td class="w-6"></td>
						{#each monthSpans as { month, colspan }, i (i)}
							<td {colspan}>
								{month === undefined ? '' : monthFormatter.format(new Date(2000, month, 1))}
							</td>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as weekday, weekdayIndex (weekdayIndex)}
						<tr>
							<td class="relative text-xs">
								<span class="absolute inset-y-0 left-0 flex items-center leading-none">
									{weekdays[weekdayIndex]}
								</span>
							</td>
							{#each weekday as day, weekIndex (weekIndex)}
								{#if day}
									<td class="p-0">
										<div
											class="heatmap-cell aspect-square w-full rounded-xs border border-(--cell-border)"
											data-level={getLevel(max, day.value)}
											data-date={day.date}
											data-value={day.value}
											title={getDescription(day.date, day.value)}
											aria-label={getDescription(day.date, day.value)}
										></div>
									</td>
								{:else}
									<td class="p-0"><div class="aspect-square w-full"></div></td>
								{/if}
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<div class="mx-4 flex justify-between text-xs">
		<span class="text-muted-foreground">GitHub contribution graph</span>
		<div class="flex items-center gap-1">
			Less
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each { length: 5 } as _, level (level)}
				<span
					class="heatmap-swatch inline-block size-2.5 rounded-xs border border-(--cell-border)"
					data-level={level}
				></span>
			{/each}
			More
		</div>
	</div>
</div>

<style>
	.heatmap {
		--cell-0: #eff2f5;
		--cell-1: #aceebb;
		--cell-2: #4ac26b;
		--cell-3: #2da44e;
		--cell-4: #116329;
		--cell-border: #1f23280d;
	}

	.heatmap-cell {
		background: var(--cell-0);
	}

	.heatmap-swatch[data-level='0'],
	.heatmap-cell[data-level='0'] {
		background: var(--cell-0);
	}

	.heatmap-swatch[data-level='1'],
	.heatmap-cell[data-level='1'] {
		background: var(--cell-1);
	}

	.heatmap-swatch[data-level='2'],
	.heatmap-cell[data-level='2'] {
		background: var(--cell-2);
	}

	.heatmap-swatch[data-level='3'],
	.heatmap-cell[data-level='3'] {
		background: var(--cell-3);
	}

	.heatmap-swatch[data-level='4'],
	.heatmap-cell[data-level='4'] {
		background: var(--cell-4);
	}

	@media (prefers-color-scheme: dark) {
		.heatmap {
			--cell-0: #1c1917;
			--cell-1: #033a16;
			--cell-2: #196c2e;
			--cell-3: #2ea043;
			--cell-4: #56d364;
			--cell-border: #302a28;
		}
	}
</style>
