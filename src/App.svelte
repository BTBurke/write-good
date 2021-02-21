<script lang="ts">
import { onMount } from "svelte";
import { Editor } from './ui/editor';
import { Document } from './text/doc';

	let contents;

	onMount(() => {
		const q = Editor.getInstance()
		q.on('text-change', (now, before, source) => {
			contents = q.getContents();
		});
	});

	$: console.log(contents);
	$: {
		if (contents) {
			const q = Editor.getInstance();
			const text = q.getText();
			const doc = new Document(text);
		}
	}
</script>

<main>
	<div id="editor"></div>
</main>

<style>
	main {
		padding-top: 3em;
		font-size: 16px;
	}

	#editor {
		max-width: 700px;
		width: 100%;
		margin: 0 auto;
		font-size: 1.6rem;
		line-height: 1.5;
		font-family:'NimbusRomNo9L', sans-serif;
	}

	
	@font-face {
		font-family: 'NimbusRomNo9L';
		src: url('/fonts/NimbusRomNo9L-Med.eot');
		src: url('/fonts/NimbusRomNo9L-Med.eot?#iefix') format('embedded-opentype'),
			url('/fonts/NimbusRomNo9L-Med.svg#NimbusRomNo9L-Med') format('svg'),
			url('/fonts/NimbusRomNo9L-Med.ttf') format('truetype'),
			url('/fonts/NimbusRomNo9L-Med.woff') format('woff'),
			url('/fonts/NimbusRomNo9L-Med.woff2') format('woff2');
		font-weight: bold;
		font-style: normal;
	}
	@font-face {
		font-family: 'NimbusRomNo9L';
		src: url('/fonts/NimbusRomNo9L-MedIta.eot');
		src: url('/fonts/NimbusRomNo9L-MedIta.eot?#iefix') format('embedded-opentype'),
			url('/fonts/NimbusRomNo9L-MedIta.svg#NimbusRomNo9L-MedIta') format('svg'),
			url('/fonts/NimbusRomNo9L-MedIta.ttf') format('truetype'),
			url('/fonts/NimbusRomNo9L-MedIta.woff') format('woff'),
			url('/fonts/NimbusRomNo9L-MedIta.woff2') format('woff2');
		font-weight: bold;
		font-style: italic;
	}
	@font-face {
		font-family: 'NimbusRomNo9L';
		src: url('/fonts/NimbusRomNo9L-Reg.eot');
		src: url('/fonts/NimbusRomNo9L-Reg.eot?#iefix') format('embedded-opentype'),
			url('/fonts/NimbusRomNo9L-Reg.svg#NimbusRomNo9L-Reg') format('svg'),
			url('/fonts/NimbusRomNo9L-Reg.ttf') format('truetype'),
			url('/fonts/NimbusRomNo9L-Reg.woff') format('woff'),
			url('/fonts/NimbusRomNo9L-Reg.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'NimbusRomNo9L';
		src: url('/fonts/NimbusRomNo9L-RegIta.eot');
		src: url('/fonts/NimbusRomNo9L-RegIta.eot?#iefix') format('embedded-opentype'),
			url('/fonts/NimbusRomNo9L-RegIta.svg#NimbusRomNo9L-RegIta') format('svg'),
			url('/fonts/NimbusRomNo9L-RegIta.ttf') format('truetype'),
			url('/fonts/NimbusRomNo9L-RegIta.woff') format('woff'),
			url('/fonts/NimbusRomNo9L-RegIta.woff2') format('woff2');
		font-weight: normal;
		font-style: italic;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>