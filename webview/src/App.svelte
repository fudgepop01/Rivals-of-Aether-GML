<script>
	import { onMount, beforeUpdate } from 'svelte';
	import { moveSource, debugSource, initSource, loadSource, soundSources, spriteSources } from './store/user_data_store'
	import getData from './util/emulation/extractData';
	import Timeline from './components/timeline_editor/Timeline.svelte';
	import Renderer from './components/renderer_editor/Renderer.svelte';
	import Controller from './components/controller/Controller.svelte'

	const fetchFromWsRoot = () => {
		window['fetchFromWsRoot']();
	}

	let isSetup = false;
	$: {
		// force an update when either of these are set
		$moveSource,
		$debugSource,

		isSetup = !$spriteSources.empty
			&& !$soundSources.empty
			&& $initSource.length !== 0
			&& $loadSource.length !== 0
			&& $moveSource.length !== 0
		if (isSetup) {
			console.log(getData('moveEditor'));
		}
	}

</script>

<main>
	{#if isSetup}
		<div id="timeline-container">
			<Timeline></Timeline>
		</div>
		<div id="render-container">
			<Renderer></Renderer>
		</div>
		<div id="control-container">
			<Controller></Controller>
		</div>
	{:else}
		<h1>Welcome to RoABox!*</h1>

		<p>
			to start, right click on the following files in the explorer and click "send to RoABox."
			The list items below should change from <span style="color: #ff3e00">red</span> to
			<span style="color: #3e9900">green</span> as you do.
		</p>

		<ul>
			<li class={$spriteSources.empty ? 'incomplete' : 'complete'}>sprites folder</li>
			<li class={$soundSources.empty ? 'incomplete' : 'complete'}>sounds folder</li>
			<li class={$initSource.length === 0 ? 'incomplete' : 'complete'}>init.gml</li>
			<li class={$loadSource.length === 0 ? 'incomplete' : 'complete'}>load.gml</li>
			<li class={$moveSource.length === 0 ? 'incomplete' : 'complete'}>the gml file of whatever attack you wish to view</li>
		</ul>

		<p>*this is currently a <em>visualizer</em> - editing might come later</p>
		<button on:click={fetchFromWsRoot}>fetch from workspace root</button>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		position: relative;
	}

	h3 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	li.incomplete {
		color: #ff3e00
	}

	li.complete {
		color: #3e9900
	}

	#timeline-container {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		width: calc(100% - 100px);
		height: 100px;
	}

	#render-container {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		width: calc(100% - 100px);
		margin-top: 100px;
		height: 500px;
	}

	#control-container {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		width: calc(100% - 100px);
		margin-top: 600px;
		height: 200px;
	}

	@media (min-width: 400px) {
		main {
			max-width: none;
		}
	}
</style>