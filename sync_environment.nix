
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # You can also use "unstable" for latest packages

  # Specify the packages required for your development environment
  packages = [
    pkgs.python311                    # Python 3.11 interpreter
    pkgs.python311Packages.pip        # Python package manager
    pkgs.nodejs_20                    # Node.js 20 runtime
    pkgs.nodePackages.nodemon         # Nodemon for auto-restarting Node.js apps
  ];

  # Sets environment variables in the workspace
  env = {
    # Add environment variables here if needed
  };

  idx = {
    # Extensions to install in the workspace
    extensions = [
      "vscodevim.vim"                # Vim keybindings extension for VS Code
    ];

    # Enable preview functionality in the IDX environment
    previews = {
      enable = true;
      previews = {
        # Uncomment and customize the following if you have a web preview server
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews
        #   command = ["npm" "run" "dev"];
        #   manager = "web";
        #   env = {
        #     PORT = "$PORT";         # Map environment's port variable
        #   };
        # };
      };
    };

    # Lifecycle hooks for the workspace
    workspace = {
      # Commands to run when the workspace is first created
      onCreate = {
        npm-install = "npm install";  # Install Node.js dependencies
      };

      # Commands to run when the workspace is started or restarted
      onStart = {
        watch-backend = "npm run watch-backend"; # Watch for backend changes
      };
    };
  };
}
