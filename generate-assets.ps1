# UCY Studio - Kie AI Asset Generator v2
# Usage: .\generate-assets.ps1
# Reads API key securely from .env — never hardcoded.

param()

# ── Load API key ────────────────────────────────────────────
$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    throw ".env file not found at $envFile. Create it with: KIE_API_KEY=your_key"
}
$API_KEY = (Get-Content $envFile | Where-Object { $_ -match "^KIE_API_KEY=" }) -replace "^KIE_API_KEY=", ""
if (-not $API_KEY) { throw "KIE_API_KEY not found in .env" }

$GENERATE = "https://api.kie.ai/api/v1/flux/kontext/generate"
$POLL     = "https://api.kie.ai/api/v1/flux/kontext/record-info"
$OUT_DIR  = Join-Path $PSScriptRoot "assets"
$INDEX    = Join-Path $PSScriptRoot "index.html"

$AuthHeader = @{
    "Authorization" = "Bearer $API_KEY"
    "Content-Type"  = "application/json"
}

# ── Asset definitions ───────────────────────────────────────
$Assets = @(
    @{
        file   = "hero-visual.png"
        aspect = "21:9"
        prompt = "A high-end cinematic abstract visual, minimalist geometric shapes floating in space, translucent frosted glass textures with glassmorphism effect, pristine matte white clay surfaces, subtle metallic silver lines reflecting soft light, desaturated corporate ambient lighting, clean white background, ultra-sharp focus, 8K, Apple design studio aesthetic, no text, no people"
    },
    @{
        file   = "project-eclat.png"
        aspect = "16:9"
        prompt = "A premium minimalist responsive website layout displayed on a clean floating tablet screen, high-end luxury architecture branding concept, clean editorial typography in black on white, sharp geometric angles, ultra-soft ambient drop shadows, solid #FBF9FF Ghost White background, photorealistic product mockup, no text overlays, no people"
    },
    @{
        file   = "project-daniela.png"
        aspect = "16:9"
        prompt = "An elite fashion design studio mobile app interface on a premium bezel-less smartphone screen, floating device, bold black typography on white, extensive negative space, fine ultra-clean desaturated UI layout, soft editorial shadows, solid #FBF9FF Ghost White background, photorealistic mockup, no text overlays, no people"
    },
    @{
        file   = "project-nexus.png"
        aspect = "16:9"
        prompt = "A clean minimalist fintech web dashboard displayed on a floating laptop screen, elegant abstract financial line charts in fine strokes, royal blue #3626A7 micro-accents on white matte glass cards, ultra-clean data visualization interface, soft depth-of-field, solid #FBF9FF Ghost White background, photorealistic mockup, no text overlays, no people"
    },
    @{
        file   = "project-aurora.png"
        aspect = "16:9"
        prompt = "A striking digital agency premium brand identity presentation, minimal business cards and corporate stationery items floating elegantly with ultra-soft multilayer shadows, crisp clean typography, premium paper texture detail, professional studio lighting, solid #FBF9FF Ghost White background, photorealistic, no text overlays, no people"
    }
)

# ── Functions ───────────────────────────────────────────────
function Submit-Job {
    param([string]$Prompt, [string]$Aspect)
    $body = ConvertTo-Json -Depth 3 @{
        prompt           = $Prompt
        aspectRatio      = $Aspect
        outputFormat     = "png"
        model            = "flux-kontext-max"
        promptUpsampling = $true
    }
    $r = Invoke-RestMethod -Method POST -Uri $GENERATE -Headers $AuthHeader -Body $body -ErrorAction Stop
    if ($r.code -ne 200) { throw "Submit failed: $($r.msg)" }
    return $r.data.taskId
}

function Poll-Job {
    param([string]$TaskId, [string]$Label)
    Write-Host "  Polling $Label" -NoNewline
    $tries = 0
    while ($tries -lt 90) {
        Start-Sleep -Seconds 4
        $tries++
        Write-Host "." -NoNewline
        $r = Invoke-RestMethod -Method GET -Uri "${POLL}?taskId=$TaskId" -Headers $AuthHeader -ErrorAction Stop
        $flag = $r.data.successFlag
        if ($flag -eq 1) {
            Write-Host " DONE"
            return $r.data.response.resultImageUrl
        }
        if ($flag -eq 2 -or $flag -eq 3) {
            Write-Host " FAILED (flag=$flag)"
            throw "Generation failed for: $Label"
        }
    }
    throw "Timeout waiting for: $Label"
}

# ── Main ────────────────────────────────────────────────────
Write-Host ""
Write-Host "UCY Studio - Kie AI Asset Generator v2"
Write-Host "Output dir : $OUT_DIR"
Write-Host "Assets     : $($Assets.Count)"
Write-Host ""

New-Item -ItemType Directory -Force -Path $OUT_DIR | Out-Null

# Step 1 — Submit all jobs simultaneously
Write-Host "--- Step 1: Submit all jobs ---"
$Jobs = @()
foreach ($a in $Assets) {
    Write-Host "  Submitting : $($a.file) [$($a.aspect)]"
    $tid = Submit-Job $a.prompt $a.aspect
    Write-Host "    taskId   : $tid"
    $Jobs += [PSCustomObject]@{ Asset = $a; TaskId = $tid }
}
Write-Host ""

# Step 2 — Poll until all complete
Write-Host "--- Step 2: Poll for results ---"
$Results = @()
foreach ($j in $Jobs) {
    $url = Poll-Job $j.TaskId $j.Asset.file
    $Results += [PSCustomObject]@{ Asset = $j.Asset; Url = $url }
}
Write-Host ""

# Step 3 — Download
Write-Host "--- Step 3: Download images ---"
foreach ($res in $Results) {
    $dest = Join-Path $OUT_DIR $res.Asset.file
    Write-Host "  Downloading : $($res.Asset.file)"
    Invoke-WebRequest -Uri $res.Url -OutFile $dest -ErrorAction Stop
    $size = [math]::Round((Get-Item $dest).Length / 1KB)
    Write-Host "    Saved     : $dest ($size KB)"
}
Write-Host ""

Write-Host "Done. Refresh your browser to see the new assets."
Write-Host ""
