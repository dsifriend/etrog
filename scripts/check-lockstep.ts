import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

type PackageJson = {
	name: string;
	version?: string;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
	optionalDependencies?: Record<string, string>;
};

type DependencyField = keyof Pick<
	PackageJson,
	| "dependencies"
	| "devDependencies"
	| "peerDependencies"
	| "optionalDependencies"
>;

const dependencyFields: DependencyField[] = [
	"dependencies",
	"devDependencies",
	"peerDependencies",
	"optionalDependencies",
];

const packagesDir = join(process.cwd(), "packages");

const entries = await readdir(packagesDir, { withFileTypes: true });
const packageDirs = entries
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

const packages: PackageJson[] = [];

for (const dir of packageDirs) {
	const packageJsonPath = join(packagesDir, dir, "package.json");
	const raw = await readFile(packageJsonPath, "utf8");
	const parsed = JSON.parse(raw) as PackageJson;
	packages.push(parsed);
}

const versionMap = new Map<string, string>();
for (const pkg of packages) {
	if (!pkg.version) {
		console.error(`Missing version in package.json for ${pkg.name}.`);
		process.exit(1);
	}
	versionMap.set(pkg.name, pkg.version);
}

const versions = new Set(versionMap.values());
if (versions.size === 0) {
	console.error("No package versions found.");
	process.exit(1);
}

if (versions.size > 1) {
	console.error(
		"Lockstep versioning violation: packages have different versions:",
	);
	for (const [name, version] of versionMap) {
		console.error(`- ${name}: ${version}`);
	}
	process.exit(1);
}

const [lockstepVersion] = versions;

const errors: string[] = [];

for (const pkg of packages) {
	for (const field of dependencyFields) {
		const deps = pkg[field];
		if (!deps) continue;

		for (const [depName, depVersion] of Object.entries(deps)) {
			if (!depName.startsWith("@etrog/")) continue;
			if (depName === pkg.name) continue;

			if (depVersion !== "workspace:*" && depVersion !== lockstepVersion) {
				errors.push(
					`${pkg.name} ${field} ${depName} should be "workspace:*" or "${lockstepVersion}", got "${depVersion}".`,
				);
			}
		}
	}
}

if (errors.length > 0) {
	console.error("Lockstep dependency versioning violation:");
	for (const message of errors) {
		console.error(`- ${message}`);
	}
	process.exit(1);
}

console.log(`Lockstep versioning OK (${lockstepVersion}).`);
