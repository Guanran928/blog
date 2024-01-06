{
  description = "Guanran928's blog";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = inputs:
    inputs.flake-utils.lib.eachDefaultSystem (system: let
      pkgs = inputs.nixpkgs.legacyPackages.${system};
    in {
      ### nix fmt
      formatter = inputs.nixpkgs.legacyPackages.${system}.alejandra;

      ### nix develop
      devShells.default = pkgs.mkShell {packages = with pkgs; [hugo go];};
    });
}
