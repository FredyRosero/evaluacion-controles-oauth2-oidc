mkdir .\anexos -Force
mkdir .\build -Force

$inputMd = ".\Tesis.v19.md"
$outputMd = ".\tesis.mermaid.png.md"
$tempDir = ".\build\mermaid-src"

Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
mkdir $tempDir -Force

$content = Get-Content $inputMd -Raw

$pattern = '(?s)```mermaid\s*(.*?)\s*```'
$index = 0

$newContent = [regex]::Replace($content, $pattern, {
    param($match)

    $script:index++
    $diagramCode = $match.Groups[1].Value.Trim()

    $mmdPath = Join-Path $tempDir ("diagramas.mermaid-{0}.mmd" -f $script:index)
    $pngPath = ".\anexos\diagramas.mermaid-$($script:index).png"

    [System.IO.File]::WriteAllText(
        (Resolve-Path $tempDir).Path + "\diagramas.mermaid-$($script:index).mmd",
        $diagramCode,
        [System.Text.UTF8Encoding]::new($false)
    )

    mmdc `
      -i $mmdPath `
      -o $pngPath `
      -p .\puppeteer-config.json `
      -b white

    return "![diagram](./anexos/diagramas.mermaid-$($script:index).png)"
})

[System.IO.File]::WriteAllText(
    (Join-Path (Get-Location) "tesis.mermaid.png.md"),
    $newContent,
    [System.Text.UTF8Encoding]::new($false)
)

"Diagramas Mermaid renderizados: $index"
"Markdown generado: $outputMd"