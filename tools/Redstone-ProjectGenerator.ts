import { tool } from "@opencode-ai/plugin"
import * as fs from "fs/promises"
import * as path from "path"

interface ProjectInitParams {
  plugin_name: string
  group: string
  plugin_version: string
  plugin_description: string
  author: string
  namespace: string
  minecraft_version: string
  load_phase: "STARTUP" | "POSTWORLD"
}

interface GeneratedFile {
  path: string
  content: string
}

interface ProjectInitResult {
  success: boolean
  project_root: string
  files_created: string[]
  java_version: string
  api_version: string
  paper_api_dependency: string
  error?: string
}

function getJavaVersion(minecraftVersion: string): string {
  const parts = minecraftVersion.split(".").map((p) => parseInt(p, 10))
  const major = parts[0] || 1
  const minor = parts[1] || 0
  const patch = parts[2] || 0

  if (major >= 2 || (major === 1 && minor >= 26 && patch >= 1)) return "25"
  if (major === 1 && minor >= 20 && minor <= 25) {
    if (minor === 20 && patch < 5) return "17"
    return "21"
  }
  if (major === 1 && minor >= 18 && minor <= 20) return "17"
  if (major === 1 && minor === 17) return "16"
  return "8"
}

function getPaperApiDependency(minecraftVersion: string): string {
  return `io.papermc.paper:paper-api:${minecraftVersion}-R0.1-SNAPSHOT`
}

function namespaceToPath(namespace: string): string {
  const parts = namespace.split(".")
  const packageParts = parts.filter((part, index) => {
    if (index === parts.length - 1 && /^[A-Z]/.test(part)) return false
    return true
  })
  return packageParts.join("/")
}

function generateSettingsGradle(params: ProjectInitParams): string {
  return `rootProject.name = '${params.plugin_name}'
`
}

function generateBuildGradle(
  params: ProjectInitParams,
  javaVersion: string,
  paperApiDep: string
): string {
  return `plugins {
    id 'java'
}

group = '${params.group}'
version = '${params.plugin_version}'

repositories {
    mavenCentral()
    maven {
        url 'https://repo.papermc.io/repository/maven-public/'
    }
}

dependencies {
    compileOnly '${paperApiDep}'
}

java {
    sourceCompatibility = '${javaVersion}'
    targetCompatibility = '${javaVersion}'
}

tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
}

jar {
    duplicatesStrategy = 'EXCLUDE'
    archiveClassifier.set('')

    from {
        configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) }
    }

    exclude 'META-INF/**'
}
`
}

function generateBuildSh(params: ProjectInitParams): string {
  return `#!/usr/bin/env bash

JAR_NAME="${params.plugin_name}-${params.plugin_version}.jar"
JAR_PATH="build/libs/$JAR_NAME"
OUTPUT_PATH="bin"

gradle clean build --stacktrace
if [ $? -ne 0 ]; then
  echo -e "Build Failed"
  exit 1
fi

mkdir -p "$OUTPUT_PATH"
cp -f "$JAR_PATH" "$OUTPUT_PATH/$JAR_NAME"
echo -e "Build Success"
`
}

function generateBuildPs1(params: ProjectInitParams): string {
  return `$jarName = "${params.plugin_name}-${params.plugin_version}.jar"
$jarPath = "build\\libs\\$jarName"
$outputPath = "bin"

gradle clean build --stacktrace

if ($LASTEXITCODE) { Write-Host "Build Failed"; exit 1 }

New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
Copy-Item $jarPath "$outputPath\\$jarName" -Force

Write-Host "Build Success"
`
}

function generatePluginYml(
  params: ProjectInitParams,
  apiVersion: string
): string {
  return `name: ${params.plugin_name}
version: ${params.plugin_version}
description: ${params.plugin_description}
author: ${params.author}

main: ${params.namespace}
api-version: "${apiVersion}"

load: ${params.load_phase}
`
}

function generateGitignore(): string {
  return `bin/
build/
gradle/
.gradle/
.settings/

.classpath
.project
`
}

function validateParams(params: ProjectInitParams): string | null {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(params.plugin_name)) {
    return "plugin_name must be in kebab-case (e.g., 'my-plugin')"
  }
  if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/.test(params.group)) {
    return "group must be a valid Maven group ID (e.g., 'dev.example')"
  }
  if (!/^\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?$/.test(params.plugin_version)) {
    return "plugin_version must be in semantic version format (e.g., '1.0.0')"
  }
  if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*\.[A-Z][a-zA-Z0-9]*$/.test(params.namespace)) {
    return "namespace must be a fully qualified class name (e.g., 'dev.example.MyPlugin')"
  }
  if (!/^\d+\.\d+(\.\d+)?$/.test(params.minecraft_version)) {
    return "minecraft_version must be in format X.Y or X.Y.Z (e.g., '1.21.4')"
  }
  if (!["STARTUP", "POSTWORLD"].includes(params.load_phase)) {
    return "load_phase must be either 'STARTUP' or 'POSTWORLD'"
  }
  if (!params.plugin_description || params.plugin_description.trim().length === 0) {
    return "plugin_description cannot be empty"
  }
  if (!params.author || params.author.trim().length === 0) {
    return "author cannot be empty"
  }
  return null
}

