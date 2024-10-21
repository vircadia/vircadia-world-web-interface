# Vircadia World Web Interface



## Development

### Clone Repository

To clone the repository with submodules, use the following command:

```sh
git clone --recursive https://github.com/your-repo/vircadia-world-web-interface.git
```

If you've already cloned the repository without the `--recursive` flag, you can initialize and update the submodules with:

```sh
git submodule update --init --recursive
```

### Vircadia World SDK Submodule

The Vircadia World SDK is included as a submodule in this project. It's located in the `src/modules/vircadia-world-sdk-ts` directory.

### Run Tests

```sh
yarn test
```
