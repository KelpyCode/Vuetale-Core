@echo off
setlocal enabledelayedexpansion

set GENERATOR_DIR=android-dts-generator
set JAR_PATH=%GENERATOR_DIR%\dts-generator\build\libs\dts-generator.jar
set OUTPUT_DIR=types

echo === Android DTS Generator Wrapper ===

REM Clone or update the repository
if not exist "%GENERATOR_DIR%" (
    echo Cloning android-dts-generator...
    git clone https://github.com/NativeScript/android-dts-generator.git "%GENERATOR_DIR%"
) else (
    echo Updating existing repository...
    pushd "%GENERATOR_DIR%"
    git pull --ff-only 2>nul || echo Git pull failed, continuing...
    popd
)

REM Build the generator
echo Building dts-generator.jar...
pushd "%GENERATOR_DIR%\dts-generator"
call gradlew.bat jar --quiet
popd

REM Check if JAR exists
if not exist "%JAR_PATH%" (
    echo Error: dts-generator.jar was not built successfully.
    exit /b 1
)

REM Create output directory
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

REM Run the generator with output forced to ./types/
echo Running DTS generator → outputting to %OUTPUT_DIR% ...
java -jar "%JAR_PATH%" -input %* -output "%OUTPUT_DIR%"

echo ✅ Done! TypeScript declarations are in the '%OUTPUT_DIR%' folder.