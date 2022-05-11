exports.default = async function (configuration) {
    // your custom code using configuration.path
    if (process.env.AKV_URL) {
        require("child_process").execSync(
            'AzureSignTool.exe sign --description-url "https://askdelphi.com" --file-digest sha512 '
            + '--azure-key-vault-url "' + process.env.AKV_URL + '" '
            + '--azure-key-vault-client-id "' + process.env.AKV_CLIENT_ID + '" '
            + '--azure-key-vault-client-secret "' + process.env.AKV_CLIENT_SECRET + '" '
            + '--azure-key-vault-certificate code-signing-2022 '
            + '--timestamp-rfc3161 http://timestamp.digicert.com --timestamp-digest sha512 --verbose '
            + '"' + configuration.path + '"');
    }
}