{
  projectRootFile = "flake.nix";

  ### nix
  programs.deadnix.enable = true;
  programs.nixfmt.enable = true;
  programs.statix.enable = true;

  ### toml
  programs.taplo.enable = true;

  ### misc
  programs.prettier.enable = true;
}
