{
  projectRootFile = "flake.nix";

  programs = {
    deadnix.enable = true;
    nixfmt.enable = true;
    prettier.enable = true;
    statix.enable = true;
    taplo.enable = true;
  };

  settings.formatter.prettier.excludes = [
    "pnpm-lock.yaml"
  ];
}
