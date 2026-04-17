#!/bin/bash
set -e

GENERATOR_DIR="dts-generator"
JAR_PATH="${GENERATOR_DIR}/dts-generator/build/libs/dts-generator.jar"
OUTPUT_DIR="./types"

echo "=== DTS Generator Wrapper ==="

# Clone or update the repository
if [ ! -d "$GENERATOR_DIR" ]; then
    echo "Cloning android-dts-generator..."
    git clone https://github.com/NativeScript/android-dts-generator.git "$GENERATOR_DIR"
else
    echo "Updating existing repository..."
    cd "$GENERATOR_DIR"
    git pull --ff-only || echo "Git pull failed, continuing with existing files..."
    cd ..
fi

# Build the generator
echo "Building dts-generator.jar..."
cd "$GENERATOR_DIR/dts-generator"
./gradlew -q jar
cd ../..

# Check if JAR was built
if [ ! -f "$JAR_PATH" ]; then
    echo "Error: dts-generator.jar was not built successfully."
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Convert Unix-style forward slashes to Windows backslashes for Java compatibility
# Process all arguments to handle path conversion
declare -a converted_args
for arg in "$@"; do
  # Use sed to convert forward slashes to backslashes
  converted_arg=$(echo "$arg" | sed 's#/#\\#g')
  converted_args+=("$converted_arg")
done

# Run the generator with output forced to ./types/
echo "Running DTS generator → outputting to $OUTPUT_DIR ..."
java -jar "$JAR_PATH" "${converted_args[@]}" -output "$OUTPUT_DIR" 

echo "✅ Done! TypeScript declarations are in the '$OUTPUT_DIR/' folder."