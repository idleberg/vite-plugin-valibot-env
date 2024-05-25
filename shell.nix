{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
	packages = with pkgs; [
		corepack_20
		deno
		git
		nodejs_20
		openssh
	];
}
