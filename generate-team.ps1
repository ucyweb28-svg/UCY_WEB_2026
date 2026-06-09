# UCY Studio - Team Portrait Generator
param()

$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) { throw ".env not found" }
$API_KEY = (Get-Content $envFile | Where-Object { $_ -match "^KIE_API_KEY=" }) -replace "^KIE_API_KEY=",""
if (-not $API_KEY) { throw "KIE_API_KEY missing in .env" }

$GENERATE = "https://api.kie.ai/api/v1/flux/kontext/generate"
$POLL     = "https://api.kie.ai/api/v1/flux/kontext/record-info"
$OUT_DIR  = Join-Path $PSScriptRoot "assets"

$Auth = @{ "Authorization" = "Bearer $API_KEY"; "Content-Type" = "application/json" }

$Team = @(
    @{ file="team-yonathan.png"; prompt="Abstract artistic portrait of a young Middle Eastern male creative director in his 30s, short dark hair, minimal clean aesthetic, wearing a simple white shirt, neutral light grey background, soft studio lighting, high-end fashion photography editorial style, shallow depth of field, ultra sharp eyes, grayscale desaturated tones, professional headshot, photorealistic, no text" },
    @{ file="team-sarah.png";    prompt="Abstract artistic portrait of a young European female UX designer in her late 20s, light brown hair, clean minimal aesthetic, wearing a simple light blouse, neutral light grey background, soft studio lighting, high-end fashion photography editorial style, shallow depth of field, ultra sharp eyes, grayscale desaturated tones, professional headshot, photorealistic, no text" },
    @{ file="team-lucas.png";    prompt="Abstract artistic portrait of a young French male developer in his early 30s, short neat dark hair, minimal clean aesthetic, wearing a simple dark shirt, neutral light grey background, soft studio lighting, high-end fashion photography editorial style, shallow depth of field, ultra sharp eyes, grayscale desaturated tones, professional headshot, photorealistic, no text" }
)

New-Item -ItemType Directory -Force -Path $OUT_DIR | Out-Null

Write-Host "Submitting 3 team portrait jobs..."
$Jobs = @()
foreach ($t in $Team) {
    $body = ConvertTo-Json -Depth 3 @{
        prompt           = $t.prompt
        aspectRatio      = "1:1"
        outputFormat     = "png"
        model            = "flux-kontext-max"
        promptUpsampling = $true
    }
    $r = Invoke-RestMethod -Method POST -Uri $GENERATE -Headers $Auth -Body $body -ErrorAction Stop
    if ($r.code -ne 200) { throw "Submit failed: $($r.msg)" }
    $tid = $r.data.taskId
    Write-Host "  Submitted: $($t.file) -> $tid"
    $Jobs += [PSCustomObject]@{ File=$t.file; TaskId=$tid }
}

Write-Host "Polling..."
foreach ($j in $Jobs) {
    Write-Host "  $($j.File)" -NoNewline
    $tries = 0
    $url = $null
    while ($tries -lt 90) {
        Start-Sleep -Seconds 5
        $tries++
        Write-Host "." -NoNewline
        $r = Invoke-RestMethod -Method GET -Uri ($POLL + "?taskId=" + $j.TaskId) -Headers $Auth -ErrorAction Stop
        $flag = $r.data.successFlag
        if ($flag -eq 1) { $url = $r.data.response.resultImageUrl; break }
        if ($flag -eq 2 -or $flag -eq 3) { throw "Failed: $($j.File)" }
    }
    if (-not $url) { throw "Timeout: $($j.File)" }
    Write-Host " DONE"
    $dest = Join-Path $OUT_DIR $j.File
    Invoke-WebRequest -Uri $url -OutFile $dest -ErrorAction Stop
    $sz = [math]::Round((Get-Item $dest).Length / 1KB)
    Write-Host "    Saved: $dest ($sz KB)"
}

Write-Host "All 3 team portraits generated."