async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true })
}

async function writeFile(filePath: string, content: string): Promise<void> {
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content, "utf-8")
}

async function writeProjectFiles(
  projectRoot: string,
  files: GeneratedFile[]
): Promise<string[]> {
  const createdFiles: string[] = []
  for (const file of files) {
    const fullPath = path.join(projectRoot, file.path)
    await writeFile(fullPath, file.content)
    createdFiles.push(file.path)
  }
  return createdFiles
}

export default tool({
  description: `Initializes a Minecraft plugin project with all required files and directory structure.

Generates:
- settings.gradle: Project name configuration
- build.gradle: Build configuration with Paper API dependency
- build.sh: Unix build script
- build.ps1: Windows PowerShell build script
- plugin.yml: Plugin metadata and configuration
- .gitignore: Git ignore patterns
- src/main/java/{namespace_path}/: Java source directory structure

Automatically determines:
- Java version based on Minecraft version
- Paper API dependency format
- API version from Minecraft version`,

  args: {
    plugin_name: tool.schema
      .string()
      .describe("Plugin name in kebab-case (e.g., 'my-awesome-plugin')"),
    group: tool.schema
      .string()
      .describe("Maven group ID (e.g., 'dev.redstone')"),
    plugin_version: tool.schema
      .string()
      .describe("Plugin version in semantic format (e.g., '1.0.0')"),
    plugin_description: tool.schema
      .string()
      .describe("Brief description of the plugin's purpose"),
    author: tool.schema.string().describe("Plugin author name"),
    namespace: tool.schema
      .string()
      .describe("Main class namespace (e.g., 'dev.redstone.MyPlugin')"),
    minecraft_version: tool.schema
      .string()
      .describe("Target Minecraft version (e.g., '1.21.10')"),
    load_phase: tool.schema
      .enum(["STARTUP", "POSTWORLD"])
      .describe("Plugin load phase: STARTUP (before world loads) or POSTWORLD (after world loads)"),
  },

  async execute(args) {
    const params: ProjectInitParams = {
      plugin_name: args.plugin_name,
      group: args.group,
      plugin_version: args.plugin_version,
      plugin_description: args.plugin_description,
      author: args.author,
      namespace: args.namespace,
      minecraft_version: args.minecraft_version,
      load_phase: args.load_phase as "STARTUP" | "POSTWORLD",
    }

    const validationError = validateParams(params)
    if (validationError) {
      const errorResult: ProjectInitResult = {
        success: false,
        project_root: "",
        files_created: [],
        java_version: "",
        api_version: "",
        paper_api_dependency: "",
        error: validationError,
      }
      return JSON.stringify(errorResult, null, 2)
    }

    const javaVersion = getJavaVersion(params.minecraft_version)
    const apiVersion = params.minecraft_version
    const paperApiDependency = getPaperApiDependency(params.minecraft_version)
    const namespacePath = namespaceToPath(params.namespace)
    const projectRoot = process.cwd()

    const files: GeneratedFile[] = [
      { path: "settings.gradle", content: generateSettingsGradle(params) },
      { path: "build.gradle", content: generateBuildGradle(params, javaVersion, paperApiDependency) },
      { path: "build.sh", content: generateBuildSh(params) },
      { path: "build.ps1", content: generateBuildPs1(params) },
      { path: "src/main/resources/plugin.yml", content: generatePluginYml(params, apiVersion) },
      { path: ".gitignore", content: generateGitignore() },
    ]

    try {
      const createdFiles = await writeProjectFiles(projectRoot, files)
      const javaSourceDir = path.join(projectRoot, "src/main/java", namespacePath)
      await ensureDir(javaSourceDir)
      createdFiles.push(`src/main/java/${namespacePath}/`)

      const result: ProjectInitResult = {
        success: true,
        project_root: projectRoot,
        files_created: createdFiles,
        java_version: javaVersion,
        api_version: apiVersion,
        paper_api_dependency: paperApiDependency,
      }
      return JSON.stringify(result, null, 2)
    } catch (error) {
      const errorResult: ProjectInitResult = {
        success: false,
        project_root: projectRoot,
        files_created: [],
        java_version: javaVersion,
        api_version: apiVersion,
        paper_api_dependency: paperApiDependency,
        error: error instanceof Error ? error.message : String(error),
      }
      return JSON.stringify(errorResult, null, 2)
    }
  },
})
