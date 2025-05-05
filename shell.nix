	{
		pkgs ? import <nixpkgs> {
			config = {
				allowUnfree = true;
			};
		},
	}:

	pkgs.mkShell {
		packages = with pkgs; [
			# Core Tools
			corepack
			curl
			deno
			docker
			docker-compose
			git
			git-lfs
			mkcert
			nodejs
			openssh

			# Code Editors
			neovim
			vscodium

			# Convenience Tools
			bat
			cargo
			direnv
			eza
			fzf
			gawk
			hyperfine
			jq
			openvpn
			tealdeer
			wget
			zq

			# shell.nix Dependencies
			macchina
			which
		];

		shellHook = ''
			macchina

			echo "Setting up environment variables..."
			export EDITOR=$(which nvim)
			export VISUAL=$(which codium)

			echo "Setting up shell aliases..."
			alias cat=bat
			alias code=codium
			alias k='$VISUAL $(fzf --multi --preview="bat --color=always {}")'
			alias ll="ls -la"
			alias ls=eza
			alias vim=nvim

			if [ -d .git ] || git rev-parse --git-dir > /dev/null 2>&1; then
					echo "Setting up Git aliases..."
					git config alias.co checkout
					git config alias.br branch
					git config alias.ci commit
					git config alias.st status
					git config alias.amend "commit --amend -m"
					git config alias.unstage "restore --staged"
					git config help.autocorrect 50
			else
					echo "Not a Git repository."
			fi

			if [ -f package.json ]; then
					corepack install
					pnpm install --frozen-lockfile

					echo -e "\nCurrent Project: $(jq -r '.name' package.json)\n"
					pnpm run
			else
					echo "\nNot a NodeJS package."
			fi
		'';
	}
