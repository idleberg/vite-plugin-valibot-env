declare const Deno: any;
const isDeno = typeof Deno !== 'undefined' && Deno?.version?.deno;

export function viteBuild(config: string) {
	const args = ['build', '--config', config];
	const command = isDeno ? 'deno' : 'npx';

	if (isDeno) {
		args.unshift('run', '--allow-all', 'npm:vite');
	} else {
		args.unshift('vite');
	}

	return { command, args };
}
