<script lang="ts">
import { onMount } from "svelte";
import { Editor } from './ui/editor';
import { Ruleset } from "./rules/ruleset";
import { defaultRules } from './rules';
import { Engine } from "./ui/engine";

	let contents;
		  
	let ruleset = new Ruleset(defaultRules);

	onMount(() => {
		const q = Editor.getInstance()
		const engine = new Engine(q, ruleset);
		q.on('text-change', (now, before, source) => {
			//contents = q.getContents();
			engine.next(q.getContents());
		});
	});

	$: console.log(contents);
	// $: {
	// 	if (contents) {
	// 		const q = Editor.getInstance();
	// 		const text = q.getText();
	// 		const doc = new Document(text);
	// 		const hits = ruleset.check(doc);
	// 		console.log('hits', hits);
	// 		q.highlightHits(hits);
	// 	}
	// }
</script>

<main>
	<div>
		<h1>Write Good</h1>
		<p class="tagline">For Diplomats Who Can't Write Good And Wanna Learn To Do Other Stuff Good Too</p>
	</div>
	<div class="box">
		<div id="editor"></div>
	</div>
</main>

<style>
	.box {
  position: relative;
  margin: 40px auto;
  width: 800px;
  min-height: 80vh;
  background: #fff;
  border-radius: 2px;
  padding: 50px;
  box-shadow: 0 5px 12px -2px rgba(0, 0, 0, .4);
}


	main {
		padding: 0;
		font-size: 16px;
		max-width: 800px !important;
		margin: 0 auto;
		width: 100%;
		background: #efefef;
		min-height: 100vh;
	}

	#editor {
		max-width: 700px;
		width: 100%;
		margin: 0 auto;
		font-size: 1.6rem;
		line-height: 1.5;
		font-family:'NimbusRomNo9L', sans-serif;
		margin-top: 2rem;
	}

	.tagline {
		font-size: 1.2rem;
		margin: 0;
		padding: 0;
		padding-top: 0.1rem;
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
		color: #1d3557;
		font-size: 2rem;
		font-weight: 100;
		font-family: NimbusRomNo9L;
		font-weight: bold;
		padding: 0;
		margin: 0;
		margin-top: 1rem;
		line-height: 2.1rem;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>