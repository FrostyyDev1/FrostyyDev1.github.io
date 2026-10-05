$BaseUrl = "http://localhost:3000"

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Jacob Portfolio Final Verification" -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl"
Write-Host ""

$Failures = @()

function Test-Url {
    param(
        [string]$Path
    )

    try {
        $response = Invoke-WebRequest `
            -Uri "$BaseUrl$Path" `
            -UseBasicParsing `
            -MaximumRedirection 10 `
            -TimeoutSec 15

        $status = [int]$response.StatusCode

        if ($status -ge 200 -and $status -lt 400) {
            Write-Host (
                "[PASS] {0,-38} {1}" -f $Path, $status
            ) -ForegroundColor Green

            return $response
        }

        Write-Host (
            "[FAIL] {0,-38} {1}" -f $Path, $status
        ) -ForegroundColor Red

        $script:Failures += $Path

        return $null
    }
    catch {
        Write-Host (
            "[FAIL] {0,-38} {1}" -f $Path, $_.Exception.Message
        ) -ForegroundColor Red

        $script:Failures += $Path

        return $null
    }
}

$CorePaths = @(
    "/",
    "/experience",
    "/projects",
    "/projects/homelab",
    "/projects/northstar-it",
    "/projects/custom-pcs",
    "/about",
    "/contact",
    "/resume.pdf",
    "/jacob-photo.jpg",
    "/favicon.ico",
    "/icon.svg",
    "/opengraph-image"
)

Write-Host "Core routes"
Write-Host ""

foreach ($path in $CorePaths) {
    [void](Test-Url $path)
}

Write-Host ""
Write-Host "Internal link crawl"
Write-Host ""

$PagesToCrawl = @(
    "/",
    "/experience",
    "/projects",
    "/projects/homelab",
    "/projects/northstar-it",
    "/about",
    "/contact"
)

$Discovered = New-Object System.Collections.Generic.HashSet[string]

foreach ($page in $PagesToCrawl) {
    try {
        $response = Invoke-WebRequest `
            -Uri "$BaseUrl$page" `
            -UseBasicParsing `
            -MaximumRedirection 10 `
            -TimeoutSec 15

        $matches = [regex]::Matches(
            $response.Content,
            '(?:href|src)=["'']([^"'']+)["'']',
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
        )

        foreach ($match in $matches) {
            $url = $match.Groups[1].Value

            if (
                $url.StartsWith("/") -and
                -not $url.StartsWith("/_next/") -and
                -not $url.StartsWith("//")
            ) {
                $clean = $url.Split("?")[0].Split("#")[0]

                if ($clean) {
                    [void]$Discovered.Add($clean)
                }
            }
        }
    }
    catch {
        $Failures += "$page crawl"
    }
}

foreach ($path in ($Discovered | Sort-Object)) {
    [void](Test-Url $path)
}

Write-Host ""
Write-Host "Metadata check"
Write-Host ""

try {
    $home = Invoke-WebRequest `
        -Uri $BaseUrl `
        -UseBasicParsing `
        -TimeoutSec 15

    $html = $home.Content

    $HasTitle =
        $html -match '(?is)<title>[^<]*Jacob Wiseman[^<]*</title>'

    $HasDescription =
        $html -match '(?is)<meta[^>]+name=["'']description["''][^>]*>'

    $HasOgTitle =
        $html -match '(?is)<meta[^>]+property=["'']og:title["''][^>]*>'

    $HasOgDescription =
        $html -match '(?is)<meta[^>]+property=["'']og:description["''][^>]*>'

    $HasOgImage =
        $html -match '(?is)<meta[^>]+property=["'']og:image["''][^>]*>'

    if (
        $HasTitle -and
        $HasDescription -and
        $HasOgTitle -and
        $HasOgDescription -and
        $HasOgImage
    ) {
        Write-Host "[PASS] title" -ForegroundColor Green
        Write-Host "[PASS] description" -ForegroundColor Green
        Write-Host "[PASS] og:title" -ForegroundColor Green
        Write-Host "[PASS] og:description" -ForegroundColor Green
        Write-Host "[PASS] og:image" -ForegroundColor Green
    }
    else {
        if (-not $HasTitle) {
            Write-Host "[FAIL] title" -ForegroundColor Red
            $Failures += "metadata title"
        }

        if (-not $HasDescription) {
            Write-Host "[FAIL] description" -ForegroundColor Red
            $Failures += "metadata description"
        }

        if (-not $HasOgTitle) {
            Write-Host "[FAIL] og:title" -ForegroundColor Red
            $Failures += "metadata og:title"
        }

        if (-not $HasOgDescription) {
            Write-Host "[FAIL] og:description" -ForegroundColor Red
            $Failures += "metadata og:description"
        }

        if (-not $HasOgImage) {
            Write-Host "[FAIL] og:image" -ForegroundColor Red
            $Failures += "metadata og:image"
        }
    }
}
catch {
    Write-Host "[FAIL] Could not inspect homepage metadata." -ForegroundColor Red
    $Failures += "/ metadata"
}

Write-Host ""

if ($Failures.Count -eq 0) {

    Write-Host "==========================================" -ForegroundColor Green
    Write-Host " ALL CHECKS PASSED" -ForegroundColor Green
    Write-Host " HOMEPAGE QA IS CLEAN" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green

}
else {

    Write-Host "Failed checks:" -ForegroundColor Red

    foreach ($failure in ($Failures | Select-Object -Unique)) {
        Write-Host " - $failure" -ForegroundColor Red
    }
}
