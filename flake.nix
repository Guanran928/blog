{
  description = "Guanran928's blog";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    ### De-dupe flake dependencies
    systems.url = "github:nix-systems/default";
  };

  outputs = inputs:
    inputs.flake-utils.lib.eachDefaultSystem (system: let
      pkgs = inputs.nixpkgs.legacyPackages.${system};
      treefmtEval = inputs.treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
    in {
      ### nix fmt
      formatter = treefmtEval.config.build.wrapper;

      ### nix flake check
      checks = {formatting = treefmtEval.config.build.check inputs.self;};

      ### nix develop
      devShells.default = pkgs.mkShell {packages = with pkgs; [hugo go];};
    });
}
