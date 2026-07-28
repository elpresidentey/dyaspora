$map = @{
    "Abuja.jpg"        = "FdvErEs2yCk"
    "Dakar.jpg"        = "rVUskjd0WRk"
    "Abidjan.jpg"      = "0P_47DuTVo4"
    "Addis-Ababa.jpg"  = "m9klqRh5tgo"
    "Zanzibar.jpg"     = "Yjiwmw0pbuM"
    "Johannesburg.jpg" = "CV3T83t3ukc"
    "Kampala.jpg"      = "lii0uaz8Ieo"
    "Cairo.jpg"        = "EZbNTJz9GwI"
    "Casablanca.jpg"   = "m8i6PbBN9Fo"
    "Durban.jpg"       = "rsd356GimNM"
    "Mombasa.jpg"      = "gXPPvBfbOMw"
    "Maputo.jpg"       = "fkjzn_A_5uE"
    "Tunis.jpg"        = "8KL1kLjoqPo"
    "Algiers.jpg"      = "xyONOpOAmuo"
    "Kinshasa.jpg"     = "dRcmuwABzKI"
    "Windhoek.jpg"     = "9dM9XfNuRfk"
    "Harare.jpg"       = "OAqjZgcwalk"
    "Douala.jpg"       = "bZnciM7XIYw"
    "Banjul.jpg"       = "uOgB_xCBT4M"
    "Freetown.jpg"     = "Vqd22Lb0rJc"
    "Victoria-Falls.jpg" = "x-tYGWDu1Sc"
    "Cotonou.jpg"      = "44kEURkb7Tk"
    "Dar-es-Salaam.jpg" = "TU1S2tuDdqw"
    "Luanda.jpg"        = "kPUQmpH1U-E"
    "Monrovia.jpg"      = "TVxXwExRnFc"
    "Kumasi.jpg"        = "-Wsg7FSP3Ms"
    "Ouagadougou.jpg"   = "Y5bQh9RlK1A"
    "Bamako.jpg"        = "TU1S2tuDdqw"
    "Lome.jpg"          = "kPUQmpH1U-E"
    "Conakry.jpg"       = "TVxXwExRnFc"
    "Lusaka.jpg"        = "-Wsg7FSP3Ms"
    "Lilongwe.jpg"      = "LgenIJXh4JQ"
    "Antananarivo.jpg"  = "80JhoIivzVc"
    "Brazzaville.jpg"   = "ycG0A6DlvOk"
    "Yaounde.jpg"       = "Y5bQh9RlK1A"
    "Libreville.jpg"    = "80JhoIivzVc"
    "Gaborone.jpg"      = "ycG0A6DlvOk"
}

$out = "C:\Users\hp\dyaspora\public\images"
$existing = Get-ChildItem -Path $out -Filter "*.jpg" | ForEach-Object { $_.Name }

$ok = 0; $fail = 0; $skip = 0
foreach ($kv in $map.GetEnumerator() | Sort-Object Name) {
    $file = $kv.Name
    $id = $kv.Value
    $path = Join-Path $out $file
    if ($existing -contains $file) { $skip++; continue }
    try {
        $dlUrl = "https://unsplash.com/photos/$id/download?force=true"
        Write-Host "Downloading $file..."
        Invoke-WebRequest -Uri $dlUrl -OutFile $path -MaximumRedirection 10 -ErrorAction Stop
        Write-Host "  OK" -ForegroundColor Green
        $ok++
    } catch {
        Write-Host "  FAIL ($id): $_" -ForegroundColor Red
        $fail++
    }
}
Write-Host "Done - $ok downloaded, $fail failed, $skip skipped" -ForegroundColor Cyan
