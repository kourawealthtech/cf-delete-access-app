# Delete Access Application Action for GitHub

Removes CloudFlare ZeroTrust Access Application by ID or name.

## Usage via Github Actions

```yaml
name: example
on:
  pull_request:
    type: [closed]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: kourawealthtech/cf-delete-access-app@main
        with:
          name: "some-app-name"
          account_id: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          token: ${{ secrets.CLOUDFLARE_TOKEN }}
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
